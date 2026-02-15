import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yann Lephay — Builder",
  description: "Solo founder building micro-SaaS products. LeCapybara, LMNP Facile, OneMinuteBranding, Indxel, Winterbloom, Eclo.",
  metadataBase: new URL("https://yann-lephay.com"),
  openGraph: {
    title: "Yann Lephay — Builder",
    description: "Solo founder building micro-SaaS products.",
    url: "https://yann-lephay.com",
    siteName: "Yann Lephay",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yann Lephay — Builder",
    description: "Solo founder building micro-SaaS products.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#FAFAFA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${GeistPixelSquare.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
