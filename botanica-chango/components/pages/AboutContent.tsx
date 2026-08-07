"use client";

import { PageBanner } from "@/components/sections/PageBanner";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { TextBlock } from "@/components/sections/TextBlock";
import { CTABand } from "@/components/sections/CTABand";
import { LocationMap } from "@/components/sections/LocationMap";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function AboutContent() {
  const t = useTranslation();

  return (
    <main>
      <PageBanner
        kicker={t.about.banner.kicker}
        headline={t.about.banner.headline}
        headlineEffect="depth"
      />

      <FeatureGrid
        index="02"
        label={t.about.features.label}
        headline={t.about.features.headline}
        items={t.about.features.items}
      />

      <TestimonialGrid />

      <TextBlock
        index="03"
        label={t.about.story.label}
        headline={t.about.story.headline}
        paragraphs={t.about.story.paragraphs}
      />

      <CTABand kicker={t.about.cta.kicker} headline={t.about.cta.headline} buttons={t.about.cta.buttons} />

      <LocationMap address="441 N 7th St, Allentown, PA 18102" lat={40.609142} lng={-75.471254} />
    </main>
  );
}
