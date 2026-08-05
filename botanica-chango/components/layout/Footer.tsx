"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_SETTLE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MotionLink = motion.create(Link);

export function Footer() {
  const reducedMotion = useReducedMotion();
  const hoverTap = reducedMotion
    ? {}
    : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, transition: { duration: 0.2 } };

  return (
    <footer className="mode-dark relative isolate border-t border-dashed border-line bg-surface">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE_SETTLE }}
        className="flex flex-col gap-45 px-[var(--pad)] pb-45 pt-68"
      >
        <div className="flex flex-col gap-45 md:grid md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-18">
            <span className="voice-heading text-[22px] text-ink">Botanica Chango</span>
            <p className="voice-body max-w-[36ch] text-[18px] leading-[1.35] text-ink/75">
              441 N 7th St, Allentown, PA 18102
            </p>
            <a href="tel:+16107044022" className="voice-label text-label text-ink/80 hover:text-ink">
              (610) 704-4022
            </a>
          </div>

          <div className="flex flex-col gap-14">
            <span className="voice-label text-label text-mute">Pages</span>
            <ul className="flex flex-col gap-10">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <MotionLink
                    href={link.href}
                    className="voice-label inline-block text-label text-ink/80 transition-colors duration-500 hover:text-ink"
                    {...hoverTap}
                  >
                    {link.label}
                  </MotionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-14">
            <span className="voice-label text-label text-mute">Follow</span>
            <ul className="flex flex-col gap-10">
              <li>
                <a
                  href="https://facebook.com/bossladyevileye"
                  target="_blank"
                  rel="noreferrer"
                  className="voice-label inline-block text-label text-ink/80 transition-colors duration-500 hover:text-ink"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/bossladysevileye"
                  target="_blank"
                  rel="noreferrer"
                  className="voice-label inline-block text-label text-ink/80 transition-colors duration-500 hover:text-ink"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-18 border-t border-dashed border-line pt-24 md:flex-row md:items-center">
          <span className="text-legal text-mute">
            © {new Date().getFullYear()} Botanica Chango. All rights reserved.
          </span>
          <span className="text-legal text-mute">Open on Seventh Street.</span>
        </div>
      </motion.div>
    </footer>
  );
}
