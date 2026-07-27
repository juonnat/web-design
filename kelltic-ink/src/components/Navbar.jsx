import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { studio } from '../data/content'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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
        <a
          href="#top"
          className="font-display text-2xl tracking-wide text-ink-cream"
        >
          KELLTIC <span className="text-ink-accent-light">INK</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-muted">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-200 hover:text-ink-accent-light"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={studio.phoneHref}
          className="text-sm font-semibold text-ink-cream border border-white/20 rounded-full px-4 py-2 transition-all duration-200 hover:border-ink-accent-light hover:text-ink-accent-light"
        >
          {studio.phone}
        </a>
      </nav>
    </motion.header>
  )
}
