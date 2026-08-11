import type { Metadata } from "next";
import MonoLabel from "@/components/shared/mono-label";

export const metadata = {
  title: "Kontakt — KI Beratung anfragen",
  description: "Sprechen Sie direkt mit Sven Günzel — KI-Berater und Creative Director. Erste Beratung kostenlos.",
  alternates: { canonical: "https://www.ai-boutique.de/kontakt" }
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-xl w-full text-center">
        <MonoLabel className="mb-6 inline-block">Kontakt</MonoLabel>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Lassen Sie uns sprechen.
        </h1>

        <p className="text-lg text-white/60 leading-relaxed mb-12 font-medium">
          Schreiben Sie mir direkt — ich melde mich persönlich.
        </p>

        <a
          href="mailto:sven@ai-boutique.de?subject=Anfrage%20ai-boutique.de"
          className="inline-flex items-center gap-3 bg-[#C77DFF] hover:bg-[#d490ff] text-black font-bold text-lg rounded-xl px-10 py-5 transition-colors"
        >
          sven@ai-boutique.de
        </a>

        <a
          href="tel:+4917949706860"
          className="font-sans font-medium text-sm text-white/70 hover:text-[#C77DFF] transition-colors mt-8 inline-block"
        >
          +49 179 49 70 686
        </a>
      </div>
    </div>
  );
}
