"use client";

import { PageBanner } from "@/components/sections/PageBanner";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ShopGrid } from "@/components/sections/ShopGrid";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { CTABand } from "@/components/sections/CTABand";
import { TextBlock } from "@/components/sections/TextBlock";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function ProductsContent() {
  const t = useTranslation();

  return (
    <main>
      <PageBanner
        kicker={t.products.banner.kicker}
        headline={t.products.banner.headline}
        headlineEffect="depth"
      />

      <FeatureGrid
        index="02"
        label={t.products.features.label}
        headline={t.products.features.headline}
        items={t.products.features.items}
      />

      <ShopGrid index="03" />

      <GalleryGrid index="04" label={t.products.gallery.label} captions={t.products.gallery.captions} />

      <TestimonialGrid />

      <CTABand
        kicker={t.products.cta.kicker}
        headline={t.products.cta.headline}
        buttons={t.products.cta.buttons}
      />

      <TextBlock
        index="06"
        label={t.products.story.label}
        headline={t.products.story.headline}
        paragraphs={t.products.story.paragraphs}
      />
    </main>
  );
}
