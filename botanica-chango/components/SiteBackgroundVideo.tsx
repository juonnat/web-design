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

    // React's JSX `muted` prop only sets the initial HTML attribute — it
    // doesn't reliably set the live `.muted` DOM property before this
    // effect's play() call, especially through hydration. Mobile browsers
    // (iOS Safari in particular) require the video to actually be muted
    // at the moment play() runs, or they silently block autoplay and fall
    // back to showing a native tap-to-play button instead of looping.
    video.muted = true;
    video.defaultMuted = true;

    if (reducedMotion) {
      video.pause();
      return;
    }

    // A single play() call right after mount can still lose the race
    // against iOS Safari's autoplay eligibility check — if metadata isn't
    // ready yet, the attempt is silently rejected and Safari falls back to
    // showing its native tap-to-play affordance permanently, even though
    // the video is muted+playsinline. Retrying as buffering state changes,
    // plus once more on the very first touch/scroll/click anywhere on the
    // page (a real user gesture always clears any autoplay block), makes
    // sure the video actually starts instead of getting stuck on that icon.
    const attemptPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    attemptPlay();
    video.addEventListener("loadedmetadata", attemptPlay);
    video.addEventListener("canplay", attemptPlay);
    window.addEventListener("touchstart", attemptPlay, { once: true, passive: true });
    window.addEventListener("scroll", attemptPlay, { once: true, passive: true });
    window.addEventListener("click", attemptPlay, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", attemptPlay);
      video.removeEventListener("canplay", attemptPlay);
      window.removeEventListener("touchstart", attemptPlay);
      window.removeEventListener("scroll", attemptPlay);
      window.removeEventListener("click", attemptPlay);
    };
  }, [reducedMotion]);

  return (
    <video
      ref={(el) => {
        ref.current = el;
        // Set as early as possible — during commit, before the browser gets
        // a chance to paint or evaluate autoplay eligibility — rather than
        // waiting for the effect above to run after paint.
        if (el) {
          el.muted = true;
          el.defaultMuted = true;
        }
      }}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover"
      src="/background.mp4"
      autoPlay={!reducedMotion}
      muted
      loop
      playsInline
      preload="auto"
      webkit-playsinline="true"
    />
  );
}
