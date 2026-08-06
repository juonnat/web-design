export function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="voice-label text-xs text-accent">{kicker}</span>
      <h2 className="voice-heading text-3xl text-ink sm:text-4xl">{title}</h2>
    </div>
  );
}
