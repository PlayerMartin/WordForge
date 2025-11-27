"use server";

import * as gameRepository from "@/repositories/game-repository";
import { GameSettings } from "@/types";

// ============================================
// GAME ACTIONS - Server actions pre hru
// ============================================
//
// "use server" directive na vrchu súboru!
//
// Sem patria server actions pre hernú logiku:
//
// 1. saveGameResult(gameData)
//    - Uloží dokončenú hru do databázy
//    - Vytvorí záznam v Game table
//    - Update LeaderboardEntry (ak je nový rekord)
//    - Update UserStats (agregované štatistiky)
//    - Return: ApiResponse<{ gameId, isNewRecord, leaderboardRank }>
//
// 2. validateWordServer(word, language)
//    - Server-side validácia slova proti slovníku
//    - Dotaz do Words table
//    - Return: ApiResponse<boolean>
//
// Použitie v Client Components:
// import { saveGameResult } from '@/actions/gameActions'
// const result = await saveGameResult(gameData)
//
// Implementácia:
// 'use server'
//
// import { prisma } from '@/lib/prisma'
// import { getCurrentUser } from '@/lib/auth/getSession'
//
// export async function saveGameResult(gameData: GameResults) {
//   const user = await getCurrentUser()
//   if (!user) return { success: false, error: 'Not authenticated' }
//
//   // Implementácia...
// }
//
// DÔLEŽITÉ:
// - Validácia vstupov (použiť Zod)
// - Error handling (try/catch)
// - Autentifikácia check
// - Return type-safe responses

/**
 * Finds the users active game.
 * If user does not have any active game, then the game is created.
 * @param userId
 * @param settings
 * @returns the active gameID
 */
export const JoinGame = async (userId: string, settings: GameSettings) => {
  const activeGame = await gameRepository.FindActiveGameByUserId(userId);

  if (activeGame) {
    return activeGame;
  }

  return await gameRepository.CreateGame(userId, settings);
};

export const FinishGame = async (gameId: string) => {
  return await gameRepository.FinishGame(gameId);
};

export const GameExists = async (gameId: string) => {
  return await gameRepository.GameExists(gameId);
};
