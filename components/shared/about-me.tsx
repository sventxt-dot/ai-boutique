import Image from "next/image";
import MonoLabel from "./mono-label";

const tagClass =
  "inline-flex items-center min-h-8 px-3.5 rounded-full border-[1.5px] border-accent-lila text-[13px] font-semibold text-accent-lila-ink";

export default function AboutMe() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-20 items-start">
      {/* Photo */}
      <div className="relative aspect-[3/4] max-w-[520px] w-full rounded-[28px] overflow-hidden">
        <Image
          src="/images/redesign/portrait-streifen.jpg"
          alt="Sven Günzel — ai-boutique"
          fill
          sizes="(min-width: 768px) 520px, 100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Text */}
      <div>
        <MonoLabel className="block mb-7">Über mich</MonoLabel>

        <p className="text-[17px] text-[#34303A] leading-[1.7] mb-6 font-medium">
          Mit der ai-boutique bilde ich die Schnittstelle zwischen kreativer Markenführung und
          operativer Performance. Zentrale Fragen: Wie lassen sich kreative Leitideen maschinell
          skalieren? Und in welchen Geschäftsbereichen kann KI Ihr Geschäft effektiver machen?
        </p>

        <p className="text-[17px] text-[#34303A] leading-[1.7] mb-7 font-medium">
          Mehr als 20 Jahre Erfahrung in Markenpositionierung, Kampagnenentwicklung, Copywriting und Social
          Media geben mir einen praxisorientierten Blick auf die KI. Mit zertifizierter KI-Expertise
          verkaufe ich nicht „irgendwas mit Agenten" oder „irgendeinen Chatbot" – ich rede mit
          Ihnen, erkenne Potentiale und implementiere die richtigen Tools. Und wenn Sie in Ihrem Unternehmen bereits KI nutzen, helfe ich Ihnen
          gerne, diese Fähigkeiten sauber zu skalieren. Ohne Schatten-KI und Kollegen, die
          Firmenwissen ungefiltert ins Netz schmeißen.
        </p>

        <p className="font-sans font-semibold text-sm text-[#5A4E68] leading-relaxed mb-4">
          RAG, Agentic Workflows, MCP-Protokoll.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className={tagClass}>DSGVO-konform</span>
          <span className={tagClass}>EU AI Act ready</span>
        </div>

        <p className="font-sans font-medium text-sm text-[#5A4E68] leading-relaxed">
          Ihre Daten bleiben auf eigenen Servern, und Ihr Team bedient die Tools völlig intuitiv ohne Umwege auf einem firmeninternen Dashboard. Versteckt hinter einem verschlüsselten Login.
        </p>
      </div>
    </div>
  );
}
