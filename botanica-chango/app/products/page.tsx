import type { Metadata } from "next";
import { PageBanner } from "@/components/sections/PageBanner";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ShopGrid } from "@/components/sections/ShopGrid";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { TestimonialGrid } from "@/components/sections/TestimonialGrid";
import { CTABand } from "@/components/sections/CTABand";
import { TextBlock } from "@/components/sections/TextBlock";

export const metadata: Metadata = {
  title: "Spiritual Products - Botanica Chango Spiritual Wonders | Bosslady Evil Eye",
  description:
    "Blessed jewelry, crystals, candles, and spiritual baths on Seventh Street in Allentown, PA — over 50 products for real spiritual practice.",
  alternates: { canonical: "/products" },
};

export default function Products() {
  return (
    <main>
      <PageBanner
        kicker="On Seventh Street"
        headline="Blessed jewelry, crystals, and spiritual baths in Allentown."
        headlineEffect="depth"
      />

      <FeatureGrid
        index="02"
        label="Over 50 products"
        headline="What's in the shop"
        items={[
          { title: "Blessed jewelry & collares", description: "Collares blessed at the counter, Cuban chains, charms for protection." },
          { title: "Spiritual baths & herbal soaps", description: "Hand-cut soap bars — lavender, rosemary, copal — and herbal bath salts." },
          { title: "Crystals & healing stones", description: "Amethyst, obsidian, raw clusters, and polished stones." },
          { title: "Prayer cards & candles", description: "Gold-foil edged prayer cards and glass votive candles for every intention." },
          { title: "Orisha statues & holy water", description: "Hand-painted Orisha statues and bottled holy water for practice." },
          { title: "Perfumes, oils & lotions", description: "Loose-leaf teas, small-batch hair oils, money-drawing colognes, and attraction perfumes." },
        ]}
      />

      <ShopGrid index="03" />

      <GalleryGrid
        index="04"
        label="Product highlights"
        captions={[
          "Blessed collares",
          "Crystal display",
          "Candle wall",
          "Bath salts",
          "Orisha statues",
          "Prayer cards",
        ]}
      />

      <TestimonialGrid />

      <CTABand
        kicker="Shop now"
        headline="Come see it in person — no catalog does it justice."
        buttons={[
          { label: "(610) 704-4022", href: "tel:+16107044022", variant: "filled" },
          { label: "Ask about an item", href: "/contact" },
        ]}
      />

      <TextBlock
        index="06"
        label="Product highlights"
        headline="Blessed collares and spiritual baths on Seventh Street."
        paragraphs={[
          "Every collar is blessed at the counter, not shipped in pre-made. The same goes for the herbal baths and soaps — hand-cut, small batch, meant to be used.",
          "All sales are final, so ask me anything before you buy — I'd rather you leave with the right thing.",
        ]}
      />
    </main>
  );
}
