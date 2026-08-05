"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";
import { staggerChildren, fadeUp } from "@/lib/motion";

export function FeatureGrid({
  index,
  label,
  headline,
  items,
}: {
  index: string;
  label: string;
  headline: string;
  items: { title: string; description: string }[];
}) {
  return (
    <section className="section flex flex-col justify-center gap-45 py-68">
      <Reveal className="flex flex-col gap-18">
        <SectionLabel index={index} title={label} />
        <h2 className="voice-heading max-w-[16ch] text-heading text-ink">{headline}</h2>
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={staggerChildren(0.08)}
        className="grid grid-cols-1 gap-1 border-t border-dashed border-line sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, i) => (
          <motion.div key={item.title} variants={fadeUp}>
            <TiltCard className="flex h-full flex-col gap-14 border-b border-dashed border-line p-24 sm:border-r">
              <span className="voice-label text-label text-mute">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="voice-heading text-heading-sm text-ink">{item.title}</h3>
              <p className="voice-body text-[17px] leading-[1.4] text-ink/75">
                {item.description}
              </p>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
