import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { ContactForm } from "@/components/sections/ContactForm";
import { LocationMap } from "@/components/sections/LocationMap";
import { TextBlock } from "@/components/sections/TextBlock";
import { CTABand } from "@/components/sections/CTABand";
import { FAQSection } from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "Contact Botanica Chango | Bosslady Evil Eye",
  description:
    "Stop by or call Botanica Chango at 441 N 7th St, Allentown, PA. Walk-ins welcome — appointments recommended for readings and cleansings.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main>
      <PageBanner kicker="Get in touch" headline="Stop by or give me a call." headlineEffect="depth" />

      <ContactForm />

      <LocationMap address="441 N 7th St, Allentown, PA 18102" lat={40.609142} lng={-75.471254} />

      <TextBlock
        index="03"
        label="Contact info"
        headline="No appointment needed to shop."
        paragraphs={[
          "Walk-ins are always welcome for browsing the shop — open until 8 PM. Call (610) 704-4022 ahead for a reading, shell reading, cleansing, or consultation.",
          "Readings and cleansings run biweekly, on Thursdays.",
        ]}
      />

      <CTABand
        kicker="Come by"
        headline="441 N 7th St, Allentown, PA 18102."
        buttons={[{ label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" }]}
      />

      <FAQSection
        items={[
          {
            question: "When are readings and cleansings available?",
            answer: "Biweekly, on Thursdays. Call ahead to check availability for the next date.",
          },
          {
            question: "Do I need an appointment to visit the shop?",
            answer: "No — walk-ins are always welcome for shopping. Appointments are recommended for readings and cleansings.",
          },
          {
            question: "What kinds of candles do you carry?",
            answer: "Glass votive candles in colors for protection, court cases, love, prosperity, and cleansing.",
          },
          {
            question: "Do you carry Orisha or Santería supplies?",
            answer: "Yes — collares, hand-painted Orisha statues, holy water, and more, alongside general spiritual supplies.",
          },
          {
            question: "What's your return policy?",
            answer: "All sales are final.",
          },
        ]}
      />
    </main>
  );
}
