// ============================================
// GAME ENGINE - Hlavná herná logika
// ============================================
//
// Sem patrí:
// - Funkcia initializeGame(settings)
//   - Vytvorí počiatočný GameState
//   - Vygeneruje prvé requiredLetter (náhodné)
//   - Return: GameState
//
// - Funkcia processWordSubmission(word, gameState)
//   - Validuje slovo
//   - Update gameState:
//     - Pridá slovo do wordsUsed
//     - Zvýši skóre
//     - Update requiredLetter (posledné písmeno slova)
//     - Update lives (ak je hidden mód a slovo už bolo použité)
//     - Update attempts
//   - Return: { newGameState, feedback }
//
// - Funkcia updateTimers(gameState, deltaTime)
//   - Zníži turnTimeLeft a globalTimeLeft o deltaTime
//   - Check či hra skončila (0 lives alebo 0 global time)
//   - Return: GameState
//
// - Funkcia checkGameEnd(gameState)
//   - Kontrola či hra skončila
//   - Return: boolean
//
// Použitie:
// import { initializeGame, processWordSubmission } from '@/lib/game/gameEngine'
//
// Implementácia:
// - State management logika
// - Pure funkcie kde je to možné
// - Integrácia s wordValidator a scoreCalculator
