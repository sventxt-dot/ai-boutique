import Link from "next/link";

export default function CtaClosing() {
  return (
    <div className="text-left space-y-6">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug break-words">
        Ich bringe KI auf den Punkt und automatisiere damit Geschäftsprozesse für Marketingteams und Agenturen.
      </h2>
      <p className="text-foreground/60 text-base">
        Als AI-Boutique will ich neben hilfreichen Tools vor allem eines liefern: eine persönliche und kompetente Beratung. Um das sicherzustellen, gehört es zu meiner Politik, maximal 5 Projekte parallel anzunehmen. <span className="text-accent-coral font-semibold">Aktuell frei: 3</span>. Stand Oktober 2026.
      </p>
      <Link
        href="/kontakt"
        className="inline-block w-full sm:w-auto text-center bg-accent-lila hover:bg-[#d490ff] text-black font-bold text-base rounded-xl px-5 sm:px-8 py-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-lila"
      >
        Erstgespräch anfragen
      </Link>
    </div>
  );
}
