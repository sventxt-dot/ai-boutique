import Anthropic from "@anthropic-ai/sdk";
import {
  SYSTEM_PROMPT,
  USECASES_SCHEMA,
  buildUserPrompt,
} from "@/lib/potential-check-prompt";

export interface UseCase {
  titel: string;
  beschreibung: string;
  machbarkeit: string;
  umsetzung: string;
  einsparung: string;
  naechster_schritt: string;
  arbeitsform?: string;
  mein_anteil?: string;
  ihr_beitrag?: string;
  schnittstellen?: string[];
  ausloeser?: string;
  ablauf?: string[];
  tools?: string;
  voraussetzungen?: string;
  freigabe?: string;
  pruefkriterium?: string;
  referenz?: string;
  annahmen?: string;
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Throws on any failure so the caller can still deliver the lead without cases.
export async function generateUsecases(input: {
  branche: string;
  pains?: string[];
  wins?: string[];
  tools?: string;
}): Promise<UseCase[]> {
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
    messages: [{ role: "user", content: buildUserPrompt(input) }],
  });

  if (message.stop_reason !== "end_turn") {
    throw new Error(`Unexpected stop reason: ${message.stop_reason}`);
  }

  const content = message.content.find((block) => block.type === "text");
  if (!content) {
    throw new Error("No text block in response");
  }

  return JSON.parse(content.text).usecases;
}
