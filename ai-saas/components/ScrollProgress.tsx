"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline progress indicator pinned to the top edge — the one place
 * a solid (not dashed) cream line is earned, since it's reporting a
 * value rather than dividing content.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-cream/70"
      style={{ scaleX }}
    />
  );
}
