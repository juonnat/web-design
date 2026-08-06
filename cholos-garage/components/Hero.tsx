import { Phone, MapPin, Star, Wrench } from "lucide-react";
import { BUSINESS, MAPS_DIRECTIONS_URL } from "@/lib/business";

export function Hero() {
  return (
    <section id="top" className="section relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div aria-hidden className="h-1.5 hazard-stripes absolute inset-x-0 top-0" />

      <Wrench
        aria-hidden
        className="pointer-events-none absolute -right-10 top-16 h-56 w-56 -rotate-12 text-surface-raised sm:h-72 sm:w-72"
        strokeWidth={1}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-start gap-6 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <InspectionBadge line1={`${BUSINESS.yearsInBusiness}`} line2="Years" rotate="-rotate-3" />
          <InspectionBadge
            line1={
              <span className="flex items-center gap-1">
                {BUSINESS.rating}
                <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
              </span>
            }
            line2={`${BUSINESS.reviewCount} Reviews`}
            rotate="rotate-2"
          />
        </div>

        <h1 className="voice-heading text-4xl leading-[0.95] text-ink sm:text-6xl md:text-7xl">
          {BUSINESS.yearsInBusiness} Years Fixing Bethlehem&rsquo;s Cars
          <span className="text-accent"> — Honestly.</span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
          PA state inspections &amp; emissions, Subaru repair specialists, brakes, exhaust, classic
          cars, and trucks — the neighborhood garage Bethlehem has trusted for {BUSINESS.yearsInBusiness}{" "}
          years. Not a chain. Not a dealership.
        </p>

        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={BUSINESS.phone.href}
            className="voice-label inline-flex items-center justify-center gap-3 rounded-sm bg-accent px-8 py-4 text-base text-on-accent transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone className="h-5 w-5" aria-hidden />
            Call {BUSINESS.phone.display}
          </a>
          <a
            href={MAPS_DIRECTIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="voice-label inline-flex items-center justify-center gap-3 rounded-sm border border-line px-8 py-4 text-base text-ink transition-colors hover:border-accent"
          >
            <MapPin className="h-5 w-5" aria-hidden />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

function InspectionBadge({
  line1,
  line2,
  rotate,
}: {
  line1: React.ReactNode;
  line2: string;
  rotate: string;
}) {
  return (
    <div
      className={`voice-heading flex flex-col items-center rounded-sm border-2 border-dashed border-accent bg-surface px-4 py-2 text-center leading-none text-ink ${rotate}`}
    >
      <span className="text-2xl">{line1}</span>
      <span className="voice-label mt-1 text-[10px] text-mute">{line2}</span>
    </div>
  );
}
