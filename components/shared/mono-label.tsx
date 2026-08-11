import { cn } from "@/lib/utils";

interface MonoLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span
      className={cn(
        "font-display text-xs [letter-spacing:0.3px] uppercase text-accent-lila",
        className
      )}
    >
      {children}
    </span>
  );
}
