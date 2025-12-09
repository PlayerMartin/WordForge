'use server';

import {
	ValidateGameModeId,
	ValidateGameProgress,
	ValidateId,
	ValidateLanguageCode,
	ValidateNumber
} from '@/lib/utils/validation';
import {
	GAME_MODE_BY_ID,
	dbModeToModeId,
	type GameModeId
} from '@/modules/game/config/modes';
import * as gameRepository from '@/modules/game/repositories/game-repository';
import * as leaderboardRepository from '@/modules/leaderboard/repositories/leaderboard-repository';
import { type GameProgress, type GameSettings, type Language } from '@/types';

export const FinishGame = async (gameId: string) => {
	if (!ValidateId(gameId)) return { ok: false, err: 'Invalid game id' };

	const game = await gameRepository.GetGame(gameId);

	if (!game) {
		return { ok: false, err: 'Game not found' };
	}

	const result = await gameRepository.FinishGame(gameId);

	if (!result.ok) {
		return result;
	}

	const modeId = dbModeToModeId(game.mode as `solo_${GameModeId}`);
	const modeConfig = GAME_MODE_BY_ID[modeId];

	if (modeConfig && game.score > 0) {
		const wordsUsed = game.wordsUsed ?? [];
		const longestWord = wordsUsed.reduce(
			(longest, word) => (word.length > longest.length ? word : longest),
			''
		);

		const existingEntry = await leaderboardRepository.GetUserBestScore(
			game.userId,
			modeConfig.dbMode,
			game.language as Language
		);

		if (!existingEntry || existingEntry.score < game.score) {
			if (existingEntry) {
				await leaderboardRepository.UpdateLeaderboardEntry(
					existingEntry.id,
					{
						score: game.score,
						wordCount: wordsUsed.length,
						longestWord: longestWord || undefined
					}
				);
			} else {
				await leaderboardRepository.CreateLeaderboardEntry({
					userId: game.userId,
					mode: modeConfig.dbMode,
					language: game.language as Language,
					score: game.score,
					wordCount: wordsUsed.length,
					longestWord: longestWord || undefined
				});
			}
		}
	}

	return { ok: true };
};

export const GetGame = async (gameId: string) => {
	if (!ValidateId(gameId)) return null;
	return await gameRepository.GetGame(gameId);
};

export const StartGameForMode = async (
	userId: string,
	modeId: GameModeId,
	language: Language = 'EN'
) => {
	if (!ValidateId(userId)) throw new Error('Invalid user id');
	if (!ValidateGameModeId(modeId)) throw new Error('Invalid mode id');
	if (!ValidateLanguageCode(language))
		throw new Error('Invalid language code');

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

export const GetRecentGamesForUser = async (userId: string, limit = 10) => {
	if (!ValidateId(userId)) return [];
	if (!ValidateNumber(limit)) return [];

	return await gameRepository.ListGamesByUserId(userId, limit);
};

export const UpdateGameProgress = async (
	gameId: string,
	data: GameProgress
) => {
	if (!ValidateId(gameId)) throw new Error('Invalid user id');
	if (!ValidateGameProgress(data)) throw new Error('Invalid game data');

	return await gameRepository.UpdateGameProgress(gameId, data);
};
