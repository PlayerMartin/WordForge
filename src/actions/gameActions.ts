"use server";

import { GAME_MODES, GameModeId } from "@/modules/game/config/modes";
import * as gameRepository from "@/modules/game/repositories/game-repository";
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
// actions/gameActions.ts
export const JoinGame = async (userId: string, settings: GameSettings) => {
  const activeGameId = await gameRepository.FindActiveGameByUserId(userId);

  if (activeGameId) {
    const activeGame = await gameRepository.GetGame(activeGameId);

    if (activeGame && activeGame.mode === settings.mode) {
      return activeGameId;
    }

    if (activeGame) {
      await gameRepository.FinishGame(activeGameId);
    }
  }

  return await gameRepository.CreateGame(userId, settings);
};


export const FinishGame = async (gameId: string) => {
  return await gameRepository.FinishGame(gameId);
};

export const GetGame = async (gameId: string) => {
  return await gameRepository.GetGame(gameId);
};

export const StartGameForMode = async (
  userId: string,
  modeId: GameModeId,
  language: "en" | "cz" | "sk" = "en"
) => {
  const modeConfig = GAME_MODES.find((m) => m.id === modeId);

  if (!modeConfig) {
    throw new Error(`Invalid game mode: ${modeId}`);
  }

  const settings: GameSettings = {
    mode: modeConfig.dbMode,
    scoringMode: modeConfig.scoringMode,
    visibilityMode: modeConfig.visibilityMode,
    language,
  };

  return await JoinGame(userId, settings);
};