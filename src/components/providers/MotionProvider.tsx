"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global motion layer:
 *  - Lenis smooth scrolling, driven by GSAP's ticker (single rAF loop).
 *  - ScrollTrigger wired to Lenis so scroll-driven animations stay in sync.
 *  - In-page hash links routed through Lenis for smooth anchoring.
 *  - Fully disabled when the user prefers reduced motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    if (reduced) {
      // No smooth scroll, no animation — just make sure triggers settle.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation for in-page hash links.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const url = new URL(target.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;
      const el = url.hash && document.querySelector(url.hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    // Recalculate once fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const settleTimer = window.setTimeout(refresh, 600);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.clearTimeout(settleTimer);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
