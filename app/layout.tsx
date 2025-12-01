import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { WebshopProvider } from "./state";
import { initialWebshopState } from "./domain";
import "./globals.css";
import "./remixicon.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Papsziget – Felszámolási Webshop",
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
      <body className={`${plexSans.variable} font-sans antialiased`}>
        <WebshopProvider initialState={initialWebshopState}>
          {children}
        </WebshopProvider>
      </body>
    </html>
  );
}
