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

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WordForge",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body>
      <main className="container py-10">{children}</main>
    </body>
  </html>
);

export default RootLayout;
