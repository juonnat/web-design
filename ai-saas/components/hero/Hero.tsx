"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { StaticEmberGlow } from "./StaticEmberGlow";
import { ScrollCue } from "./ScrollCue";
import { EASE_MASS } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false, loading: () => <StaticEmberGlow /> }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -150]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className="section relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-45 pt-[136px]"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <CanvasErrorBoundary fallback={<StaticEmberGlow />}>
          <HeroCanvas />
        </CanvasErrorBoundary>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-shadow via-transparent to-shadow/40" />

      <div className="relative z-10 flex flex-col gap-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE_MASS, delay: 0.2 }}
          className="voice-label text-label text-ember"
        >
          Agent runtime · Plate 01
        </motion.p>

        <h1 className="max-w-[16ch] text-[13vw] leading-[0.88] sm:text-[9vw] lg:text-display">
          <SplitText
            as="span"
            text="Software that"
            className="block"
            delay={0.3}
          />
          <SplitText
            as="span"
            text="finishes itself."
            className="block text-cream/60"
            delay={0.5}
          />
        </h1>

        <div className="flex flex-col items-start gap-31 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_MASS, delay: 0.9 }}
            className="voice-body max-w-[46ch] text-[20px] leading-[1.3] text-cream/85 sm:text-[24px]"
          >
            Kiln is where agent workflows get designed, tempered, and put
            to work — so the process runs the same way at 2am as it does
            in the demo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_MASS, delay: 1.1 }}
            className="flex flex-col items-start gap-10"
          >
            <MagneticButton>
              <Button href="#cta" variant="filled">
                Start forging
              </Button>
            </MagneticButton>
            <span className="text-legal text-driftwood">
              Free to start · No credit card
            </span>
          </motion.div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}
