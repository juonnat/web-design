"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EASE_MASS } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const QUOTES = [
  {
    quote:
      "We didn't rebuild our support process for Kiln. We pointed Kiln at the process we already had, and it just started running it.",
    name: "Dana Ferris",
    role: "Head of Ops, Northline",
  },
  {
    quote:
      "The tempering step is the whole product for me. I got to see exactly where it would fail before it ever touched a real ticket.",
    name: "Marco Ude",
    role: "Eng Lead, Fathom",
  },
  {
    quote:
      "First platform where the audit trail was good enough that compliance approved it faster than engineering did.",
    name: "Priya Nathan",
    role: "VP Platform, Verano",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const current = QUOTES[active];
  const reducedMotion = useReducedMotion();
  const hoverTap = reducedMotion
    ? {}
    : { whileHover: { scale: 1.15 }, whileTap: { scale: 0.9 }, transition: { duration: 0.2 } };

  return (
    <motion.section
      id="testimonials"
      data-section="testimonials"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASE_MASS }}
      className="section flex flex-col justify-center gap-45 py-[136px]"
    >
      <SectionLabel index="07" title="Who's running it" />

      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-[6px] -top-[8px] select-none text-[140px] leading-none text-border sm:-top-[16px] sm:text-[200px]"
        >
          &ldquo;
        </span>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: EASE_MASS }}
            className="voice-body relative max-w-[70ch] text-[24px] leading-[1.3] text-cream sm:text-body"
          >
            &ldquo;{current.quote}&rdquo;
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-24 border-t border-dashed border-border pt-24">
        <div className="flex items-center gap-14">
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: EASE_MASS }}
              aria-hidden
              className="voice-label flex h-[41px] w-[41px] shrink-0 items-center justify-center rounded-full border border-dashed border-border text-[13px] text-ember"
            >
              {initials(current.name)}
            </motion.span>
          </AnimatePresence>
          <div>
            <p className="voice-label text-label">{current.name}</p>
            <p className="text-legal text-driftwood">{current.role}</p>
          </div>
        </div>

        <div className="flex gap-10">
          {QUOTES.map((q, i) => (
            <motion.button
              key={q.name}
              type="button"
              aria-label={`Show testimonial from ${q.name}`}
              aria-current={active === i}
              onClick={() => setActive(i)}
              className={cn(
                "h-8 w-8 rounded-full transition-colors duration-500",
                active === i ? "bg-cream" : "bg-border"
              )}
              {...hoverTap}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
