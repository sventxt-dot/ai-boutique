import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/shared/section";
import MonoLabel from "@/components/shared/mono-label";
import BeforeAfter from "@/components/shared/before-after";
import ScreenGallery from "@/components/shared/screen-gallery";
import { aiPortfolio } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "KI-Systeme im Einsatz — Portfolio der KI-Agentur AI-Boutique",
  description: "Chatbots, Workflows und Content-Automation aus der Praxis: Arbeiten der KI-Agentur AI-Boutique für Marketingteams und Agenturen.",
  alternates: { canonical: "https://www.ai-boutique.de/portfolio" },
};

export default function PortfolioPage() {
  return (
    <Section className="pt-32 md:pt-40">
      <MonoLabel>
        <span className="block mb-4">Portfolio</span>
      </MonoLabel>
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">KI-Systeme im Einsatz</h1>
      {/* DRAFT */}
      <p className="text-lg text-white/60 max-w-2xl mb-10">
        Chatbots, Workflows und Content-Automation für Catering, Bäckerei und eigene Produkte.
      </p>

      <div className="grid gap-2 max-w-4xl">
        {aiPortfolio.map((item) => (
          <details
            key={item.id}
            id={item.id}
            className="group rounded-2xl bg-[#0f0f0f] border border-white/5 open:border-[#C77DFF]/30 target:border-[#C77DFF]/30"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 p-5">
              <div className="flex-1">
                <div className="font-display uppercase text-xl">{item.title}</div>
                <p className="text-sm text-white/60 mt-1">{item.teaser}</p>
              </div>
              {item.client && (
                <span className="hidden sm:block text-xs text-[#C77DFF]">{item.client}</span>
              )}
              <span aria-hidden="true" className="transition-transform group-open:rotate-90">→</span>
            </summary>
            <div className="px-5 pb-5">
              {item.compare && <BeforeAfter {...item.compare} />}
              {item.gallery && <ScreenGallery screens={item.gallery} />}
              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mb-4 rounded-xl border border-[#C77DFF] px-5 py-2.5 text-sm font-bold text-[#C77DFF] hover:bg-[#C77DFF]/10 transition-colors"
                >
                  {item.link.label} ↗
                </a>
              )}
              {item.steps.length > 0 && (
                <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mb-4">
                  {item.steps.map((step, i) => (
                    <li key={step} className="flex gap-3 rounded-xl border border-white/5 p-3 text-sm text-white/70">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#C77DFF] text-xs font-bold text-black">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </details>
        ))}
      </div>

      <Link
        href="/#potential-check"
        className="inline-block mt-10 bg-[#C77DFF] hover:bg-[#d490ff] text-black font-bold rounded-xl px-8 py-4 transition-colors"
      >
        Drei KI-Maßnahmen für mein Team ermitteln
      </Link>
    </Section>
  );
}
