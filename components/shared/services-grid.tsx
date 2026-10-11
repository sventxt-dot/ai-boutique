import Image from "next/image";
import PortfolioTeaser from "./portfolio-teaser";
import { services, type Service } from "@/lib/data/services";

function ServiceCard({ service }: { service: Service }) {
  return (
    <li className="grid grid-cols-1 md:grid-cols-[minmax(0,20rem)_1fr] gap-x-12 gap-y-3 border-t border-white/15 py-6 md:py-8">
      <div className="flex items-center gap-4">
        <Image
          src={service.image}
          alt=""
          width={56}
          height={56}
          className="h-10 w-10 md:h-12 md:w-12 shrink-0"
        />
        <h3 className="font-display uppercase text-xl md:text-2xl tracking-wide text-white leading-tight">
          {service.title}
        </h3>
      </div>
      <p className="text-base text-white/70 leading-relaxed font-medium max-w-2xl">
        {service.copy}
      </p>
    </li>
  );
}

export default function ServicesGrid() {
  return (
    <>
      <p className="text-2xl md:text-3xl font-bold font-sans text-left text-white mb-6 leading-snug">
        So arbeitet KI für Ihr Unternehmen.
      </p>
      <p className="text-lg font-sans font-medium text-white/60 leading-relaxed mb-10 max-w-2xl text-left">
        Acht Agentic Marketing-Tools, die ich einsetze. Für sofortige Ergebnisse.
      </p>
      <ul className="border-b border-white/15">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </ul>

      <PortfolioTeaser />
    </>
  );
}
