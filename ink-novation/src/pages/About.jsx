import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Testimonials from '../components/Testimonials'
import AnimatedCounter from '../components/AnimatedCounter'
import MapEmbed from '../components/MapEmbed'
import { artists, studio } from '../data/content'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="ABOUT INK NOVATION"
        subtitle="Three artists under one roof in Allentown, united by a custom-only approach to tattooing."
      />

      <section className="bg-ink-charcoal py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <p className="text-ink-muted leading-relaxed">
            Ink Novation was built on a simple idea: give clients real choice
            without sacrificing quality. Rather than a single house style,
            the studio brings together three artists with distinct
            strengths — bold custom design, clean linework, and precise
            artistic detail — all working from the same Allentown space at{' '}
            <span className="text-ink-cream">{studio.address}</span>.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-4xl px-6">
          <AnimatedCounter value={studio.stat.value} suffix={studio.stat.suffix} label={studio.stat.label} />
        </div>
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
            viewport={{ once: true, amount: 0.1 }}
            className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {artists.map((artist) => (
              <motion.div
                key={artist.slug}
                variants={card}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-charcoal"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-ink-charcoal-light to-ink-black">
                  <svg className="h-16 w-16 text-ink-accent-light/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-2xl tracking-wide text-ink-cream">{artist.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-ink-accent-light">{artist.role}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{artist.bio}</p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <motion.a
                      href={artist.instagramHref}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-full bg-ink-accent/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-accent-light hover:bg-ink-accent/25"
                    >
                      {artist.instagramHandle}
                    </motion.a>
                    <Link
                      to={`/artists/${artist.slug}`}
                      className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-cream transition-colors duration-200 hover:border-ink-accent-light hover:text-ink-accent-light"
                    >
                      Portfolio
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-ink-charcoal py-28">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
              Find Us
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
              {studio.address}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10"
          >
            <MapEmbed />
          </motion.div>
        </div>
      </section>
    </>
  )
}
