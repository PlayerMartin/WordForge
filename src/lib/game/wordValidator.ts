// ============================================
// WORD VALIDATOR - Validácia slov
// ============================================
//
// Sem patrí:
// - Funkcia validateWord(word, requiredLetter, language, usedWords)
//   - Kontrola či slovo začína správným písmenom
//   - Kontrola či slovo existuje v slovníku (dotaz do DB)
//   - Kontrola či slovo už nebolo použité (ak je potrebné)
//   - Return: WordValidationResult
//
// - Funkcia normalizeWord(word, language)
//   - Prevod na lowercase
//   - Odstránenie medzier
//   - Normalizácia diakritiky (voliteľné, podľa jazyka)
//   - Return: string
//
// - Funkcia getLastLetter(word)
//   - Return posledné písmeno slova (pre chain)
//   - Handle edge cases (napr. slovo končiace na "ch" v češtine?)
//
// Použitie:
// import { validateWord, normalizeWord } from '@/lib/game/wordValidator'
// const result = await validateWord('apple', 'a', 'en', [])
//
// Implementácia:
// - Použiť Prisma na dotaz do Words tabuľky
// - Cache slovníka v pamäti (voliteľné, pre performance)
// - Export async funkcií
