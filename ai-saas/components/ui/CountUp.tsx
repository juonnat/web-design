"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

function formatValue(n: number, decimals: number, grouped: boolean) {
  const fixed = n.toFixed(decimals);
  if (!grouped) return fixed;
  const [int, dec] = fixed.split(".");
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return dec ? `${withCommas}.${dec}` : withCommas;
}

/**
 * Counts up from 0 to the numeric portion of `value` once it scrolls into
 * view. Non-numeric prefix/suffix (%, s, +, commas) is preserved as-is.
 * Renders the final value statically under reduced motion or if the string
 * has no leading number.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();
  const match = value.match(/^([\d,]*\.?\d+)/);

  useEffect(() => {
    if (!inView || !ref.current || !match || reducedMotion) return;

    const numStr = match[1];
    const target = parseFloat(numStr.replace(/,/g, ""));
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const grouped = numStr.includes(",");
    const suffix = value.slice(match[0].length);
    const el = ref.current;

    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        el.textContent = formatValue(v, decimals, grouped) + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, reducedMotion, value, match]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
