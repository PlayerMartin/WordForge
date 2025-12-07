import { eq, and, desc, gt } from 'drizzle-orm';

import { db, leaderboardEntries, users } from '@/lib/db';
import { type GameDbMode } from '@/modules/game/config/modes';
import { type LanguageCode } from '@/modules/game/config/constants';

export const GetTopScores = async (
	mode: GameDbMode,
	language: LanguageCode,
	limit = 10
) => {
	const result = await db
		.select({
			id: leaderboardEntries.id,
			userId: leaderboardEntries.userId,
			mode: leaderboardEntries.mode,
			language: leaderboardEntries.language,
			score: leaderboardEntries.score,
			wordCount: leaderboardEntries.wordCount,
			longestWord: leaderboardEntries.longestWord,
			achievedAt: leaderboardEntries.achievedAt,
			playerName: users.name
		})
		.from(leaderboardEntries)
		.innerJoin(users, eq(leaderboardEntries.userId, users.id))
		.where(
			and(
				eq(leaderboardEntries.mode, mode),
				eq(leaderboardEntries.language, language)
			)
		)
		.orderBy(desc(leaderboardEntries.score))
		.limit(limit);

	return result;
};

export const GetUserBestScore = async (
	userId: string,
	mode: GameDbMode,
	language: LanguageCode
) => {
	const result = await db
		.select()
		.from(leaderboardEntries)
		.where(
			and(
				eq(leaderboardEntries.userId, userId),
				eq(leaderboardEntries.mode, mode),
				eq(leaderboardEntries.language, language)
			)
		)
		.orderBy(desc(leaderboardEntries.score))
		.limit(1);

	return result[0] ?? null;
};

export const CreateLeaderboardEntry = async (data: {
	userId: string;
	mode: GameDbMode;
	language: LanguageCode;
	score: number;
	wordCount: number;
	longestWord?: string;
}) => {
	const result = await db
		.insert(leaderboardEntries)
		.values({
			userId: data.userId,
			mode: data.mode,
			language: data.language,
			score: data.score,
			wordCount: data.wordCount,
			longestWord: data.longestWord
		})
		.returning({ id: leaderboardEntries.id });

	return result[0].id;
};

export const UpdateLeaderboardEntry = async (
	id: string,
	data: {
		score: number;
		wordCount: number;
		longestWord?: string;
	}
) => {
	await db
		.update(leaderboardEntries)
		.set({
			score: data.score,
			wordCount: data.wordCount,
			longestWord: data.longestWord,
			achievedAt: new Date()
		})
		.where(eq(leaderboardEntries.id, id));
};

export const GetUserRankAndEntry = async (
	userId: string,
	mode: GameDbMode,
	language: LanguageCode
) => {
	const userEntry = await db
		.select({
			id: leaderboardEntries.id,
			userId: leaderboardEntries.userId,
			mode: leaderboardEntries.mode,
			language: leaderboardEntries.language,
			score: leaderboardEntries.score,
			wordCount: leaderboardEntries.wordCount,
			longestWord: leaderboardEntries.longestWord,
			achievedAt: leaderboardEntries.achievedAt,
			playerName: users.name
		})
		.from(leaderboardEntries)
		.innerJoin(users, eq(leaderboardEntries.userId, users.id))
		.where(
			and(
				eq(leaderboardEntries.userId, userId),
				eq(leaderboardEntries.mode, mode),
				eq(leaderboardEntries.language, language)
			)
		)
		.limit(1);

	if (userEntry.length === 0) {
		return null;
	}

	const entry = userEntry[0];

	const higherScores = await db
		.select({ id: leaderboardEntries.id })
		.from(leaderboardEntries)
		.where(
			and(
				eq(leaderboardEntries.mode, mode),
				eq(leaderboardEntries.language, language),
				gt(leaderboardEntries.score, entry.score)
			)
		);

	const rank = higherScores.length + 1;

	return { ...entry, rank };
};
