"use client";

import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function CTA() {
  return (
    <section
      id="cta"
      data-section="cta"
      className="section flex min-h-[100svh] flex-col items-start justify-center gap-45"
    >
      <SectionLabel index="10" title="Get started" />

      <h2 className="max-w-[18ch] text-[13vw] leading-[0.9] sm:text-[8vw] lg:text-display">
        <SplitText text="Give your process a runtime." />
      </h2>

      <div className="flex flex-col items-start gap-31 sm:flex-row sm:items-center">
        <MagneticButton>
          <Button variant="filled">Start forging — free</Button>
        </MagneticButton>
        <Button variant="bare" href="#product">
          See it run first →
        </Button>
      </div>
    </section>
  );
}
