"use client";

import { useState } from "react";
import Image from "next/image";
import BeforeAfter from "./before-after";
import MonoLabel from "./mono-label";

interface PracticeCase {
  title: string;
  intro: string;
  stages: { label: string; text: string }[];
  outro?: string;
  // Either a before/after number or, where there is no time saving, a live demo, an image comparison or a short flow
  before?: { value: string; unit: string };
  after?: { value: string; unit: string };
  demo?: { image: string; alt: string; href: string; label: string };
  compare?: { before: string; after: string; beforeAlt: string; afterAlt: string };
  flow?: string[];
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
  },
  {
    title: "Social Media Pipeline",
    intro: "Kontextbasierte Agenten erstellen in vier Freigabestufen Reels, die nach vorab definierten Reibungsmustern für aufmerksamkeitsstarke Scrollstopper sorgen.",
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
  },
  {
    title: "Fünf tiefgreifende Analysen",
    intro: "Bevor ein Agent den ersten Text schreibt, wertet ein starkes Agententeam Umfeld, Markt, Unternehmen, Wettbewerb und Kundenstimmen aus.",
    stages: [
      { label: "Makroanalyse:", text: "Entwicklungen aus Gesellschaft, Technik, Wirtschaft und Recht, die Ihren Markt in den nächsten Jahren verändern." },
      { label: "Mikroanalyse:", text: "Marktgröße, Preisniveau und die Anbieter, gegen die Sie antreten." },
      { label: "Unternehmensanalyse:", text: "Ihre Stärken und Schwächen, jeweils im Vergleich mit dem stärksten Wettbewerber." },
      { label: "Wettbewerbsanalyse:", text: "Mit welchen Botschaften und über welche Kanäle Ihre Wettbewerber Kunden gewinnen." },
      { label: "Review Mining:", text: "Öffentliche Bewertungen, getrennt in Angriffspunkte für Ihr Marketing und Baustellen im eigenen Haus." },
    ],
    outro: "Agenten recherchieren zum Teil mehrere Stunden für stichhaltige Ergebnisse.",
    before: { value: "1 bis 2 Tage", unit: "pro Analyse" },
    after: { value: "1 bis 2 Stunden", unit: "inklusive Auswertung" },
  },
  {
    title: "Chatbot",
    intro: "In der App einer Bäckerei berät der Brotbot zu Sortiment, Brot, Teig, Zutaten, Lagerung und Verträglichkeit im Allgemeinen und gibt Tipps und Rezepte, was man aus alten Broten und Brezen noch machen kann. Easteregg: Er erzählt auch Bäckerwitze.",
    stages: [
      { label: "Stack:", text: "Das gesamte Wissen ist in einem RAG-Container gegliedert und greift je nach Anfrage auf die richtige Quelle zu." },
      { label: "Pflege:", text: "Neue Produkte, Mittagstisch und neues Wissen trägt das Team über ein Frontend ein. Der Brotbot ist so immer auf aktuellem Stand." },
    ],
    outro: "Die Kunden stellen ihre Fragen in der App der Bäckerei und bleiben dort.",
    demo: {
      image: "/images/portfolio/brotbot-thumb.png",
      alt: "Brotbot, der Chatbot der Bäckerei",
      href: "https://brotbot.bot-boutique.com/",
      label: "Brotbot ausprobieren",
    },
  },
  {
    title: "Location Designer",
    intro: "Ein Event-Caterer präsentiert seinen Interessenten mit dem Location Designer fertige Event-Locations. Das Team wählt in der App eine von 19 Eventlocations aus, stellt Möbel aus dem eigenen Mietbestand zusammen und bekommt in Sekunden eine fotorealistische Visualisierung des Raums. Auf Knopfdruck gibt's dazu ein kurzes Video mit Kamerafahrt durch die fertig eingerichtete Location.",
    stages: [
      { label: "Stack:", text: "Die KI verwandelt echte Locations und echte Möbel in eingerichtete Event-Venues. Alles einfach auf einer Webanwendung zu bedienen, ohne Architektur, Licht und Perspektive zu verfälschen." },
    ],
    outro: "Der Kunde sieht sein Event, bevor ein einziger Tisch geschleppt wurde.",
    compare: {
      before: "/images/portfolio/venue-visualizer-vorher.png",
      after: "/images/portfolio/venue-visualizer-nachher.png",
      beforeAlt: "Location Designer: Frontend mit dem Foto einer leeren Halle und der Möbelauswahl",
      afterAlt: "Location Designer: Ergebnis, die eingerichtete Halle mit Stehtischen für das Angebot",
    },
  },
  {
    title: "Kampagnensteuerung",
    intro: "Agenten prüfen jeden Morgen Budgets, Klickpreise und ROAS in Google, Meta und LinkedIn. Weicht eine Kampagne vom Plan ab, schlagen sie neue Gebote, Zielgruppen oder eine andere Verteilung des Budgets vor, jeweils mit Begründung.",
    stages: [
      { label: "Freigabe:", text: "Ihr Team entscheidet über jeden Vorschlag." },
      { label: "Umsetzung:", text: "Die Agenten setzen die Änderung über die Schnittstellen der Plattformen um und legen neue Varianten der Anzeigen direkt im Werbekonto an." },
    ],
    outro: "Die Klickarbeit in jeder einzelnen Oberfläche fällt weg.",
    flow: ["Werbekonten lesen", "Abweichungen erkennen", "Anpassung vorschlagen", "Team gibt frei", "Agenten setzen um und berichten"],
  },
  {
    title: "Kundenstrecken",
    intro: "Agenten lesen Signale aus Shop, CRM und Newsletter. Für jedes Signal startet die passende Strecke, mit einer Nachricht in der Tonalität Ihrer Marke.",
    stages: [
      { label: "Warenkorb abgebrochen:", text: "Erinnerung mit dem Produkt und einer Antwort auf die häufigste Kaufhürde." },
      { label: "Lange nicht bestellt:", text: "Persönliches Angebot zur Rückgewinnung." },
      { label: "Thema mehrfach gelesen:", text: "Passender Inhalt und das Produkt, das dazu gehört." },
      { label: "Abwanderung droht:", text: "Ein Agent erkennt das steigende Risiko und spielt ein Angebot aus, bevor der Kunde kündigt." },
    ],
    outro: "Welche Strecken es gibt, legt Ihr Team fest. Den Zeitpunkt wählt der Agent.",
    flow: ["Signal erkennen", "Strecke wählen", "Nachricht in Ihrer Tonalität", "Zeitpunkt bestimmen", "Ausspielen und auswerten"],
  },
  {
    title: "Performance-Diagnose",
    intro: "Die Conversions im Checkout sind heute eingebrochen. Ihr Team fragt den Insight-Agenten nach dem Grund.",
    stages: [
      { label: "Abgleich:", text: "Er gleicht die Daten aus CRM, Google Analytics und den Werbekonten ab." },
      { label: "Ursache:", text: "Er findet die Ursache und belegt sie mit Zahlen." },
      { label: "Lösung:", text: "Er schlägt vor, was Ihr Team jetzt ändern sollte." },
    ],
    outro: "Die Antwort kommt im Chat. Ihr Team muss dafür kein Dashboard öffnen.",
    flow: ["Frage im Chat", "Daten abgleichen", "Ursache belegen", "Lösung vorschlagen", "Team entscheidet"],
  },
];

