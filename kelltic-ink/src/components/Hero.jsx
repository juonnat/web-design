import { motion } from 'framer-motion'
import { studio } from '../data/content'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-black"
    >
      {/* Animated gradient / ink-splatter backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-1/3 -left-1/4 h-[70vmax] w-[70vmax] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(179,18,46,0.35) 0%, rgba(179,18,46,0) 70%)',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1/3 -right-1/4 h-[60vmax] w-[60vmax] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(230,57,90,0.25) 0%, rgba(230,57,90,0) 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />

        {/* subtle ink-splatter dots */}
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-ink-accent/30"
            style={{
              width: `${4 + ((i * 7) % 18)}px`,
              height: `${4 + ((i * 7) % 18)}px`,
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
            }}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-black/40 to-ink-black" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        <motion.span
          variants={item}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light"
        >
          Mohnton, Pennsylvania
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-6xl leading-[0.95] tracking-wide text-ink-cream sm:text-7xl md:text-8xl"
        >
          KELLTIC INK
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg text-ink-muted sm:text-xl"
        >
          {studio.tagline} — custom color work, Celtic knotwork, and
          Japanese-style tattoos from a studio built on precision and
          hygiene.
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <motion.a
            href={studio.phoneHref}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 32px rgba(230,57,90,0.55)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="inline-block rounded-full bg-ink-accent px-10 py-4 text-base font-semibold uppercase tracking-wider text-ink-cream shadow-[0_0_0_rgba(230,57,90,0)]"
          >
            Book Now
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ink-muted"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-9 w-5 rounded-full border border-ink-muted/50 p-1"
        >
          <div className="h-2 w-1 rounded-full bg-ink-accent-light" />
        </motion.div>
      </motion.div>
    </section>
  )
}
