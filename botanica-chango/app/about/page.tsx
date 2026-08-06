import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { TextBlock } from "@/components/sections/TextBlock";
import { CTABand } from "@/components/sections/CTABand";
import { LocationMap } from "@/components/sections/LocationMap";

export const metadata: Metadata = {
  title: "About Botanica Chango | Bosslady Evil Eye - Our Story",
  description:
    "Meet Bosslady Evil Eye, the owner of Botanica Chango on Seventh Street in Allentown, PA. Real products for real practice — tarot, shell readings, and house cleansings.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main>
      <PageBanner
        kicker="Our Story"
        headline="Meet Bosslady Evil Eye. She's at the counter."
        headlineEffect="depth"
      />

      <FeatureGrid
        index="02"
        label="What I stand behind"
        headline="How I run the shop"
        items={[
          { title: "Real products for real practice", description: "Nothing on the shelf is decoration — every piece is meant to be used." },
          { title: "Shell readings, not small talk", description: "Cowrie shell divination, straight and traditional — no theater." },
          { title: "Thorough, not rushed", description: "A cleansing or a reading gets the time it needs, even if that means waiting for the next slot." },
          { title: "Jewelry that means something", description: "Collares are blessed at the counter before they leave the shop." },
          { title: "Honest, not salesy", description: "If something isn't right for you, I'll tell you — I'm not here to upsell." },
          { title: "Local to Allentown", description: "441 N 7th St — the shop on Seventh Street, walk-ins welcome." },
          { title: "Open to everyone", description: "Deep in the Orisha tradition or just starting out with energy work — you're welcome at the counter." },
          { title: "One person, every visit", description: "It's a one-person shop. When you come in, you're talking to Bosslady, not staff." },
        ]}
      />

      <TestimonialGrid />

      <TextBlock
        index="03"
        label="Botanica Chango"
        headline="Why Botanica Chango"
        paragraphs={[
          "Botanica Chango is a spiritual supply store built around the Orisha and Santería tradition, and around anyone else doing real energy work — manifestation, protection, cleansing, or just paying closer attention to what they carry.",
          "I'm Bosslady Evil Eye. This shop is mine, and I run it the way I'd want to be treated walking in: told the truth, not sold a story.",
        ]}
      />

      <CTABand
        kicker="Come by"
        headline="Call ahead or just walk in."
        buttons={[
          { label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" },
          { label: "Visit the shop", href: "/contact" },
        ]}
      />

      <LocationMap address="441 N 7th St, Allentown, PA 18102" lat={40.609142} lng={-75.471254} />
    </main>
  );
}
