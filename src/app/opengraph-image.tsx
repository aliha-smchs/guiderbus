import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded Open Graph card generated at build time (no binary asset needed).
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(900px 500px at 80% 0%, rgba(217,70,239,0.25), rgba(10,10,15,0) 60%), radial-gradient(900px 600px at 10% 100%, rgba(124,58,237,0.28), rgba(10,10,15,0) 60%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #7c3aed, #9333ea, #d946ef)",
            }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 18c0-3 3-3 6-3s6 0 6-3" />
              <circle cx="5" cy="18" r="1.7" fill="white" stroke="none" />
              <circle cx="11" cy="15" r="1.7" fill="white" stroke="none" />
              <circle cx="17" cy="12" r="1.7" fill="white" stroke="none" />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>
            {site.name}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Business Automation Powered by AI
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "#a1a1aa",
              maxWidth: 820,
            }}
          >
            Done-for-you WhatsApp bots, AI agents, and workflow automation.
          </div>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 26,
            color: "#71717a",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#d946ef",
            }}
          />
          {site.domain}
        </div>
      </div>
    ),
    { ...size },
  );
}
