"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { PRELOADER_DONE_EVENT } from "@/components/animation/Preloader";

/**
 * Plays the hero's staggered entrance once the preloader lifts (or after a
 * fallback delay if no preloader is present). Targets elements marked with
 * [data-hero]; reduced-motion users get them revealed instantly.
 */
export function HeroIntro() {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-hero]");
    if (!els.length) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      gsap.set(els, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(els, { autoAlpha: 0, y: 30 });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(els, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
      });
    };

    window.addEventListener(PRELOADER_DONE_EVENT, play, { once: true });
    const fallback = window.setTimeout(play, 2600);

    return () => {
      window.removeEventListener(PRELOADER_DONE_EVENT, play);
      window.clearTimeout(fallback);
    };
  }, []);

  return null;
}
