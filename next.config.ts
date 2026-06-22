import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server (.next/standalone) for a minimal container image.
  output: "standalone",
  // Pin the file-tracing root to this project (a lockfile exists higher up).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
