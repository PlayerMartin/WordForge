// ============================================
// PRISMA SEED SCRIPT - Naplnenie databázy
// ============================================
//
// Tento script sa spustí cez: npx prisma db seed
// Konfigurácia v package.json:
// "prisma": {
//   "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
// }
//
// Sem patrí:
// 1. Import wordlistov z prisma/wordlists/ do Words tabuľky
//    - Načítať EN, CZ, SK wordlisty
//    - Pre každé slovo:
//      - Prevod na lowercase
//      - Odstránenie duplicít
//      - Výpočet dĺžky
//      - Detekcia vulgarizmov (voliteľné, pomocou zoznamu banned words)
//    - Bulk insert do databázy (použiť createMany)
//
// 2. Vytvorenie test používateľov (voliteľné, len pre development)
//    - Vytvoriť 2-3 dummy users
//    - Vytvoriť dummy games a leaderboard entries
//    - Vytvoriť dummy štatistiky
//
// Štruktúra:
// - async main() funkcia
// - Error handling
// - Prisma client disconnect na konci
//
// Príklad:
// const words = await loadWordlist('prisma/wordlists/en.txt', 'en')
// await prisma.word.createMany({ data: words })
