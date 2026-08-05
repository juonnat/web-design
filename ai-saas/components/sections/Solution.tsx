"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import KilnHand from "@/components/ui/KilnHand";

export default function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      id="solution"
      data-section="solution"
      className="section flex min-h-[100svh] flex-col items-center justify-center gap-45 overflow-hidden py-[136px] text-center"
    >
      <SectionLabel index="02" title="The solution" />

      {/* The hand renders inside this dashed circle and appears to grip it */}
      <div className="relative mx-auto h-64 w-64 rounded-full border border-dashed border-border sm:h-80 sm:w-80">
        {isInView && (
          <div className="absolute inset-0">
            <KilnHand />
          </div>
        )}
        <span className="voice-label pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-label text-ember">
          Kiln
        </span>
      </div>

      <h2 className="max-w-[16ch] text-[10vw] leading-[0.92] sm:text-heading">
        <SplitText text="One runtime for every agent your process needs." />
      </h2>
    </section>
  );
}
