"use client";

import { useEffect, useRef } from "react";

/**
 * Thin gradient progress bar fixed to the top of the viewport, tracking how far
 * the page has been scrolled. Uses rAF-throttled scroll for smoothness.
 */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? doc.scrollTop / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${pct})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden>
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-brand-gradient"
      />
    </div>
  );
}
