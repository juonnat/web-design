import { motion, useReducedMotion } from 'framer-motion'
import TattooMachine3D, { TIP_X, TIP_Y, VIEWBOX } from './TattooMachine3D'

// The studio name written by the machine.
//
// Deliberately HTML text rather than SVG <text>: a webfont referenced only from
// inside an inline SVG does not reliably trigger a font fetch, which left the
// name rendering in a serif fallback. Real DOM text also scales and wraps
// predictably.
//
// The reveal is a clip-path sweeping left to right; the machine's `left`
// animates across the same box over the same duration and easing, so the needle
// tip stays on the leading edge of the ink without measuring glyphs. Both are
// percentages of the same inline-block, which is exactly the text's width.

const DURATION = 3.4
const DELAY = 0.45
const EASE = [0.33, 0, 0.2, 1]

// Machine dimensions expressed in em so they track the font size at every
// breakpoint. Height is 1.15em; width follows the artwork's aspect ratio.
const MACHINE_H = 1.15
const MACHINE_W = (VIEWBOX.width / VIEWBOX.height) * MACHINE_H
const TIP_LEFT = (TIP_X / VIEWBOX.width) * MACHINE_W
const TIP_TOP = (TIP_Y / VIEWBOX.height) * MACHINE_H

export default function TattooedName({ text = 'Ink Novation' }) {
  const reduceMotion = useReducedMotion()

  return (
    // aria-hidden throughout: PageHero renders the real <h1> for assistive tech,
    // so this is purely the visual treatment.
    <div className="flex w-full justify-center" aria-hidden="true">
      <div
        className="relative inline-block font-script leading-[1.15]"
        style={{ fontSize: 'clamp(3.25rem, 11vw, 9.5rem)' }}
      >
        {/* Ghost of the finished name: holds the layout box and keeps the hero
            from looking empty before the ink arrives. */}
        <span className="block whitespace-nowrap px-[0.08em] text-ink-cream/[0.07]">
          {text}
        </span>

        {/* The ink, revealed by the sweep. */}
        <motion.span
          className="absolute inset-0 block whitespace-nowrap px-[0.08em] text-ink-cream"
          initial={{ clipPath: reduceMotion ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={reduceMotion ? { duration: 0 } : { duration: DURATION, delay: DELAY, ease: EASE }}
        >
          {text}
        </motion.span>

        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute top-0"
            style={{
              width: `${MACHINE_W}em`,
              height: `${MACHINE_H}em`,
              marginLeft: `-${TIP_LEFT}em`,
              // Drop the tip onto the writing line rather than the box top.
              marginTop: `${0.86 - TIP_TOP}em`,
              transformOrigin: `${TIP_LEFT}em ${TIP_TOP}em`,
              rotate: '17deg',
            }}
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
            transition={{
              left: { duration: DURATION, delay: DELAY, ease: EASE },
              opacity: {
                duration: DURATION + DELAY + 0.45,
                times: [0, DELAY / (DURATION + DELAY + 0.45), 0.92, 1],
                ease: 'linear',
              },
            }}
          >
            <motion.div
              className="h-full w-full"
              animate={{ x: [0, 1.2, -0.9, 0], y: [0, -1, 0.7, 0] }}
              transition={{ duration: 0.14, repeat: Infinity, ease: 'linear' }}
            >
              <TattooMachine3D className="h-full w-full overflow-visible" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
