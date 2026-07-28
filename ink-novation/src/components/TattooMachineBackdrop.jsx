import { motion, useReducedMotion } from 'framer-motion'

// Line-art coil machine, drawn as separate strokes so each can animate in on
// its own beat rather than the whole silhouette appearing at once.
//
// Geometry notes (viewBox 0 0 240 300): the frame is the C-shaped spine at the
// back, two coils stand on its lower bar, the armature bar crosses their tops,
// and the tube runs down the front to the needle tip at (150, 276). The ink
// trail below is anchored to that tip so the machine looks like it is drawing.
const STROKES = [
  // frame: back spine, then forward along the bottom bar
  'M 78 68 L 78 176 L 150 176',
  // binding post + cord trailing off the back
  'M 78 68 L 60 68',
  'M 60 68 C 28 60, 18 112, 32 152',
  // rear spring up to the armature
  'M 78 72 L 86 104',
  // armature bar across the coil tops
  'M 84 104 L 158 96',
  // front spring dropping to the tube
  'M 157 97 L 157 132',
  // tube / grip
  'M 136 176 L 136 232',
  'M 164 176 L 164 232',
  // knurled grip banding — reads as a grip rather than a plain pipe
  'M 136 196 L 164 196',
  'M 136 208 L 164 208',
  // tapered tip down to the needle
  'M 136 232 L 145 252',
  'M 164 232 L 155 252',
  'M 145 252 L 155 252',
]

const COILS = [
  { x: 88, y: 112, width: 26, height: 64 },
  { x: 120, y: 112, width: 26, height: 64 },
]

// The line the needle "tattoos" — a loose scrollwork flourish rather than a
// straight rule, so it reads as tattooing rather than underlining.
const INK_TRAIL =
  'M 150 286 C 122 302, 78 302, 66 324 C 54 346, 100 358, 134 346 C 172 332, 200 342, 212 366'

export default function TattooMachineBackdrop({ className = '' }) {
  const reduceMotion = useReducedMotion()

  // With reduced motion the machine still renders — it just arrives finished
  // and holds still, rather than drawing itself and vibrating.
  const drawIn = (delay) =>
    reduceMotion
      ? { initial: { pathLength: 1, opacity: 1 }, animate: { pathLength: 1, opacity: 1 } }
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.4, delay } },
        }

  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 240 380"
        fill="none"
        className="h-full w-full"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* The machine vibrates as a whole — a real one shakes at the frame,
            not just at the needle. Amplitude stays near 1px so it registers as
            hum rather than wobble. */}
        <motion.g
          animate={reduceMotion ? undefined : { x: [0, 0.9, -0.6, 0], y: [0, -0.7, 0.5, 0] }}
          transition={reduceMotion ? undefined : { duration: 0.14, repeat: Infinity, ease: 'linear' }}
        >
          {STROKES.map((d, i) => (
            <motion.path key={d} d={d} {...drawIn(0.15 + i * 0.08)} />
          ))}

          {COILS.map((coil) => (
            <motion.rect
              key={coil.x}
              {...coil}
              rx="13"
              {...drawIn(0.5)}
            />
          ))}

          {/* needle */}
          <motion.path d="M 150 252 L 150 284" strokeWidth="1.4" {...drawIn(1.1)} />
        </motion.g>

        {/* Ink trail: draws out from the needle tip, holds, then clears and
            repeats — the machine appears to keep working. */}
        <motion.path
          d={INK_TRAIL}
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduceMotion
              ? { pathLength: 1, opacity: 0.5 }
              : { pathLength: [0, 1, 1, 0], opacity: [0, 0.85, 0.85, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.6, delay: 1.2 }
              : { duration: 9, times: [0, 0.45, 0.8, 1], repeat: Infinity, delay: 1.4, ease: 'easeInOut' }
          }
        />
      </svg>
    </div>
  )
}
