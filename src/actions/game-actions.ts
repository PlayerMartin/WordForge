'use server';

import { GAME_MODE_BY_ID, type GameModeId } from '@/modules/game/config/modes';
import * as gameRepository from '@/modules/game/repositories/game-repository';
import { type GameSettings, type Language } from '@/types';

export const FinishGame = async (gameId: string) =>
	await gameRepository.FinishGame(gameId);

export const GetGame = async (gameId: string) =>
	await gameRepository.GetGame(gameId);

export const StartGameForMode = async (
	userId: string,
	modeId: GameModeId,
	language: Language = 'EN'
) => {
	const modeConfig = GAME_MODE_BY_ID[modeId];

	if (!modeConfig) {
		throw new Error(`Invalid game mode: ${modeId}`);
	}

	const settings: GameSettings = {
		mode: modeConfig.dbMode,
		language
	};

	return await gameRepository.CreateGame(userId, settings);
};

export const GetRecentGamesForUser = async (userId: string, limit = 10) =>
	await gameRepository.ListGamesByUserId(userId, limit);

export const UpdateGameProgress = async (
	gameId: string,
	data: { score: number; wordsUsed: string[] }
) => await gameRepository.UpdateGameProgress(gameId, data);

export const GetActiveGameIdForUser = async (userId: string) =>
	await gameRepository.FindActiveGameByUserId(userId);
