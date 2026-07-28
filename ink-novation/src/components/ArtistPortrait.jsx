import { portraitFor } from '../data/images'

// Renders an artist's photo, or a neutral placeholder for artists whose
// portrait hasn't been collected yet. Keeping the fallback here means every
// surface that shows a face degrades the same way.
export default function ArtistPortrait({ artist, className = '', sizes }) {
  const src = portraitFor(artist.slug)

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-ink-charcoal-light to-ink-black ${className}`}
      >
        <svg
          className="h-16 w-16 text-ink-accent-light/60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`${artist.name}, ${artist.role} at Ink Novation`}
      loading="lazy"
      decoding="async"
      sizes={sizes}
      // Faces sit in the upper part of a portrait-orientation photo, so bias
      // the crop upward — centering cuts foreheads off in the square/4:3 slots.
      className={`object-cover [object-position:center_28%] ${className}`}
    />
  )
}
