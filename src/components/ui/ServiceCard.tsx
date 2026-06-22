import Link from "next/link";
import type { Service } from "@/lib/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30 hover:bg-surface-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60"
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-fuchsia-500/0 blur-2xl transition-colors duration-500 group-hover:bg-fuchsia-500/10"
      />
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-fuchsia-300 transition-colors duration-300 group-hover:border-fuchsia-400/30 group-hover:text-fuchsia-200">
        <ServiceIcon name={service.icon} className="h-6 w-6" />
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-white">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {service.short}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fuchsia-300 transition-colors group-hover:text-fuchsia-200">
        Learn more
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
    </Link>
  );
}
