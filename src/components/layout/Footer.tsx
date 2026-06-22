import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-[#08080c]">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              {site.tagline}. Done-for-you AI automations that help your
              business save time and scale.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block text-sm text-zinc-400 transition-colors hover:text-fuchsia-300"
            >
              {site.email}
            </a>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {site.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-600">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">{site.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
