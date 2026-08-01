"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const BLOCK_COUNT = 80;
const REPULSION_RADIUS = 8;
const REPULSION_STRENGTH = 0.8;

function FlowBlocks() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const scrollVelocity = useRef(0);
  const lastScroll = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity.current = (currentScroll - lastScroll.current) * 0.01;
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
          (Math.random() - 0.5) * viewport.width * 3,
          (Math.random() - 0.5) * viewport.height * 3,
          (Math.random() - 0.5) * 8
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          -Math.random() * 0.0075 - 0.005,
          (Math.random() - 0.5) * 0.0075
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        scale: Math.random() * 2.5 + 2.0, // chunky: 2.0 to 4.5 units
      });
    }
    return temp;
  }, [viewport]);

  useFrame((state) => {
    if (!meshRef.current) return;
    mouse.current.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    );
    const dummy = new THREE.Object3D();
    const time = state.clock.elapsedTime;
    blocks.forEach((block, i) => {
      const flowX = Math.sin(time * 0.2 + block.position.y * 0.1) * 0.008;
      const flowY = Math.cos(time * 0.15 + block.position.x * 0.1) * 0.005;
      block.velocity.x += flowX;
      block.velocity.y += flowY;
      block.velocity.y += scrollVelocity.current;
      block.velocity.x += scrollVelocity.current * (Math.random() - 0.5) * 2;
      scrollVelocity.current *= 0.92;
      const dist = block.position.distanceTo(mouse.current);
      if (dist < REPULSION_RADIUS) {
        const force =
          Math.pow((REPULSION_RADIUS - dist) / REPULSION_RADIUS, 2) *
          REPULSION_STRENGTH;
        const direction = block.position.clone().sub(mouse.current).normalize();
        block.velocity.add(direction.multiplyScalar(force));
        block.rotationSpeed.x += (Math.random() - 0.5) * 0.15;
        block.rotationSpeed.y += (Math.random() - 0.5) * 0.15;
      }
      block.position.add(block.velocity);
      block.velocity.multiplyScalar(0.985);
      block.rotation.x += block.rotationSpeed.x;
      block.rotation.y += block.rotationSpeed.y;
      block.rotation.z += block.rotationSpeed.z;
      block.rotationSpeed.multiplyScalar(0.96);
      if (block.position.y < -viewport.height * 1.5) {
        block.position.y = viewport.height * 1.5;
        block.position.x = (Math.random() - 0.5) * viewport.width * 3;
      }
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
    // pinned to 1 every frame — 79 of 80 blocks had matrices written but
    // were never drawn, and were reset each frame regardless. args sets
    // the instance count directly since there's no per-child count to derive.
    <instancedMesh ref={meshRef} args={[undefined, undefined, BLOCK_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#dc5000"
        roughness={0.1}
        metalness={1.0}
        emissive="#dc5000"
        emissiveIntensity={3.0}
      />
    </instancedMesh>
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
