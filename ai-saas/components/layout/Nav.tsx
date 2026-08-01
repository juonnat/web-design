"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import { useUIStore, type SectionId } from "@/store/useUIStore";
import { EASE_MASS } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LINKS: { id: SectionId; label: string; href: string }[] = [
  { id: "solution", label: "Platform", href: "#solution" },
  { id: "workflow", label: "Workflow", href: "#workflow" },
  { id: "pricing", label: "Pricing", href: "#pricing" },
  { id: "faq", label: "FAQ", href: "#faq" },
];

const MotionLink = motion.create(Link);

export function Nav() {
  const activeSection = useUIStore((s) => s.activeSection);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();

  // Neither a native `scroll` listener nor an untargeted useScroll() fires
  // reliably here: Lenis (see SmoothScroll) intercepts wheel input and
  // animates scroll position without dispatching native scroll events.
  // Sampling window.scrollY once per animation frame sidesteps event
  // dispatch entirely and stays correct regardless of what's driving scroll.
  useAnimationFrame(() => {
    const next = window.scrollY > 50;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  // Hover/tap micro-interactions are skipped under reduced motion, matching
  // MagneticButton's precedent elsewhere in this file's family.
  const hoverTap = reducedMotion
    ? {}
    : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { duration: 0.2 } };

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(16, 9, 4, 0.7)" : "rgba(16, 9, 4, 0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--pad)] py-18"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140px] bg-gradient-to-b from-shadow via-shadow/70 to-transparent"
      />
      <MotionLink
        href="#hero"
        className="voice-label text-label text-cream"
        {...hoverTap}
      >
        Kiln
      </MotionLink>

      <nav className="hidden md:flex items-center gap-31" aria-label="Primary">
        {LINKS.map((link) => (
          <MotionLink
            key={link.id}
            href={link.href}
            className="voice-label relative pb-8 text-label text-cream/80 transition-colors duration-500 hover:text-cream"
            {...hoverTap}
          >
            {link.label}
            {activeSection === link.id && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute -bottom-1 left-0 right-0 border-t border-dashed border-cream"
                transition={{ duration: 0.6, ease: EASE_MASS }}
              />
            )}
          </MotionLink>
        ))}
      </nav>

      <motion.button
        type="button"
        className="voice-label text-label text-cream md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        {...hoverTap}
      >
        {open ? "Close" : "Menu"}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Primary"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE_MASS }}
            className="absolute left-0 right-0 top-full flex flex-col gap-18 border-b border-dashed border-border bg-shadow px-[var(--pad)] py-24 md:hidden"
          >
            {LINKS.map((link) => (
              <MotionLink
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className="voice-label text-label text-cream"
                {...hoverTap}
              >
                {link.label}
              </MotionLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
