import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { ShopReveal } from "@/components/sections/ShopReveal";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { CTABand } from "@/components/sections/CTABand";
import { TextBlock } from "@/components/sections/TextBlock";

export const metadata: Metadata = {
  title: "Botanica Chango | Bosslady Evil Eye - Spiritual Supply Store",
  description:
    "Crystals, blessed jewelry, candles, and spiritual baths on Seventh Street in Allentown, PA. Tarot readings, shell readings, and house cleansings, biweekly on Thursdays.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      <PageBanner
        kicker="Seventh Street"
        headline="Spiritual tools. Honest readings. Open late on Seventh."
        headlineEffect="depth"
        buttons={[
          { label: "See what's in stock", href: "/products" },
          { label: "Visit the store", href: "/contact", variant: "filled" },
        ]}
      />

      <FeatureGrid
        index="02"
        label="What's on the shelf"
        headline="you don't find the thing. the thing finds you."
        items={[
          {
            title: "Crystals & healing stones",
            description: "Amethyst, obsidian, raw clusters, and polished stones — held and felt before they hit the shelf.",
          },
          {
            title: "Spiritual baths & soaps",
            description: "Hand-cut soap bars — lavender, rosemary, copal — and herbal bath salts.",
          },
          {
            title: "Blessed jewelry & collares",
            description: "Collares blessed at the counter, Cuban chains, and charms for protection.",
          },
          {
            title: "Candles for every intention",
            description: "Glass votive candles in every color — protection, court cases, love, prosperity, cleansing.",
          },
          {
            title: "Prayer cards & statues",
            description: "Gold-foil edged prayer cards and hand-painted Orisha statues.",
          },
          {
            title: "Herbal teas & oils",
            description: "Loose-leaf teas, small-batch hair oils, protection lotions, and perfumes.",
          },
        ]}
      />

      <TestimonialGrid />

      <ShopReveal />

      <GalleryGrid
        index="05"
        label="Inside the shop"
        captions={[
          "Candles",
          "Collares on the counter",
          "Cards & crystals",
          "Soap aisle",
          "Bath salts",
          "Intention candles",
        ]}
      />

      <CTABand
        kicker="Stop by Seventh Street"
        headline="Come through. The candles are lit and the door's open."
        buttons={[
          { label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" },
          { label: "Get directions", href: "/contact" },
        ]}
      />

      <TextBlock
        index="06"
        label="About the store"
        headline="What's inside on Seventh Street?"
        paragraphs={[
          "I'm Bosslady Evil Eye, and this is Botanica Chango — a real supply shop for real practice, not a gift shop dressed up as one. Everything on the shelf, I've held and felt myself.",
          "Whether you're deep in the Orisha tradition or just starting to pay attention to your energy, walk in and I'll tell you straight what you need.",
        ]}
        cta={{ label: "Meet Bosslady Evil Eye", href: "/about" }}
      />
    </main>
  );
}
