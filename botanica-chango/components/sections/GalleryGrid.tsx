"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { staggerChildren, fadeUp } from "@/lib/motion";

/**
 * Real store photography hasn't been supplied yet, so each tile is a
 * labeled placeholder rather than a stock photo — swap the `bg` div for
 * a real <Image> once photos come in from Bosslady.
 */
export function GalleryGrid({
  index,
  label,
  captions,
}: {
  index: string;
  label: string;
  captions: string[];
}) {
  return (
    <section className="section flex flex-col justify-center gap-45 py-68">
      <Reveal>
        <SectionLabel index={index} title={label} />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={staggerChildren(0.06)}
        className="grid grid-cols-2 gap-1 md:grid-cols-3"
      >
        {captions.map((caption) => (
          <motion.div
            key={caption}
            variants={fadeUp}
            className="relative flex aspect-square items-end border border-dashed border-line p-14"
            style={{
              background:
                "linear-gradient(155deg, color-mix(in srgb, var(--c-accent) 14%, transparent), transparent 70%)",
            }}
          >
            <span className="voice-label text-label text-mute">{caption}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
