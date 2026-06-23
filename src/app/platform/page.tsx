import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Platform Waitlist",
  description:
    "Join the waitlist for the upcoming Guiderbus self-serve automation platform.",
  alternates: { canonical: `${site.url}/platform` },
  openGraph: {
    title: "Platform Waitlist | Guiderbus",
    description:
      "Get early access to the upcoming Guiderbus platform for building and managing business automations.",
    url: `${site.url}/platform`,
  },
};

const capabilities = [
  "Build simple customer workflows without starting from a blank canvas",
  "Manage WhatsApp, CRM, and internal automations from one place",
  "Escalate from self-serve setup to Guiderbus implementation when needed",
];

export default function PlatformPage() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div aria-hidden className="pointer-events-none absolute inset-0 glow-radial opacity-60" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="soon">Early Access</Badge>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            The <GradientText>Guiderbus platform</GradientText> is opening soon
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            We&apos;re turning the agency playbook into a self-serve workspace
            for teams that want to launch useful automations faster.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-3xl border border-white/8 bg-[#0c0c12] p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
              Built for operators, not automation hobbyists
            </h2>
            <ul className="mt-6 space-y-4">
              {capabilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/15 text-fuchsia-300">
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 8.5 6.5 12 13 4.5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-fuchsia-400/15 bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-white">
              Join the waitlist
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Tell us what you&apos;d want to automate first. We&apos;ll use that
              to shape early access.
            </p>
            <LeadForm
              type="waitlist"
              submitLabel="Join waitlist"
              successLabel="You're on the platform waitlist. We'll be in touch."
              className="mt-6"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
