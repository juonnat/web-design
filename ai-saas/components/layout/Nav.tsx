"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useUIStore, type SectionId } from "@/store/useUIStore";
import { EASE_MASS } from "@/lib/motion";

const LINKS: { id: SectionId; label: string; href: string }[] = [
  { id: "solution", label: "Platform", href: "#solution" },
  { id: "workflow", label: "Workflow", href: "#workflow" },
  { id: "pricing", label: "Pricing", href: "#pricing" },
  { id: "faq", label: "FAQ", href: "#faq" },
];

export function Nav() {
  const activeSection = useUIStore((s) => s.activeSection);
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--pad)] py-18">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140px] bg-gradient-to-b from-shadow via-shadow/70 to-transparent"
      />
      <Link href="#hero" className="voice-label text-label text-cream">
        Kiln
      </Link>

      <nav className="hidden md:flex items-center gap-31" aria-label="Primary">
        {LINKS.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className="voice-label relative pb-8 text-label text-cream/80 transition-colors duration-500 hover:text-cream"
          >
            {link.label}
            {activeSection === link.id && (
              <motion.span
                layoutId="nav-indicator"
                className="absolute -bottom-1 left-0 right-0 border-t border-dashed border-cream"
                transition={{ duration: 0.6, ease: EASE_MASS }}
              />
            )}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="voice-label text-label text-cream md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Close" : "Menu"}
      </button>

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
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className="voice-label text-label text-cream"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
