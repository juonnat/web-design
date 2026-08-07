"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { staggerChildren, fadeUp } from "@/lib/motion";
import { useTranslation } from "@/lib/i18n/useTranslation";

/** Real Google reviews, lightly cleaned (Google UI chrome stripped, sentence
 * starts capitalized, missing contraction apostrophes added) — wording and
 * sentiment left as the reviewer wrote it. Quotes are translated per
 * locale (see lib/i18n/translations.ts testimonials.quotes) but reviewer
 * names are proper nouns and stay as written. */
const NAMES = [
  "Julycell A.",
  "Sabrina P.",
  "Olga M.",
  "All Now",
  "Latanya H.",
  "Kourtney R.",
  "Eddie A.",
  "Taija M.",
  "PaRaNoRMaL 114",
  "Johnny R.",
  "Lorens G.",
  "Mikesha T.",
  "Anna O.",
  "El Nino Bueno",
  "Omar C.",
  "Carisa D.",
  "William A.",
  "Dee C.",
];

export function TestimonialGrid() {
  const t = useTranslation();

  return (
    <section className="section flex flex-col justify-center gap-45 py-68">
      <Reveal>
        <SectionLabel index="03" title={t.testimonials.label} />
      </Reveal>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        variants={staggerChildren(0.08)}
        className="grid grid-cols-1 gap-24 sm:grid-cols-2 lg:grid-cols-3"
      >
        {NAMES.map((name, i) => (
          <motion.div
            key={name}
            variants={fadeUp}
            className="flex flex-col gap-14 border border-dashed border-line p-24 rounded-[var(--radius-card)]"
          >
            <p className="voice-body text-[17px] leading-[1.4] text-ink/70">
              &ldquo;{t.testimonials.quotes[i]}&rdquo;
            </p>
            <span className="voice-label text-label text-mute">{name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
