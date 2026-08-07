"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_SETTLE } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTranslation } from "@/lib/i18n/useTranslation";

const MotionLink = motion.create(Link);

export function Footer() {
  const reducedMotion = useReducedMotion();
  const t = useTranslation();

  const LINKS = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.shop, href: "/products" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];
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
            <span className="voice-heading text-[22px] text-ink">Botanica Chango Spiritual Wonders</span>
            <p className="voice-body max-w-[36ch] text-[18px] leading-[1.35] text-ink/75">
              441 N 7th St, Allentown, PA 18102
            </p>
            <a href="tel:+16107044022" className="voice-label text-label text-ink/80 hover:text-ink">
              (610) 704-4022
            </a>
          </div>

          <div className="flex flex-col gap-14">
            <span className="voice-label text-label text-mute">{t.footer.pages}</span>
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
            <span className="voice-label text-label text-mute">{t.footer.follow}</span>
            <ul className="flex flex-col gap-10">
              <li>
                <a
                  href="https://facebook.com/bossladyevileye"
                  target="_blank"
                  rel="noreferrer"
                  className="voice-label inline-block text-label text-ink/80 transition-colors duration-500 hover:text-ink"
                >
                  {t.footer.facebook}
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/bossladysevileye"
                  target="_blank"
                  rel="noreferrer"
                  className="voice-label inline-block text-label text-ink/80 transition-colors duration-500 hover:text-ink"
                >
                  {t.footer.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-18 border-t border-dashed border-line pt-24 md:flex-row md:items-center">
          <span className="text-legal text-mute">{t.footer.rights(new Date().getFullYear())}</span>
          <span className="text-legal text-mute">{t.footer.openLine}</span>
        </div>
      </motion.div>
    </footer>
  );
}
