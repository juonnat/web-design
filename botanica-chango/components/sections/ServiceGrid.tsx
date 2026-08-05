"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";
import { staggerChildren, fadeUp } from "@/lib/motion";

export function ServiceGrid({
  items,
}: {
  items: { title: string; duration?: string; description: string }[];
}) {
  return (
    <section className="section flex flex-col justify-center gap-45 py-68">
      <Reveal>
        <SectionLabel index="01" title="Services" />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={staggerChildren(0.08)}
        className="grid grid-cols-1 gap-1 border-t border-dashed border-line sm:grid-cols-2"
      >
        {items.map((item) => (
          <motion.div key={item.title} variants={fadeUp}>
            <TiltCard className="flex h-full flex-col gap-14 border-b border-dashed border-line p-31 sm:border-r">
              <div className="flex items-baseline justify-between gap-14">
                <h3 className="voice-heading text-heading-sm text-ink">{item.title}</h3>
                {item.duration && (
                  <span className="voice-label whitespace-nowrap text-label text-mute">
                    {item.duration}
                  </span>
                )}
              </div>
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
