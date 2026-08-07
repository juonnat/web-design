import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact Botanica Chango Spiritual Wonders | Bosslady Evil Eye",
  description:
    "Stop by or call Botanica Chango Spiritual Wonders at 441 N 7th St, Allentown, PA. Walk-ins welcome — appointments recommended for readings and cleansings.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return <ContactContent />;
}
