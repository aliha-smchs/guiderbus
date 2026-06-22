import { services } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="What We Build"
          title="Automations tailored to how you work"
          lead="From first contact to back-office operations, we design and ship AI automations that fit your business — not a template."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 70} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
