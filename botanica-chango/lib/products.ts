/**
 * The online-shop catalog. Snipcart needs each purchasable item defined
 * somewhere in the site's code (it isn't a no-code product editor like
 * Shopify's admin) — this file is that one place. Add a candle scent or
 * change a price here, redeploy, done.
 *
 * These are EXAMPLE items/prices standing in for Bosslady's real catalog
 * and pricing — swap them out before this goes live. Only picked
 * repeatable, stockable items (candles, oils, prayer cards, holy water);
 * one-of-a-kind pieces like raw crystal specimens or collares blessed at
 * the counter aren't good candidates for unattended online sale.
 */
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "candle-protection",
    name: "Protection Candle",
    price: 8,
    description: "Glass votive candle for protection.",
    category: "Candles",
  },
  {
    id: "candle-prosperity",
    name: "Prosperity Candle",
    price: 8,
    description: "Glass votive candle for prosperity.",
    category: "Candles",
  },
  {
    id: "candle-love",
    name: "Love Candle",
    price: 8,
    description: "Glass votive candle for love.",
    category: "Candles",
  },
  {
    id: "holy-water-8oz",
    name: "Holy Water (8oz)",
    price: 10,
    description: "Bottled holy water for practice.",
    category: "Holy water",
  },
  {
    id: "prayer-card-set",
    name: "Prayer Card Set",
    price: 6,
    description: "Gold-foil edged prayer cards, set of 5.",
    category: "Prayer cards",
  },
  {
    id: "oil-protection",
    name: "Protection Oil",
    price: 14,
    description: "Small-batch protection oil blend.",
    category: "Oils",
  },
  {
    id: "perfume-attraction",
    name: "Attraction Perfume",
    price: 16,
    description: "Small-batch attraction perfume.",
    category: "Perfumes",
  },
];
