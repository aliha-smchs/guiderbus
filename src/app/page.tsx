import { Hero } from "@/components/sections/Hero";
import { Integrations } from "@/components/sections/Integrations";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyGuiderbus } from "@/components/sections/WhyGuiderbus";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { SaaSTeaser } from "@/components/sections/SaaSTeaser";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Integrations />
      <Services />
      <HowItWorks />
      <WhyGuiderbus />
      <About />
      <FAQ />
      <SaaSTeaser />
      <CTA />
    </>
  );
}
