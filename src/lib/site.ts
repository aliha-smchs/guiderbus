/**
 * Site-wide configuration — single source of truth for branding, contact
 * details, navigation and default SEO metadata. Edit here, not in components.
 */
export const site = {
  name: "Guiderbus",
  tagline: "Business Automation Powered by AI",
  description:
    "Guiderbus is an AI automation agency that builds done-for-you WhatsApp bots, AI agents, and workflow automations so businesses save time, cut costs, and scale without the busywork.",
  domain: "guiderbus.com",
  url: "https://guiderbus.com",
  email: "contact@guiderbus.com",

  // Primary call-to-action — books an agency consultation.
  consultationHref: "/contact",
  platformHref: "/platform",

  nav: [
    { label: "Services", href: "/services" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Why Guiderbus", href: "/#why-guiderbus" },
    { label: "Platform", href: "/platform" },
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],

  // Date shown on legal pages — keep in sync when policies are revised.
  legalLastUpdated: "June 23, 2026",
} as const;

export type Site = typeof site;
