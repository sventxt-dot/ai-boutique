import { cn } from "@/lib/utils";
import MonoLabel from "./mono-label";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", align === "center" && "text-center")}>
      {eyebrow && (
        <MonoLabel>
          <span className="block mb-4">{eyebrow}</span>
        </MonoLabel>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
