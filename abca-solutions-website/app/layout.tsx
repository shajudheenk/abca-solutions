import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

/**
 * Self-hosted variable fonts. The woff2 files come from the Fontsource
 * packages in package.json and are inlined into the build output by
 * next/font/local, so nothing is requested from a third-party font service at
 * runtime and there is no swap-driven layout shift.
 */
const inter = localFont({
  src: "../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  display: "swap",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  preload: true,
});

const instrument = localFont({
  src: "../node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2",
  display: "swap",
  weight: "400 700",
  style: "normal",
  variable: "--font-instrument",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — free business cost audits, commission disclosed`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  keywords: [
    "business cost audit",
    "merchant services comparison UK",
    "business energy broker",
    "card machine rates UK",
    "business telecoms audit",
    "industrial unit energy costs",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — free business cost audits`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1f26",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${instrument.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </body>
    </html>
  );
}
