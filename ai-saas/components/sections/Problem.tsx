"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText } from "@/components/ui/SplitText";
import { fadeUp, viewportOnce } from "@/lib/motion";

const SYMPTOMS = [
  "A spreadsheet somebody has to remember to open",
  "Three Slack pings before anything actually moves",
  "A script that only the person who wrote it can fix",
];

const COMPANIES = ["Northline", "Fathom", "Verano", "Solder & Co.", "Meridian Health"];

/**
 * Context mode, three-column composition: heading left, a small
 * diagnostic object centred, body copy right.
 */
export function Problem() {
  return (
    <section
      id="problem"
      data-section="problem"
      className="section flex flex-col justify-center gap-45 py-[136px]"
    >
      <div className="flex flex-col gap-31">
        <SectionLabel index="01" title="The problem" />
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="voice-label flex flex-wrap items-center gap-x-31 gap-y-10 text-[13px] text-cream/45"
        >
          <li className="text-driftwood">Already running in production at</li>
          {COMPANIES.map((name) => (
            <li key={name} className="text-cream/60">
              {name}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="grid grid-cols-1 items-center gap-45 md:grid-cols-[1fr_auto_1fr] md:gap-68">
        <h2 className="max-w-[12ch] text-[10vw] leading-[0.92] sm:text-heading">
          <SplitText text="The process already exists." />
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="flex flex-col gap-14 border border-dashed border-border p-24 md:w-[280px]"
        >
          {SYMPTOMS.map((symptom, i) => (
            <div key={symptom} className="flex items-start gap-12">
              <span className="text-legal text-driftwood pt-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="voice-label text-[13px] leading-[1.4] text-cream/80">
                {symptom}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="voice-body text-body text-cream/85"
        >
          It just runs on people instead of on infrastructure. Every
          exception gets handled by whoever happens to be awake, and the
          knowledge of how to handle it never makes it out of their head.
          Kiln takes the process you already run and gives it a runtime
          that doesn&rsquo;t go home at 6pm.
        </motion.p>
      </div>
    </section>
  );
}
