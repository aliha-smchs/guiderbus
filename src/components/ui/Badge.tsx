import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "soon" | "outline";

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-white/5 text-zinc-300 border border-white/10",
  soon:
    "bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-400/20",
  outline: "bg-transparent text-zinc-400 border border-white/15",
};

export function Badge({
  variant = "default",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
