"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A quiet nudge that there's more below the fold — a short dashed
 * stroke that breathes, not an animated mouse-and-wheel icon.
 */
export function ScrollCue() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[var(--pad)] top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-10 sm:flex"
    >
      <span className="voice-label text-legal text-driftwood [writing-mode:vertical-rl]">
        Scroll
      </span>
      <motion.span
        className="w-[1px] bg-border"
        style={{ height: 41 }}
        animate={reducedMotion ? {} : { scaleY: [1, 0.5, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
