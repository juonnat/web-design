import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/content'

export default function Testimonials({ title = 'Testimonials', eyebrow = 'What Our Clients Say' }) {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (index) => {
    clearInterval(timerRef.current)
    setActive(index)
  }

  return (
    <section className="bg-ink-black py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
            {title}
          </h2>
        </motion.div>

        <div className="relative mt-16 h-64 sm:h-52">
          <AnimatePresence mode="wait">
            <motion.figure
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-ink-charcoal px-8 py-10 text-center sm:px-14"
            >
              <div className="mb-4 flex text-ink-accent-light">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <blockquote className="text-lg text-ink-cream/90">
                “{testimonials[active].quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold uppercase tracking-widest text-ink-muted">
                {testimonials[active].name}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => goTo(i)}
              aria-label={`Show testimonial from ${t.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-ink-accent-light' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
