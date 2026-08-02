"use client"
import { useRef } from "react"
import { useInView } from "framer-motion"
import KilnHand from "@/components/ui/KilnHand"

export default function Solution() {
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: "-20%" })

return (
<section ref={ref} id="solution" data-section="solution" className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
<div className="text-center">
<p className="text-xs tracking-[0.3em] text-white/40 mb-8">02 — THE SOLUTION</p>

{/* The hand renders inside this dashed circle and appears to grab it */}
<div className="w-80 h-80 rounded-full border border-dashed border-white/30 relative mx-auto">
{isInView && (
<div className="absolute inset-0">
<KilnHand />
</div>
)}
<span className="absolute inset-0 flex items-center justify-center text-[#FF5C00] text-sm font-mono tracking-widest pointer-events-none z-20">KILN</span>
</div>

<h2 className="text-5xl md:text-7xl font-light text-white mt-12 max-w-4xl mx-auto">
One runtime for every agent your process needs.
</h2>
</div>
</section>
)
}
