export function SectionLabel({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="voice-label flex items-center gap-10 text-label text-driftwood">
      <span>{index}</span>
      <span className="h-[1px] w-24 bg-border" aria-hidden />
      <span>{title}</span>
    </div>
  );
}
