// ============================================
// LEADERBOARD ACTIONS - Server actions pre rebríčky
// ============================================
//
// "use server" directive na vrchu súboru!
//
// Sem patria server actions pre rebríčky:
//
// 1. getLeaderboard(filter)
//    - Získa top 100 záznamov pre danú kombináciu (mode, scoring, visibility, language)
//    - Include user data (username, avatar)
//    - Pridá rank (pozíciu)
//    - Mark current user entry
//    - Return: ApiResponse<Leaderboard>
//
// 2. getUserLeaderboardPosition(userId, filter)
//    - Získa pozíciu používateľa na rebríčku
//    - Return: ApiResponse<number | null>
//
// 3. getPersonalBests(userId)
//    - Získa všetky osobné rekordy používateľa
//    - Pre všetky kombinácie módov a jazykov
//    - Return: ApiResponse<PersonalBest[]>
//
// Použitie:
// import { getLeaderboard } from '@/actions/leaderboardActions'
// const leaderboard = await getLeaderboard({ mode: 'solo_classic', ... })
//
// Implementácia:
// 'use server'
//
// export async function getLeaderboard(filter: LeaderboardFilter) {
//   const entries = await prisma.leaderboardEntry.findMany({
//     where: {
//       mode: filter.mode,
//       scoringMode: filter.scoringMode,
//       visibilityMode: filter.visibilityMode,
//       language: filter.language,
//     },
//     include: { user: true },
//     orderBy: { score: 'desc' },
//     take: 100,
//   })
//   // Pridať rank, formátovať...
// }
