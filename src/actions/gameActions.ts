// actions/gameActions.ts
"use server";

import {
  GAME_MODES,
  GAME_MODE_BY_ID,
  GameModeId,
} from "@/modules/game/config/modes";
import * as gameRepository from "@/modules/game/repositories/game-repository";
import { GameSettings, Language } from "@/types";

export const JoinGame = async (userId: string, settings: GameSettings) => {
  const activeGameId = await gameRepository.FindActiveGameByUserId(userId);

  if (activeGameId) {
    const activeGame = await gameRepository.GetGame(activeGameId);

    // If there's an unfinished game with the same mode → reuse it
    if (activeGame && activeGame.mode === settings.mode) {
      return activeGameId;
    }

    // Otherwise finish the old game before starting a new one
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

  return await JoinGame(userId, settings);
};

export const GetRecentGamesForUser = async (userId: string, limit = 10) => {
  return await gameRepository.ListGamesByUserId(userId, limit);
};