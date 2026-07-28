import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import MapEmbed from '../components/MapEmbed'
import Testimonials from '../components/Testimonials'
import { studio } from '../data/content'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="CONTACT"
        subtitle={studio.bookingNote}
      />

      <section className="bg-ink-black pb-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-white/10 bg-ink-charcoal p-8"
          >
            <h2 className="font-display text-3xl tracking-wide text-ink-cream">
              Tell Us About Your Piece
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Share the details and we&rsquo;ll follow up to lock in a consultation.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="rounded-2xl border border-white/10 bg-ink-charcoal p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-cream">
                Studio Hours
              </h3>
              <table className="mt-4 w-full text-sm">
                <tbody>
                  {studio.hours.map((h) => (
                    <tr key={h.days} className="border-t border-white/10 first:border-t-0">
                      <td className="py-2.5 text-ink-muted">{h.days}</td>
                      <td className="py-2.5 text-right text-ink-cream">{h.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-6 flex flex-wrap gap-3">
                <motion.a
                  href={studio.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full bg-ink-accent/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-accent-light hover:bg-ink-accent/25"
                >
                  DM {studio.instagramHandle}
                </motion.a>
                <motion.a
                  href={studio.emailHref}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink-cream hover:border-ink-accent-light hover:text-ink-accent-light"
                >
                  Email Us
                </motion.a>
              </div>
              <p className="mt-4 text-xs uppercase tracking-widest text-ink-muted/50">
                {studio.phonePlaceholder}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-ink-charcoal p-8">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-cream">
                Location
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{studio.address}</p>
              <div className="mt-4">
                <MapEmbed />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Testimonials />
    </>
  )
}
