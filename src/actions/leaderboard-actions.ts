'use server';

import { GAME_MODE_BY_ID, type GameModeId } from '@/modules/game/config/modes';
import { type Language } from '@/types';
import * as leaderboardRepository from '@/modules/leaderboard/repositories/leaderboard-repository';
import {
	ValidateGameModeId,
	ValidateId,
	ValidateLanguageCode,
	ValidateNumber,
	ValidateString
} from '@/lib/utils/validation';

export const GetLeaderboard = async (
	modeId: GameModeId,
	language: Language,
	limit = 10
) => {
	if (!ValidateGameModeId(modeId)) throw new Error(`Invalid game mode id`);
	if (!ValidateLanguageCode(language))
		throw new Error(`Invalid language code`);
	if (!ValidateNumber(limit)) throw new Error(`Invalid limit`);

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
	if (!ValidateId(userId)) throw new Error(`Invalid user id`);
	if (!ValidateGameModeId(modeId)) throw new Error(`Invalid game mode id`);
	if (!ValidateLanguageCode(language))
		throw new Error(`Invalid language code`);

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
	if (!ValidateId(userId)) throw new Error(`Invalid user id`);
	if (!ValidateGameModeId(modeId)) throw new Error(`Invalid game mode id`);
	if (!ValidateLanguageCode(language))
		throw new Error(`Invalid language code`);

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
	if (!ValidateId(data.userId)) throw new Error(`Invalid user id`);
	if (!ValidateGameModeId(data.modeId))
		throw new Error(`Invalid game mode id`);
	if (!ValidateLanguageCode(data.language))
		throw new Error(`Invalid language code`);
	if (!ValidateNumber(data.score)) throw new Error(`Invalid score`);
	if (!ValidateNumber(data.wordCount)) throw new Error(`Invalid word count`);
	if (data.longestWord && !ValidateString(data.longestWord))
		throw new Error(`Invalid longest word`);

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
