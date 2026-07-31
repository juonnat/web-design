"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { viewportOnce } from "@/lib/motion";

const STEPS = [
  {
    n: "01",
    title: "Design",
    body: "Map the process as steps and decisions — the same shape you'd draw on a whiteboard.",
  },
  {
    n: "02",
    title: "Temper",
    body: "Run it against last month's real cases. See exactly where it would have gotten it wrong.",
  },
  {
    n: "03",
    title: "Fire",
    body: "Promote it to production traffic at whatever percentage you're comfortable with.",
  },
  {
    n: "04",
    title: "Ship",
    body: "The runtime takes it from there — and tells you the moment it hits something new.",
  },
];

export function Workflow() {
  return (
    <section
      id="workflow"
      data-section="workflow"
      className="section flex flex-col justify-center gap-45 py-[136px]"
    >
      <SectionLabel index="05" title="How it's built" />

      <h2 className="max-w-[16ch] text-[9vw] leading-[0.95] sm:text-heading">
        Four steps from idea to running process.
      </h2>

      <div className="relative grid grid-cols-1 gap-31 md:grid-cols-4">
        <div className="pointer-events-none absolute left-0 right-0 top-[26px] hidden border-t border-dashed border-border md:block" />
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
            className="relative flex flex-col gap-14"
          >
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-dashed border-border bg-shadow text-legal text-ember">
              {step.n}
            </div>
            <h3 className="text-heading-sm">{step.title}</h3>
            <p className="voice-body max-w-[32ch] text-[17px] leading-[1.35] text-cream/75">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
