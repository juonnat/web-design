"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { EmberCore } from "./EmberCore";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function HeroCanvas() {
  const reducedMotion = useReducedMotion();
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
      aria-hidden="true"
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(1.5)}
      />
      <ambientLight intensity={0.15} />
      <EmberCore reducedMotion={reducedMotion} />
      {!reducedMotion && (
        <EffectComposer>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.9} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
