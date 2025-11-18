// ============================================
// WORD ACTIONS - Server actions pre slovníky
// ============================================
//
// "use server" directive na vrchu súboru!
//
// Sem patria server actions pre prácu so slovníkmi:
//
// 1. checkWordExists(word, language)
//    - Skontroluje či slovo existuje v slovníku
//    - Return: ApiResponse<boolean>
//
// 2. getRandomWord(language, startsWith?)
//    - Získa náhodné slovo zo slovníka
//    - Voliteľne začínajúce určitým písmenom
//    - Return: ApiResponse<string>
//
// 3. searchWords(query, language, limit)
//    - Vyhľadávanie slov (pre debug alebo admin)
//    - Return: ApiResponse<string[]>
//
// 4. getWordCount(language)
//    - Počet slov v slovníku pre daný jazyk
//    - Return: ApiResponse<number>
//
// Použitie:
// import { checkWordExists } from '@/actions/wordActions'
// const exists = await checkWordExists('hello', 'en')
//
// Implementácia:
// 'use server'
//
// export async function checkWordExists(word: string, language: Language) {
//   const normalized = normalizeWord(word, language)
//   const result = await prisma.word.findUnique({
//     where: {
//       word_language: {
//         word: normalized,
//         language,
//       }
//     }
//   })
//   return { success: true, data: !!result }
// }
//
// OPTIMALIZÁCIA:
// - Pre checkWordExists môžete použiť in-memory cache (Redis alebo Map)
// - Načítať celý slovník do pamäte pri štarte (ak je dosť malý)
