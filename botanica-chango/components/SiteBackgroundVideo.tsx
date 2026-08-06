"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A single looping video fixed behind the entire site — every page's
 * content scrolls over it, but the video itself never moves. Each
 * .section's background is a semi-transparent tint (see globals.css)
 * rather than fully opaque, so this stays visible through the whole
 * page instead of being hidden behind solid section fills.
 */
export function SiteBackgroundVideo() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <video
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover"
      src="/background.mp4"
      autoPlay={!reducedMotion}
      muted
      loop
      playsInline
    />
  );
}
