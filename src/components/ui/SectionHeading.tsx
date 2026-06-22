import { cn } from "@/lib/cn";

/**
 * Shared section header: eyebrow label, title, and optional lead paragraph.
 * The eyebrow uses the route motif (a small connector glyph) for continuity.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300/90",
            align === "center" && "justify-center",
          )}
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          {lead}
        </p>
      )}
    </div>
  );
}
