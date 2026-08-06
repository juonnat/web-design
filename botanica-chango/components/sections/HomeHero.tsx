"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerChildren } from "@/lib/motion";
import DepthParallaxWords from "@/components/ui/depth-parallax-words";
import { Button } from "@/components/ui/Button";

type HeroButton = { label: string; href: string; variant?: "filled" | "outline" };

/**
 * The home page's own hero — deliberately distinct from every other
 * page's PageBanner: no Waves, no mouse interactivity. It's transparent
 * (no .section background fill), so the fixed site background video
 * shows straight through at full clarity, unfiltered by any tint.
 */
export function HomeHero({
  kicker,
  headline,
  buttons = [],
}: {
  kicker: string;
  headline: string;
  buttons?: HeroButton[];
}) {
  return (
    <section className="mode-dark relative flex min-h-[100svh] flex-col items-start justify-center gap-24 overflow-hidden px-[var(--pad)] pt-[100px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(75deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 45%, transparent 75%)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren(0.12, 0.1)}
        className="relative flex max-w-[900px] flex-col gap-24"
      >
        <motion.span variants={fadeUp} className="voice-label text-label text-mute">
          {kicker}
        </motion.span>

        <h1 className="voice-heading text-display text-ink">
          <DepthParallaxWords>{headline}</DepthParallaxWords>
        </h1>

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
