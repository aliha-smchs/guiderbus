import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/**
 * Early-access band for the future self-serve SaaS platform.
 */
export function SaaSTeaser() {
  return (
    <section className="relative py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-fuchsia-400/15 bg-gradient-to-br from-purple-950/40 via-surface to-surface p-8 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <Badge variant="soon">Coming Soon</Badge>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                A self-serve <GradientText>Guiderbus platform</GradientText> is
                on the way
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
                Soon you&apos;ll be able to build and manage your own automations
                without writing code. Until then, our team will build them for
                you.
              </p>
            </div>
            <div className="shrink-0">
              <Button href={site.platformHref} variant="secondary" size="lg">
                Join the waitlist
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
