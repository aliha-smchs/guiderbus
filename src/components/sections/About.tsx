import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GradientText } from "@/components/ui/GradientText";

const principles = [
  "Map the real workflow before choosing tools",
  "Launch with logging, handoff, and failure paths",
  "Keep automations understandable for the team that owns them",
];

export function About() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge variant="outline">About Guiderbus</Badge>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              We build automations that can survive the messy parts of a real business.
            </h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-zinc-400">
              Guiderbus is focused on AI-powered operations work: WhatsApp
              conversations, internal agents, CRM handoffs, and workflows that
              currently depend on people copying information between tools. The
              goal is not to add another dashboard. It is to remove the manual
              steps that slow down customers and teams.
            </p>
            <div className="mt-7 grid gap-3">
              {principles.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-l border-fuchsia-400/30 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-zinc-500">
              Agency builds are available now. The self-serve{" "}
              <GradientText>Guiderbus platform</GradientText> is being shaped
              from the same implementation patterns.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
