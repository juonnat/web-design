"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/useReducedMotion";

// R3F's Canvas touches WebGL/DOM APIs unavailable during SSR. Hero's own
// canvas (components/hero/Hero.tsx) already solves this with the same
// dynamic + ssr:false pattern — mirrored here rather than rendering the
// scene directly, which server-renders "use client" components too and
// was leaving the footer's canvas blank until hydration reconciled it.
const InteractiveFlowScene = dynamic(
  () => import("./InteractiveFlowScene").then((m) => m.InteractiveFlowScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-shadow animate-pulse" /> }
);

export default function InteractiveFlow() {
  // Read client-side only (window is unavailable during SSR) so the
  // server-rendered and first client-rendered markup match.
  const [isTouch, setIsTouch] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setIsTouch("ontouchstart" in window);
  }, []);

  if (isTouch || reducedMotion) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(220,80,0,0.2),transparent_70%)]" />
    );
  }

  return (
    <div className="absolute inset-0 bg-shadow">
      <InteractiveFlowScene />
    </div>
  );
}
