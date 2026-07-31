"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

const CREAM = new THREE.Color("#ffedd7");
const EMBER = new THREE.Color("#dc5000");
const BARK = new THREE.Color("#382416");

/**
 * The forged core: a distorted sphere with an orbiting shell of ember
 * sparks. This is Kiln's centerpiece — an original object, not a
 * floating cube or a generic particle cloud.
 */
export function EmberCore({ reducedMotion }: { reducedMotion: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const sparkGeometry = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const radius = 2.1;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + (Math.random() - 0.5) * 0.3;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const t = state.clock.elapsedTime;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.12;
      coreRef.current.rotation.x = Math.sin(t * 0.15) * 0.15;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.05;
      shellRef.current.rotation.z += delta * 0.03;
    }

    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.03;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.03;

    if (groupRef.current) {
      groupRef.current.rotation.y = pointer.current.x * 0.25;
      groupRef.current.rotation.x = -pointer.current.y * 0.15;
    }

    state.camera.position.x +=
      (pointer.current.x * 0.6 - state.camera.position.x) * 0.04;
    state.camera.position.y +=
      (pointer.current.y * 0.4 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  const scale = Math.min(viewport.width / 8, 1);

  return (
    <group ref={groupRef} scale={scale}>
      <Sphere ref={coreRef} args={[1.35, 128, 128]}>
        <MeshDistortMaterial
          color={BARK}
          emissive={EMBER}
          emissiveIntensity={0.35}
          distort={0.35}
          speed={reducedMotion ? 0 : 1.4}
          roughness={0.25}
          metalness={0.1}
        />
      </Sphere>

      <points ref={shellRef} geometry={sparkGeometry}>
        <pointsMaterial
          size={0.022}
          color={CREAM}
          transparent
          opacity={0.55}
          sizeAttenuation
        />
      </points>

      <pointLight position={[3, 2, 3]} intensity={12} color={EMBER} distance={10} />
      <pointLight position={[-3, -1, -2]} intensity={4} color={CREAM} distance={10} />
    </group>
  );
}
