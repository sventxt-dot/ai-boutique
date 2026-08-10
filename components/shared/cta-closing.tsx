import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaClosing() {
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
        Kreative Energie trifft auf KI-Systeme,<br className="hidden md:block" /> die sie skalieren.
      </h2>
      <p className="text-foreground/60 text-lg">
        Erstes Gespräch. 30 Minuten. Kostenlos. Direkt mit Sven.
      </p>
      <Link href="/kontakt">
        <Button size="lg" className="bg-accent-lila text-[#0a0a0a] hover:bg-accent-lila/80 px-10">
          Termin buchen
        </Button>
      </Link>
    </div>
  );
}
