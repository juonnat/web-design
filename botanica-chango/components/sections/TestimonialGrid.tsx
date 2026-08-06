"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { staggerChildren, fadeUp } from "@/lib/motion";

/** Real Google reviews, lightly cleaned (Google UI chrome stripped, sentence
 * starts capitalized, missing contraction apostrophes added) — wording and
 * sentiment left as the reviewer wrote it. */
const TESTIMONIALS = [
  {
    name: "Julycell A.",
    quote:
      "I just gave them a 5-star review! The staff are really lovely, especially the woman behind the counter — she's super nice. Everyone's been so helpful, and I'm definitely going back all the time. Thanks again for always assisting me — I love that they had everything I needed!",
  },
  {
    name: "Sabrina P.",
    quote: "Always my favorite place to stop when I'm in the area. Great diversified selection, friendly staff.",
  },
  {
    name: "Olga M.",
    quote: "She is very on point, she really helped me! I'm a believer.",
  },
  {
    name: "All Now",
    quote: "You can get everything you need under one roof.",
  },
  {
    name: "Latanya H.",
    quote:
      "I've been coming to this store for over two or three years and built a positive relationship with both the business owner and her staff, who have been very pleasant to me and my family. The items within the store are affordable.",
  },
  {
    name: "Kourtney R.",
    quote:
      "That is the most helpful botanica I have been to in all of my life. The people are very knowledgable. All my questions were answered after a consulta. I felt like a new person the next day after my bano. I am now hoping to see results in my candle!",
  },
  {
    name: "Eddie A.",
    quote:
      "I went here because my best friend told me the reader was on point, and boy was she right — that woman has told me things about me that my own mother didn't know. I found my home. Now I will never go anywhere else to get read. Botanica Chango has the best reader, hands down.",
  },
  {
    name: "Taija M.",
    quote:
      "I just moved here in PA and I love love this store. Once you walk in the store it's very positive, and the lady there is very helpful and the prices are affordable. I will be back!",
  },
  {
    name: "PaRaNoRMaL 114",
    quote: "This is a very good place to go, they are very friendly and careing.",
  },
  {
    name: "Johnny R.",
    quote: "Very good knowledge of things, going to recommend all my friends and family.",
  },
  {
    name: "Lorens G.",
    quote: "Love this place, always feel like home.",
  },
  {
    name: "Mikesha T.",
    quote: "She is amazing, won't be going anywhere else.",
  },
  {
    name: "Anna O.",
    quote: "The best place I've been to, love the people there.",
  },
  {
    name: "El Nino Bueno",
    quote: "Very nice, and very helpful, the lady behind the counter.",
  },
  {
    name: "Omar C.",
    quote: "Great work, and always there to help your spiritual needs.",
  },
  {
    name: "Carisa D.",
    quote: "I love this store. One stop shop.",
  },
  {
    name: "William A.",
    quote: "First time there and was very comfortable.",
  },
  {
    name: "Dee C.",
    quote: "They have a lot to offer.",
  },
];

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
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            className="flex flex-col gap-14 border border-dashed border-line p-24 rounded-[var(--radius-card)]"
          >
            <p className="voice-body text-[17px] leading-[1.4] text-ink/70">
              &ldquo;{t.quote}&rdquo;
            </p>
            <span className="voice-label text-label text-mute">{t.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
