"use client";

import dynamic from "next/dynamic";

// Load the WebGL scene only on the client — it has no server-rendered output.
const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false },
);

export function HeroCanvasMount() {
  return <HeroCanvas />;
}
