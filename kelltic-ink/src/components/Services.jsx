import { motion } from 'framer-motion'
import { services } from '../data/content'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const card = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Services() {
  return (
    <section id="services" className="bg-ink-black py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light">
            What We Do
          </span>
          <h2 className="mt-4 font-display text-4xl tracking-wide text-ink-cream sm:text-5xl">
            Services
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={card}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="group rounded-2xl border border-white/10 bg-ink-charcoal p-8 transition-colors duration-300 hover:border-ink-accent/50"
            >
              <div className="mb-5 h-10 w-10 rounded-full bg-ink-accent/15 transition-colors duration-300 group-hover:bg-ink-accent/30" />
              <h3 className="font-display text-2xl tracking-wide text-ink-cream">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
