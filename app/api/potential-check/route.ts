import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import {
  SYSTEM_PROMPT,
  USECASES_SCHEMA,
  buildUserPrompt,
} from "@/lib/potential-check-prompt";

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

    const message = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      thinking: { type: "adaptive" },
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: USECASES_SCHEMA },
      },
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildUserPrompt({ branche, pains, wins, tools: ergaenzung }),
        },
      ],
    });

    if (message.stop_reason !== "end_turn") {
      console.error("Unexpected stop reason:", message.stop_reason);
      return NextResponse.json(
        { error: "Die KI-Antwort war unvollständig." },
        { status: 500 }
      );
    }

    const content = message.content.find((block) => block.type === "text");
    if (!content) {
      console.error("No text block in response");
      return NextResponse.json(
        { error: "Unerwarteter Antworttyp von der KI." },
        { status: 500 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(content.text);
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
