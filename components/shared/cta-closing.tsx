import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaClosing() {
  return (
    <div className="text-left space-y-6">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug break-words">
        Ich bringe KI auf den Punkt und automatisiere damit Geschäftsprozesse für Marketingteams und Agenturen.
      </h2>
      <p className="text-foreground/60 text-base">
        Als AI-Boutique will ich neben hilfreichen Tools vor allem eines liefern: eine persönliche und kompetente Beratung. Um das sicherzustellen, gehört es zu meiner Politik, maximal 5 Projekte parallel anzunehmen. Aktuell frei: 3. Stand Oktober 2026.
      </p>
      <Link href="/kontakt">
        <Button size="lg" className="bg-accent-lila text-[#0a0a0a] hover:bg-accent-lila/80 px-10">
          Erstgespräch anfragen
        </Button>
      </Link>
    </div>
  );
}
