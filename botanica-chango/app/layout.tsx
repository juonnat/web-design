import type { Metadata, Viewport } from "next";
import { Playfair_Display, Mulish } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";

// Botanica Chango's own established brand typography (client brand wins
// over the house style's Inter/Halyard substitution — see /CLAUDE.md).
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://botanicachango.vercel.app";
const title = "Botanica Chango | Bosslady Evil Eye - Spiritual Supply Store";
const description =
  "Crystals, blessed jewelry, candles, and spiritual baths on Seventh Street in Allentown, PA. Tarot readings, shell readings, and house cleansings, biweekly on Thursdays.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Botanica Chango",
  },
  description,
  keywords: [
    "botanica",
    "spiritual supply store",
    "Allentown PA",
    "tarot readings",
    "shell readings",
    "house cleansing",
    "Orisha",
    "Santeria supplies",
    "Seventh Street",
  ],
  authors: [{ name: "Botanica Chango" }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Botanica Chango",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Botanica Chango" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#8E4EC6",
  colorScheme: "light",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Botanica Chango",
  alternateName: "Bosslady Evil Eye",
  image: `${siteUrl}/og.png`,
  telephone: "+1-610-704-4022",
  email: "botanicachango6@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "441 N 7th St",
    addressLocality: "Allentown",
    addressRegion: "PA",
    postalCode: "18102",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.609142,
    longitude: -75.471254,
  },
  url: siteUrl,
  sameAs: [
    "https://facebook.com/bossladyevileye",
    "https://instagram.com/bossladysevileye",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${mulish.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <SmoothScroll />
        <GrainOverlay />
        <ScrollProgress />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
