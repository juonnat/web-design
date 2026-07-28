import { studio } from '../data/content'

export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <iframe
        title="Ink Novation location"
        src={studio.mapsEmbedSrc}
        width="100%"
        height="320"
        style={{ border: 0, filter: 'grayscale(0.4) invert(0.92) contrast(0.9)' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}
