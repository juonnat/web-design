export function SectionLabel({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="voice-label flex items-center gap-10 text-label text-mute">
      <span>{index}</span>
      <span className="h-[1px] w-24 bg-line" aria-hidden />
      <span>{title}</span>
    </div>
  );
}
