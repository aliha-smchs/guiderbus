import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a Guiderbus consultation for WhatsApp automation, AI agents, workflow automation, CRM integration, or custom AI systems.",
  alternates: { canonical: `${site.url}/contact` },
  openGraph: {
    title: "Contact | Guiderbus",
    description:
      "Tell Guiderbus what you want to automate and get a practical consultation.",
    url: `${site.url}/contact`,
  },
};

const expectations = [
  "A practical review of the workflow you want to automate",
  "A recommended path: WhatsApp bot, AI agent, integration, or custom workflow",
  "Clear next steps, rough timeline, and implementation risks",
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 glow-radial opacity-70" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge variant="outline">Free Consultation</Badge>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Show us the work. <GradientText>We&apos;ll map the automation.</GradientText>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Use the form to describe the process, tools, or customer journey
              that slows your team down. We&apos;ll reply with a focused next
              step, not a generic sales deck.
            </p>

            <div className="mt-9 border-l border-fuchsia-400/30 pl-5">
              <h2 className="font-display text-lg font-semibold text-white">
                What happens next
              </h2>
              <ul className="mt-4 space-y-3">
                {expectations.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-white/8 bg-surface p-6 sm:p-8">
            <LeadForm
              type="contact"
              submitLabel="Send consultation request"
              successLabel="Your request has been sent. We'll reply shortly."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
