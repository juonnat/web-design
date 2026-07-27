import { motion } from 'framer-motion'
import { galleryCount } from '../data/content'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const tile = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Portfolio() {
  const items = Array.from({ length: galleryCount })

  return (
    <section id="portfolio" className="bg-ink-charcoal py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
            Recent Work
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
            Portfolio
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3"
        >
          {items.map((_, i) => (
            <motion.div
              key={i}
              variants={tile}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ink-charcoal-light to-ink-black"
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <svg
                  className="h-10 w-10 text-ink-muted/40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5-9 9" />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-black/85 via-ink-black/10 to-transparent p-4"
              >
                <span className="text-xs uppercase tracking-widest text-ink-cream">
                  Piece {i + 1}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 text-center text-xs uppercase tracking-widest text-ink-muted/50">
          Placeholder gallery — replace tiles with studio photography
        </p>
      </div>
    </section>
  )
}
