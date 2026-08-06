import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { TextBlock } from "@/components/sections/TextBlock";
import { CTABand } from "@/components/sections/CTABand";
import { FAQSection } from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "Spiritual Services - Botanica Chango | Bosslady Evil Eye",
  description:
    "Tarot card readings, shell readings, spiritual house cleansings, and personal consultations with Bosslady Evil Eye. Biweekly on Thursdays, on Seventh Street in Allentown, PA.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <main>
      <PageBanner
        kicker="Spiritual Services"
        headline="Book a reading or cleansing. Thursdays, biweekly, on Seventh."
        headlineEffect="depth"
      />

      <ServiceGrid
        items={[
          {
            title: "Tarot card readings",
            duration: "~10–15 min",
            description: "Clarity on relationships, finances, and personal growth. I read the cards straight.",
          },
          {
            title: "Shell readings",
            description: "Traditional cowrie shell divination to reveal hidden truths and guide decisions.",
          },
          {
            title: "Spiritual house cleansings",
            duration: "~20–30 min",
            description: "Traditional prayers, herbs, and blessed waters to remove negative energy and spiritual blockages. Personalized to your home.",
          },
          {
            title: "Personal consultations",
            description: "Sit-down guidance on work, family, finances, or anything else on your mind.",
          },
        ]}
      />

      <TestimonialGrid />

      <TextBlock
        index="03"
        label="What we do"
        headline="Booking a service"
        paragraphs={[
          "All readings and cleansings run biweekly on Thursdays. Call ahead to check availability — appointments are recommended, but I'll take walk-ins when time allows.",
          "Cancellations with less than 24 hours' notice are subject to a $27 cancellation fee.",
        ]}
      />

      <CTABand
        kicker="Ready when you are"
        headline="Book a reading."
        buttons={[{ label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" }]}
      />

      <FAQSection
        items={[
          {
            question: "What does a reading involve?",
            answer: "A tarot or shell reading is usually 10–15 minutes. Bring a question or come with an open mind — I'll read what comes up straight, no filler.",
          },
          {
            question: "How long does a house cleansing take?",
            answer: "About 20–30 minutes, depending on the space. It's personalized — traditional prayers, herbs, and blessed waters.",
          },
          {
            question: "Do I need an appointment?",
            answer: "Appointments are recommended so I can give you the time you need. Walk-ins are welcome when the schedule allows.",
          },
          {
            question: "What kinds of questions can I bring?",
            answer: "Relationships, finances, family, work, personal growth — whatever's actually on your mind. There's no wrong question.",
          },
          {
            question: "Can I buy something without getting a reading?",
            answer: "Of course — the shop is open for browsing any time, no reading required.",
          },
          {
            question: "What's the difference between a reading and a consultation?",
            answer: "A reading (tarot or shell) is focused on the cards or shells themselves. A consultation is a broader sit-down conversation about what's going on in your life.",
          },
        ]}
      />
    </main>
  );
}
