import type { Metadata } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Reveal } from "@/components/ui/Reveal";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Guiderbus services: WhatsApp automation & bots, AI chatbots & agents, workflow automation, CRM & tool integration, and custom AI solutions.",
  alternates: { canonical: `${site.url}/services` },
  openGraph: {
    title: "Services | Guiderbus",
    description:
      "AI-powered automations for your business: WhatsApp bots, AI agents, workflow automation, integrations, and custom solutions.",
    url: `${site.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 glow-radial" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline">Our Services</Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              AI automation, <GradientText>done for you</GradientText>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Five ways we help businesses replace manual work with reliable,
              intelligent automation. Every engagement is custom — built around
              your tools, your data, and your goals.
            </p>
          </div>

          {/* quick nav */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-fuchsia-400/30 hover:text-white"
              >
                {s.title}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Service detail blocks */}
      <section className="pb-8">
        <Container>
          <div className="flex flex-col gap-6">
            {services.map((service, i) => (
              <Reveal key={service.slug}>
                <article
                  id={service.slug}
                  className="scroll-mt-24 rounded-3xl border border-white/8 bg-surface p-7 sm:p-10"
                >
                  <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
                    {/* Left: identity */}
                    <div>
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white">
                          <ServiceIcon name={service.icon} className="h-6 w-6" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-2 text-base font-medium text-fuchsia-300/90">
                        {service.tagline}
                      </p>
                      <div className="mt-5 space-y-4">
                        {service.long.map((para, idx) => (
                          <p
                            key={idx}
                            className="text-sm leading-relaxed text-zinc-400 sm:text-base"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Right: capabilities */}
                    <div className="rounded-2xl border border-white/8 bg-[#0c0c12] p-6 sm:p-7">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        What&apos;s included
                      </h3>
                      <ul className="mt-5 space-y-3.5">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/15 text-fuchsia-300">
                              <svg
                                viewBox="0 0 16 16"
                                className="h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden
                              >
                                <path d="M3 8.5 6.5 12 13 4.5" />
                              </svg>
                            </span>
                            <span className="text-sm leading-relaxed text-zinc-300">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        Typical outcomes
                      </h3>
                      <ul className="mt-5 space-y-3.5">
                        {service.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-300" />
                            <span className="text-sm leading-relaxed text-zinc-300">
                              {outcome}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
