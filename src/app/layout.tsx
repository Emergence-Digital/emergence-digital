import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar, { FunnelHeader } from "@/components/layout/Navbar";
import Footer, { FunnelFooter } from "@/components/layout/Footer";
import SiteChrome from "@/components/layout/SiteChrome";
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

// Inter, self-hosted so builds don't depend on Google Fonts (Vercel builds failed intermittently when Google served
// URLs Turbopack couldn't parse). It's the same file Google served: the variable font's Latin set. Its weights stay
// 300 to 600, as they were from Google, so heavier text still renders at 600. Licence: SIL OFL 1.1, in
// fonts/InterVariable-LICENSE.txt.
const inter = localFont({
  src: "./fonts/InterVariable-latin.woff2",
  variable: "--font-inter",
  weight: "300 600",
  display: "swap",
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
        <SiteChrome site={<Navbar />} funnel={<FunnelHeader />} />
        <main>{children}</main>
        <SiteChrome site={<Footer />} funnel={<FunnelFooter />} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
