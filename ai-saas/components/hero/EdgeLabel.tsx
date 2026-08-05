/**
 * Edge branding, styled as a product serial number — the driftwood token's
 * dedicated role (see /CLAUDE.md). Hero-only: most other sections are dense
 * enough that a second piece of persistent chrome would compete for room.
 */
export function EdgeLabel() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[var(--pad)] top-[136px] z-10 hidden sm:block"
    >
      <span className="voice-label text-label text-driftwood [writing-mode:vertical-rl]">
        Kiln — Runtime 01
      </span>
    </div>
  );
}
