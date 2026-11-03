import { NextRequest, NextResponse, after } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { transporter } from "@/lib/mailer";
import { generateUsecases, type UseCase } from "@/lib/potential-check-llm";

type Lead = {
  email: string;
  branche: string;
  pains: string[];
  wins: string[];
  ergaenzung: string;
};

const usecaseColumns = (usecases: UseCase[]) =>
  Object.fromEntries(
    usecases.slice(0, 3).flatMap((uc, i) =>
      (
        ["titel", "beschreibung", "machbarkeit", "umsetzung", "einsparung", "naechster_schritt"] as const
      ).map((field) => [`usecase_${i + 1}_${field}`, uc[field]])
    )
  );

async function sendLeadMail(lead: Lead, usecases: UseCase[], flags: string[]) {
  const prefix = flags.map((flag) => `[${flag}] `).join("");
  const info = await transporter.sendMail({
    from: `"AI-Boutique.de" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_TO,
    subject: `${prefix}Neuer KI-Potential Check: ${lead.branche} — ${lead.email}`,
    html: buildEmailHtml({ ...lead, usecases }),
  });
  console.log("✅ Email sent:", info.messageId, info.response);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead: Lead = {
      email: body.email,
      branche: body.branche,
      pains: body.pains ?? [],
      wins: body.wins ?? [],
      ergaenzung: body.ergaenzung ?? "",
    };

    if (!lead.email || !lead.branche) {
      return NextResponse.json(
        { error: "E-Mail und Branche sind erforderlich." },
        { status: 400 }
      );
    }

    let leadId: string | null = null;
    try {
      const { data, error } = await supabaseAdmin
        .from("potential_check_leads")
        .insert({
          email: lead.email,
          branche: lead.branche,
          pain_points: lead.pains,
          ki_wins: lead.wins,
          ergaenzung: lead.ergaenzung || null,
          status: "new",
        })
        .select("id")
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
      } else {
        leadId = data.id;
        console.log("✅ New lead saved:", lead.email, lead.branche);
      }
    } catch (saveError) {
      console.error("Supabase insert failed:", saveError);
    }

    // Without a database row, the lead must reach the inbox before the visitor sees a success.
    if (!leadId) {
      try {
        await sendLeadMail(lead, [], ["Nicht gespeichert", "Analyse folgt"]);
      } catch (emailError) {
        console.error("❌ Email send failed:", emailError);
        return NextResponse.json(
          { error: "Speichern fehlgeschlagen." },
          { status: 500 }
        );
      }
    }

    // The analysis takes about a minute, so it runs after the visitor already got the response.
    after(async () => {
      let usecases: UseCase[] = [];
      const flags: string[] = leadId ? [] : ["Nicht gespeichert"];
      try {
        usecases = await generateUsecases({
          branche: lead.branche,
          pains: lead.pains,
          wins: lead.wins,
          tools: lead.ergaenzung,
        });
      } catch (analysisError) {
        console.error("❌ Analysis failed:", analysisError);
        flags.push("Analyse fehlgeschlagen");
      }

      if (leadId && usecases.length) {
        const { error } = await supabaseAdmin
          .from("potential_check_leads")
          .update(usecaseColumns(usecases))
          .eq("id", leadId);
        if (error) console.error("Supabase update error:", error);
      }

      try {
        await sendLeadMail(lead, usecases, flags);
      } catch (emailError) {
        console.error("❌ Email send failed:", emailError);
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save lead error:", error);
    return NextResponse.json(
      { error: "Fehler beim Speichern." },
      { status: 500 }
    );
  }
}

function buildEmailHtml({
  email,
  branche,
  pains,
  wins,
  ergaenzung,
  usecases,
}: {
  email: string;
  branche: string;
  pains: string[];
  wins: string[];
  ergaenzung: string;
  usecases: UseCase[];
}): string {
  const date = new Date().toLocaleString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const tag = (text: string) =>
    `<span style="display:inline-block;background:rgba(199,125,255,0.12);border:1px solid rgba(199,125,255,0.3);color:rgba(255,255,255,0.85);font-size:12px;padding:3px 10px;border-radius:100px;margin:2px 4px 2px 0;">${text}</span>`;

  const detail = (label: string, value?: string) =>
    value
      ? `<div style="margin-bottom:12px;">
          <div style="font-family:monospace;font-size:10px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">${label}</div>
          <div style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.55;">${value}</div>
        </div>`
      : "";

  const usecasesHtml = usecases
    .map(
      (uc, i) => `
      <div style="background:#1a1a1a;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:20px;margin-bottom:14px;">
        <div style="font-family:monospace;font-size:11px;color:rgba(255,255,255,0.3);margin-bottom:6px;">0${i + 1}</div>
        <div style="color:#fff;font-weight:700;font-size:16px;margin-bottom:8px;">${uc.titel}</div>
        <span style="display:inline-block;font-family:monospace;font-size:10px;color:#C77DFF;border:1px solid #C77DFF;padding:2px 8px;border-radius:4px;margin-bottom:12px;">${uc.arbeitsform ?? ""} · ${uc.machbarkeit}</span>
        <div style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.65;margin-bottom:14px;">${uc.beschreibung}</div>
        ${detail("Mein Anteil", uc.mein_anteil)}
        ${detail("Ihr Beitrag", uc.ihr_beitrag)}
        ${detail("Schnittstellen", uc.schnittstellen?.join("<br>"))}
        ${detail("Auslöser", uc.ausloeser)}
        ${detail("Ablauf im Betrieb", uc.ablauf?.map((step, n) => `${n + 1}. ${step}`).join("<br>"))}
        ${detail("Tools", uc.tools)}
        ${detail("Voraussetzungen", uc.voraussetzungen)}
        ${detail("Freigabe", uc.freigabe)}
        ${detail("Prüfkriterium", uc.pruefkriterium)}
        <table style="width:100%;border-collapse:separate;border-spacing:8px;margin-bottom:12px;">
          <tr>
            <td style="background:rgba(255,255,255,0.05);border-radius:6px;padding:10px 12px;width:50%;vertical-align:top;">
              <div style="font-family:monospace;font-size:10px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Umsetzung</div>
              <div style="color:#fff;font-size:13px;font-weight:500;">${uc.umsetzung}</div>
            </td>
            <td style="background:rgba(255,255,255,0.05);border-radius:6px;padding:10px 12px;width:50%;vertical-align:top;">
              <div style="font-family:monospace;font-size:10px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">Einsparung</div>
              <div style="color:#fff;font-size:13px;font-weight:500;">${uc.einsparung}</div>
            </td>
          </tr>
        </table>
        <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:12px;">
          <div style="font-family:monospace;font-size:10px;color:#C77DFF;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">Gemeinsamer Pilot</div>
          <div style="color:rgba(255,255,255,0.5);font-size:12px;line-height:1.55;">${uc.naechster_schritt}</div>
        </div>
        <div style="margin-top:12px;">
          ${detail("Referenz", uc.referenz)}
          ${detail("Nur für dich: Annahmen", uc.annahmen)}
        </div>
      </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,sans-serif;background:#0a0a0a;color:#fff;margin:0;padding:24px;">
  <div style="max-width:620px;margin:0 auto;background:#141414;border-radius:14px;padding:36px;border:1px solid rgba(255,255,255,0.08);">

    <div style="font-family:monospace;font-size:11px;color:#C77DFF;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:6px;">ai-boutique.de — Neuer Lead</div>
    <h1 style="color:#fff;font-size:22px;margin:0 0 4px;font-weight:700;">Neuer KI-Potential Check</h1>
    <p style="color:rgba(255,255,255,0.35);font-size:13px;margin:0 0 28px;">${date} Uhr</p>

    <div style="margin-bottom:16px;">
      <div style="color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;">E-Mail</div>
      <div style="color:#fff;font-size:15px;font-weight:500;">${email}</div>
    </div>

    <div style="margin-bottom:16px;">
      <div style="color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;">Branche</div>
      <div style="color:#fff;font-size:15px;font-weight:500;">${branche}</div>
    </div>

    <div style="margin-bottom:16px;">
      <div style="color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Pain Points</div>
      <div>${pains.map(tag).join("")}</div>
    </div>

    ${wins?.length ? `<div style="margin-bottom:16px;">
      <div style="color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Einbindung im Marketing</div>
      <div>${wins.map(tag).join("")}</div>
    </div>` : ""}

    ${ergaenzung ? `<div style="margin-bottom:16px;">
      <div style="color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;">Bisher genutzte Tools</div>
      <div style="color:rgba(255,255,255,0.75);font-size:14px;line-height:1.6;">${ergaenzung}</div>
    </div>` : ""}

    <div style="border-top:1px solid rgba(255,255,255,0.06);margin:28px 0;"></div>

    <div style="font-family:monospace;font-size:11px;color:#C77DFF;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:18px;">3 Agentic-Marketing-Cases (Entwurf)</div>
    ${usecases.length ? usecasesHtml : `<div style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.6;">Die Analyse ist ausgefallen. Die Angaben oben reichen für eine eigene Einschätzung.</div>`}

  </div>
</body>
</html>`;
}
