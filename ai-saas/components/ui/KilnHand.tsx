"use client"
import dynamic from "next/dynamic"
import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing"
import { RoundedBoxGeometry } from "three-stdlib"
import * as THREE from "three"
import { useReducedMotion } from "@/lib/useReducedMotion"

// Every control point below is authored directly in world units and kept
// inside a radius of ~0.95 — the mount circle (Solution.tsx) reads as an
// inscribed circle of the canvas square at this camera framing (fov 50,
// z 2.2 -> frustum half-extent ~1.03), so anything past that radius spills
// out of the dashed circle into the corners of the square canvas. An earlier
// version positioned fingers via position+rotation+bend and one finger's
// rotated curve landed well outside that radius. Building each finger from
// explicit start/knuckle/tip points makes the budget checkable by eye.
const CLAY = "#8a6a52"

function Finger({ points, radius = 0.055 }: { points: THREE.Vector3[]; radius?: number }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  return (
    <mesh>
      <tubeGeometry args={[curve, 20, radius, 8, false]} />
      <meshStandardMaterial
        color={CLAY}
        roughness={0.6}
        metalness={0.1}
        emissive="#dc5000"
        emissiveIntensity={0.06}
      />
    </mesh>
  )
}

// Four fingers curl over the top arc of the rim, symmetric about x=0, plus
// a thumb curling in from the left side -- reads as a hand gripping the
// circle from behind rather than a literal anatomical hand.
const FINGER_ANGLES_DEG = [-42, -14, 14, 42]
const RIM = 0.6

function fingerPoints(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  const dx = Math.sin(rad)
  const dy = Math.cos(rad)
  return [
    new THREE.Vector3(dx * (RIM + 0.32), dy * (RIM + 0.32), -0.15),
    new THREE.Vector3(dx * RIM, dy * RIM, 0.02),
    new THREE.Vector3(dx * RIM * 0.7, dy * RIM * 0.7 - 0.1, 0.15),
    new THREE.Vector3(dx * RIM * 0.45, dy * RIM * 0.45 - 0.18, 0.25),
  ]
}

const THUMB_POINTS = [
  new THREE.Vector3(-0.95, -0.05, -0.12),
  new THREE.Vector3(-0.62, 0.0, 0.02),
  new THREE.Vector3(-0.4, 0.05, 0.16),
  new THREE.Vector3(-0.22, 0.08, 0.24),
]

function Palm() {
  const geometry = useMemo(() => new RoundedBoxGeometry(0.68, 0.3, 0.26, 4, 0.08), [])
  return (
    <mesh geometry={geometry} position={[0, 0.75, -0.05]}>
      <meshStandardMaterial
        color={CLAY}
        roughness={0.6}
        metalness={0.1}
        emissive="#dc5000"
        emissiveIntensity={0.06}
      />
    </mesh>
  )
}

function HumanHand() {
  const handRef = useRef<THREE.Group>(null!)
  const { mouse, clock } = useThree()

  useFrame(() => {
    if (!handRef.current) return
    const time = clock.getElapsedTime()
    const idleY = Math.sin(time * 0.5) * 0.02
    // Small idle drift + gentle cursor lead -- damped hard (divide by 150,
    // not 80) so the hand never rotates far enough to carry a fingertip
    // past the containment radius baked into the point data above.
    const targetX = mouse.x / 150 + idleY
    const targetY = -mouse.y / 150

    handRef.current.rotation.y = THREE.MathUtils.lerp(handRef.current.rotation.y, targetX, 0.02)
    handRef.current.rotation.x = THREE.MathUtils.lerp(handRef.current.rotation.x, targetY, 0.02)
    handRef.current.position.y = idleY * 0.2
  })

  return (
    <group ref={handRef}>
      <Palm />
      {FINGER_ANGLES_DEG.map((a) => (
        <Finger key={a} points={fingerPoints(a)} />
      ))}
      <Finger points={THUMB_POINTS} radius={0.05} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[2, 5, 3]} intensity={2} />
      <pointLight position={[0, 0, 3]} intensity={1.8} color="#fff5e6" />
      <HumanHand />
      {/* enableNormalPass: SSAO needs scene normals to compute occlusion.
      Without this, EffectComposer never creates a NormalPass, and SSAO
      silently no-ops (logs an error, renders nothing) instead of working. */}
      <EffectComposer enableNormalPass>
        <SSAO intensity={12} radius={0.08} />
        <Bloom intensity={0.2} luminanceThreshold={0.75} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  )
}

function KilnHandComponent() {
  const reducedMotion = useReducedMotion()
  if (reducedMotion) {
    return <div className="absolute inset-0 h-full w-full bg-shadow" />
  }
  return (
    <Canvas
      camera={{ position: [0, 0, 2.2], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}

const KilnHand = dynamic(() => Promise.resolve(KilnHandComponent), {
  ssr: false,
  loading: () => null
})
export default KilnHand
