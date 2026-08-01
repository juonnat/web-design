import { Hero } from "@/components/hero/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Features } from "@/components/sections/Features";
import { ProductDemo } from "@/components/sections/ProductDemo";
import { Workflow } from "@/components/sections/Workflow";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";
import { SectionObserverMount } from "@/components/SectionObserverMount";

export default function Home() {
  return (
    <main>
      <SectionObserverMount />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <ProductDemo />
      <Workflow />
      <Benefits />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
