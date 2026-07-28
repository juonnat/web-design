import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const tile = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function PlaceholderIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5-9 9" />
    </svg>
  )
}

export default function PortfolioGallery({ images = [], placeholderCount = 6, artistName = 'this artist' }) {
  const [openIndex, setOpenIndex] = useState(null)
  const hasImages = images.length > 0
  const items = hasImages ? images : Array.from({ length: placeholderCount })

  // Close the lightbox on Escape, and stop the page scrolling behind it.
  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [openIndex])

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {items.map((src, i) => (
          <motion.button
            type="button"
            key={src ?? i}
            variants={tile}
            onClick={() => hasImages && setOpenIndex(i)}
            aria-label={hasImages ? `View tattoo by ${artistName}, piece ${i + 1}` : undefined}
            disabled={!hasImages}
            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-ink-charcoal-light to-ink-black text-left"
          >
            {hasImages ? (
              <motion.img
                src={src}
                alt={`Tattoo by ${artistName}, piece ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <PlaceholderIcon className="h-10 w-10 text-ink-muted/40" />
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink-black/85 via-ink-black/10 to-transparent p-4"
            >
              <span className="text-xs uppercase tracking-widest text-ink-cream">
                Piece {i + 1}
              </span>
            </motion.div>
          </motion.button>
        ))}
      </motion.div>

      {!hasImages && (
        <p className="mt-6 text-center text-xs uppercase tracking-widest text-ink-muted/50">
          Placeholder gallery — {artistName}&rsquo;s photography still to come
        </p>
      )}

      <AnimatePresence>
        {openIndex !== null && hasImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Tattoo by ${artistName}, piece ${openIndex + 1}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-black/90 p-6"
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src={images[openIndex]}
                alt={`Tattoo by ${artistName}, piece ${openIndex + 1}`}
                className="max-h-[85vh] w-full object-contain"
              />
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-ink-black/60 text-ink-cream backdrop-blur transition-colors duration-200 hover:border-ink-accent-light hover:text-ink-accent-light"
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
