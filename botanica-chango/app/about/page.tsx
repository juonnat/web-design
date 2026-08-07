import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About Botanica Chango Spiritual Wonders | Bosslady Evil Eye - Our Story",
  description:
    "Meet Bosslady Evil Eye, the owner of Botanica Chango Spiritual Wonders on Seventh Street in Allentown, PA. Real products for real practice — tarot, shell readings, and house cleansings.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <AboutContent />;
}
