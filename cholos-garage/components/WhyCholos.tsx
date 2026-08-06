import { TRUST_BLOCKS } from "@/lib/business";
import { SectionHeading } from "@/components/SectionHeading";

export function WhyCholos() {
  return (
    <section id="why-us" className="section bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading kicker="Why Cholo's" title="The Shop Bethlehem Trusts" />

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {TRUST_BLOCKS.map((block, i) => (
            <div key={block.title} className="flex gap-5 border-t border-line pt-5">
              <span className="voice-heading shrink-0 text-4xl text-accent/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="voice-heading text-xl text-ink">{block.title}</h3>
                <p className="text-sm leading-relaxed text-mute">{block.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
