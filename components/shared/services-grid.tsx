import Image from "next/image";
import PortfolioTeaser from "./portfolio-teaser";
import { services, type Service } from "@/lib/data/services";

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex items-start gap-5 bg-background p-6 md:p-8 transition-colors hover:bg-white/[0.02]">
      <Image
        src={service.image}
        alt=""
        width={56}
        height={56}
        className="h-12 w-12 md:h-14 md:w-14 shrink-0"
      />
      <div>
        <div className="font-display uppercase text-xl md:text-2xl tracking-wide text-white leading-tight mb-3">
          {service.title}
        </div>
        <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium">
          {service.copy}
        </p>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <>
      <p className="text-2xl md:text-3xl font-bold font-sans text-left text-white mb-6 leading-snug">
        Wie die KI Unternehmen hilft, um Zeit und Geld zu sparen.
      </p>
      <p className="text-lg font-sans font-medium text-white/60 leading-relaxed mb-10 max-w-2xl text-left">
        Acht Marketing-Tools, die ich einsetze und sofort Ergebnisse liefern.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>

      <PortfolioTeaser />
    </>
  );
}
