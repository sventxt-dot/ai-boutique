import PortfolioTeaser from "./portfolio-teaser";
import PracticeResult from "./practice-result";
import { services, type Service } from "@/lib/data/services";

function ServiceCard({ service, number }: { service: Service; number: string }) {
  return (
    <li className="group relative border-t border-border pt-7">
      {/* Short lila start of the line; on hover it runs across the whole item */}
      <span
        aria-hidden="true"
        className="absolute left-0 -top-px h-0.5 w-10 bg-accent-lila transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
      />
      <span className="block font-display text-sm tracking-[0.12em] text-accent-lila-ink mb-4">{number}</span>
      <h3 className="text-xl font-bold leading-tight mb-3">{service.title}</h3>
      <p className="text-base leading-relaxed font-medium text-[#3E3A44]">{service.copy}</p>
    </li>
  );
}

export default function ServicesGrid() {
  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold font-sans text-left leading-tight mb-3">
        So arbeitet KI im Marketing-Team.
      </h2>
      <p className="text-lg font-sans font-medium text-muted-foreground leading-relaxed mb-14 max-w-2xl text-left">
        Acht Werkzeuge, die Standardaufgaben im Marketing übernehmen. Individuell angepasst, auf Servern in der EU gehostet und von Ihrem Team gesteuert.
      </p>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} number={String(i + 1).padStart(2, "0")} />
        ))}
      </ol>

      <PracticeResult />

      <PortfolioTeaser />
    </>
  );
}
