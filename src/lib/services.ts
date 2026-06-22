/**
 * Service catalog — single source of truth.
 * Powers both the home overview cards (uses `short`) and the dedicated
 * /services page (uses `long` + `bullets`).
 */

export type ServiceIcon =
  | "whatsapp"
  | "chatbot"
  | "workflow"
  | "integration"
  | "custom";

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  icon: ServiceIcon;
  /** One-liner for home cards. */
  short: string;
  /** Expanded paragraphs for the /services page. */
  long: string[];
  /** Concrete capabilities / deliverables. */
  bullets: string[];
}

export const services: Service[] = [
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation & Bots",
    tagline: "Meet customers where they already are.",
    icon: "whatsapp",
    short:
      "Automated WhatsApp bots for support, sales, and notifications — built on the official WhatsApp Business API.",
    long: [
      "We design and deploy WhatsApp automations on the official WhatsApp Business Platform (Meta), so your business can engage customers on the channel they actually use every day.",
      "From instant first-response and FAQ handling to order updates, appointment reminders, and lead qualification, we build conversational flows that feel human while running around the clock — fully compliant with Meta's messaging policies.",
    ],
    bullets: [
      "Official WhatsApp Business API onboarding & verification",
      "Conversational flows for support, sales & bookings",
      "Automated notifications: orders, reminders, follow-ups",
      "Human-handoff to live agents when needed",
      "Template message design and approval handling",
    ],
  },
  {
    slug: "ai-chatbots-agents",
    title: "AI Chatbots & Agents",
    tagline: "Always-on assistants that actually understand.",
    icon: "chatbot",
    short:
      "LLM-powered chatbots and autonomous agents that understand context, answer questions, and take action.",
    long: [
      "We build AI chatbots and agents powered by leading large language models, grounded in your own knowledge base so answers are accurate and on-brand.",
      "Beyond answering questions, our agents take action — booking meetings, creating tickets, looking up orders, and triaging requests — across your website, WhatsApp, and internal tools.",
    ],
    bullets: [
      "Retrieval-augmented answers from your docs & data",
      "Multi-channel: web, WhatsApp, and messaging apps",
      "Action-taking agents (bookings, lookups, ticketing)",
      "Tone and guardrails tuned to your brand",
      "Analytics on questions, gaps, and deflection rate",
    ],
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    tagline: "Kill the repetitive work.",
    icon: "workflow",
    short:
      "Automate repetitive, multi-step business processes so your team focuses on work that matters.",
    long: [
      "We map your repetitive, manual processes and rebuild them as reliable automated workflows — triggered by events, schedules, or messages.",
      "Whether it's onboarding a new client, processing invoices, syncing data between apps, or routing leads, we remove the copy-paste busywork and the errors that come with it.",
    ],
    bullets: [
      "Process discovery and automation mapping",
      "Event-, schedule-, and message-triggered workflows",
      "Document, invoice, and data-entry automation",
      "Error handling, logging, and alerting",
      "No-code/low-code or fully custom implementations",
    ],
  },
  {
    slug: "crm-integration",
    title: "CRM & Tool Integration",
    tagline: "Make your stack talk to itself.",
    icon: "integration",
    short:
      "Connect your CRM, helpdesk, and business tools so data flows automatically — no more manual syncing.",
    long: [
      "Your tools shouldn't live on islands. We integrate your CRM, helpdesk, calendars, payment systems, and databases so information moves automatically and stays consistent everywhere.",
      "We work with popular platforms and custom APIs alike, building dependable two-way syncs and automations that keep every system up to date.",
    ],
    bullets: [
      "CRM, helpdesk, calendar & payments integrations",
      "Two-way data sync across platforms",
      "Custom API and webhook development",
      "Lead capture and routing automations",
      "Reliable, monitored connections",
    ],
  },
  {
    slug: "custom-ai-solutions",
    title: "Custom AI Solutions",
    tagline: "When off-the-shelf isn't enough.",
    icon: "custom",
    short:
      "Bespoke AI systems designed around your unique processes, data, and goals.",
    long: [
      "Some problems don't fit a template. We design and build custom AI solutions tailored to your specific operations — from document intelligence and data extraction to recommendation engines and internal copilots.",
      "We start with your goals, prototype quickly, and ship production-ready systems that integrate cleanly with how your business already works.",
    ],
    bullets: [
      "Document intelligence & data extraction",
      "Internal copilots and knowledge assistants",
      "Classification, summarization & enrichment pipelines",
      "Rapid prototyping to production deployment",
      "Built around your data, privacy, and constraints",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