// Proof right below the services: practice cases with a before/after number, demo, comparison or flow, shown as a carousel
export default function PracticeResult() {
  const [active, setActive] = useState(0);
  const next = () => setActive((i) => (i + 1) % cases.length);

  return (
    <section
      aria-roledescription="Karussell"
      id="praxis"
      aria-label="Beispiele aus der Praxis"
      className="scroll-mt-28 relative mt-20 rounded-[28px] bg-linear-to-br from-[#F1E8FB] to-[#E7D8F7] overflow-hidden"
    >
      {/* Every slide is in the HTML so search engines and AI crawlers read all cases;
          inactive slides are hidden, so the tile takes the active slide's height */}
      {cases.map((item, i) => (
          <div
            key={item.title}
            hidden={i !== active}
            role="group"
            aria-roledescription="Folie"
            aria-label={`${i + 1} von ${cases.length}`}
            className="px-6 pt-10 pb-24 md:pl-[5%] md:pr-[calc(5%+56px)] md:pt-14 md:pb-16 animate-in fade-in slide-in-from-right-8 duration-500 motion-reduce:animate-none"
          >
            {/* The image comparison needs a wide column; numbers and demo fit a narrow one */}
            <div className={`grid grid-cols-1 gap-10 lg:gap-16 items-center ${item.compare ? "lg:grid-cols-2" : "lg:grid-cols-[minmax(0,1fr)_17rem]"}`}>
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
              </div>

              {item.compare ? (
                <BeforeAfter {...item.compare} subtle />
              ) : item.demo ? (
                <div className="flex flex-col items-center gap-6 rounded-[20px] bg-white px-6 py-8 md:py-10">
                  <Image src={item.demo.image} alt={item.demo.alt} width={160} height={160} className="size-32 md:size-40 rounded-3xl" />
                  <a
                    href={item.demo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-white hover:bg-accent-lila-ink transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-lila"
                  >
                    {item.demo.label} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              ) : item.flow ? (
                <ol className="rounded-[20px] bg-white px-5 py-6 md:px-6 md:py-7 space-y-3">
                  {item.flow.map((step, n) => (
                    <li key={step} className="flex items-baseline gap-3 text-[15px] font-semibold leading-snug text-foreground">
                      <span className="font-display text-xl text-accent-lila-ink">{String(n + 1).padStart(2, "0")}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <dl className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
                  <div className="min-w-0 rounded-[20px] bg-white/70 px-4 py-5 md:px-5 md:py-6">
                    <dt className="text-sm font-semibold text-[#5A4E68] mb-2">Vorher</dt>
                    <dd className="font-display text-2xl sm:text-3xl md:text-4xl leading-[1.05] text-foreground break-words">{item.before?.value}</dd>
                    <dd className="mt-2 text-sm font-medium text-[#5A4E68]">{item.before?.unit}</dd>
                  </div>
                  <div className="min-w-0 rounded-[20px] bg-white px-4 py-5 md:px-5 md:py-6">
                    <dt className="text-sm font-semibold text-accent-lila-ink mb-2">Heute</dt>
                    <dd className="font-display text-2xl sm:text-3xl md:text-4xl leading-[1.05] text-accent-lila-ink break-words">{item.after?.value}</dd>
                    <dd className="mt-2 text-sm font-medium text-[#5A4E68]">{item.after?.unit}</dd>
                  </div>
                </dl>
              )}
            </div>
          </div>
      ))}

      {/* Arrow on the right edge; after the last example it starts over */}
      <button
        type="button"
        onClick={next}
        aria-label="Nächstes Beispiel"
        className="absolute right-4 bottom-4 md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2 flex size-12 items-center justify-center rounded-full bg-white text-foreground shadow-md hover:bg-accent-lila transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-lila-ink cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="absolute bottom-7 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
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
