import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function ArtistCard({ artist }) {
  return (
    <motion.div
      variants={card}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-charcoal"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-ink-charcoal-light to-ink-black">
        <svg className="h-16 w-16 text-ink-accent-light/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl tracking-wide text-ink-cream">{artist.name}</h3>
        <p className="text-xs uppercase tracking-widest text-ink-accent-light">{artist.role}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{artist.bio}</p>
        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }} className="mt-5">
          <Link
            to={`/artists/${artist.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-cream transition-colors duration-200 hover:text-ink-accent-light"
          >
            View Portfolio
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
