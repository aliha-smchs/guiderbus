import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "How much does an automation project cost?",
    answer:
      "Most projects are scoped after a short discovery call because the cost depends on systems, channels, integrations, and risk. We give you a clear proposal before work starts, including third-party costs such as AI usage, WhatsApp fees, hosting, or CRM seats.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Focused workflows can often launch in weeks. Larger builds involving WhatsApp approval, CRM data cleanup, or multiple internal tools take longer. We usually ship in stages so the first useful automation goes live before the full roadmap is complete.",
  },
  {
    question: "Do you use the official WhatsApp Business API?",
    answer:
      "Yes. WhatsApp automations are built around the official WhatsApp Business Platform, including template message rules, opt-in requirements, and human handoff where the business needs it.",
  },
  {
    question: "What happens when the AI is unsure?",
    answer:
      "We design guardrails and handoff paths before launch. The automation can ask clarifying questions, create a ticket, notify a team member, or route the conversation to a person instead of guessing.",
  },
  {
    question: "Can you connect with our existing CRM or tools?",
    answer:
      "Usually, yes. We work with APIs, webhooks, no-code automation tools, and custom integrations. If a tool has no usable integration path, we call that out during discovery and recommend the closest reliable alternative.",
  },
  {
    question: "How do you handle customer data?",
    answer:
      "We minimize the data used by each automation, restrict access, and align retention with the business process. For client automations, we process end-customer data under the client's instructions and the relevant platform policies.",
  },
];

export function FAQ() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Questions"
          title="The practical details before you automate"
          lead="Production automations need more than a good demo. These are the checks we handle before launch."
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-white/8 border-y border-white/8">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold tracking-tight text-white">
                {faq.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-zinc-400 transition-colors group-open:border-fuchsia-400/40 group-open:text-fuchsia-300">
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 transition-transform group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
