import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Nav } from "@/components/layout/Nav";
import { PageTransition } from "@/components/PageTransition";

// House style specifies Halyard Display (Darden Studio, commercial —
// Adobe Fonts); we don't hold a licence, so Inter substitutes. Both are
// grotesque sans with a large x-height that hold up in uppercase at 12px.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://kiln-ai.vercel.app";
const title = "Kiln — the runtime for autonomous AI agents";
const description =
  "Kiln is the forge where agent workflows are built, tempered, and put to work. Design the process once; the agents finish it every time after.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Kiln",
  },
  description,
  keywords: [
    "AI agents",
    "agent orchestration",
    "autonomous workflows",
    "AI runtime",
    "Kiln",
  ],
  authors: [{ name: "Kiln" }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Kiln",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Kiln" }],
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
  themeColor: "#100904",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <SmoothScroll />
        <GrainOverlay />
        <ScrollProgress />
        <Nav />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
