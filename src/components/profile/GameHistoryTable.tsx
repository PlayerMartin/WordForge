// ============================================
// GAME HISTORY TABLE - História hier hráča
// ============================================
//
// Sem patrí:
// - Tabuľka s posledných 10-20 hier užívateľa
// - Stĺpce:
//   - Dátum a čas
//   - Mód (Solo Classic + variant)
//   - Jazyk
//   - Skóre
//   - Počet slov
//   - Najdlhšie slovo
//
// - Click na riadok -> detail hry (modal alebo nová stránka)
// - Pagination alebo "Load more"
//
// Props:
// - games: Array<GameRecord>
// - onGameClick: (gameId: string) => void (voliteľné)
//
// Použiť TanStack Table
//
// Client alebo Server Component
