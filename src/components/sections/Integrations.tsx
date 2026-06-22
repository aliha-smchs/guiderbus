import { Container } from "@/components/ui/Container";

/**
 * Continuous marquee of the platforms we connect. Two rows scroll in opposite
 * directions, edges faded with a mask. Pure-CSS; pauses for reduced motion.
 */
const rowOne = [
  "WhatsApp Business",
  "HubSpot",
  "Salesforce",
  "Slack",
  "Notion",
  "Zapier",
  "Make",
];
const rowTwo = [
  "Gmail",
  "Google Sheets",
  "Stripe",
  "Shopify",
  "Calendly",
  "Airtable",
  "Telegram",
];

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-300">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
      {label}
    </span>
  );
}

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask flex overflow-hidden">
      <div
        className={`flex shrink-0 gap-3 pr-3 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } motion-reduce:animate-none`}
      >
        {doubled.map((item, i) => (
          <Chip key={`${item}-${i}`} label={item} />
        ))}
      </div>
    </div>
  );
}

export function Integrations() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Connects with the tools you already use
        </p>
      </Container>
      <div className="mt-10 flex flex-col gap-3">
        <Row items={rowOne} />
        <Row items={rowTwo} reverse />
      </div>
    </section>
  );
}
