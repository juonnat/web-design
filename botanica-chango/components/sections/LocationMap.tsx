export function LocationMap({
  address,
  lat,
  lng,
}: {
  address: string;
  lat?: number;
  lng?: number;
}) {
  const query = lat && lng ? `${lat},${lng}` : encodeURIComponent(address);

  return (
    <section className="section flex min-h-[60svh] flex-col justify-center gap-24 py-68">
      <span className="voice-label text-label text-mute">{address}</span>
      <div className="border border-dashed border-line rounded-[var(--radius-card)] overflow-hidden">
        <iframe
          title="Botanica Chango Spiritual Wonders location"
          className="h-[360px] w-full grayscale-[0.2]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${query}&output=embed`}
        />
      </div>
    </section>
  );
}
