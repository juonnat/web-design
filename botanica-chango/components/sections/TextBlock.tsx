"use client";

import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export function TextBlock({
  index,
  label,
  headline,
  paragraphs,
  cta,
}: {
  index: string;
  label: string;
  headline: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
}) {
  return (
    <section className="section flex min-h-[70svh] flex-col justify-center gap-31 py-68">
      <Reveal className="flex flex-col gap-31">
        <SectionLabel index={index} title={label} />
        <h2 className="voice-heading max-w-[20ch] text-heading text-ink">{headline}</h2>
        <div className="flex max-w-[62ch] flex-col gap-18">
          {paragraphs.map((p, i) => (
            <p key={i} className="voice-body text-body text-ink/80">
              {p}
            </p>
          ))}
        </div>
        {cta && (
          <div>
            <Button href={cta.href} variant="outline">
              {cta.label}
            </Button>
          </div>
        )}
      </Reveal>
    </section>
  );
}
