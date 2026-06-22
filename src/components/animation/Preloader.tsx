"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const PRELOADER_DONE_EVENT = "guiderbus:preloaded";

/**
 * Intro curtain: the route mark draws itself, a counter ticks to 100, then the
 * panel lifts away and broadcasts PRELOADER_DONE_EVENT so the hero can animate
 * in. Skipped instantly for reduced-motion users. Runs once per page load.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement | null>(null);
  const path = useRef<SVGPathElement | null>(null);
  const counter = useRef<HTMLSpanElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
      setDone(true);
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      finish();
      return;
    }

    document.documentElement.style.overflow = "hidden";

    const count = { v: 0 };
    const length = path.current?.getTotalLength() ?? 100;

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        finish();
      },
    });

    gsap.set(path.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    tl.to(path.current, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: "power2.inOut",
    })
      .to(
        count,
        {
          v: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counter.current)
              counter.current.textContent = String(Math.round(count.v)).padStart(
                2,
                "0",
              );
          },
        },
        0,
      )
      .to(".preloader-fade", { opacity: 0, duration: 0.3 }, "+=0.15")
      .to(
        root.current,
        { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
        "-=0.05",
      );

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080c]"
      aria-hidden
    >
      <div className="preloader-fade flex flex-col items-center">
        <svg
          viewBox="0 0 120 80"
          className="h-20 w-28"
          fill="none"
          stroke="url(#pre-grad)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="pre-grad" x1="0" y1="0" x2="120" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
          <path ref={path} d="M16 64 C 16 28, 52 28, 60 40 C 68 52, 104 52, 104 16" />
          <circle cx="16" cy="64" r="5" fill="#7c3aed" stroke="none" />
          <circle cx="60" cy="40" r="5" fill="#9333ea" stroke="none" />
          <circle cx="104" cy="16" r="5" fill="#d946ef" stroke="none" />
        </svg>
        <div className="mt-6 font-display text-sm font-medium tracking-[0.3em] text-zinc-500">
          GUIDERBUS
        </div>
      </div>

      <span
        ref={counter}
        className="absolute bottom-8 right-8 font-display text-5xl font-semibold tracking-tight text-white/10"
      >
        00
      </span>
    </div>
  );
}
