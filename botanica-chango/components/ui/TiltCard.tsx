"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * A light 3D tilt toward the cursor — a few degrees, not a game engine —
 * plus a soft cream spotlight that follows the same cursor position. No
 * shadow is added on hover; depth here comes from the rotation and the
 * spotlight, per the house style's "no shadows, anywhere."
 */
export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.4 });

  const rotateX = useTransform(springY, [0, 1], [4, -4]);
  const rotateY = useTransform(springX, [0, 1], [-4, 4]);
  const spotlight = useMotionTemplate`radial-gradient(circle 220px at ${useTransform(
    springX,
    (v) => `${v * 100}%`
  )} ${useTransform(springY, (v) => `${v * 100}%`)}, rgba(255,237,215,0.08), transparent 80%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
    setHovering(false);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      style={
        reducedMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 800 }
      }
      className={cn("relative isolate", className)}
    >
      {!reducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] transition-opacity duration-500"
          style={{ background: spotlight, opacity: hovering ? 1 : 0 }}
        />
      )}
      {children}
    </motion.div>
  );
}
