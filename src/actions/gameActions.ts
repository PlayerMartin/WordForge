// actions/gameActions.ts
"use server";

import { GAME_MODE_BY_ID, GameModeId } from "@/modules/game/config/modes";
import * as gameRepository from "@/modules/game/repositories/game-repository";
import { GameSettings, Language } from "@/types";

type FinishGameData = {
  score?: number;
  wordsUsed?: string[];
};

export const FinishGame = async (gameId: string, data?: FinishGameData) => {
  return await gameRepository.FinishGame(gameId, data);
};

export const GetGame = async (gameId: string) => {
  return await gameRepository.GetGame(gameId);
};

export const StartGameForMode = async (
  userId: string,
  modeId: GameModeId,
  language: Language = "en"
) => {
  const modeConfig = GAME_MODE_BY_ID[modeId];

  if (!modeConfig) {
    throw new Error(`Invalid game mode: ${modeId}`);
  }

  const settings: GameSettings = {
    mode: modeConfig.dbMode,
    language,
  };

  return await gameRepository.CreateGame(userId, settings);
};

export const GetRecentGamesForUser = async (userId: string, limit = 10) => {
  return await gameRepository.ListGamesByUserId(userId, limit);
};

export const UpdateGameProgress = async (
  gameId: string,
  data: { score: number; wordsUsed: string[] }
) => {
  return await gameRepository.UpdateGameProgress(gameId, data);
};

export const GetActiveGameIdForUser = async (userId: string) => {
  return await gameRepository.FindActiveGameByUserId(userId);
};
