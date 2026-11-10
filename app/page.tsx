import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/shared/hero";
import Section from "@/components/shared/section";
import MonoLabel from "@/components/shared/mono-label";
import ServicesGrid from "@/components/shared/services-grid";
import ScaleLetters from "@/components/shared/scale-letters";
import PotentialCheck from "@/components/shared/potential-check";
import AboutMe from "@/components/shared/about-me";
import CtaClosing from "@/components/shared/cta-closing";

export const metadata: Metadata = {
  // absolute: the home title already ends with the brand, so the layout template is skipped
  title: { absolute: "KI-Agentur für Agentic Marketing | AI-Boutique" },
  description: "Die AI-Boutique erstellt Kommunikationskonzepte und implementiert KI-gestützte Prozesse für Marketingteams und Agenturen. Mehr als 20 Jahre Kampagnenerfahrung.",
  alternates: { canonical: "https://www.ai-boutique.de" }
}

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="AI-Boutique // Agentic Marketing mit Kreativer Intelligenz"
        image="/images/redesign/hero-sofa-lila.jpg"
        headline={
          <>
            <span className="block font-display uppercase text-[clamp(34px,10vw,120px)] md:text-[clamp(48px,8vw,120px)] leading-none">
              Agentic Marketing
            </span>
            <span className="block font-display uppercase text-[clamp(34px,10vw,120px)] md:text-[clamp(48px,8vw,120px)] leading-none">
              vom Kreativdirektor
            </span>
            <span className="block mt-6 font-sans font-semibold text-[clamp(22px,2.4vw,32px)] leading-[1.3]">
              Für Marken, die markant bleiben wollen – mit KI.
            </span>
          </>
        }
        intro={[
          <span key="pain" className="font-semibold text-foreground">
            Aus 20 Jahren Markenpraxis weiß ich, wo im Marketing der Schuh drückt:
            Kampagnen adaptieren, Content deklinieren, Produkttexte schreiben,
            Mailings verfassen, Analysen, Recherche, Reportings. Unnötige Stunden Fleißarbeit.
          </span>,
          <>
            Mein Ansatz, um Ihrem Team wieder Luft für die strategischen Aufgaben
            im Marketing zu geben:{" "}
            <Link href="/agentic-marketing" className="underline decoration-accent-lila decoration-2 underline-offset-4 hover:text-accent-lila-ink">
              Agentic Marketing
            </Link>.
          </>,
          <strong
            key="claim"
            className="font-bold text-foreground box-decoration-clone px-1 -mx-1 bg-[linear-gradient(transparent_52%,var(--accent-yellow)_52%,var(--accent-yellow)_92%,transparent_92%)]"
          >
            On Brand. On Purpose. On Point.
          </strong>,
        ]}
        cta={{ label: "Drei Agentic Marketing-Maßnahmen ermitteln", href: "#potential-check" }}
        badges={[
          { src: "/EU-Hosting_Logo.png", alt: "100 % EU-Hosting" },
          { src: "/Siegel_MMAI.png", alt: "Zertifiziert MMAI – Master Management with AI" },
        ]}
      />

      {/* Services */}
      <Section className="pt-0 md:pt-0" id="leistungen">
        <ServicesGrid />
      </Section>

      {/* S.C.A.L.E. Framework */}
      <Section className="bg-linear-to-b from-background via-[#F1E8FB] to-background">
        <div className="mb-12 md:mb-14">
          <MonoLabel className="block mb-4">Framework</MonoLabel>
          <h2 className="text-3xl md:text-4xl font-bold font-sans leading-tight mb-5">
            Mit System zum passenden Tool.
          </h2>
          <p className="text-lg leading-relaxed font-medium text-[#34303A] max-w-2xl">
            KI hilft nur dort, wo sie zu Ihren Abläufen und Zielen passt. Mein S.C.A.L.E.-Framework schafft Klarheit in 5 Schritten.
          </p>
        </div>
        <ScaleLetters />
      </Section>

      {/* AI Potential Check */}
      <Section id="potential-check" className="scroll-mt-20">
        <PotentialCheck />
      </Section>

      {/* About Me */}
      <Section id="ueber-mich" className="bg-linear-to-b from-background via-[#F3ECFB] to-background">
        <AboutMe />
      </Section>

      {/* CTA Closing */}
      <section id="kontakt" className="relative w-full overflow-hidden">
        <CtaClosing />
      </section>
    </>
  );
}
