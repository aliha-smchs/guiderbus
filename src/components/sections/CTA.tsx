import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";

export function CTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/8 bg-surface px-6 py-14 text-center sm:px-12 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 glow-radial opacity-80" />
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s automate the work{" "}
              <GradientText>holding you back</GradientText>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-400">
              Book a free consultation. We&apos;ll look at your processes and
              show you exactly where AI automation can save time and money — no
              obligation.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={site.consultationHref} size="lg" className="w-full sm:w-auto">
                Book a Free Consultation
              </Button>
              <Button
                href={`mailto:${site.email}`}
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto"
              >
                {site.email}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
