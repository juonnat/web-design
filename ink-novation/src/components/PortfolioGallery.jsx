import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const tile = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function PortfolioGallery({ count = 6, artistName = 'artist' }) {
  const [openIndex, setOpenIndex] = useState(null)
  const items = Array.from({ length: count })

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {items.map((_, i) => (
          <motion.button
            type="button"
            key={i}
            variants={tile}
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ink-charcoal-light to-ink-black text-left"
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <svg className="h-10 w-10 text-ink-muted/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
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
          </motion.button>
        ))}
      </motion.div>

      <p className="mt-6 text-center text-xs uppercase tracking-widest text-ink-muted/50">
        Placeholder gallery — replace tiles with {artistName}&rsquo;s real photography
      </p>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-black/90 p-6"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-charcoal-light to-ink-black"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-muted">
                <svg className="h-16 w-16 text-ink-muted/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5-9 9" />
                </svg>
                <span className="text-xs uppercase tracking-widest">
                  Piece {openIndex + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-ink-cream transition-colors duration-200 hover:border-ink-accent-light hover:text-ink-accent-light"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
