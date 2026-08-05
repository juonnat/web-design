"use client";
import dynamic from "next/dynamic";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three-stdlib";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

const BLOCK_COUNT = 24;
const REPULSION_RADIUS = 4.5;
const REPULSION_STRENGTH = 0.25;
const SEPARATION_DISTANCE = 3.2;
const SEPARATION_STRENGTH = 0.02;
const MAX_SCROLL_VELOCITY = 0.4; // caps a scroll burst so blocks can't fly off-frame

function FlowBlocks() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const mouse = useRef(new THREE.Vector3(1000, 1000, 0));
  const scrollVelocity = useRef(0);
  const lastScroll = useRef(0);
  const { viewport } = useThree();
  const BOUNDS = { x: viewport.width * 0.6, y: viewport.height * 0.6, z: 4 };

  // Same material language as Hero's EmberCore (components/hero/EmberCore.tsx):
  // a dark bark-brown base carrying the glow as emissive, at restrained
  // intensity. A metalness:1/roughness:0.02 mirror with no environment map
  // has no diffuse response — unlit faces render pure black and lit faces
  // blow out, washing the whole canvas out instead of reading as small
  // ember-lit blocks in a dark void. Confirmed by direct screenshot testing
  // in this repo's history (see components/ui/InteractiveFlowScene.tsx, now
  // deleted, and the "fix: smooth/contained flow physics" commit).
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 4, 0.15), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#382416",
        roughness: 0.4,
        metalness: 0.35,
        emissive: "#dc5000",
        // 0.4 (plus a 2.5-intensity point light at close range, see below)
        // rendered every block as a near-solid saturated red-orange fill —
        // a wash, not the "small ember-lit blocks in a dark void" this
        // comment already promised. Cut hard so the base block reads dark
        // bark-brown at rest and only picks up ember when it's genuinely
        // near the light/cursor.
        emissiveIntensity: 0.05,
      }),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Clamped so a fast scroll burst can't inject enough velocity to fling
      // blocks off-frame faster than damping can recover them.
      scrollVelocity.current = THREE.MathUtils.clamp(
        scrollVelocity.current + (currentScroll - lastScroll.current) * 0.001,
        -MAX_SCROLL_VELOCITY,
        MAX_SCROLL_VELOCITY
      );
      lastScroll.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blocks = useMemo(() => {
    const temp = [];
    for (let i = 0; i < BLOCK_COUNT; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * BOUNDS.x * 1.5,
          // Biased to the bottom half of the frame: the footer's nav grid
          // (links, headings) lives in the top band, and blocks drifting
          // through it read as clutter over readable text.
          (Math.random() * 0.55 - 0.75) * BOUNDS.y * 1.5,
          (Math.random() - 0.5) * BOUNDS.z * 1.5
        ),
        velocity: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002
        ),
        // Spec had this at 2.2-3.2 — with 40 blocks in a ~9x5.6 unit bounds
        // that's enough overlap to cover almost the entire frame, which is
        // why it still read as a wash even with the material/lighting fixed
        // and postprocessing removed. Shrunk so blocks read as distinct
        // objects with the dark canvas visible between them.
        scale: Math.random() * 0.35 + 0.4,
        noiseOffset: Math.random() * 1000,
      });
    }
    return temp;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport]);

  useFrame((state) => {
    if (!meshRef.current) return;
    mouse.current.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0);
    const dummy = new THREE.Object3D();
    const time = state.clock.elapsedTime;
    scrollVelocity.current *= 0.92;

    blocks.forEach((block, i) => {
      const n1 = Math.sin(time * 0.08 + block.noiseOffset + block.position.y * 0.1) * 0.003;
      const n2 = Math.cos(time * 0.06 + block.noiseOffset + block.position.x * 0.1) * 0.003;
      block.velocity.x += n1;
      block.velocity.y += n2;
      block.velocity.z += Math.sin(time * 0.1 + i) * 0.0015;
      block.velocity.y += scrollVelocity.current;
      block.velocity.x += scrollVelocity.current * 0.15;

      const distToMouse = block.position.distanceTo(mouse.current);
      if (distToMouse < REPULSION_RADIUS) {
        const force = Math.pow(1 - distToMouse / REPULSION_RADIUS, 3) * REPULSION_STRENGTH;
        const direction = block.position.clone().sub(mouse.current).normalize();
        block.velocity.add(direction.multiplyScalar(force));
      }

      const separationForce = new THREE.Vector3(0, 0, 0);
      let neighborCount = 0;
      for (let j = 0; j < blocks.length; j++) {
        if (i === j) continue;
        const other = blocks[j];
        const dist = block.position.distanceTo(other.position);
        if (dist < SEPARATION_DISTANCE && dist > 0.01) {
          const pushDir = block.position.clone().sub(other.position).normalize();
          const pushStrength = Math.pow((SEPARATION_DISTANCE - dist) / SEPARATION_DISTANCE, 2);
          separationForce.add(pushDir.multiplyScalar(pushStrength));
          neighborCount++;
        }
      }
      if (neighborCount > 0) {
        separationForce.divideScalar(neighborCount);
        block.velocity.add(separationForce.multiplyScalar(SEPARATION_STRENGTH));
      }

      const boundsForce = 0.005;
      block.velocity.x -= Math.sign(block.position.x) * Math.max(0, Math.abs(block.position.x) - BOUNDS.x) * boundsForce;
      block.velocity.y -= Math.sign(block.position.y) * Math.max(0, Math.abs(block.position.y) - BOUNDS.y) * boundsForce;
      block.velocity.z -= Math.sign(block.position.z) * Math.max(0, Math.abs(block.position.z) - BOUNDS.z) * boundsForce;

      block.position.add(block.velocity);
      block.velocity.multiplyScalar(0.92);

      block.rotation.x += block.rotationSpeed.x;
      block.rotation.y += block.rotationSpeed.y;
      block.rotation.z += block.rotationSpeed.z;

      dummy.position.copy(block.position);
      dummy.rotation.copy(block.rotation);
      dummy.scale.setScalar(block.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // A raw instancedMesh, not drei's <Instances>/<Instance> — that wrapper
  // ties its render count to the number of mounted <Instance> children and
  // overwrites the buffer from each <Instance>'s own transform every frame.
  // A single bare <Instance/> driven by manual setMatrixAt calls pins count
  // to 1 every frame — all but one block get matrices written but are never
  // drawn. This is the exact bug root-caused in this repo's WebGL footer
  // history; geometry/material are constructed directly via useMemo and
  // passed through args instead.
  return <instancedMesh ref={meshRef} args={[geometry, material, BLOCK_COUNT]} frustumCulled={false} />;
}

function Scene() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 5);
      lightRef.current.intensity = 0.55 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });
  return (
    <>
      <color attach="background" args={["#100904"]} />
      <ambientLight intensity={0.1} />
      {/* distance:25 with decay:1.5 barely falls off across this scene's
          ~9-16 unit span, so the light was lighting every block near-evenly
          instead of just the ones the cursor is near -- the whole point of
          a repulsion light. Pulled the reach and intensity in so it reads
          as a small local glow instead of a scene-wide fill. */}
      <pointLight ref={lightRef} color="#dc5000" intensity={0.55} distance={5.5} decay={2} />
      <FlowBlocks />
    </>
  );
}

