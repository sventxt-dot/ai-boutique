import Image from "next/image";
import MonoLabel from "./mono-label";
import { Badge } from "@/components/ui/badge";

export default function AboutMe() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* Photo */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
        <Image
          src="/Sven-Guenzel-Creative-Cartel-LR-5870-2.jpg"
          alt="Sven Günzel — ai-boutique"
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Text */}
      <div>
        <MonoLabel>
          <span className="block mb-6">Über mich</span>
        </MonoLabel>

        <p className="text-base text-foreground/80 leading-relaxed mb-6 font-medium">
          Mit der ai-boutique bilde ich die Schnittstelle zwischen kreativer Markenführung und
          operativer Performance. Zentrale Fragen: Wie lassen sich kreative Leitideen maschinell
          skalieren? Und in welchen Geschäftsbereichen kann KI Ihr Geschäft effektiver machen?
        </p>

        <p className="text-base text-foreground/80 leading-relaxed mb-6 font-medium">
          Mehr als 20 Jahre Erfahrung in Markenpositionierung, Kampagnenentwicklung, Copywriting und Social
          Media geben mir einen praxisorientierten Blick auf die KI. Mit zertifizierter KI-Expertise
          verkaufe ich nicht „irgendwas mit Agenten" oder „irgendeinen Chatbot" – ich rede mit
          Ihnen, erkenne Potentiale und implementiere die richtigen Tools. Und wenn Sie in Ihrem Unternehmen bereits KI nutzen, helfe ich Ihnen
          gerne, diese Fähigkeiten sauber zu skalieren. Ohne Schatten-KI und Kollegen, die
          Firmenwissen ungefiltert ins Netz schmeißen.
        </p>

        <p className="font-sans font-medium text-sm text-foreground/60 leading-relaxed mb-4">
          RAG, Agentic Workflows, MCP-Protokoll.
        </p>

        <div className="flex gap-2 mb-6">
          <Badge variant="outline" className="text-xs border-[#C77DFF] text-[#C77DFF]">
            DSGVO-konform
          </Badge>
          <Badge variant="outline" className="text-xs border-[#C77DFF] text-[#C77DFF]">
            EU AI Act ready
          </Badge>
        </div>

        <p className="font-sans font-medium text-sm text-foreground/60 leading-relaxed">
          Ihre Daten bleiben auf eigenen Servern, und Ihr Team bedient die Tools völlig intuitiv ohne Umwege auf einem firmeninternen Dashboard. Versteckt hinter einem verschlüsselten Login.
        </p>
      </div>
    </div>
  );
}
