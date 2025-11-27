// ============================================
// SITE CONFIG - Konfigurácia stránky
// ============================================
//
// Sem patria metadata a konfigurácia pre celú stránku

export const siteConfig = {
  name: "WordForge",
  description:
    "Fast and replayable word chain game. Compete against time and climb the leaderboards!",
  url: "https://wordforge.vercel.app", // Upraviť na skutočnú URL po deploymente
  ogImage: "https://wordforge.vercel.app/og-image.png", // Vytvoriť OG image
  links: {
    github: "https://github.com/yourusername/wordforge", // Upraviť
  },
  creator: "Your Team Name", // Upraviť
} as const;

export type SiteConfig = typeof siteConfig;
