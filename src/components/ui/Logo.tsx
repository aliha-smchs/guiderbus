import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Guiderbus wordmark + route mark.
 * The mark is a guided "route" — three stops connected along a path —
 * a nod to the name and to automating a sequence of steps.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Guiderbus home"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60",
        className,
      )}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient shadow-lg shadow-purple-900/40 transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {/* route path */}
          <path d="M5 18c0-3 3-3 6-3s6 0 6-3" opacity={0.9} />
          {/* stops */}
          <circle cx="5" cy="18" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="11" cy="15" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="17" cy="12" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="17" cy="12" r="3.4" opacity={0.55} />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          Guiderbus
        </span>
      )}
    </Link>
  );
}
