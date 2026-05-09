import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexus Global Consultancy — Real Estate, Visa & Luxury Travel | Dubai",
  description:
    "Authoritative international consultancy for high-net-worth individuals and businesses. Real estate investment, visa & immigration, luxury travel & relocation across 40+ countries.",
  metadataBase: new URL("https://nexusglobal.example"),
  openGraph: {
    title: "Nexus Global Consultancy",
    description:
      "Real estate investment, visa & immigration, and luxury travel for global citizens. 500+ clients, 40+ countries, 98% success rate.",
    type: "website",
    locale: "en_AE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
