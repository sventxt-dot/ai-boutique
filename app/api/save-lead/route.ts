import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { transporter } from "@/lib/mailer";

interface UseCase {
  titel: string;
  beschreibung: string;
  machbarkeit: string;
  umsetzung: string;
  einsparung: string;
  naechster_schritt: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, branche, pains, wins, ergaenzung, usecases } =
      await request.json();

    const [u1, u2, u3] = usecases ?? [];

    const { error } = await supabaseAdmin
      .from("potential_check_leads")
      .insert({
        email,
        branche,
        pain_points: pains,
        ki_wins: wins,
        ergaenzung: ergaenzung || null,
        usecase_1_titel: u1?.titel,
        usecase_1_beschreibung: u1?.beschreibung,
        usecase_1_machbarkeit: u1?.machbarkeit,
        usecase_1_umsetzung: u1?.umsetzung,
        usecase_1_einsparung: u1?.einsparung,
        usecase_1_naechster_schritt: u1?.naechster_schritt,
        usecase_2_titel: u2?.titel,
        usecase_2_beschreibung: u2?.beschreibung,
        usecase_2_machbarkeit: u2?.machbarkeit,
        usecase_2_umsetzung: u2?.umsetzung,
        usecase_2_einsparung: u2?.einsparung,
        usecase_2_naechster_schritt: u2?.naechster_schritt,
        usecase_3_titel: u3?.titel,
        usecase_3_beschreibung: u3?.beschreibung,
        usecase_3_machbarkeit: u3?.machbarkeit,
        usecase_3_umsetzung: u3?.umsetzung,
        usecase_3_einsparung: u3?.einsparung,
        usecase_3_naechster_schritt: u3?.naechster_schritt,
        status: "new",
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Speichern fehlgeschlagen." },
        { status: 500 }
      );
    }

    console.log("✅ New lead saved:", email, branche);

    try {
      const info = await transporter.sendMail({
        from: `"AI-Boutique.de" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO,
        subject: `Neuer KI-Potential Check: ${branche} — ${email}`,
        html: buildEmailHtml({ email, branche, pains, wins, ergaenzung, usecases }),
      });
      console.log("✅ Email sent:", info.messageId, info.response);
    } catch (emailError) {
      console.error("❌ Email send failed:", emailError);
    }

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

  const usecasesHtml = usecases
    .map(
      (uc, i) => `
      <div style="background:#1a1a1a;border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:20px;margin-bottom:14px;">
        <div style="font-family:monospace;font-size:11px;color:rgba(255,255,255,0.3);margin-bottom:6px;">0${i + 1}</div>
        <div style="color:#fff;font-weight:700;font-size:16px;margin-bottom:8px;">${uc.titel}</div>
        <span style="display:inline-block;font-family:monospace;font-size:10px;color:#C77DFF;border:1px solid #C77DFF;padding:2px 8px;border-radius:4px;margin-bottom:12px;">${uc.machbarkeit}</span>
        <div style="color:rgba(255,255,255,0.6);font-size:13px;line-height:1.65;margin-bottom:14px;">${uc.beschreibung}</div>
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
          <div style="font-family:monospace;font-size:10px;color:#C77DFF;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">Nächster Schritt</div>
          <div style="color:rgba(255,255,255,0.5);font-size:12px;line-height:1.55;">${uc.naechster_schritt}</div>
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
      <div style="color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">KI-Wünsche</div>
      <div>${wins.map(tag).join("")}</div>
    </div>` : ""}

    ${ergaenzung ? `<div style="margin-bottom:16px;">
      <div style="color:rgba(255,255,255,0.35);font-size:11px;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:5px;">Ergänzung</div>
      <div style="color:rgba(255,255,255,0.75);font-size:14px;line-height:1.6;">${ergaenzung}</div>
    </div>` : ""}

    <div style="border-top:1px solid rgba(255,255,255,0.06);margin:28px 0;"></div>

    <div style="font-family:monospace;font-size:11px;color:#C77DFF;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:18px;">3 KI-Potenziale</div>
    ${usecasesHtml}

  </div>
</body>
</html>`;
}
