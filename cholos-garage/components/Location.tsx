import { MapPin, Phone } from "lucide-react";
import { BUSINESS, FULL_ADDRESS, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from "@/lib/business";
import { SectionHeading } from "@/components/SectionHeading";

export function Location() {
  return (
    <section id="location" className="section bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Visit Us" title="Location &amp; Hours" />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 border border-line bg-canvas p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-ink">{BUSINESS.address.street}</p>
                  <p className="text-mute">
                    {BUSINESS.address.city}, {BUSINESS.address.state} {BUSINESS.address.zip}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                <a href={BUSINESS.phone.href} className="text-ink hover:text-accent">
                  {BUSINESS.phone.display}
                </a>
              </div>
              <a
                href={MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
                className="voice-label mt-2 inline-flex w-fit items-center gap-2 rounded-sm border border-line px-5 py-3 text-xs text-ink transition-colors hover:border-accent"
              >
                Get Directions
              </a>
            </div>

            <table className="w-full border border-line text-sm">
              <tbody>
                {BUSINESS.hours.map((row) => (
                  <tr key={row.days} className="border-b border-line last:border-b-0">
                    <td className="voice-label px-4 py-2.5 text-xs text-mute">{row.days}</td>
                    <td className="px-4 py-2.5 text-right text-ink">
                      {row.open ? `${row.open} – ${row.close}` : "Closed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="min-h-[320px] overflow-hidden border border-line lg:min-h-full">
            <iframe
              title={`Map to ${BUSINESS.name}`}
              src={MAPS_EMBED_URL}
              className="h-full min-h-[320px] w-full grayscale invert-[0.92] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label={`Map showing ${FULL_ADDRESS}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
