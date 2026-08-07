"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage, type Locale } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import { EASE_MASS } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * First-visit language choice — shown once (gated by `needsChoice` in
 * LanguageContext, which checks localStorage) then never again unless the
 * visitor clears storage. Copy is shown bilingually since we don't yet
 * know which language to speak. Dismissing without choosing (Escape or
 * backdrop click) defaults to English, matching the button labels.
 */
export function LanguagePrompt() {
  const { ready, needsChoice, setLocale } = useLanguage();
  const reducedMotion = useReducedMotion();
  const open = ready && needsChoice;
  const t = translations.en.languagePrompt;

  function choose(locale: Locale) {
    setLocale(locale);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            aria-hidden
            className="fixed inset-0 z-[80] bg-ink/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4 }}
            onClick={() => choose("en")}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Choose your language / Elige tu idioma"
            className="mode-dark fixed inset-x-18 top-1/2 z-[90] mx-auto flex w-auto max-w-[440px] -translate-y-1/2 flex-col gap-24 rounded-[var(--radius-card)] border border-dashed border-line bg-surface p-31 text-ink sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
            initial={{ opacity: 0, y: reducedMotion ? 0 : 24, scale: reducedMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 24, scale: reducedMotion ? 1 : 0.97 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: EASE_MASS }}
          >
            <div className="flex items-center gap-14">
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover object-top"
              />
              <span className="voice-label text-label text-mute">{t.eyebrow}</span>
            </div>

            <div className="flex flex-col gap-10">
              <h2 className="voice-heading text-heading-sm text-ink">{t.headline}</h2>
              <p className="voice-body text-[16px] leading-[1.4] text-ink/75">{t.body}</p>
            </div>

            <div className="flex flex-col gap-10 sm:flex-row">
              <button
                type="button"
                autoFocus
                onClick={() => choose("en")}
                className="voice-label flex-1 rounded-[var(--radius-outline)] border border-dashed border-line px-24 py-14 text-center text-label text-ink transition-[border-color,background-color] duration-500 hover:border-accent hover:bg-accent/10"
              >
                {t.english}
              </button>
              <button
                type="button"
                onClick={() => choose("es")}
                className="voice-label flex-1 rounded-[var(--radius-outline)] border border-dashed border-line px-24 py-14 text-center text-label text-ink transition-[border-color,background-color] duration-500 hover:border-accent hover:bg-accent/10"
              >
                {t.spanish}
              </button>
            </div>

            <p className="text-legal text-mute">{t.footnote}</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
