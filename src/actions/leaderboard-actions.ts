'use server';

import { GAME_MODE_BY_ID, type GameModeId } from '@/modules/game/config/modes';
import { type Language } from '@/types';
import * as leaderboardRepository from '@/modules/leaderboard/repositories/leaderboard-repository';

export const GetLeaderboard = async (
	modeId: GameModeId,
	language: Language,
	limit = 10
) => {
	const modeConfig = GAME_MODE_BY_ID[modeId];

	if (!modeConfig) {
		throw new Error(`Invalid game mode: ${modeId}`);
	}

	return await leaderboardRepository.GetTopScores(
		modeConfig.dbMode,
		language,
		limit
	);
};

export const GetUserBestScore = async (
	userId: string,
	modeId: GameModeId,
	language: Language
) => {
	const modeConfig = GAME_MODE_BY_ID[modeId];

	if (!modeConfig) {
		throw new Error(`Invalid game mode: ${modeId}`);
	}

	return await leaderboardRepository.GetUserBestScore(
		userId,
		modeConfig.dbMode,
		language
	);
};

export const GetUserRankAndEntry = async (
	userId: string,
	modeId: GameModeId,
	language: Language
) => {
	const modeConfig = GAME_MODE_BY_ID[modeId];

	if (!modeConfig) {
		throw new Error(`Invalid game mode: ${modeId}`);
	}

	return await leaderboardRepository.GetUserRankAndEntry(
		userId,
		modeConfig.dbMode,
		language
	);
};

export const SubmitScore = async (data: {
	userId: string;
	modeId: GameModeId;
	language: Language;
	score: number;
	wordCount: number;
	longestWord?: string;
}) => {
	const modeConfig = GAME_MODE_BY_ID[data.modeId];

	if (!modeConfig) {
		throw new Error(`Invalid game mode: ${data.modeId}`);
	}

	const existingEntry = await leaderboardRepository.GetUserBestScore(
		data.userId,
		modeConfig.dbMode,
		data.language
	);

	if (existingEntry && existingEntry.score >= data.score) {
		return { updated: false, entryId: existingEntry.id };
	}

	if (existingEntry) {
		await leaderboardRepository.UpdateLeaderboardEntry(existingEntry.id, {
			score: data.score,
			wordCount: data.wordCount,
			longestWord: data.longestWord
		});
		return { updated: true, entryId: existingEntry.id };
	}

	const entryId = await leaderboardRepository.CreateLeaderboardEntry({
		userId: data.userId,
		mode: modeConfig.dbMode,
		language: data.language,
		score: data.score,
		wordCount: data.wordCount,
		longestWord: data.longestWord
	});

	return { updated: true, entryId };
};
