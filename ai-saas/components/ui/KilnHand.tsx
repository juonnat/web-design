"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

function Hand() {
  const handRef = useRef<THREE.Group>(null!);
  const { viewport, mouse } = useThree();
  useFrame(() => {
    if (!handRef.current) return;
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (-mouse.y * viewport.height) / 10;
    handRef.current.rotation.y = THREE.MathUtils.lerp(handRef.current.rotation.y, targetX, 0.08);
    handRef.current.rotation.x = THREE.MathUtils.lerp(handRef.current.rotation.x, targetY, 0.08);
  });
  const skin = new THREE.MeshStandardMaterial({ color: "#100904", roughness: 0.6, metalness: 0.2 });
  return (
    <group ref={handRef} scale={1.3}>
      <mesh position={[0, -0.2, 0]} material={skin}><boxGeometry args={[0.6, 0.8, 0.25]} /></mesh>
      <mesh position={[-0.45, -0.1, 0.1]} rotation={[0, 0, 0.5]} material={skin}><capsuleGeometry args={[0.12, 0.4, 4, 8]} /></mesh>
      <mesh position={[0.35, 0.2, 0]} rotation={[0, 0, -0.2]} material={skin}><capsuleGeometry args={[0.1, 0.6, 4, 8]} /></mesh>
      <mesh position={[0.1, 0.3, 0]} material={skin}><capsuleGeometry args={[0.1, 0.7, 4, 8]} /></mesh>
      <mesh position={[-0.15, 0.3, 0]} material={skin}><capsuleGeometry args={[0.1, 0.65, 4, 8]} /></mesh>
      <mesh position={[-0.4, 0.15, 0]} rotation={[0, 0, 0.3]} material={skin}><capsuleGeometry args={[0.09, 0.5, 4, 8]} /></mesh>
    </group>
  );
}

function KilnDisc() {
  const discRef = useRef<THREE.Mesh>(null!);
  const { mouse, viewport } = useThree();
  useFrame(() => {
    if (!discRef.current) return;
    discRef.current.rotation.y = THREE.MathUtils.lerp(discRef.current.rotation.y, (mouse.x * viewport.width) / 15, 0.05);
    discRef.current.rotation.x = THREE.MathUtils.lerp(discRef.current.rotation.x, (-mouse.y * viewport.height) / 15, 0.05);
  });
  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.25}>
      <mesh ref={discRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.18, 64]} />
        <meshStandardMaterial color="#dc5000" emissive="#dc5000" emissiveIntensity={1} roughness={0.25} metalness={0.6} />
      </mesh>
    </Float>
  );
}

function Scene() {
  const lightRef = useRef<THREE.SpotLight>(null!);
  const { viewport, mouse } = useThree();
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.lerp(
        new THREE.Vector3((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2 + 3, 5),
        0.1
      );
    }
  });
  return (
    <>
      <color attach="background" args={["#100904"]} />
      <ambientLight intensity={0.25} />
      <spotLight ref={lightRef} angle={0.4} penumbra={1} intensity={2} color="#ffedd7" />
      <pointLight position={[0, 0, 3]} color="#dc5000" intensity={1.5} distance={8} />
      {/* Cheap stand-ins for the removed Environment's image-based lighting:
          a couple of fixed rim/fill lights instead of an HDR fetch + PMREM
          generation, which stalled the whole Suspense-wrapped scene (this
          component included) under this sandbox's software GL renderer for
          well over 30s with no error — R3F's Canvas suspends its entire
          child tree while Environment's texture loads/processes. */}
      <pointLight position={[-2, 1, 2]} color="#ffedd7" intensity={0.6} distance={10} />
      <pointLight position={[2, -1, -2]} color="#dc5000" intensity={0.4} distance={10} />
      <group position={[0, -0.15, 0]} scale={0.7}>
        <Hand />
        <KilnDisc />
      </group>
      {/* Bloom paired with a Vignette to contain it, and no DepthOfField/
          Noise — those plus ContactShadows were the other expensive passes
          contributing to the same stall, disproportionate for a small
          decorative badge. */}
      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.4} luminanceSmoothing={0.9} />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

function KilnHandComponent() {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) {
    return <div className="absolute inset-0 h-full w-full bg-shadow" />;
  }
  return (
    <div className="absolute inset-0 h-full w-full">
      {/* This canvas fills the whole section (Solution.tsx mounts it as a
          full-bleed background, not inside the small dashed circle — that
          circle is a separate decorative element layered on top). Camera
          pulled back further + group scale cut again so the object reads
          as a small, restrained accent rather than a dominant shape. */}
      <Canvas camera={{ position: [0, 0, 14], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}

const KilnHand = dynamic(() => Promise.resolve(KilnHandComponent), { ssr: false });
export default KilnHand;
