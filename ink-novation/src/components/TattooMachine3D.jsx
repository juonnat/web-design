import { useId } from 'react'

// A coil machine rendered with enough shading to read as a solid object rather
// than line art: cylindrical gradients on the tube and coils, a specular streak
// down each barrel, and darker side faces where forms turn away from the light.
//
// Geometry lives in a 200x320 box with the needle tip at (100, 312). Callers
// that need to anchor the tip somewhere — the signature animation points it at
// the text baseline — can use TIP_X / TIP_Y rather than guessing.
export const VIEWBOX = { width: 200, height: 320 }
export const TIP_X = 100
export const TIP_Y = 312

// Artwork only — no <svg> wrapper — so it can be dropped straight into a parent
// SVG's coordinate space (the signature animation transforms it directly).
export function MachineArt() {
  // Gradient ids must be unique per instance or a second machine on the page
  // reuses the first one's defs.
  const uid = useId().replace(/:/g, '')
  const id = (name) => `${name}-${uid}`

  return (
    <>
      <defs>
        {/* Cylindrical steel: dark edge, bright specular, mid, dark far edge. */}
        <linearGradient id={id('steel')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d2226" />
          <stop offset="18%" stopColor="#5d6a73" />
          <stop offset="36%" stopColor="#aeb9c0" />
          <stop offset="52%" stopColor="#77848d" />
          <stop offset="78%" stopColor="#39424a" />
          <stop offset="100%" stopColor="#161a1e" />
        </linearGradient>

        <linearGradient id={id('steelDark')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14181b" />
          <stop offset="30%" stopColor="#39434b" />
          <stop offset="55%" stopColor="#5c6871" />
          <stop offset="100%" stopColor="#101417" />
        </linearGradient>

        {/* Wound copper wire. */}
        <linearGradient id={id('copper')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d1f0f" />
          <stop offset="20%" stopColor="#9c5a29" />
          <stop offset="38%" stopColor="#e0a35b" />
          <stop offset="58%" stopColor="#a2612e" />
          <stop offset="82%" stopColor="#5a2f16" />
          <stop offset="100%" stopColor="#2c1509" />
        </linearGradient>

        {/* Accent wash so the machine still belongs to the site's palette. */}
        <linearGradient id={id('accent')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.12" />
        </linearGradient>

        <filter id={id('shadow')} x="-40%" y="-20%" width="180%" height="150%">
          <feDropShadow dx="3" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      <g filter={`url(#${id('shadow')})`}>
        {/* ---- cord ---- */}
        <path
          d="M 52 30 C 16 20, -2 76, 12 128"
          stroke="#1b1f23"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M 52 30 C 16 20, -2 76, 12 128"
          stroke="#39424a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* ---- frame: back post and bottom bar ---- */}
        <rect x="44" y="40" width="17" height="120" rx="3" fill={`url(#${id('steelDark')})`} />
        <rect x="44" y="142" width="78" height="18" rx="4" fill={`url(#${id('steelDark')})`} />
        {/* top edge catch-light along the bottom bar */}
        <rect x="46" y="143" width="74" height="2" rx="1" fill="#8e9aa3" opacity="0.5" />

        {/* ---- coils ---- */}
        {[52, 86].map((x) => (
          <g key={x}>
            <rect x={x} y="74" width="30" height="70" rx="3" fill={`url(#${id('copper')})`} />
            {/* windings */}
            {Array.from({ length: 11 }).map((_, i) => (
              <path
                key={i}
                d={`M ${x + 1} ${80 + i * 6} Q ${x + 15} ${83 + i * 6}, ${x + 29} ${80 + i * 6}`}
                stroke="#2a1409"
                strokeWidth="1"
                opacity="0.55"
              />
            ))}
            {/* end caps give the cylinder its ends */}
            <ellipse cx={x + 15} cy="74" rx="15" ry="4.5" fill="#c88a4d" />
            <ellipse cx={x + 15} cy="74" rx="15" ry="4.5" fill="none" stroke="#3d1f0f" strokeWidth="1" />
            <ellipse cx={x + 15} cy="144" rx="15" ry="4.5" fill="#4a2614" />
          </g>
        ))}

        {/* ---- armature bar across the coil tops ---- */}
        <rect x="46" y="56" width="84" height="11" rx="3" fill={`url(#${id('steel')})`} />
        <rect x="48" y="57.5" width="80" height="2" rx="1" fill="#cdd6dc" opacity="0.55" />

        {/* binding post + springs */}
        <circle cx="52" cy="34" r="5.5" fill={`url(#${id('steelDark')})`} />
        <path d="M 52 39 L 55 56" stroke="#5c6871" strokeWidth="3" strokeLinecap="round" />
        <path d="M 124 62 L 124 104" stroke="#5c6871" strokeWidth="3" strokeLinecap="round" />

        {/* ---- tube / grip ---- */}
        <rect x="80" y="150" width="40" height="100" rx="4" fill={`url(#${id('steel')})`} />
        {/* knurling */}
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x="80"
            y={168 + i * 9}
            width="40"
            height="2.5"
            rx="1"
            fill="#0e1114"
            opacity="0.45"
          />
        ))}
        {/* specular streak down the barrel */}
        <rect x="90" y="152" width="4" height="96" rx="2" fill="#e6eef3" opacity="0.28" />

        {/* accent collar — ties the machine to the site palette */}
        <rect x="79" y="242" width="42" height="9" rx="3" fill={`url(#${id('accent')})`} />

        {/* ---- tapered tip ---- */}
        <path d="M 80 250 L 92 284 L 108 284 L 120 250 Z" fill={`url(#${id('steel')})`} />
        <path d="M 92 284 L 108 284 L 106 294 L 94 294 Z" fill={`url(#${id('steelDark')})`} />

        {/* ---- needle ---- */}
        <rect x={TIP_X - 0.9} y="292" width="1.8" height="20" fill="#d3dce2" />
      </g>
    </>
  )
}

export default function TattooMachine3D({ className = '', style }) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <MachineArt />
    </svg>
  )
}
