import { cn } from "@/lib/utils";

interface MonoLabelProps {
  children: React.ReactNode;
  className?: string;
  /** Color of the small square in front of the label, taken from the logo's i-dot */
  dot?: string;
}

export default function MonoLabel({ children, className, dot }: MonoLabelProps) {
  return (
    <span
      className={cn(
        "font-sans text-sm font-semibold text-[#5A4E68]",
        dot && "inline-flex items-center gap-3",
        className
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="size-3 shrink-0 rounded-[2px]"
          style={{ backgroundColor: dot }}
        />
      )}
      {children}
    </span>
  );
}
