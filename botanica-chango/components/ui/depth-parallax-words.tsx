"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/**
 * DepthParallaxWords — per-word depth motion with scale, vertical drift and blur for layered readability.
 * From the animate-text catalog (`depth-parallax-words`).
 */
export interface DepthParallaxWordsProps {
  children: string;
  className?: string;
  /** Delay before the animation starts, in milliseconds. */
  delay?: number;
  /** Per-word stagger, in milliseconds. */
  stagger?: number;
  /** Animate only once the text scrolls into view. */
  triggerOnView?: boolean;
}

const DURATION_S = 0.7;
const MS = 1000;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function DepthParallaxWords({
  children,
  className = "",
  delay = 0,
  stagger = 70,
  triggerOnView = false,
}: DepthParallaxWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const play = (!triggerOnView || inView) && !shouldReduceMotion;
  const words = children.split(" ");

  return (
    <span aria-label={children} className={className} ref={ref}>
      {words.map((word, index) => (
        <motion.span
          // biome-ignore lint/suspicious/noArrayIndexKey: words have no stable id
          key={index}
          animate={
            play
              ? { filter: "blur(0px)", opacity: 1, scale: 1, y: 0 }
              : undefined
          }
          aria-hidden="true"
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { filter: "blur(3px)", opacity: 0, scale: 0.92, y: 18 }
          }
          // The trailing space lives inside the same inline-block as the
          // word (not a separate element) so the browser wraps between
          // whole "word + space" chunks — a standalone space span can
          // strand itself at the start of the next line when text wraps.
          style={{ display: "inline-block", whiteSpace: "pre" }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  delay: delay / MS + (index * stagger) / MS,
                  duration: DURATION_S,
                  ease: EASE,
                }
          }
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
