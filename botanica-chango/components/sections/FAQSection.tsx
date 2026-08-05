"use client";

import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Accordion } from "@/components/ui/Accordion";

export function FAQSection({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <section className="section flex min-h-[70svh] flex-col justify-center gap-45 py-68">
      <Reveal>
        <SectionLabel index="04" title="Common questions" />
      </Reveal>
      <div className="max-w-[720px]">
        <Accordion items={items} />
      </div>
    </section>
  );
}
