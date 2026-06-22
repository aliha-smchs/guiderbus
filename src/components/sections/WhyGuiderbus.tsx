import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const values = [
  {
    title: "Save Time",
    description:
      "Reclaim hours every week. Automations handle the repetitive work so your team focuses on what actually moves the needle.",
    icon: (
      <path d="M12 7v5l3 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
    ),
  },
  {
    title: "Reduce Cost",
    description:
      "Do more without growing headcount. Automation scales with demand and removes the cost of manual, error-prone tasks.",
    icon: (
      <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7" />
    ),
  },
  {
    title: "AI-Powered",
    description:
      "We use leading AI models to build automations that understand context and make smart decisions — not just rigid rules.",
    icon: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="3" />
        <path d="M9 9h.01M15 9h.01M9 15h6M12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    ),
  },
  {
    title: "Custom-Built",
    description:
      "No cookie-cutter templates. Every automation is designed around your specific tools, data, and goals.",
    icon: (
      <path d="M14.5 4.5 19.5 9.5M4 20l1.2-4.2 9.3-9.3a2.1 2.1 0 0 1 3 3l-9.3 9.3L4 20Z" />
    ),
  },
];

export function WhyGuiderbus() {
  return (
    <section id="why-guiderbus" className="relative py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Why Guiderbus"
          title="Automation that pays for itself"
          lead="We're a focused agency, not a tool you have to figure out yourself. We build it, run it, and stand behind it."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 70} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-white/8 bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {value.icon}
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
