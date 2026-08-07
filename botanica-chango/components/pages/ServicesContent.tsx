"use client";

import { PageBanner } from "@/components/sections/PageBanner";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { TextBlock } from "@/components/sections/TextBlock";
import { CTABand } from "@/components/sections/CTABand";
import { FAQSection } from "@/components/sections/FAQSection";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function ServicesContent() {
  const t = useTranslation();

  return (
    <main>
      <PageBanner
        kicker={t.services.banner.kicker}
        headline={t.services.banner.headline}
        headlineEffect="depth"
      />

      <ServiceGrid items={t.services.grid.items} />

      <TestimonialGrid />

      <TextBlock
        index="03"
        label={t.services.story.label}
        headline={t.services.story.headline}
        paragraphs={t.services.story.paragraphs}
      />

      <CTABand
        kicker={t.services.cta.kicker}
        headline={t.services.cta.headline}
        buttons={t.services.cta.buttons}
      />

      <FAQSection items={t.services.faq} />
    </main>
  );
}
