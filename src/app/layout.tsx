import { Providers } from "@/components/utils/providers";
import { siteConfig } from "@/config/siteConfig";
import { Metadata } from "next";
import "./globals.css";

// ============================================
// ROOT LAYOUT - Hlavný layout pre celú aplikáciu
// ============================================
//
// Sem patrí:
// - HTML štruktúra (<html>, <body>)
// - Globálne providery (SessionProvider pre autentifikáciu, ThemeProvider ak bude dark mode)
// - Metadata (title, description, icons)
// - Import globálnych štýlov (globals.css s TailwindCSS)
// - Font načítanie (napr. Inter z next/font/google)
// - Analytics ak budú potrebné
//
// Tento layout obaľuje všetky stránky v aplikácii

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["word game", "word chain", "wordforge", "online game"],
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className="min-h-screen bg-surface-50 text-surface-900 antialiased">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
