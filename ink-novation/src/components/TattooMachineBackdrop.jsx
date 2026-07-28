import { motion, useReducedMotion } from 'framer-motion'
import { MachineArt, TIP_X, VIEWBOX } from './TattooMachine3D'

// Subpage hero backdrop. Uses the same 3D machine as the Home signature so the
// two never read as different objects — here it sits still and idles rather
// than travelling, and tattoos a flourish beneath the tip on a loop.

const TRAIL_TOP = VIEWBOX.height - 8
const BOX_H = VIEWBOX.height + 110

// Anchored to the needle tip so the ink appears to come off the needle.
const INK_TRAIL = `M ${TIP_X} ${TRAIL_TOP} C ${TIP_X - 34} ${TRAIL_TOP + 22}, ${TIP_X - 78} ${TRAIL_TOP + 20}, ${TIP_X - 88} ${TRAIL_TOP + 44} C ${TIP_X - 98} ${TRAIL_TOP + 68}, ${TIP_X - 48} ${TRAIL_TOP + 76}, ${TIP_X - 14} ${TRAIL_TOP + 62} C ${TIP_X + 24} ${TRAIL_TOP + 46}, ${TIP_X + 54} ${TRAIL_TOP + 56}, ${TIP_X + 64} ${TRAIL_TOP + 82}`

export default function TattooMachineBackdrop({ className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${VIEWBOX.width} ${BOX_H}`} fill="none" className="h-full w-full">
        <motion.g
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Whole-machine hum, kept near a pixel so it reads as vibration. */}
          <motion.g
            animate={reduceMotion ? undefined : { x: [0, 0.9, -0.6, 0], y: [0, -0.7, 0.5, 0] }}
            transition={reduceMotion ? undefined : { duration: 0.14, repeat: Infinity, ease: 'linear' }}
          >
            <MachineArt />
          </motion.g>
        </motion.g>

        <motion.path
          d={INK_TRAIL}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduceMotion
              ? { pathLength: 1, opacity: 0.7 }
              : { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0.6, delay: 0.9 }
              : { duration: 9, times: [0, 0.45, 0.8, 1], repeat: Infinity, delay: 1.1, ease: 'easeInOut' }
          }
        />
      </svg>
    </div>
  )
}
