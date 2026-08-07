"use client";

import { PageBanner } from "@/components/sections/PageBanner";
import { ContactForm } from "@/components/sections/ContactForm";
import { LocationMap } from "@/components/sections/LocationMap";
import { TextBlock } from "@/components/sections/TextBlock";
import { CTABand } from "@/components/sections/CTABand";
import { FAQSection } from "@/components/sections/FAQSection";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function ContactContent() {
  const t = useTranslation();

  return (
    <main>
      <PageBanner
        kicker={t.contactPage.banner.kicker}
        headline={t.contactPage.banner.headline}
        headlineEffect="depth"
      />

      <ContactForm />

      <LocationMap address="441 N 7th St, Allentown, PA 18102" lat={40.609142} lng={-75.471254} />

      <TextBlock
        index="03"
        label={t.contactPage.story.label}
        headline={t.contactPage.story.headline}
        paragraphs={t.contactPage.story.paragraphs}
      />

      <CTABand
        kicker={t.contactPage.cta.kicker}
        headline={t.contactPage.cta.headline}
        buttons={t.contactPage.cta.buttons}
      />

      <FAQSection items={t.contactPage.faq} />
    </main>
  );
}
