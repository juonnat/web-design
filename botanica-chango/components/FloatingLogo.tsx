"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { AssistantChatOverlay } from "@/components/AssistantChat";
import { SmokeWisp } from "@/components/SmokeWisp";
import { useTranslation } from "@/lib/i18n/useTranslation";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/**
 * Bosslady Evil Eye's portrait, perpetually drifting from edge to edge of
 * the viewport — never the same path twice, since every leg's target is
 * freshly randomized (biased toward the opposite half of the screen from
 * wherever it currently is, so it actually crosses rather than wandering
 * in place). Fixed positioning means it rides along as the page scrolls.
 * Disabled under reduced motion, where it just sits still in a corner.
 *
 * Clicking it opens the shop assistant chat (see AssistantChat) rather
 * than navigating anywhere.
 */
export function FloatingLogo() {
  const reducedMotion = useReducedMotion();
  const t = useTranslation();
  const controls = useAnimationControls();
  const posRef = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    const margin = 16;

    function currentSize() {
      return window.innerWidth < 768 ? 56 : 84;
    }

    function randomPoint(fromOppositeHalf: boolean) {
      const size = currentSize();
      const maxX = Math.max(margin, window.innerWidth - size - margin);
      const maxY = Math.max(margin, window.innerHeight - size - margin);
      const midX = window.innerWidth / 2;
      const midY = window.innerHeight / 2;

      let x: number;
      let y: number;
      if (fromOppositeHalf) {
        const comingFromLeft = posRef.current.x < midX;
        const comingFromTop = posRef.current.y < midY;
        x = comingFromLeft
          ? clamp(midX + Math.random() * (maxX - midX), margin, maxX)
          : clamp(Math.random() * (midX - margin), margin, maxX);
        y = comingFromTop
          ? clamp(midY + Math.random() * (maxY - midY), margin, maxY)
          : clamp(Math.random() * (midY - margin), margin, maxY);
      } else {
        x = margin + Math.random() * (maxX - margin);
        y = margin + Math.random() * (maxY - margin);
      }
      return { x, y };
    }

    async function run() {
      const start = randomPoint(false);
      posRef.current = start;
      setReady(true);
      await controls.start({
        opacity: 1,
        x: start.x,
        y: start.y,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      });

      while (!cancelled) {
        const next = randomPoint(true);
        const dist = Math.hypot(next.x - posRef.current.x, next.y - posRef.current.y);
        const duration = clamp(dist / 70, 7, 22);
        await controls.start({
          x: next.x,
          y: next.y,
          transition: { duration, ease: "easeInOut" },
        });
        if (cancelled) return;
        posRef.current = next;
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [reducedMotion, controls]);

  const logo = (
    <Image
      src="/logo.png"
      alt="Bosslady Evil Eye, Botanica Chango Spiritual Wonders"
      width={240}
      height={360}
      className="h-full w-full object-contain object-bottom"
      priority
    />
  );

  const trigger = (
    <button
      type="button"
      onClick={() => setChatOpen(true)}
      aria-label={t.assistant.openAria}
      className="pointer-events-auto block h-full w-full"
    >
      {logo}
    </button>
  );

  if (reducedMotion) {
    return (
      <>
        <div className="fixed bottom-24 right-24 z-40 hidden h-[84px] w-[84px] md:block">{trigger}</div>
        <AssistantChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} />
      </>
    );
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 h-[56px] w-[56px] md:h-[84px] md:w-[84px]"
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={controls}
        style={{ visibility: ready ? "visible" : "hidden" }}
      >
        <div className="relative h-full w-full">
          <SmokeWisp side="left" />
          {trigger}
          <SmokeWisp side="right" />
        </div>
      </motion.div>
      <AssistantChatOverlay open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
