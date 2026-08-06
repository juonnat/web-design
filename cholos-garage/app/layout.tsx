import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/business";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://cholos-garage.vercel.app";
const title = "Cholo's Garage | Bethlehem, PA Auto Repair & PA State Inspections";
const description =
  "37 years fixing Bethlehem's cars, honestly. PA state inspections & emissions, Subaru repair specialists, brakes, exhaust, classic cars, and trucks. 4.6 stars, 53 Google reviews.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "auto repair Bethlehem PA",
    "PA state inspection",
    "emissions testing Bethlehem",
    "Subaru repair Bethlehem",
    "brake repair Bethlehem PA",
    "muffler shop Bethlehem",
    "mechanic Lehigh Valley",
  ],
  authors: [{ name: BUSINESS.name }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: BUSINESS.name,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#121110",
  colorScheme: "dark",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: BUSINESS.name,
  image: `${siteUrl}/og.png`,
  telephone: BUSINESS.phone.href.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.state,
    postalCode: BUSINESS.address.zip,
    addressCountry: "US",
  },
  url: siteUrl,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.rating,
    reviewCount: BUSINESS.reviewCount,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
