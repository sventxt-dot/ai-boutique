import VideoHero from "@/components/shared/video-hero";
import Section from "@/components/shared/section";
import MonoLabel from "@/components/shared/mono-label";
import ServicesGrid from "@/components/shared/services-grid";
import ScaleLetters from "@/components/shared/scale-letters";
import PotentialCheck from "@/components/shared/potential-check";
import AboutMe from "@/components/shared/about-me";
import CtaClosing from "@/components/shared/cta-closing";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <VideoHero
        videoSrc="/video/hero-placeholder.mp4"
        posterSrc="/images/hero-poster.jpg"
        eyebrow="AI-Boutique.de — Marketing & AI"
        headline={
          <>
            <span className="block">Kreative Intelligenz</span>
            <span className="block">von der Idee bis zur Auslieferung.</span>
          </>
        }
        subline={
          <>
            Mehr als 20 Jahre Kampagnenentwicklung und fünf Jahre
            Erfahrung im Umgang mit KI.
            <br /><br />
            Heute ergänze ich dieses Wissen mit zertifizierter
            KI-Expertise, um Lösungen zu entwickeln, die Marketing
            skalieren und Geschäftsprozesse optimieren.
          </>
        }
        cta={{ label: "Jetzt direkt zum AI-Potential-Check", href: "#potential-check" }}
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
            Künstliche Intelligenz ist per se enorm dumm. Mit dem S. C. A. L. E. Prinzip implementieren wir dieses Potential smart, scharfsinnig und gewinnbringend in Ihre Prozesse.
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
