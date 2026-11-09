import Image from "next/image";
import MonoLabel from "./mono-label";

const tagClass =
  "inline-flex items-center min-h-8 px-3.5 rounded-full border-[1.5px] border-accent-lila text-[13px] font-semibold text-accent-lila-ink";

export default function AboutMe() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 items-start">
      {/* Photo */}
      <figure className="relative aspect-[3/4] max-w-[520px] w-full rounded-[28px] overflow-hidden">
        <Image
          src="/images/redesign/portrait-streifen.jpg"
          alt="Porträt vor einer Wand mit lila Streifen"
          fill
          sizes="(min-width: 768px) 520px, 100vw"
          className="object-cover object-top"
        />
        {/* Dark fade so the name stays readable on any part of the photo */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-black/0"
        />
        <figcaption className="absolute left-6 bottom-6 md:left-8 md:bottom-8 font-display uppercase text-white text-4xl md:text-5xl leading-none tracking-wide">
          Sven Günzel
        </figcaption>
      </figure>

      {/* Text */}
      <div>
        <MonoLabel className="block mb-7">Über mich</MonoLabel>

        <p className="text-[17px] text-[#34303A] leading-[1.7] mb-7 font-medium">
          Mit der AI-Boutique verbinde ich kreative Markenführung mit KI-generierter Performance. Ihre Vorteile sind meine Praxiserfahrung auf Agentur- und Kundenseite plus mein Wissen, wo und wie KI im Marketing Zeit und Geld spart: von der Analyse über Produkt und Vertrieb bis zur konsistenten Kundenbetreuung auf allen Kanälen. Ich liefere Frontend-Tools oder benutze bestehende Abläufe, die Ihr Team jeden Tag benutzt.
        </p>
        {/* Same yellow marker as the claim in the hero */}
        <p className="text-[17px] text-foreground leading-[1.7] mb-7">
          <strong className="font-bold box-decoration-clone px-1 -mx-1 bg-[linear-gradient(transparent_52%,var(--accent-yellow)_52%,var(--accent-yellow)_92%,transparent_92%)]">
            Die AI-Boutique automatisiert Geschäftsprozesse für Marketingteams und Agenturen.
          </strong>
        </p>

        <div className="flex flex-wrap gap-2">
          <span className={tagClass}>DSGVO-konform</span>
          <span className={tagClass}>EU AI Act ready</span>
        </div>

      </div>
    </div>
  );
}
