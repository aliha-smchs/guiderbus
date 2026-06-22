import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40 hover:brightness-110",
  secondary:
    "bg-white/5 text-zinc-200 border border-white/10 hover:bg-white/10 hover:border-white/20",
  ghost: "text-zinc-300 hover:text-white hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  disabled,
  ...rest
}: CommonProps & {
  href?: string;
  disabled?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    disabled && "opacity-50 pointer-events-none",
    className,
  );

  if (!href) {
    return (
      <button className={classes} disabled={disabled} type="button">
        {rest.children}
      </button>
    );
  }

  // External / mailto links should not use the client-side router.
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a className={classes} href={href} {...rest}>
        {rest.children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {rest.children}
    </Link>
  );
}
