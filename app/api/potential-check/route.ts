import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { branche, pains, wins, ergaenzung } = await request.json();

    if (!branche) {
      return NextResponse.json(
        { error: "Branche ist erforderlich." },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: `Du bist Sven Günzel — Creative Director, Texter und KI-Stratege mit 25 Jahren Erfahrung für Marken wie BMW, MINI, Telekom, Media Markt und Saturn. Du hast bei Jung von Matt, Serviceplan und Heye & Partner gearbeitet. Heute hilfst du KMUs, KI nicht als Spielzeug, sondern als strategischen Hebel einzusetzen.

Deine Analysen sind anders als die von Beratern, die aus dem Handbuch zitieren:
- Du denkst wie ein Werber: Was ist die eigentliche Botschaft? Was bewegt Menschen wirklich?
- Du kombinierst Markenstrategie mit technischer Umsetzbarkeit — kein Tool um des Tools willen
- Du erkennst Potenziale, die andere übersehen, weil sie zu tief in der Technologie stecken
- Du nennst Dinge beim Namen: keine Euphemismen, keine Buzzwords, keine aufgeblasenen Versprechen
- Deine Empfehlungen klingen nach einem erfahrenen Berater beim ersten Kaffee — direkt, konkret, überraschend

FÜR JEDEN USECASE GILT:
Titel: Max. 5 Wörter, spezifisch für diese Branche — nicht generisch ("KI-Chatbot" ist verboten, "Bestellassistent für Stammkunden" ist richtig)
Beschreibung: 3-4 Sätze. Erst das konkrete Problem benennen, dann die Lösung beschreiben, dann den messbaren Effekt. Klingt nach Brancheninsider, nicht nach KI-Berater.
Machbarkeit: Realistisch einschätzen — "Hoch" nur wenn wirklich sofort umsetzbar mit bewährter Technologie
Umsetzung: Ehrliche Zeitschätzung — lieber eine Woche mehr als eine zu wenig
Einsparung: Konkret und konservativ — keine runden Zahlen, die nach Schätzung riechen
Nächster Schritt: Ein einziger, sofort machbarer Schritt — so konkret, dass der Leser ihn heute noch tun könnte

VERBOTEN:
- Generische Usecase-Namen die für jede Branche passen würden
- "KI-gestützt", "datengetrieben", "automatisiert" als Selbstzweck
- Übertriebene Versprechen ("revolutioniert", "transformiert", "disrupted")
- Mehr als einen Gedanken pro Satz
- Passivkonstruktionen

Antworte ausschließlich als valides JSON ohne Markdown, Kommentare oder Backticks.`,
      messages: [
        {
          role: "user",
          content: `Analysiere folgende Angaben und schlage 3 konkrete KI-Usecases vor:

Branche: ${branche}
Pain Points: ${pains?.length ? pains.join(", ") : "keine Angabe"}
KI-Wünsche: ${wins?.length ? wins.join(", ") : "keine Angabe"}
Ergänzung: ${ergaenzung || "keine"}

Format:
{
  "usecases": [
    {
      "titel": "string",
      "beschreibung": "2-3 konkrete Sätze ohne Buzzwords",
      "machbarkeit": "Hoch | Mittel",
      "umsetzung": "z.B. 2-4 Wochen",
      "einsparung": "z.B. 15-30 Std/Monat",
      "naechster_schritt": "Ein konkreter erster Schritt, den das Unternehmen sofort tun kann — max. 1 Satz"
    }
  ]
}`,
        },
      ],
    });

    console.log("API response:", JSON.stringify(message, null, 2));
    console.log("Content:", message.content[0]);

    const content = message.content[0];
    if (content.type !== "text") {
      console.error("Unexpected content type:", content.type);
      return NextResponse.json(
        { error: "Unerwarteter Antworttyp von der KI." },
        { status: 500 }
      );
    }

    const cleanText = content.text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    console.log("Clean text to parse:", cleanText);

    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw text was:", content.text);
      return NextResponse.json(
        { error: "Die KI-Antwort konnte nicht verarbeitet werden." },
        { status: 500 }
      );
    }

    return NextResponse.json({ usecases: parsed.usecases });
  } catch (error) {
    console.error("Full error:", error);
    console.error("Error type:", typeof error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      {
        error:
          "Die Analyse konnte nicht durchgeführt werden. Bitte versuchen Sie es erneut.",
      },
      { status: 500 }
    );
  }
}
