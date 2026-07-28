import { motion } from 'framer-motion'
import { Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import PortfolioGallery from '../components/PortfolioGallery'
import ArtistPortrait from '../components/ArtistPortrait'
import { artists, galleryCounts, studio } from '../data/content'
import { worksFor } from '../data/images'

export default function Artist() {
  const { slug } = useParams()
  const artist = artists.find((a) => a.slug === slug)

  if (!artist) {
    return <Navigate to="/about" replace />
  }

  return (
    <>
      <PageHero eyebrow={artist.role} title={artist.name.toUpperCase()} minHeight="min-h-[60vh]">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href={artist.instagramHref}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(45,212,191,0.5)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="inline-block rounded-full bg-ink-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink-black"
          >
            DM {artist.instagramHandle}
          </motion.a>
          <motion.a
            href={studio.emailHref}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="inline-block rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ink-cream hover:border-ink-accent-light hover:text-ink-accent-light"
          >
            Email The Studio
          </motion.a>
        </div>
      </PageHero>

      <section className="bg-ink-charcoal py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-square overflow-hidden rounded-2xl border border-white/10">
              <ArtistPortrait
                artist={artist}
                className="h-full w-full"
                sizes="(min-width: 768px) 480px, 100vw"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
              About {artist.name}
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream">
              {artist.role}
            </h2>
            <p className="mt-6 text-ink-muted leading-relaxed">{artist.bio}</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-ink-black py-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
              Portfolio
            </span>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
              {artist.name}&rsquo;s Work
            </h2>
          </motion.div>

          <div className="mt-16">
            <PortfolioGallery
              images={worksFor(artist.slug)}
              placeholderCount={galleryCounts[artist.slug] ?? 6}
              artistName={artist.name}
            />
          </div>
        </div>
      </section>
    </>
  )
}
