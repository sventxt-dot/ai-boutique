import type { Metadata } from "next";
import Section from "@/components/shared/section";
import MonoLabel from "@/components/shared/mono-label";
import PracticeResult from "@/components/shared/practice-result";
import ScaleLetters from "@/components/shared/scale-letters";
import PotentialCheck from "@/components/shared/potential-check";
import CtaClosing from "@/components/shared/cta-closing";

const URL = "https://www.ai-boutique.de/agentic-marketing";

export const metadata: Metadata = {
  title: { absolute: "Agentic Marketing: KI-Agenten im Marketing | AI-Boutique" },
  description:
    "Beim Agentic Marketing übernehmen KI-Agenten Recherche, Analysen und Content-Produktion. Ihr Team gibt jeden Schritt frei. Beispiele aus fünf Projekten.",
  alternates: { canonical: URL },
};

const workForms = [
  {
    name: "Assistenz.",
    text: "Ein Prompt, ein Entwurf. Das reicht für einen einzelnen Text. Am Ablauf im Team ändert es nichts.",
  },
  {
    name: "Workflow.",
    text: "Feste Regeln in fester Reihenfolge. Jede neue Anfrage landet zum Beispiel mit Branche und Budget im CRM. Workflows passen überall dort, wo jeder Schritt vorher feststeht.",
  },
  {
    name: "Agent.",
    text: "Ein Ziel und Spielraum für den Weg dorthin. Ein Recherche-Agent entscheidet selbst, welche Quellen er für eine Wettbewerbsanalyse liest und wann er genug weiß.",
  },
];

const principles = [
  {
    title: "Eine Kontextbasis für alle Agenten.",
    text: "Jedes Agententeam greift auf einen gemeinsamen Workspace zu. Darin liegen Ihre Marke, Ihre Tonalität mit allen Do's und Don'ts, Ihre Zielgruppen, Ihre Produkte und die Ergebnisse der Analysen. Der Copywriter schreibt deshalb mit demselben Wissen wie der Chatbot antwortet.",
  },
  {
    title: "Freigaben an jeder wichtigen Stelle.",
    text: "Agenten liefern Vorschläge. Was erscheint, entscheidet Ihr Team. In der Social Media Pipeline geht jedes Reel durch vier Freigaben, vom Script bis zum fertigen Clip.",
  },
  {
    title: "Gehostet in der EU.",
    text: "Die Systeme laufen auf Servern in der EU und sind DSGVO-konform eingerichtet. Für sensible Daten baue ich ein Firmenmodell auf Ihrer eigenen Infrastruktur.",
  },
  {
    title: "Die Auswahl macht den Unterschied.",
    text: "Die Agenten erledigen die Fleißarbeit. Welche Aufgaben sie bekommen und worauf es in Ihrer Kommunikation ankommt, legen wir gemeinsam fest. Dafür bringe ich mehr als 20 Jahre Kampagnenentwicklung mit, unter anderem CRM-Entwicklung für BMW und MINI und Kampagnen für Media Markt.",
  },
];

