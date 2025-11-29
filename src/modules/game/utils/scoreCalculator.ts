// ============================================
// SCORE CALCULATOR - Výpočet skóre
// ============================================
//
// Sem patrí:
// - Funkcia calculateScore(word, scoringMode)
//   - Tempo mód: return 1 (každé slovo = 1 bod)
//   - Length mód: return Math.floor(word.length / 3)
//   - Return: number
//
// - Funkcia calculateGameResults(gameState)
//   - Spočítať finálne štatistiky:
//     - Total score
//     - Word count
//     - Longest word
//     - Average word length
//     - WPM (words per minute)
//     - Accuracy (successfulAttempts / totalAttempts)
//   - Return: GameResults
//
// Použitie:
// import { calculateScore, calculateGameResults } from '@/lib/game/scoreCalculator'
// const points = calculateScore('hello', 'length') // 1
//
// Implementácia:
// - Pure funkcie (bez side effects)
// - Export jednotlivých funkcií
