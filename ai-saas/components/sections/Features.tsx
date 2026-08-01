"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { fadeUp, staggerChildren, viewportOnce } from "@/lib/motion";

const FEATURES = [
  {
    n: "01",
    title: "Workflow builder",
    body: "Lay out the process as a graph of steps, conditions, and handoffs. No YAML, no DAG file nobody wants to touch.",
  },
  {
    n: "02",
    title: "Agent runtime",
    body: "Every step runs against a real model call with retries, timeouts, and a paper trail — not a webhook and a prayer.",
  },
  {
    n: "03",
    title: "Human handoff",
    body: "Route the 5% that genuinely needs a person to a queue built for exactly that, with full context attached.",
  },
  {
    n: "04",
    title: "Observability",
    body: "Every decision an agent makes is logged, replayable, and diffable against the last time it ran.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      data-section="features"
      className="section flex flex-col justify-center gap-45 py-[136px]"
    >
      <SectionLabel index="03" title="What's inside" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerChildren(0.1)}
        className="flex flex-col"
      >
        {FEATURES.map((feature) => (
          <motion.div
            key={feature.n}
            variants={fadeUp}
            whileHover="hover"
            className="group grid grid-cols-1 gap-18 border-t border-dashed border-border py-41 transition-colors duration-500 md:grid-cols-[80px_1fr_2fr] md:items-center md:gap-45"
          >
            <motion.span
              variants={{ hover: { x: 4 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-legal text-driftwood transition-colors duration-500 group-hover:text-ember"
            >
              {feature.n}
            </motion.span>
            <motion.h3
              variants={{ hover: { x: 4 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-heading-sm"
            >
              {feature.title}
            </motion.h3>
            <p className="voice-body max-w-[52ch] text-[20px] leading-[1.3] text-cream/80 sm:text-[24px]">
              {feature.body}
            </p>
          </motion.div>
        ))}
        <div className="border-t border-dashed border-border" />
      </motion.div>
    </section>
  );
}
