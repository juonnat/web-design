import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { services } from '../data/content'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="SERVICES"
        subtitle="Custom work across styles — every price below is a starting point, refined once our artists see your idea."
      />

      <section className="bg-ink-black pb-28">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={card}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="rounded-2xl border border-white/10 bg-ink-charcoal p-8"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl tracking-wide text-ink-cream">
                    {service.title}
                  </h3>
                  <span className="font-display text-2xl tracking-wide text-ink-accent-light">
                    {service.price}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-14 max-w-2xl text-center text-sm text-ink-muted"
          >
            Final pricing depends on size, placement, and detail — our
            artists will quote your piece directly once they see the concept.
            Reach out via Instagram DM or phone to get started.
          </motion.p>
        </div>
      </section>
    </>
  )
}
