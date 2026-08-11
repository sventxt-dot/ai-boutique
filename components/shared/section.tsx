import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("w-full py-20 md:py-28", className)}>
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 lg:px-20">
        {children}
      </div>
    </section>
  );
}
