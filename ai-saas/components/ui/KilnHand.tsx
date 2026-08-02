"use client"
import dynamic from "next/dynamic"
import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer, Bloom, SSAO } from "@react-three/postprocessing"
import * as THREE from "three"
import { useReducedMotion } from "@/lib/useReducedMotion"

function Finger({ position, rotation, bend }: { position: [number, number, number], rotation: [number, number, number], bend: number }) {
const fingerRef = useRef<THREE.Mesh>(null!)

const curve = useMemo(() => {
return new THREE.CatmullRomCurve3([
new THREE.Vector3(0, 0, 0),
new THREE.Vector3(0, 0.15, 0.05),
new THREE.Vector3(0, 0.3, bend),
new THREE.Vector3(0, 0.45, bend * 1.5)
])
}, [bend])

return (
<mesh ref={fingerRef} position={position} rotation={rotation}>
<tubeGeometry args={[curve, 20, 0.08, 8, false]} />
<meshStandardMaterial color="#d4a574" roughness={0.7} metalness={0.1} />
</mesh>
)
}

function HumanHand() {
const handRef = useRef<THREE.Group>(null!)
const { viewport, mouse, clock } = useThree()

useFrame(() => {
if (!handRef.current) return
const time = clock.getElapsedTime()
const idleY = Math.sin(time * 0.5) * 0.02
const targetX = (mouse.x * viewport.width) / 80 + idleY
const targetY = (-mouse.y * viewport.height) / 80

handRef.current.rotation.y = THREE.MathUtils.lerp(handRef.current.rotation.y, targetX, 0.02)
handRef.current.rotation.x = THREE.MathUtils.lerp(handRef.current.rotation.x, targetY, 0.02)
handRef.current.position.y = idleY * 0.2
})

const skin = new THREE.MeshStandardMaterial({
color: "#d4a574",
roughness: 0.65,
metalness: 0.05,
emissive: "#3d2817",
emissiveIntensity: 0.1
})

return (
<group ref={handRef} scale={1.4} position={[0, -0.3, 0]} rotation={[0.3, 0, 0]}>
<mesh position={[0, -0.1, 0]} material={skin}>
<boxGeometry args={[0.5, 0.6, 0.2]} />
</mesh>
<Finger position={[-0.5, -0.05, 0.15]} rotation={[0, 0, 2.2]} bend={0.2} />
<Finger position={[-0.35, 0.4, 0.1]} rotation={[0.2, 0, -0.7]} bend={0.35} />
<Finger position={[0, 0.55, 0]} rotation={[0.3, 0, 0]} bend={0.4} />
<Finger position={[0.35, 0.4, 0.1]} rotation={[0.2, 0, 0.7]} bend={0.35} />
<Finger position={[0.5, 0.05, 0.15]} rotation={[0, 0, 1.5]} bend={0.25} />
</group>
)
}

function Scene() {
return (
<>
<ambientLight intensity={2} />
<directionalLight position={[2, 5, 3]} intensity={3} castShadow />
<directionalLight position={[-2, 2, 2]} intensity={1.5} />
<pointLight position={[0, 0, 3]} intensity={2.5} color="#fff5e6" />
<HumanHand />
{/* enableNormalPass: SSAO needs scene normals to compute occlusion.
Without this, EffectComposer never creates a NormalPass, and SSAO
silently no-ops (logs an error, renders nothing) instead of working. */}
<EffectComposer enableNormalPass>
<SSAO intensity={15} radius={0.08} />
<Bloom intensity={0.3} luminanceThreshold={0.7} luminanceSmoothing={0.9} />
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
shadows
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
