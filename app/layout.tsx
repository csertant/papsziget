import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Végső kiárusítás - Papsziget",
  description:
    "Képzeletbeli webshop, ahol a Papsziget ember alkotta tárgyait vásárolhatod meg ökológiai vállalásokkal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className={`${plexSans.variable} ${playfair.variable} font-sans antialiased`}>
        <WebshopProvider initialState={initialWebshopState}>
          {children}
        </WebshopProvider>
      </body>
    </html>
  );
}
