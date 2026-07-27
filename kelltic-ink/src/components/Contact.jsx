import { motion } from 'framer-motion'
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
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-ink-cream transition-shadow duration-300 hover:border-ink-accent-light hover:shadow-[0_0_18px_rgba(230,57,90,0.45)]"
    >
      {children}
    </motion.a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="bg-ink-charcoal pt-28 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-14 md:grid-cols-2"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
              Visit Us
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
              Book Your Next Piece
            </h2>
            <p className="mt-6 max-w-md text-ink-muted leading-relaxed">
              Walk in or call ahead — our team is happy to talk through
              custom designs, cover-ups, or piercing appointments.
            </p>

            <div className="mt-8 flex gap-4">
              <IconLink href={studio.instagram} label="Instagram">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </IconLink>
              <IconLink href={`mailto:${studio.email}`} label="Email">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </IconLink>
              <IconLink href={studio.phoneHref} label="Call">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 5c0 9 6 15 15 15l1-4-5-2-2 2c-3-1.5-4.5-3-6-6l2-2-2-5-4 1z" />
                </svg>
              </IconLink>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-cream">
                Hours
              </h3>
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
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-cream">
                Location
              </h3>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                {studio.address}
              </p>
              <a
                href={studio.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-medium text-ink-accent-light transition-colors duration-200 hover:text-ink-cream"
              >
                Get Directions →
              </a>
              <p className="mt-4 text-sm text-ink-muted">
                <a
                  href={studio.phoneHref}
                  className="transition-colors duration-200 hover:text-ink-accent-light"
                >
                  {studio.phone}
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-20 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center text-xs text-ink-muted/60">
          <span className="font-display text-lg tracking-wide text-ink-muted">
            KELLTIC INK
          </span>
          <span>
            © {new Date().getFullYear()} Kelltic Ink. All rights reserved.
          </span>
        </div>
      </div>
    </section>
  )
}
