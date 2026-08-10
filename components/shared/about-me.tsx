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

        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          Mit der ai-boutique bilde ich die Schnittstelle zwischen kreativer Markenführung und
          operativer Performance. Zentrale Fragen: Wie lassen sich kreative Leitideen maschinell
          skalieren? Und in welchen Geschäftsbereichen kann KI Ihr Geschäft effektiver machen?
        </p>

        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          25 Jahre Erfahrung in Markenpositionierung, Kampagnenentwicklung, Copywriting und Social
          Media geben mir einen praxisorientierten Blick auf die KI. Ich verkaufe nicht „irgendwas
          mit Agenten" oder „irgendeinen Chatbot" – ich erkenne Potentiale, berate Sie und setze
          die richtigen Tools um. Sie werden vielleicht überrascht sein, aber ChatGPT kann mehr als
          Rezepte ausspucken.
        </p>

        <p className="font-mono text-sm text-foreground/60 leading-relaxed mb-4">
          RAG mit Hybrid Search, Agentic Workflows mit Tool-Calling und Memory, multimodale
          Foundation Models, Fine-Tuning auf Markendaten, REST- und Streaming-APIs,
          MCP-Protokoll – deployed auf eigenen Servern.
        </p>

        <div className="flex gap-2 mb-10">
          <Badge variant="outline" className="text-xs border-[#C77DFF] text-[#C77DFF]">
            DSGVO-konform
          </Badge>
          <Badge variant="outline" className="text-xs border-[#C77DFF] text-[#C77DFF]">
            EU AI Act ready
          </Badge>
        </div>

        <p className="font-display text-3xl md:text-4xl uppercase text-foreground leading-tight">
          Klingt kompliziert? Ich mach's einfach.
        </p>
      </div>
    </div>
  );
}
