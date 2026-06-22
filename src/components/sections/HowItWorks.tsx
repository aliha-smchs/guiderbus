"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Discover",
    description:
      "We learn your business, map the repetitive work, and pinpoint where automation will create the most value — fast.",
  },
  {
    title: "Build",
    description:
      "We design and build your automation, integrate it with your tools, and test it thoroughly before it ever touches a customer.",
  },
  {
    title: "Automate",
    description:
      "We launch, monitor, and refine. Your processes now run on their own — and we're here to evolve them as you grow.",
  },
];

export function HowItWorks() {
  const root = useRef<HTMLDivElement | null>(null);
  const path = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const badges = gsap.utils.toArray<HTMLElement>("[data-step]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]");

      if (reduced) {
        gsap.set([...badges, ...cards], { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      // Draw the connecting route as the section scrolls into view.
      if (path.current) {
        const len = path.current.getTotalLength();
        gsap.set(path.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(path.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        });
      }

      // Stops + cards activate in sequence.
      gsap.set(badges, { scale: 0.4, autoAlpha: 0 });
      gsap.set(cards, { y: 30, autoAlpha: 0 });

      badges.forEach((badge, i) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 60%", once: true },
          delay: i * 0.22,
        });
        tl.to(badge, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: "back.out(2)",
        }).to(
          cards[i],
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3",
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="Three stops to a fully automated process"
          lead="A guided route from idea to running automation — no jargon, no months-long projects."
        />

        <div ref={root} className="relative mt-16">
          {/* Animated route (desktop) */}
          <svg
            className="absolute inset-x-0 top-3 hidden h-16 w-full md:block"
            viewBox="0 0 1000 60"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="route-grad" x1="0" y1="0" x2="1000" y2="0">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            <path
              ref={path}
              d="M30 30 C 200 30, 250 14, 500 30 C 750 46, 800 30, 970 30"
              stroke="url(#route-grad)"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                <span
                  data-step
                  className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl border border-fuchsia-400/30 bg-[#0a0a0f] font-display text-lg font-semibold text-fuchsia-300 shadow-[0_0_30px_-8px_rgba(217,70,239,0.6)]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div data-step-card>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
