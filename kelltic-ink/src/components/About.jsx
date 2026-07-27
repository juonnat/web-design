import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="bg-ink-charcoal py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 md:order-1"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
            Our Story
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
            18 Years of Craft. Nurse-Grade Standards.
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed">
            Kelltic Ink was founded by <strong className="text-ink-cream">Rob Kells</strong>,
            a tattoo artist with 18 years in the industry and a background in
            nursing that shapes everything about how this studio operates.
            That medical discipline means rigorous sterilization, meticulous
            aftercare guidance, and a hygiene standard most shops simply
            don't meet.
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed">
            Rob and his team specialize in bold custom color work — from
            intricate Celtic knotwork to large-scale Japanese-style pieces —
            built around your story, not a flash-sheet template. With a
            devoted team of artists and piercers, Kelltic Ink has earned a
            4.9-star reputation across Berks County.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex text-ink-accent-light">
              {'★★★★★'.split('').map((star, i) => (
                <span key={i}>{star}</span>
              ))}
            </div>
            <span className="text-sm text-ink-muted">
              4.9 stars across Berks County
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 md:order-2"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-charcoal-light to-ink-black">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-muted">
              <svg
                className="h-16 w-16 text-ink-accent-light/70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>
              <span className="text-xs uppercase tracking-[0.25em]">
                Rob Kells — Owner &amp; Artist
              </span>
              <span className="text-[10px] uppercase tracking-widest text-ink-muted/60">
                Portrait placeholder
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
