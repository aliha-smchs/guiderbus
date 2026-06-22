import type { ServiceIcon as IconKey } from "@/lib/services";

/**
 * Line icons for each service, drawn as inline SVG (no icon library).
 * Stroke uses currentColor so callers control the color.
 */
export function ServiceIcon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3 20.5 4.4 16a8.5 8.5 0 1 1 3.1 3.1L3 20.5Z" />
          <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5M9 9.5c0-.8.4-1.3 1-1.4.4-.1.8.1.9.5l.4 1c.1.4 0 .8-.3 1l-.4.3M14.5 15c.8 0 1.3-.4 1.4-1 .1-.4-.1-.8-.5-.9l-1-.4c-.4-.1-.8 0-1 .3l-.3.4" />
        </svg>
      );
    case "chatbot":
      return (
        <svg {...common}>
          <rect x="4" y="7" width="16" height="11" rx="2.5" />
          <path d="M12 7V4M9.5 12h.01M14.5 12h.01M8 18l-1.5 2.5M16 18l1.5 2.5M4 13H2.5M21.5 13H20" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="6" height="5" rx="1.4" />
          <rect x="15" y="9" width="6" height="5" rx="1.4" />
          <rect x="3" y="15" width="6" height="5" rx="1.4" />
          <path d="M9 6.5h3a2 2 0 0 1 2 2v2M9 17.5h3a2 2 0 0 0 2-2v-2" />
        </svg>
      );
    case "integration":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M7.7 7.7 10.5 16M16.3 7.7 13.5 16M8.5 6h7" />
        </svg>
      );
    case "custom":
      return (
        <svg {...common}>
          <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
          <circle cx="12" cy="12" r="3.2" />
        </svg>
      );
  }
}
