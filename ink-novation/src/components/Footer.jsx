import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { studio } from '../data/content'

function IconLink({ href, label, children }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      aria-label={label}
      whileHover={{ y: -4, scale: 1.08 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ink-cream transition-shadow duration-300 hover:border-ink-accent-light hover:shadow-[0_0_18px_rgba(45,212,191,0.45)]"
    >
      {children}
    </motion.a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink-charcoal">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-6 py-20 text-center"
      >
        <h2 className="font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
          Ready For Your Next Piece?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink-muted">
          {studio.bookingNote}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href={studio.instagramHref}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(45,212,191,0.5)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="inline-block rounded-full bg-ink-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink-black"
          >
            DM on Instagram
          </motion.a>
          <motion.a
            href={studio.phoneHref}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="inline-block rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink-cream hover:border-ink-accent-light hover:text-ink-accent-light"
          >
            Call {studio.phone}
          </motion.a>
        </div>
      </motion.div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-3">
          <div>
            <Link to="/" className="font-display text-2xl tracking-wide text-ink-cream">
              INK <span className="text-ink-accent-light">NOVATION</span>
            </Link>
            <p className="mt-3 text-sm text-ink-muted">{studio.address}</p>
            <div className="mt-5 flex gap-3">
              <IconLink href={studio.instagramHref} label="Instagram">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </IconLink>
              <IconLink href={`mailto:${studio.email}`} label="Email">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </IconLink>
              <IconLink href={studio.phoneHref} label="Call">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 5c0 9 6 15 15 15l1-4-5-2-2 2c-3-1.5-4.5-3-6-6l2-2-2-5-4 1z" />
                </svg>
              </IconLink>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-cream">Hours</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {studio.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="text-ink-cream/80">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-cream">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li><Link to="/services" className="hover:text-ink-accent-light transition-colors duration-200">Services</Link></li>
              <li><Link to="/about" className="hover:text-ink-accent-light transition-colors duration-200">About</Link></li>
              <li><Link to="/contact" className="hover:text-ink-accent-light transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-ink-muted/60">
          © {new Date().getFullYear()} Ink Novation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
