// Same edge-branding pattern as Kiln's hero (vertical text running down
// the right margin) — restyled to this brand's own type and color, since
// Ink Novation has its own identity and only the structural pattern
// carries over, not Kiln's palette.
export default function EdgeLabel({ text }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 md:block"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-muted [writing-mode:vertical-rl]">
        {text}
      </span>
    </div>
  )
}
