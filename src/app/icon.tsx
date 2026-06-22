import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Gradient rounded-square favicon with a route mark, matching the logo.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg, #7c3aed, #9333ea, #d946ef)",
        }}
      >
        <svg
          width="20"
          height="20"
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
    ),
    { ...size },
  );
}
