import { motion } from 'framer-motion'
import TattooMachineBackdrop from './TattooMachineBackdrop'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  minHeight = 'min-h-[70vh]',
  // When supplied, this renders in place of the plain heading. `title` is still
  // required and becomes a visually-hidden h1, so the page keeps one real
  // heading for search engines and screen readers.
  titleContent,
  showBackdrop = true,
}) {
  return (
    <section className={`relative flex ${minHeight} items-center justify-center overflow-hidden bg-ink-black pt-24`}>
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-1/3 -left-1/4 h-[65vmax] w-[65vmax] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(20,184,166,0.28) 0%, rgba(20,184,166,0) 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-1/3 -right-1/4 h-[55vmax] w-[55vmax] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(45,212,191,0.2) 0%, rgba(45,212,191,0) 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
        {/* Suppressed on Home, where the machine appears in the headline itself
            and a second one in the background would just compete. */}
        {showBackdrop && (
          <TattooMachineBackdrop className="-right-8 top-[80%] h-[46%] max-h-[360px] w-auto -translate-y-1/2 -rotate-[10deg] text-ink-accent-light opacity-[0.16] md:right-0 md:top-1/2 md:h-[108%] md:max-h-[720px] md:opacity-[0.3] lg:right-12 xl:right-24" />
        )}

        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-ink-accent/25"
            style={{
              width: `${4 + ((i * 7) % 16)}px`,
              height: `${4 + ((i * 7) % 16)}px`,
              top: `${(i * 41) % 100}%`,
              left: `${(i * 59) % 100}%`,
            }}
            animate={{ opacity: [0.12, 0.45, 0.12] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-black/40 to-ink-black" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 pb-16 text-center"
      >
        {eyebrow && (
          <motion.span
            variants={item}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-ink-accent-light"
          >
            {eyebrow}
          </motion.span>
        )}
        {titleContent ? (
          <>
            <h1 className="sr-only">{title}</h1>
            <motion.div variants={item} className="w-full">
              {titleContent}
            </motion.div>
          </>
        ) : (
          <motion.h1
            variants={item}
            className="font-display text-5xl leading-[0.95] tracking-wide text-ink-cream sm:text-6xl md:text-7xl"
          >
            {title}
          </motion.h1>
        )}
        {subtitle && (
          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-ink-muted">
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div variants={item} className="mt-10">
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
