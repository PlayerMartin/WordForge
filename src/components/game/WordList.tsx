// ============================================
// WORD LIST - Zoznam zadaných slov
// ============================================
//
// Sem patrí:
// - Zobrazenie zoznamu všetkých zadaných slov v tejto hre
// - Každé slovo zobrazuje:
//   - Slovo samotné
//   - Počet písmen
//   - Body získané za slovo
// - Auto-scroll na najnovšie slovo
// - Vizuálne odlíšenie posledného slova
//
// Props:
// - words: Array<{word: string, length: number, points: number}>
// - scoringMode: "tempo" | "length"
//
// Zobrazuje sa LEN v režime "Odkrytá"
// V režime "Skrytá" sa nezobrazuje vôbec
//
// Client Component (pre auto-scroll)
