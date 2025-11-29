// ============================================
// GAME SETUP - Nastavenie hry pred začatím
// ============================================
//
// Sem patrí:
// - Formulár pre výber herných nastavení:
//   - Mód: Solo Classic (neskôr PvP, Challenges, atď.)
//   - Skórovanie: Tempo (+1/slovo) alebo Length (floor(len/3))
//   - Režim: Odkrytá (zoznam viditeľný) alebo Skrytá (3 životy)
//   - Jazyk: EN, CZ, SK
//   - Časovače: ťahový (7-10s slider) a globálny (3-5min slider) - voliteľné
//
// - Zobrazenie pravidiel a popisu každého módu
// - Tlačidlo "Začať hru"
//
// Props:
// - onStartGame: (settings: GameSettings) => void
//
// Client Component ("use client")
// Použiť useState pre selections