// Rendered on the page and as FAQPage structured data, so both always match
const faq = [
  {
    q: "Was unterscheidet Agentic Marketing von ChatGPT?",
    a: "ChatGPT beantwortet einen Prompt. Ein Agent arbeitet eine Aufgabe in mehreren Schritten ab, nutzt dafür Werkzeuge wie die Websuche oder Ihr CRM und kennt den Kontext Ihrer Marke. Er arbeitet weiter, bis das Ziel erreicht ist oder eine Freigabe ansteht.",
  },
  {
    q: "Ersetzt Agentic Marketing mein Marketingteam?",
    a: "Die Agenten übernehmen Recherche, Varianten und Reportings. Ideen, Kundenkontakt und Entscheidungen bleiben im Team. Bei der LinkedIn-Content-Maschine sank der Aufwand von 3 bis 4 Stunden auf 10 bis 15 Minuten pro Woche. Jeden Post gebe ich weiterhin selbst frei.",
  },
  {
    q: "Was kostet der Einstieg?",
    a: "Die Makro-, Mikro- und Unternehmensanalyse kostet 850 Euro zum Festpreis und liegt nach drei Tagen vor. Ein Agentic Copywriter in Ihrer Tonalität kostet 1.500 Euro zum Festpreis und arbeitet nach zwei Wochen. Größere Systeme kalkuliere ich nach dem Erstgespräch.",
  },
  {
    q: "Wo liegen meine Daten?",
    a: "Auf Servern in der EU. Die Systeme sind DSGVO-konform eingerichtet. Für sensible Daten baue ich ein Firmenmodell auf Ihrer eigenen Infrastruktur.",
  },
  {
    q: "Für wen eignet sich Agentic Marketing?",
    a: "Für Marketingteams und Agenturen, die viele Inhalte für mehrere Kanäle produzieren. Und für Unternehmen, deren Fachwissen in wenigen Köpfen steckt. Umgesetzt habe ich es unter anderem für einen Catering-Betrieb und eine Bäckerei.",
  },
  {
    q: "Wie schnell arbeitet der erste Agent?",
    a: "Die Analysen liegen nach drei Tagen vor, ein Agentic Copywriter arbeitet nach zwei Wochen.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URL}#faq`,
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const bodyText = "text-lg leading-relaxed font-medium text-[#34303A]";

export default function AgenticMarketingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16">
        <MonoLabel className="block mb-6">Agentic Marketing</MonoLabel>
        <h1 className="font-display uppercase text-[clamp(44px,8vw,110px)] leading-none mb-8">
          Agentic Marketing
        </h1>
        <p className="text-[clamp(20px,2.2vw,28px)] leading-[1.35] font-semibold max-w-3xl">
          KI-Agenten übernehmen Recherche, Analysen und Content-Produktion. Ihr Team gibt jeden Schritt frei.
        </p>
      </Section>

      {/* Definition and the three work forms */}
      <Section className="pt-0 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">Was Agentic Marketing bedeutet</h2>
            <p className={bodyText}>
              Beim Agentic Marketing arbeiten KI-Agenten an den Aufgaben, die im Marketing die meiste Zeit kosten:
              Kampagnen adaptieren, Content deklinieren, Analysen erstellen, Reportings bauen. Ein Agent bekommt ein
              Ziel und sucht sich die Schritte dorthin selbst. Mehrere Agenten bilden ein Team und greifen auf dieselbe
              Kontextbasis zu: Marke, Tonalität, Zielgruppen und Produkte. Was veröffentlicht wird, entscheidet ein Mensch.
            </p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">Drei Arbeitsformen von KI im Marketing</h2>
            <ul className="space-y-4">
              {workForms.map((form) => (
                <li key={form.name} className={bodyText}>
                  <strong className="font-bold text-foreground">{form.name}</strong> {form.text}
                </li>
              ))}
            </ul>
            <p className={`${bodyText} mt-4`}>
              In meinen Projekten arbeiten alle drei Formen zusammen. Spielraum bekommen Agenten nur dort, wo die
              Aufgabe ihn braucht.
            </p>
          </div>
        </div>
      </Section>

      {/* How the agents work at AI-Boutique */}
      <Section className="bg-linear-to-b from-background via-[#F1E8FB] to-background">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-10">So arbeiten Agenten bei der AI-Boutique</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {principles.map((item) => (
            <div key={item.title} className="rounded-[20px] bg-white px-6 pt-7 pb-8">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-[17px] leading-relaxed font-medium text-[#34303A]">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Practice cases */}
      <Section className="pt-8 md:pt-12">
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">Agentic Marketing in der Praxis</h2>
        <p className={bodyText}>Fünf Systeme aus meinen Projekten, mit dem Aufwand vorher und heute.</p>
        <PracticeResult />
      </Section>

      {/* Entry */}
      <Section className="bg-linear-to-b from-background via-[#F1E8FB] to-background">
        <div className="mb-12 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">Der Einstieg</h2>
          <p className={`${bodyText} max-w-2xl`}>
            Die meisten Projekte beginnen mit den Analysen. Sie liefern das Wissen, mit dem alle weiteren Agenten arbeiten.
          </p>
        </div>
        <ScaleLetters />
      </Section>

      {/* FAQ */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-10">Häufige Fragen zu Agentic Marketing</h2>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-6xl">
          {faq.map((item) => (
            <div key={item.q}>
              <dt className="text-xl font-bold mb-3">{item.q}</dt>
              <dd className="text-[17px] leading-relaxed font-medium text-[#34303A]">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Check, then the entry offer with the contact button */}
      <Section id="potential-check" className="scroll-mt-20">
        <PotentialCheck />
      </Section>

      <section id="kontakt" className="relative w-full overflow-hidden">
        <CtaClosing />
      </section>
    </>
  );
}
