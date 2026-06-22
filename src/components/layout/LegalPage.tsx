import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";

/**
 * Shared shell for legal documents (Privacy, Terms).
 * Provides the page header, "last updated" line, and readable prose styling.
 */
export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative pt-32 pb-24 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 glow-radial opacity-60" />
      <Container className="relative max-w-3xl">
        <header className="border-b border-white/8 pb-8">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">{intro}</p>
          <p className="mt-4 text-sm text-zinc-600">
            Last updated: {site.legalLastUpdated}
          </p>
        </header>

        <article className="legal-prose mt-10">{children}</article>
      </Container>
    </section>
  );
}

/** A numbered/headed section within a legal document. */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-display text-xl font-semibold tracking-tight text-white">
        {heading}
      </h2>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
        {children}
      </div>
    </section>
  );
}
