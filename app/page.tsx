import type { Metadata } from "next";
import VideoHero from "@/components/shared/video-hero";
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
      <VideoHero
        videoSrc="/video/hero-placeholder.mp4"
        posterSrc="/images/hero-poster.jpg"
        eyebrow="AI-Boutique.de — Kreative Intelligenz"
        headline={
          <>
            Was Ihr Team täglich wiederholt, läuft ab morgen automatisch.
          </>
        }
        subline={
          <>
            Ich entwickle KI-Lösungen für Aufgaben, die Marketingteams und
            Agenturen unnötig Zeit kosten: von der Wettbewerbsanalyse bis zum
            fertigen Funnel. Markenkonform und nur mit Ihrer Freigabe. Dafür
            sorge ich persönlich, mit über 20 Jahren Marketing- und fünf
            Jahren KI-Erfahrung.
          </>
        }
        cta={{ label: "Drei KI-Maßnahmen ermitteln", href: "#potential-check" }}
        badges={[
          { src: "/EU-Hosting_Logo.png", alt: "100 % EU-Hosting" },
          { src: "/Siegel_MMAI.png", alt: "Zertifiziert MMAI – Master Management with AI" },
        ]}
      />

      {/* Services Bento Grid */}
      <Section className="pt-8 md:pt-12" id="leistungen">
        <ServicesGrid />
      </Section>

      <Separator className="bg-foreground/5" />

      {/* S.C.A.L.E. Framework */}
      <Section>
        <div className="mb-12 md:mb-16">
          <MonoLabel><span className="block mb-4">Framework</span></MonoLabel>
          <p className="text-lg text-muted-foreground max-w-2xl">
            KI hilft nur dort, wo sie zu Ihren Abläufen passt. Deshalb gehe ich in fünf Schritten vor, und Sie wissen bei jedem, was als Nächstes passiert.
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
