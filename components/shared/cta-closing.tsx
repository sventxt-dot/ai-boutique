import Image from "next/image";
import Link from "next/link";

// Entry offer with fixed prices, placed next to the contact button so price and action sit together
const steps = [
  {
    lead: "Die perfekte Basis:",
    text: "Eine Makro-, Mikro- und Unternehmensanalyse, umgesetzt in 3 Tagen. Der Startpunkt für alle weiteren Marketing-Maßnahmen.",
    price: "Festpreis 850 Euro.",
  },
  {
    lead: "Danach:",
    text: "Ein Agentic Copywriter in Ihrer Corporate Tonalität mit allen Do's und Don'ts, umgesetzt in zwei Wochen.",
    price: "Festpreis 1.500 Euro.",
  },
];

export default function CtaClosing() {
  return (
    <>
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20 pt-12">
        <div className="max-w-[920px] text-left space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight break-words">
            Ich bringe KI auf den Punkt und automatisiere damit Geschäftsprozesse für Marketingteams und Agenturen.
          </h2>
          <p className="text-[#4A4650] text-[17px] leading-relaxed font-medium max-w-3xl">
            Als AI-Boutique will ich neben hilfreichen Tools vor allem eines liefern: eine persönliche und kompetente Beratung. Um das sicherzustellen, gehört es zu meiner Politik, maximal 5 Projekte parallel anzunehmen. <span className="text-accent-coral-ink font-bold">Aktuell frei: 2</span>. Stand November 2026.
          </p>
          <h3 className="pt-4 text-xl md:text-2xl font-bold leading-tight">
            Beispiel für einen sicheren Einstieg in das Agentic Marketing.
          </h3>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <li key={step.lead} className="rounded-[20px] bg-white px-6 pt-6 pb-7">
                <span className="block font-display text-sm tracking-[0.12em] text-accent-lila-ink mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[17px] leading-relaxed font-medium text-[#34303A]">
                  <strong className="font-bold text-foreground">{step.lead}</strong> {step.text}{" "}
                  <strong className="font-bold text-foreground">{step.price}</strong>
                </p>
              </li>
            ))}
          </ol>
          <p className="text-[17px] leading-relaxed font-semibold text-foreground">
            Nach der Analyse entscheiden Sie, ob es weitergeht.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-3 min-h-14 bg-accent-lila hover:bg-[#d490ff] text-black font-bold text-base rounded-full px-8 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-lila"
          >
            Erstgespräch anfragen <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* The page ground runs softly into the image */}
      <div className="relative -mt-14 h-[clamp(320px,46vw,660px)]">
        <Image
          src="/images/redesign/abschluss-tasse.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[55%] bg-linear-to-b from-background via-background/75 to-background/0"
        />
      </div>
    </>
  );
}
