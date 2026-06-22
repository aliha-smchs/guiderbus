import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { HeroCanvasMount } from "@/components/three/HeroCanvasMount";
import { HeroIntro } from "@/components/animation/HeroIntro";
import { MagneticButton } from "@/components/animation/MagneticButton";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      {/* WebGL automation network */}
      <div className="absolute inset-0">
        <HeroCanvasMount />
      </div>
      {/* Atmosphere + readability mask */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 glow-radial" />
        <div className="absolute inset-0 bg-[#0a0a0f]/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
      </div>

      <HeroIntro />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div data-hero className="flex justify-center opacity-0">
            <Badge variant="outline">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-fuchsia-400" />
              AI Automation Agency
            </Badge>
          </div>

          <h1
            data-hero
            className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-white opacity-0 sm:text-6xl lg:text-7xl"
          >
            Business Automation
            <br />
            Powered by <GradientText>AI</GradientText>
          </h1>

          <p
            data-hero
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-300/90 opacity-0 sm:text-lg"
          >
            Guiderbus builds done-for-you WhatsApp bots, AI agents, and workflow
            automations — so your team stops doing repetitive work and your
            business runs itself, around the clock.
          </p>

          <div
            data-hero
            className="mt-9 flex flex-col items-center justify-center gap-3 opacity-0 sm:flex-row"
          >
            <MagneticButton className="w-full sm:w-auto">
              <Button
                href={site.consultationHref}
                size="lg"
                className="w-full sm:w-auto"
              >
                Book a Free Consultation
              </Button>
            </MagneticButton>
            <Button
              variant="secondary"
              size="lg"
              disabled
              aria-disabled
              className="w-full sm:w-auto"
            >
              SaaS Platform
              <Badge variant="soon" className="ml-1 px-2 py-0.5 text-[10px]">
                Coming Soon
              </Badge>
            </Button>
          </div>

          <p data-hero className="mt-5 text-xs text-zinc-500 opacity-0">
            Built on the official WhatsApp Business Platform · No long-term
            lock-in
          </p>
        </div>
      </Container>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-fuchsia-400/80" />
        </div>
      </div>
    </section>
  );
}
