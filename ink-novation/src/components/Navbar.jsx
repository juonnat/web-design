import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { studio } from '../data/content'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-ink-black/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-display text-2xl tracking-wide text-ink-cream"
          onClick={() => setOpen(false)}
        >
          INK <span className="text-ink-accent-light">NOVATION</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-muted">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-ink-accent-light ${
                    isActive ? 'text-ink-accent-light' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href={studio.instagramHref}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-block text-sm font-semibold text-ink-cream border border-white/20 rounded-full px-4 py-2 transition-all duration-200 hover:border-ink-accent-light hover:text-ink-accent-light"
        >
          Book on Instagram
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-ink-cream"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden flex flex-col gap-1 border-t border-white/10 bg-ink-black/95 px-6 py-4"
        >
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'text-ink-accent-light' : 'text-ink-muted'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a
              href={studio.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="block py-2 text-sm font-semibold text-ink-cream"
            >
              Book on Instagram
            </a>
          </li>
        </motion.ul>
      )}
    </motion.header>
  )
}
