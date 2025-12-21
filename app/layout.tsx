import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans, Playfair_Display } from "next/font/google";
import { WebshopProvider } from "./state";
import { initialWebshopState } from "./domain";
import "./globals.css";
import "./remixicon.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700"],
});

const siteTitle = "Végső kiárusítás - Papsziget";
const siteDescription =
  "Képzeletbeli webshop, ahol a Papsziget ember alkotta tárgyait vásárolhatod meg ökológiai vállalásokkal.";
const siteUrl = "https://papsziget-kiarusitas.netlify.app";
const analyticsWebsiteId = "21b98be8-1d90-404a-884b-a0db0171378a";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteTitle,
  authors: [{ name: "Tamás Csertán", url: "https://tamascsertan.com" }],
  creator: "Tamás Csertán",
  publisher: "Tamás Csertán",
  keywords: [
    "Papsziget",
    "Szentendre",
    "művészeti projekt",
    "webshop",
    "fenntarthatóság",
    "installáció",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "Shopping",
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  themeColor: "#ff0000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={`${plexSans.variable} ${playfair.variable} font-sans antialiased`}>
        <Script
          src="/stats.js"
          data-website-id={analyticsWebsiteId}
          data-host-url="/stats"
          strategy="afterInteractive"
          defer
        />
        <WebshopProvider initialState={initialWebshopState}>
          {children}
        </WebshopProvider>
      </body>
    </html>
  );
}
