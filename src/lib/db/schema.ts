import {
	sqliteTable,
	text,
	integer,
	real,
	primaryKey
} from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// AUTH MODELS

export const users = sqliteTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	email: text('email').unique(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image'),
	password: text('password'),
	name: text('name').unique(),
	createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(
		() => new Date()
	),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(
		() => new Date()
	)
});

export const accounts = sqliteTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	account => [
		primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	]
);

export const sessions = sqliteTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

export const verificationTokens = sqliteTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
	},
	verificationToken => [
		primaryKey({
			columns: [verificationToken.identifier, verificationToken.token]
		})
	]
);

export const authenticators = sqliteTable(
	'authenticator',
	{
		credentialID: text('credentialID').notNull().unique(),
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		providerAccountId: text('providerAccountId').notNull(),
		credentialPublicKey: text('credentialPublicKey').notNull(),
		counter: integer('counter').notNull(),
		credentialDeviceType: text('credentialDeviceType').notNull(),
		credentialBackedUp: integer('credentialBackedUp', {
			mode: 'boolean'
		}).notNull(),
		transports: text('transports')
	},
	authenticator => [
		primaryKey({
			columns: [authenticator.userId, authenticator.credentialID]
		})
	]
);

// GAME MODELS

export const games = sqliteTable('games', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),

	mode: text('mode').notNull(),
	language: text('language').notNull(),

	score: integer('score').notNull().default(0),
	wordsUsed: text('words_used', { mode: 'json' })
		.$type<string[]>()
		.default([]),

	startedAt: integer('started_at', { mode: 'timestamp' }).$defaultFn(
		() => new Date()
	),
	finishedAt: integer('finished_at', { mode: 'timestamp' })
});

// WORD DICTIONARY MODELS

export const words = sqliteTable('words', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	word: text('word').notNull(),
	language: text('language').notNull(),
	length: integer('length').notNull(),
	isVulgar: integer('is_vulgar', { mode: 'boolean' }).notNull().default(false)
});

// LEADERBOARD MODELS

export const leaderboardEntries = sqliteTable('leaderboard_entries', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),

	mode: text('mode').notNull(),
	language: text('language').notNull(),

	// Score data
	score: integer('score').notNull(),
	wordCount: integer('word_count').notNull(),
	longestWord: text('longest_word'),
	achievedAt: integer('achieved_at', { mode: 'timestamp' }).$defaultFn(
		() => new Date()
	)
});

// STATISTICS MODELS

export const userStats = sqliteTable('user_stats', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),

	// Stats per language
	language: text('language').notNull(),

	// Statistics
	totalGames: integer('total_games').notNull().default(0),
	totalWords: integer('total_words').notNull().default(0),
	totalScore: integer('total_score').notNull().default(0),
	longestWord: text('longest_word'),
	longestWordLength: integer('longest_word_length').notNull().default(0),
	averageWordLength: real('average_word_length').notNull().default(0),
	averageWpm: real('average_wpm').notNull().default(0),
	averageAccuracy: real('average_accuracy').notNull().default(0),

	updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(
		() => new Date()
	)
});

// RELATIONS

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	sessions: many(sessions),
	games: many(games),
	leaderboardEntries: many(leaderboardEntries),
	stats: many(userStats)
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	})
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export const gamesRelations = relations(games, ({ one }) => ({
	user: one(users, {
		fields: [games.userId],
		references: [users.id]
	})
}));

export const leaderboardEntriesRelations = relations(
	leaderboardEntries,
	({ one }) => ({
		user: one(users, {
			fields: [leaderboardEntries.userId],
			references: [users.id]
		})
	})
);

export const userStatsRelations = relations(userStats, ({ one }) => ({
	user: one(users, {
		fields: [userStats.userId],
		references: [users.id]
	})
}));
