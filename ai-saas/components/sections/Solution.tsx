"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { fadeIn, viewportOnce } from "@/lib/motion";

/**
 * Void mode: the subject isolated on warm dark, nothing else on screen.
 */
export function Solution() {
  return (
    <section
      id="solution"
      data-section="solution"
      className="section relative flex min-h-[100svh] flex-col items-center justify-center gap-45 text-center"
    >
      <SectionLabel index="02" title="The solution" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeIn}
        className="relative flex h-[280px] w-[280px] items-center justify-center rounded-full border border-dashed border-border sm:h-[380px] sm:w-[380px]"
      >
        <div className="absolute inset-14 rounded-full border border-dashed border-border" />
        <span className="voice-label text-label text-ember">Kiln</span>
      </motion.div>

      <h2 className="max-w-[20ch] text-[11vw] leading-[0.95] sm:text-heading">
        <SplitText text="One runtime for every agent your process needs." />
      </h2>
    </section>
  );
}
