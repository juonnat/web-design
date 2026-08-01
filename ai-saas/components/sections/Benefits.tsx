"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { viewportOnce } from "@/lib/motion";

const STATS = [
  { value: "92%", label: "of runs never touch a human" },
  { value: "1.4s", label: "median step latency in production" },
  { value: "6,000+", label: "process hours handed back monthly" },
  { value: "0", label: "on-call pages for process failures" },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      data-section="benefits"
      className="section flex flex-col justify-center gap-45 py-[136px]"
    >
      <SectionLabel index="06" title="What changes" />

      <div className="grid grid-cols-1 gap-45 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            className="flex flex-col gap-10 border-t border-dashed border-border pt-24"
          >
            <span className="text-[13vw] leading-[0.9] sm:text-[52px]">
              {stat.value}
            </span>
            <span className="voice-label text-label text-driftwood">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
