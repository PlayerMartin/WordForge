// ============================================
// SITE CONFIG - Konfigurácia stránky
// ============================================
//
// Sem patria metadata a konfigurácia pre celú stránku

export const siteConfig = {
  name: 'WordForge',
  description: 'Fast and replayable word chain game. Compete against time and climb the leaderboards!',
  url: 'https://wordforge.vercel.app', // Upraviť na skutočnú URL po deploymente
  ogImage: 'https://wordforge.vercel.app/og-image.png', // Vytvoriť OG image
  links: {
    github: 'https://github.com/yourusername/wordforge', // Upraviť
  },
  creator: 'Your Team Name', // Upraviť
} as const

export type SiteConfig = typeof siteConfig

// = Metadata pre Next.js =
// Použitie v app/layout.tsx:
// import { siteConfig } from '@/config/siteConfig'
//
// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s | ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   keywords: ['word game', 'word chain', 'wordforge', 'online game'],
//   authors: [{ name: siteConfig.creator }],
//   creator: siteConfig.creator,
//   openGraph: {
//     type: 'website',
//     locale: 'en_US',
//     url: siteConfig.url,
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//     images: [{ url: siteConfig.ogImage }],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: siteConfig.name,
//     description: siteConfig.description,
//     images: [siteConfig.ogImage],
//   },
// }
