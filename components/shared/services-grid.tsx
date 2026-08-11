import Image from "next/image";
import { services, type Service } from "@/lib/data/services";

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/5 hover:border-[#C77DFF]/30 transition-all duration-300">
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden">
        <div className="absolute inset-3 overflow-hidden rounded-lg">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
        {/* Gradient fade into card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
      </div>

      {/* Text area */}
      <div className="p-5">
        <div className="font-display uppercase text-lg tracking-wide text-[#C77DFF] mb-3 leading-tight">
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
        Wertvolle Zeit sparen.<br />
        Mitarbeitende entlasten.<br />
        Wettbewerbsvorteil ausbauen.<br />
        Was kann die KI für Sie tun?
      </p>
      <p className="text-lg font-sans font-medium text-white/60 leading-relaxed mb-10 max-w-2xl text-left">
        Soviel ist sicher, die künstliche Intelligenz kann mehr als nur chatten. Sie arbeitet bereits in vielen Unternehmen als unverzichtbarer Assistent, verschwiegener Ratgeber oder allwissender Kollege. Hier sind acht Beispiele, wie ich KI in ein hilfreiches Tool verwandle:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </>
  );
}
