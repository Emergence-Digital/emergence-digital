import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AttributionCapture from "@/components/layout/AttributionCapture";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/seo";

// Place your font file at: src/app/fonts/MangalPro.otf  (or .ttf)
// Update the src path below if your filename differs
const mangalPro = localFont({
  src: "./fonts/MangalPro.ttf",
  variable: "--font-playfair", // keeps the same CSS variable — no other files need changing
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

// Fallbacks for pages without their own. Pages set theirs with pageMetadata() from lib/seo.ts, and the link preview
// image comes from the nearest opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: { type: "website", locale: "en_AU", siteName: SITE_NAME },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mangalPro.variable} ${inter.variable} antialiased`}>
        <AttributionCapture />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
