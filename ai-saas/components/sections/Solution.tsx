"use client"
import { useRef } from "react"
import { useInView } from "framer-motion"
import KilnHand from "@/components/ui/KilnHand"

export default function SolutionSection() {
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: "-20%" })

return (
<section ref={ref} id="solution" data-section="solution" className="relative h-screen w-full bg-black overflow-hidden">
{isInView && <KilnHand />}
<div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
<div className="text-center">
<p className="text-xs tracking-[0.3em] text-white/40 mb-8">02 — THE SOLUTION</p>
<div className="w-80 h-80 rounded-full border border-dashed border-white/20 flex items-center justify-center">
<span className="text-[#FF5C00] text-sm font-mono tracking-widest">KILN</span>
</div>
<h2 className="text-5xl md:text-7xl font-light text-white mt-12 max-w-4xl">
One runtime for every agent your process needs.
</h2>
</div>
</div>
</section>
)
}