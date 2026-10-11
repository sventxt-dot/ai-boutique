import { cn } from "@/lib/utils";

interface MonoLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span
      className={cn(
        "font-sans text-sm font-semibold text-accent-lila",
        className
      )}
    >
      {children}
    </span>
  );
}
