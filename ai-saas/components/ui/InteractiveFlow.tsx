"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  type ThreeElement,
} from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import { RoundedBoxGeometry } from "three-stdlib";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

extend({ RoundedBoxGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    roundedBoxGeometry: ThreeElement<typeof RoundedBoxGeometry>;
  }
}

const BLOCK_COUNT = 80;
const REPULSION_RADIUS = 8;
const REPULSION_STRENGTH = 0.8;
const FLOW_SPEED = 0.015;

function FlowBlocks() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const scrollVelocity = useRef(0);
  const lastScroll = useRef(0);
  const { viewport } = useThree();

  // Track scroll to disrupt flow
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
          (Math.random() - 0.5) * FLOW_SPEED,
          -Math.random() * FLOW_SPEED * 0.5 - 0.005,
          (Math.random() - 0.5) * FLOW_SPEED * 0.5
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
        scale: Math.random() * 1.2 + 0.8, // big blocks: 0.8 to 2.0 units
      });
    }
    return temp;
  }, [viewport]);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Mouse position in 3D
    mouse.current.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    );

    const dummy = new THREE.Object3D();
    const time = state.clock.elapsedTime;

    blocks.forEach((block, i) => {
      // Flow field - sine wave current
      const flowX = Math.sin(time * 0.2 + block.position.y * 0.1) * 0.008;
      const flowY = Math.cos(time * 0.15 + block.position.x * 0.1) * 0.005;
      block.velocity.x += flowX;
      block.velocity.y += flowY;

      // Scroll disruption - major turbulence
      block.velocity.y += scrollVelocity.current;
      block.velocity.x += scrollVelocity.current * (Math.random() - 0.5) * 2;
      scrollVelocity.current *= 0.92; // dampen scroll force

      // Mouse repulsion - big radius, strong force
      const dist = block.position.distanceTo(mouse.current);
      if (dist < REPULSION_RADIUS) {
        const force =
          Math.pow((REPULSION_RADIUS - dist) / REPULSION_RADIUS, 2) *
          REPULSION_STRENGTH;
        const direction = block.position.clone().sub(mouse.current).normalize();
        block.velocity.add(direction.multiplyScalar(force));

        // Tumble when hit
        block.rotationSpeed.x += (Math.random() - 0.5) * 0.15;
        block.rotationSpeed.y += (Math.random() - 0.5) * 0.15;
        block.rotationSpeed.z += (Math.random() - 0.5) * 0.15;
      }

      // Apply velocity
      block.position.add(block.velocity);
      block.velocity.multiplyScalar(0.985); // drag

      // Rotation
      block.rotation.x += block.rotationSpeed.x;
      block.rotation.y += block.rotationSpeed.y;
      block.rotation.z += block.rotationSpeed.z;
      block.rotationSpeed.multiplyScalar(0.96); // damping

      // Wrap around screen edges for infinite flow
      if (block.position.y < -viewport.height * 1.5) {
        block.position.y = viewport.height * 1.5;
        block.position.x = (Math.random() - 0.5) * viewport.width * 3;
      }
      if (block.position.y > viewport.height * 1.5) {
        block.position.y = -viewport.height * 1.5;
      }
      if (Math.abs(block.position.x) > viewport.width * 1.8) {
        block.position.x *= -0.9;
      }

      // Update instance
      dummy.position.copy(block.position);
      dummy.rotation.copy(block.rotation);
      dummy.scale.setScalar(block.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <Instances ref={meshRef} limit={BLOCK_COUNT}>
      <roundedBoxGeometry args={[1, 1, 1, 4, 0.1]} />
      <meshStandardMaterial
        color="#100904"
        roughness={0.2}
        metalness={0.9}
        emissive="#dc5000"
        emissiveIntensity={1.2}
      />
      <Instance />
    </Instances>
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
      // Pulsing glow
      lightRef.current.intensity = 6 + Math.sin(state.clock.elapsedTime * 3) * 1.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight
        ref={lightRef}
        color="#dc5000"
        intensity={6}
        distance={20}
        decay={1.2}
      />
      <fog attach="fog" args={["#100904", 8, 25]} />
      <FlowBlocks />
    </>
  );
}

export default function InteractiveFlow() {
  // Determined client-side only (window is unavailable during SSR) so the
  // server-rendered and first client-rendered markup match; the WebGL
  // canvas is the default until touch support is confirmed after mount.
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
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 65 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
