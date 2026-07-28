import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import TattooedName from '../components/TattooedName'
import ArtistCard from '../components/ArtistCard'
import Testimonials from '../components/Testimonials'
import { artists, studio } from '../data/content'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow={`Allentown, PA · ${studio.rating.toFixed(1)} ★`}
        title="Ink Novation"
        titleContent={<TattooedName text="Ink Novation" />}
        showBackdrop={false}
        subtitle={studio.tagline}
        minHeight="min-h-screen"
      >
        <motion.a
          href={studio.instagramHref}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05, boxShadow: '0 0 32px rgba(45,212,191,0.55)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="inline-block rounded-full bg-ink-accent px-10 py-4 text-base font-semibold uppercase tracking-wider text-ink-black"
        >
          Book on Instagram
        </motion.a>
      </PageHero>

      <section className="bg-ink-charcoal py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
            Our Work
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
            Custom Work, Nothing Off The Shelf
          </h2>
          <p className="mt-6 text-ink-muted leading-relaxed">
            Every piece that comes out of Ink Novation is designed from
            scratch around the client in the chair. No flash-sheet reprints —
            just custom tattooing across a range of styles, backed by a team
            that treats hygiene and craft as non-negotiable.
          </p>
        </motion.div>
      </section>

      <section className="bg-ink-black py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
              Meet The Team
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
              Three Artists, One Studio
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {artists.map((artist) => (
              <ArtistCard key={artist.slug} artist={artist} />
            ))}
          </motion.div>
        </div>
      </section>

      <Testimonials />
    </>
  )
}
