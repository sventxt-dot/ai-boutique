import type { Metadata } from "next";
import MonoLabel from "@/components/shared/mono-label";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie Sven Günzel von AI-Boutique.de direkt.",
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-xl w-full text-center">
        <MonoLabel className="mb-6 inline-block">Kontakt</MonoLabel>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Lassen Sie uns sprechen.
        </h1>

        <p className="text-lg text-white/60 leading-relaxed mb-12">
          Schreiben Sie mir direkt — ich melde mich persönlich.
        </p>

        <a
          href="mailto:sven@ai-boutique.de?subject=Anfrage%20ai-boutique.de"
          className="inline-flex items-center gap-3 bg-[#C77DFF] hover:bg-[#d490ff] text-black font-bold text-lg rounded-xl px-10 py-5 transition-colors"
        >
          sven@ai-boutique.de
        </a>

        <p className="mt-8 font-mono text-sm text-white/30">
          Oder direkt: +49 (0) XX XXXXXXX
        </p>
      </div>
    </div>
  );
}
