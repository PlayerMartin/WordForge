// ============================================
// GAME HEADER - Hlavička hry s info
// ============================================
//
// Sem patrí:
// - Zobrazenie timeru (ťahový timer a globálny timer)
// - Aktuálne skóre
// - Životy (ak je režim Skrytá)
// - Počet zadaných slov
// - Tlačidlo pauza/exit
//
// Props:
// - turnTimeLeft: number (sekundy zostávajúce na ťah)
// - globalTimeLeft: number (sekundy zostávajúce v hre)
// - score: number
// - lives: number | null (null ak je režim Odkrytá)
// - wordCount: number
// - onPause: callback
//
// Použiť vizuálnu indikáciu keď čas sa kráti (napr. červená farba pri <5s)
//
// Client Component
