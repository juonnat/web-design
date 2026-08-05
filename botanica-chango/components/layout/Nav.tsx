"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useAnimationFrame } from "framer-motion";
import { EASE_MASS } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const PHONE = "(610) 704-4022";
const PHONE_HREF = "tel:+16107044022";

const MotionLink = motion.create(Link);

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 9h3V6h-3c-1.657 0-3 1.343-3 3v2H8v3h3v7h3v-7h3l1-3h-4v-2c0-.552.448-1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();

  // Sampling window.scrollY once per animation frame sidesteps Lenis's
  // intercepted scroll dispatch (see SmoothScroll) — a native `scroll`
  // listener isn't reliable while Lenis is driving the scroll position.
  useAnimationFrame(() => {
    const next = window.scrollY > 50;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const hoverTap = reducedMotion
    ? {}
    : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { duration: 0.2 } };

  return (
    <motion.header
      animate={{
        backgroundColor: scrolled ? "rgba(250, 246, 238, 0.85)" : "rgba(250, 246, 238, 0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[var(--pad)] py-18"
    >
      <MotionLink href="/" className="voice-heading text-[20px] text-ink" {...hoverTap}>
        Botanica Chango
      </MotionLink>

      <nav className="hidden md:flex items-center gap-31" aria-label="Primary">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <MotionLink
              key={link.href}
              href={link.href}
              className="voice-label relative pb-8 text-label text-ink/80 transition-colors duration-500 hover:text-ink"
              {...hoverTap}
            >
              {link.label}
              {active && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 border-t border-dashed border-accent"
                  transition={{ duration: 0.6, ease: EASE_MASS }}
                />
              )}
            </MotionLink>
          );
        })}
      </nav>

      <div className="hidden md:flex items-center gap-18">
        <a
          href="https://facebook.com/bossladyevileye"
          target="_blank"
          rel="noreferrer"
          aria-label="Botanica Chango on Facebook"
          className="text-ink/70 transition-colors duration-500 hover:text-ink"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://instagram.com/bossladysevileye"
          target="_blank"
          rel="noreferrer"
          aria-label="Botanica Chango on Instagram"
          className="text-ink/70 transition-colors duration-500 hover:text-ink"
        >
          <InstagramIcon />
        </a>
        <motion.a
          href={PHONE_HREF}
          className="voice-label rounded-[var(--radius-outline)] border border-dashed border-line px-24 py-12 text-label text-ink transition-colors duration-500 hover:border-ink"
          {...hoverTap}
        >
          {PHONE}
        </motion.a>
      </div>

      <motion.button
        type="button"
        className="voice-label text-label text-ink md:hidden"
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
            className="absolute left-0 right-0 top-full flex flex-col gap-18 border-b border-dashed border-line bg-surface px-[var(--pad)] py-24 md:hidden"
          >
            {LINKS.map((link) => (
              <MotionLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="voice-label text-label text-ink"
                {...hoverTap}
              >
                {link.label}
              </MotionLink>
            ))}
            <a href={PHONE_HREF} className="voice-label text-label text-ink">
              {PHONE}
            </a>
            <div className="flex items-center gap-18 pt-8">
              <a
                href="https://facebook.com/bossladyevileye"
                target="_blank"
                rel="noreferrer"
                aria-label="Botanica Chango on Facebook"
                className="text-ink/70"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://instagram.com/bossladysevileye"
                target="_blank"
                rel="noreferrer"
                aria-label="Botanica Chango on Instagram"
                className="text-ink/70"
              >
                <InstagramIcon />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
