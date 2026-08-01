"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const BLOCK_COUNT = 60; // fewer = less chaos, more premium
const REPULSION_RADIUS = 6; // smaller = more subtle
const REPULSION_STRENGTH = 0.5; // softer punch

function FlowBlocks() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const scrollVelocity = useRef(0);
  const lastScroll = useRef(0);
  const { viewport } = useThree();

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#dc5000",
        roughness: 0.1,
        metalness: 1.0,
        emissive: "#dc5000",
        emissiveIntensity: 2.5,
      }),
    []
  );

  // Invisible bounds keep blocks from drifting into the abyss.
  const bounds = useMemo(
    () => ({ x: viewport.width * 0.8, y: viewport.height * 0.8, z: 6 }),
    [viewport]
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      // Smoother: add to (not replace) velocity, and reduce scroll impact.
      scrollVelocity.current += (currentScroll - lastScroll.current) * 0.002;
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
          (Math.random() - 0.5) * bounds.x,
          (Math.random() - 0.5) * bounds.y,
          (Math.random() - 0.5) * bounds.z
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005, // slower rotation
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005
        ),
        scale: Math.random() * 1.5 + 1.5, // 1.5 to 3.0
      });
    }
    return temp;
  }, [bounds]);

  useFrame((state) => {
    if (!meshRef.current) return;
    mouse.current.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    );
    const dummy = new THREE.Object3D();
    const time = state.clock.elapsedTime;

    // Smooth damping: scroll velocity fades out each frame rather than
    // being replaced wholesale, so a burst of scroll doesn't snap blocks.
    scrollVelocity.current *= 0.88;

    blocks.forEach((block, i) => {
      // Gentle sine-wave current instead of a sharp, chaotic push.
      const flowStrength = 0.003;
      const flowX = Math.sin(time * 0.15 + block.position.y * 0.05) * flowStrength;
      const flowY = Math.cos(time * 0.12 + block.position.x * 0.05) * flowStrength;
      const flowZ = Math.sin(time * 0.1 + i * 0.1) * flowStrength * 0.5;
      block.velocity.x += flowX;
      block.velocity.y += flowY;
      block.velocity.z += flowZ;

      block.velocity.y += scrollVelocity.current;
      block.velocity.x += scrollVelocity.current * 0.3;

      const dist = block.position.distanceTo(mouse.current);
      if (dist < REPULSION_RADIUS) {
        const force =
          Math.pow((REPULSION_RADIUS - dist) / REPULSION_RADIUS, 1.5) *
          REPULSION_STRENGTH *
          0.6;
        const direction = block.position.clone().sub(mouse.current).normalize();
        block.velocity.add(direction.multiplyScalar(force));
      }

      // Invisible walls: nudge back in rather than hard-clamping, so the
      // bounce reads as containment, not a wall collision.
      const boundsForce = 0.02;
      if (Math.abs(block.position.x) > bounds.x) {
        block.velocity.x -= Math.sign(block.position.x) * boundsForce;
      }
      if (Math.abs(block.position.y) > bounds.y) {
        block.velocity.y -= Math.sign(block.position.y) * boundsForce;
      }
      if (Math.abs(block.position.z) > bounds.z) {
        block.velocity.z -= Math.sign(block.position.z) * boundsForce;
      }

      block.position.add(block.velocity);
      // Heavy damping — syrup, not chaos.
      block.velocity.multiplyScalar(0.96);

      block.rotation.x += block.rotationSpeed.x;
      block.rotation.y += block.rotationSpeed.y;
      block.rotation.z += block.rotationSpeed.z;
      block.rotationSpeed.multiplyScalar(0.98);

      dummy.position.copy(block.position);
      dummy.rotation.copy(block.rotation);
      dummy.scale.setScalar(block.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    // A raw instancedMesh, not drei's <Instances>/<Instance> — that wrapper
    // ties its render count to the number of mounted <Instance> children
    // (drei/core/Instances.js: count = Math.min(limit, range ?? limit,
    // instances.length)) and overwrites the buffer from each <Instance>'s
    // own transform every frame. With a single <Instance/> child driven by
    // manual setMatrixAt calls instead of per-instance props, count was
    // pinned to 1 every frame — all but one block had matrices written but
    // were never drawn, and were reset each frame regardless.
    //
    // geometry/material are constructed directly and passed via args
    // instead of args={[undefined, undefined, BLOCK_COUNT]} + JSX children —
    // that pattern left the mesh with no geometry at actual construction
    // time (confirmed via a diagnostic: a plain <mesh> with the same
    // geometry/material at the same position rendered fine, while this
    // instancedMesh with JSX-attached children after construction did not).
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, BLOCK_COUNT]}
      frustumCulled={false}
    />
  );
}

function Scene() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { viewport } = useThree();
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        5
      );
      lightRef.current.intensity = 12 + Math.sin(state.clock.elapsedTime * 3) * 2;
    }
  });
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight
        ref={lightRef}
        color="#dc5000"
        intensity={12}
        distance={30}
        decay={1}
      />
      <FlowBlocks />
    </>
  );
}

export function InteractiveFlowScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 65 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene />
    </Canvas>
  );
}
