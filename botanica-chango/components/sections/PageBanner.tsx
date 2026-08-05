"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerChildren } from "@/lib/motion";
import { SplitText } from "@/components/ui/SplitText";
import { Button } from "@/components/ui/Button";

type BannerButton = { label: string; href: string; variant?: "filled" | "outline" };

/**
 * Full-viewport void-mode banner: deep-green canvas with a soft purple
 * glow standing in for the reference's live hero object (see /CLAUDE.md
 * "Motion" — no WebGL here, so the feel carries through a slow, damped
 * glow drift instead). Swap in a real store photo behind `motif` once
 * Bosslady sends one — this is deliberately abstract, not a stock photo.
 */
export function PageBanner({
  kicker,
  headline,
  subhead,
  buttons = [],
}: {
  kicker: string;
  headline: string;
  subhead?: string;
  buttons?: BannerButton[];
}) {
  return (
    <section className="mode-dark section relative flex min-h-[100svh] flex-col items-start justify-center gap-24 overflow-hidden bg-surface pt-[100px]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(149, 90, 201, 0.35), transparent 55%), radial-gradient(circle at 20% 80%, rgba(150, 108, 167, 0.22), transparent 60%)",
        }}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren(0.12, 0.1)}
        className="flex max-w-[900px] flex-col gap-24"
      >
        <motion.span variants={fadeUp} className="voice-label text-label text-mute">
          {kicker}
        </motion.span>
        <SplitText
          as="h1"
          text={headline}
          className="voice-heading text-display text-ink"
        />
        {subhead && (
          <motion.p variants={fadeUp} className="voice-body max-w-[54ch] text-[20px] leading-[1.3] text-ink/80 md:text-body">
            {subhead}
          </motion.p>
        )}
        {buttons.length > 0 && (
          <motion.div variants={fadeUp} className="flex flex-wrap gap-18 pt-10">
            {buttons.map((b) => (
              <Button key={b.label} href={b.href} variant={b.variant ?? "outline"}>
                {b.label}
              </Button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
