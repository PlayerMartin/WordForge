// ============================================
// GAME RESULTS - Výsledky po skončení hry
// ============================================
//
// Sem patrí:
// - Zobrazenie finálnych štatistík:
//   - Celkové skóre
//   - Počet slov
//   - Najdlhšie slovo
//   - Priemerná dĺžka slova
//   - WPM (words per minute)
//   - Presnosť (úspešné pokusy / celkové pokusy)
//
// - Porovnanie s osobným rekordom:
//   - "Nový rekord!" alebo "O X bodov menej ako tvoj rekord"
//
// - Pozícia na rebríčku (ak sa dostane do top 100)
//   - "Si na XY. mieste v rebríčku!"
//
// - Tlačidlá:
//   - "Hrať znova" (rovnaké nastavenia)
//   - "Zmeniť nastavenia"
//   - "Zobraziť rebríček"
//   - "Späť na hlavnú"
//
// Props:
// - gameData: finálne dáta z hry
// - personalBest: osobný rekord pre tento mód
// - leaderboardPosition: number | null
//
// Client Component
