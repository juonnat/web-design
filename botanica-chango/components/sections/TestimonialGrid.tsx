"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { staggerChildren, fadeUp } from "@/lib/motion";

const REVIEWERS = [
  "Kourtney R.",
  "Eddie A.",
  "Latanya H.",
  "Julycell A.",
  "Sabrina P.",
  "Taija M.",
];

/**
 * Google review text is intentionally left as a placeholder — real
 * customer quotes need to be pasted in from Google Business Profile
 * rather than invented. No star widgets, per the handoff.
 */
export function TestimonialGrid() {
  return (
    <section className="section flex flex-col justify-center gap-45 py-68">
      <Reveal>
        <SectionLabel index="03" title="What people say" />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={staggerChildren(0.08)}
        className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3"
      >
        {REVIEWERS.map((name) => (
          <motion.div
            key={name}
            variants={fadeUp}
            className="flex flex-col gap-14 border border-dashed border-line p-24 rounded-[var(--radius-card)]"
          >
            <p className="voice-body text-[17px] leading-[1.4] text-ink/70">
              &ldquo;[Add {name.split(" ")[0]}&rsquo;s real Google review text here.]&rdquo;
            </p>
            <span className="voice-label text-label text-mute">{name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
