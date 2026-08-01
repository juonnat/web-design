"use client";

import { motion } from "framer-motion";
import { staggerChildren, wordReveal } from "@/lib/motion";

/**
 * Word-stagger reveal for display/heading copy. Masks each word behind
 * overflow-hidden and animates it up into place.
 */
export function SplitText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.06,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        variants={staggerChildren(stagger, delay)}
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-top pb-[0.1em]"
          >
            <motion.span variants={wordReveal} className="inline-block">
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
