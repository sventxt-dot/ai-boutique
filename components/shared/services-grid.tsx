import PortfolioTeaser from "./portfolio-teaser";
import { services, type Service } from "@/lib/data/services";

const dotColors = ["#C77DFF", "#FF6666", "#6F77F4", "#141414"];

function ServiceCard({ service, color }: { service: Service; color: string }) {
  return (
    <li className="border-t border-border pt-7">
      <span
        aria-hidden="true"
        className="block size-3 rounded-[2px] mb-5"
        style={{ backgroundColor: color }}
      />
      <h3 className="text-xl font-bold leading-tight mb-3">{service.title}</h3>
      <p className="text-base leading-relaxed font-medium text-[#3E3A44]">{service.copy}</p>
    </li>
  );
}

export default function ServicesGrid() {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold font-sans text-left leading-tight mb-3">
        So arbeitet KI im Marketing.
      </h2>
      <p className="text-lg font-sans font-medium text-muted-foreground leading-relaxed mb-14 max-w-2xl text-left">
        Acht mögliche KI Tools für Ihr Daily-Business.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} color={dotColors[i % dotColors.length]} />
        ))}
      </ul>

      <PortfolioTeaser />
    </>
  );
}
