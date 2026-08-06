import { Star, Quote } from "lucide-react";
import { BUSINESS, REVIEW_QUOTES } from "@/lib/business";
import { SectionHeading } from "@/components/SectionHeading";

export function Reviews() {
  return (
    <section id="reviews" className="section py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker="Reviews" title="What Customers Say" />
          <div className="voice-label flex items-center gap-2 text-sm text-ink">
            <div className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            {BUSINESS.rating} &middot; {BUSINESS.reviewCount} Google Reviews
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {REVIEW_QUOTES.map((review) => (
            <blockquote
              key={review.quote}
              className="flex flex-col gap-4 border border-line bg-surface p-6"
            >
              <Quote className="h-6 w-6 text-accent" aria-hidden />
              <p className="text-lg leading-relaxed text-ink">&ldquo;{review.quote}&rdquo;</p>
              <footer className="voice-label mt-auto text-xs text-mute">{review.attribution}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
