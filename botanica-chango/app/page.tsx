import type { Metadata } from "next";
import { HomeContent } from "@/components/pages/HomeContent";

export const metadata: Metadata = {
  title: "Botanica Chango Spiritual Wonders | Bosslady Evil Eye - Spiritual Supply Store",
  description:
    "Crystals, blessed jewelry, candles, and spiritual baths on Seventh Street in Allentown, PA. Tarot readings, shell readings, and house cleansings, biweekly on Thursdays.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeContent />;
}
