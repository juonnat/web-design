import type { Metadata } from "next";
import { ServicesContent } from "@/components/pages/ServicesContent";

export const metadata: Metadata = {
  title: "Spiritual Services - Botanica Chango Spiritual Wonders | Bosslady Evil Eye",
  description:
    "Tarot card readings, shell readings, spiritual house cleansings, and personal consultations with Bosslady Evil Eye. Biweekly on Thursdays, on Seventh Street in Allentown, PA.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return <ServicesContent />;
}
