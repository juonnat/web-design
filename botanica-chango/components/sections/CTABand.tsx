"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Waves } from "@/components/ui/wave-background";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function CTABand({
  kicker,
  headline,
  buttons,
}: {
  kicker: string;
  headline: string;
  buttons: { label: string; href: string; variant?: "filled" | "outline" }[];
}) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="mode-dark section relative flex min-h-[70svh] flex-col items-start justify-center gap-24 overflow-hidden bg-surface py-68">
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
          <Waves
            className="h-full w-full"
            backgroundColor="var(--c-surface)"
            strokeColor="var(--c-accent)"
          />
        </div>
      )}

      <Reveal className="relative z-10 flex flex-col gap-24">
        <motion.span className="voice-label text-label text-mute">{kicker}</motion.span>
        <h2 className="voice-heading max-w-[18ch] text-heading text-ink">{headline}</h2>
        <div className="flex flex-wrap gap-18">
          {buttons.map((b) => (
            <Button key={b.label} href={b.href} variant={b.variant ?? "outline"}>
              {b.label}
            </Button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
