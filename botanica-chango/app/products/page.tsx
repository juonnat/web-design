import type { Metadata } from "next";
import { ProductsContent } from "@/components/pages/ProductsContent";

export const metadata: Metadata = {
  title: "Spiritual Products - Botanica Chango Spiritual Wonders | Bosslady Evil Eye",
  description:
    "Blessed jewelry, crystals, candles, and spiritual baths on Seventh Street in Allentown, PA — over 50 products for real spiritual practice.",
  alternates: { canonical: "/products" },
};

export default function Products() {
  return <ProductsContent />;
}
