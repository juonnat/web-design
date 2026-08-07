"use client";

import { HomeHero } from "@/components/sections/HomeHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { ShopReveal } from "@/components/sections/ShopReveal";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CTABand } from "@/components/sections/CTABand";
import { TextBlock } from "@/components/sections/TextBlock";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function HomeContent() {
  const t = useTranslation();

  return (
    <main>
      <HomeHero kicker={t.home.hero.kicker} headline={t.home.hero.headline} buttons={t.home.hero.buttons} />

      <FeatureGrid
        index="02"
        label={t.home.features.label}
        headline={t.home.features.headline}
        items={t.home.features.items}
      />

      <TestimonialGrid />

      <ShopReveal />

      <GalleryGrid index="05" label={t.home.gallery.label} captions={t.home.gallery.captions} />

      <CTABand kicker={t.home.cta.kicker} headline={t.home.cta.headline} buttons={t.home.cta.buttons} />

      <TextBlock
        index="06"
        label={t.home.story.label}
        headline={t.home.story.headline}
        paragraphs={t.home.story.paragraphs}
        cta={t.home.story.cta}
      />
    </main>
  );
}
