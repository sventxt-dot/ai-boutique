import type { Metadata } from "next";
import Hero from "@/components/shared/hero";
import Section from "@/components/shared/section";
import MonoLabel from "@/components/shared/mono-label";
import ServicesGrid from "@/components/shared/services-grid";
import ScaleLetters from "@/components/shared/scale-letters";
import PotentialCheck from "@/components/shared/potential-check";
import AboutMe from "@/components/shared/about-me";
import CtaClosing from "@/components/shared/cta-closing";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "KI Beratung für KMU — Künstliche Intelligenz für kleine Unternehmen",
  description: "ai-boutique bietet strategische KI-Implementierung, Agentic Marketing und KI Beratung für KMU und Mittelstand. Jetzt kostenlosen KI-Potential-Check starten.",
  alternates: { canonical: "https://www.ai-boutique.de" }
}

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="AI-Boutique // Agentic Marketing mit Kreativer Intelligenz"
        headline={
          <>
            <span className="@container block max-w-3xl whitespace-nowrap">
              <span className="block text-[13.49cqw] leading-[1.1]">
                Agentic Marketing
              </span>
              <span className="block text-[12.04cqw] leading-[1.1]">
                vom Kreativdirektor
              </span>
              <span className="block mt-[2.5cqw] text-[5.2cqw] leading-[1.25] normal-case">
                Für Marken, die markant bleiben wollen – mit KI.
              </span>
            </span>
          </>
        }
        subline={
          <>
            <span className="block">
              Aus 20 Jahren Markenpraxis weiß ich, wo im Marketing der Schuh drückt:
              Kampagnen adaptieren, Content deklinieren, Produkttexte schreiben,
              Mailings verfassen, Analysen, Recherche, Reportings. Die Liste ist lang.
            </span>
            <span className="block mt-4">
              Mein Ansatz, um Ihrem Team wieder Luft für die strategischen Aufgaben
              im Marketing zu geben: Agentic Marketing.
            </span>
            <span className="block mt-4">
              On Brand. On Purpose. On Point.
            </span>
          </>
        }
        cta={{ label: "Agentic Marketing Potential-Check", href: "#potential-check" }}
        badges={[
          { src: "/EU-Hosting_Logo.png", alt: "100 % EU-Hosting" },
          { src: "/Siegel_MMAI.png", alt: "Zertifiziert MMAI – Master Management with AI" },
        ]}
      />

      {/* Services */}
      <Section className="pt-8 md:pt-12" id="leistungen">
        <ServicesGrid />
      </Section>

      <Separator className="bg-foreground/5" />

      {/* S.C.A.L.E. Framework */}
      <Section>
        <div className="mb-12 md:mb-16">
          <MonoLabel><span className="block mb-4">Framework</span></MonoLabel>
          {/* DRAFT */}
          <h2 className="text-2xl md:text-3xl font-bold font-sans text-white leading-snug mb-6">
            Mit dem S.C.A.L.E.-Framework zum effektiven KI-Tool.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            KI-Tools helfen nur dort, wo sie zu Ihren Abläufen passen. Diese zu lokalisieren und systematisch zu hinterfragen ist für mich ein fünfstufiger Prozess, der KI-Anwendungen unverzichtbar macht.
          </p>
        </div>
        <ScaleLetters />
      </Section>

      <Separator className="bg-foreground/5" />

      {/* AI Potential Check */}
      <Section id="potential-check">
        <PotentialCheck />
      </Section>

      <Separator className="bg-foreground/5" />

      {/* About Me */}
      <Section id="ueber-mich">
        <AboutMe />
      </Section>

      <Separator className="bg-foreground/5" />

      {/* CTA Closing */}
      <Section id="kontakt">
        <CtaClosing />
      </Section>
    </>
  );
}
