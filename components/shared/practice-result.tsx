"use client";

import { useState } from "react";
import Link from "next/link";
import MonoLabel from "./mono-label";

interface PracticeCase {
  title: string;
  intro: string;
  stages: { label: string; text: string }[];
  outro?: string;
  before: { value: string; unit: string };
  after: { value: string; unit: string };
  href: string;
}

const cases: PracticeCase[] = [
  {
    title: "LinkedIn-Content-Maschine",
    intro: "Agenten Teams suchen wöchentlich nach aktuellen Themen entlang vorab definierter Content-Container.",
    stages: [
      { label: "Stufe 1:", text: "Aus zehn relevanten Themenvorschlägen wird eines ausgewählt." },
      { label: "Stufe 2:", text: "Drei Captions werden nach Algorithmusmuster von CopyAgenten vorgeschlagen, eine ausgewählt." },
      { label: "Stufe 3:", text: "BildAgent schlägt aus Bild Archiv passendes Motiv vor und setzt Headline." },
    ],
    before: { value: "3 bis 4 Stunden", unit: "pro Woche" },
    after: { value: "10 bis 15 Minuten", unit: "pro Woche" },
    href: "/portfolio#linkedin-content",
  },
  {
    title: "Social Media Pipeline",
    intro: "Kontextbasierte Agenten erstellen in drei Freigabestufen Reels, die nach vorab definierten Reibungsmustern für Aufmerksamkeit sorgen.",
    stages: [
      { label: "Stufe 1:", text: "Aus mehreren Kontrast-Parametern den gewünschten Hook ableiten." },
      { label: "Stufe 2:", text: "Scriptfreigabe." },
      { label: "Stufe 3:", text: "Freigabe der generierten Bilder." },
      { label: "Stufe 4:", text: "Freigabe der Sprechertexte, die bei ElevenLabs erstellt wurden." },
      { label: "Stufe 5:", text: "Freigabe des fertigen Clips." },
    ],
    outro: "Ab hier übernimmt das Agententeam die Ausspielung und das Reporting.",
    before: { value: "4 Stunden", unit: "pro Clip" },
    after: { value: "15 bis 20 Minuten", unit: "pro Clip" },
    href: "/portfolio#reel-pipeline",
  },
];

// Proof right below the services: real projects with a before/after number, shown as a carousel
export default function PracticeResult() {
  const [active, setActive] = useState(0);
  const next = () => setActive((i) => (i + 1) % cases.length);

  return (
    <section
      aria-roledescription="Karussell"
      aria-label="Beispiele aus der Praxis"
      className="relative mt-20 rounded-[28px] bg-linear-to-br from-[#F1E8FB] to-[#E7D8F7] overflow-hidden"
    >
      {/* Only the active slide is rendered, so the tile takes its height instead of the tallest slide's */}
      {[cases[active]].map((item) => (
          <div
            key={item.title}
            role="group"
            aria-roledescription="Folie"
            aria-label={`${active + 1} von ${cases.length}`}
            className="pl-6 pr-20 pt-10 pb-14 md:pl-[5%] md:pr-[calc(5%+56px)] md:pt-14 md:pb-16 animate-in fade-in slide-in-from-right-8 duration-500 motion-reduce:animate-none"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[4.4445%] items-center">
              <div>
                <MonoLabel className="block mb-3">Aus der Praxis</MonoLabel>
                <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-5">{item.title}</h3>
                <p className="text-[17px] leading-relaxed font-medium text-[#34303A] mb-4">{item.intro}</p>
                <ol className="space-y-2 mb-4">
                  {item.stages.map((stage) => (
                    <li key={stage.label} className="text-[17px] leading-relaxed font-medium text-[#34303A]">
                      <strong className="font-bold text-foreground">{stage.label}</strong> {stage.text}
                    </li>
                  ))}
                </ol>
                {item.outro && (
                  <p className="text-[17px] leading-relaxed font-medium text-[#34303A] mb-4">{item.outro}</p>
                )}
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-accent-lila-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-lila"
                >
                  {/* DRAFT */}
                  Mehr im Portfolio <span aria-hidden="true">→</span>
                </Link>
              </div>

              <dl className="grid grid-cols-2 gap-4">
                <div className="rounded-[20px] bg-white/70 px-5 py-6">
                  <dt className="text-sm font-semibold text-[#5A4E68] mb-2">Vorher</dt>
                  <dd className="font-display text-3xl md:text-4xl leading-none text-foreground">{item.before.value}</dd>
                  <dd className="mt-2 text-sm font-medium text-[#5A4E68]">{item.before.unit}</dd>
                </div>
                <div className="rounded-[20px] bg-white px-5 py-6">
                  <dt className="text-sm font-semibold text-accent-lila-ink mb-2">Heute</dt>
                  <dd className="font-display text-3xl md:text-4xl leading-none text-accent-lila-ink">{item.after.value}</dd>
                  <dd className="mt-2 text-sm font-medium text-[#5A4E68]">{item.after.unit}</dd>
                </div>
              </dl>
            </div>
          </div>
      ))}

      {/* Arrow on the right edge; after the last example it starts over */}
      <button
        type="button"
        onClick={next}
        aria-label="Nächstes Beispiel"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex size-12 items-center justify-center rounded-full bg-white text-foreground shadow-md hover:bg-accent-lila transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-lila-ink cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {cases.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Beispiel ${i + 1}: ${item.title}`}
            aria-current={i === active}
            className="flex size-6 items-center justify-center cursor-pointer"
          >
            <span
              className={`block h-2.5 rounded-full transition-all ${i === active ? "w-7 bg-accent-lila-ink" : "w-2.5 bg-white ring-[1.5px] ring-accent-lila-ink/60"}`}
            />
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Beispiel ${active + 1} von ${cases.length}: ${cases[active].title}`}
      </p>
    </section>
  );
}
