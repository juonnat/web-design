"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

export function CTABand({
  kicker,
  headline,
  buttons,
}: {
  kicker: string;
  headline: string;
  buttons: { label: string; href: string; variant?: "filled" | "outline" }[];
}) {
  return (
    <section className="mode-dark section flex min-h-[70svh] flex-col items-start justify-center gap-24 bg-surface py-68">
      <Reveal className="flex flex-col gap-24">
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
