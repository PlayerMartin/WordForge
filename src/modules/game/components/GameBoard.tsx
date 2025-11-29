// ============================================
// GAME BOARD - Hlavný herný komponent
// ============================================
//
// Sem patrí:
// - Zobrazenie aktuálneho stavu hry
// - Render všetkých herných sub-komponentov:
//   - <GameHeader /> - timery, skóre, životy
//   - <RequiredLetter /> - zobrazenie požadovaného písmena
//   - <WordInput /> - input pre zadávanie slov
//   - <WordList /> - zoznam zadaných slov (ak je režim Odkrytá)
//   - <GameFeedback /> - feedback pre hráča (správne/nesprávne, chyby)
//
// Props:
// - gameState: aktuálny stav hry (z GameContext alebo useState)
// - onWordSubmit: callback pre odoslanie slova
// - onGameEnd: callback keď hra skončí
//
// Client Component ("use client")
// State management cez useState alebo useReducer