function InteractiveFlowComponent() {
  // Read client-side only (window is unavailable during SSR) so the
  // server-rendered and first client-rendered markup match — matches this
  // codebase's existing pattern (lib/useReducedMotion.ts).
  const [isTouch, setIsTouch] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setIsTouch("ontouchstart" in window);
  }, []);

  if (isTouch || reducedMotion) {
    return <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(220,80,0,0.2),transparent_70%)]" />;
  }

  return (
    <div className="absolute inset-0 bg-shadow">
      {/* No EffectComposer here. With 40 lit blocks spread across the whole
          frame (unlike Hero's one centered object), Bloom accumulates across
          many sources into a frame-wide wash no matter how hard the
          threshold/intensity are tuned — confirmed across three rounds of
          tuning, the last of which still washed the canvas out and stalled
          the software-GL test renderer for 3+ minutes on the 4-pass chain
          (Bloom + ChromaticAberration + Noise + Vignette). The tuned
          material/lighting below already reads correctly without it, and
          the page already has a global grain overlay
          (components/GrainOverlay.tsx), so a second per-scene Noise pass
          was redundant anyway. */}
      <Canvas camera={{ position: [0, 0, 9], fov: 55 }} dpr={[1, 2]} gl={{ alpha: false, antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}

const InteractiveFlow = dynamic(() => Promise.resolve(InteractiveFlowComponent), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-shadow" />,
});
export default InteractiveFlow;
