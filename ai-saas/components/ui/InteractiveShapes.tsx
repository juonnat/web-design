"use client";

import { useEffect, type RefObject } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ShapeKind = "circle" | "square";
type ShapeConfig = { x: number; y: number; size: number; kind: ShapeKind };

// Fixed positions (percent of container) — not randomized, so SSR and the
// client render identical markup and hydration doesn't mismatch.
const SHAPES: ShapeConfig[] = [
  { x: 6, y: 22, size: 30, kind: "circle" },
  { x: 20, y: 68, size: 18, kind: "square" },
  { x: 34, y: 12, size: 22, kind: "circle" },
  { x: 48, y: 58, size: 16, kind: "square" },
  { x: 62, y: 28, size: 26, kind: "circle" },
  { x: 76, y: 74, size: 20, kind: "square" },
  { x: 90, y: 16, size: 24, kind: "circle" },
  { x: 14, y: 88, size: 16, kind: "square" },
  { x: 55, y: 90, size: 20, kind: "circle" },
  { x: 84, y: 48, size: 18, kind: "square" },
];

const REPEL_RADIUS = 160;
const REPEL_STRENGTH = 56;

function Shape({
  config,
  containerRef,
}: {
  config: ShapeConfig;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 16, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 120, damping: 16, mass: 0.6 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function handleMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      const shapeX = rect.left + (config.x / 100) * rect.width;
      const shapeY = rect.top + (config.y / 100) * rect.height;
      const dx = shapeX - e.clientX;
      const dy = shapeY - e.clientY;
      const dist = Math.hypot(dx, dy);
      if (dist < REPEL_RADIUS && dist > 0.01) {
        const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
        rawX.set((dx / dist) * force);
        rawY.set((dy / dist) * force);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    }

    function handleLeave() {
      rawX.set(0);
      rawY.set(0);
    }

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [config, containerRef, rawX, rawY]);

  return (
    <motion.div
      aria-hidden
      style={{
        position: "absolute",
        left: `${config.x}%`,
        top: `${config.y}%`,
        width: config.size,
        height: config.size,
        x,
        y,
      }}
      className={
        config.kind === "circle"
          ? "rounded-full border border-dashed border-cream/15"
          : "border border-dashed border-cream/15"
      }
    />
  );
}

/**
 * Dashed geometric shapes that drift in the background and repel from the
 * cursor. Matches the dashed-circle/square motif already used by Workflow
 * and Pricing — 2D, transform-only, no WebGL. `containerRef` should point
 * at the element that receives real pointer events (this component's own
 * root is pointer-events-none so it never intercepts clicks on real
 * content layered above it).
 */
export function InteractiveShapes({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement | null>;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {SHAPES.map((shape, i) => (
        <Shape key={i} config={shape} containerRef={containerRef} />
      ))}
    </div>
  );
}
