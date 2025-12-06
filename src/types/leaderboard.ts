import { type leaderboardEntries } from '@/lib/db/schema';
import { type GameModeId, type GameDbMode } from '@/modules/game/config/modes';
import { type LanguageCode } from '@/modules/game/config/constants';

export type DbLeaderboardEntryRow = typeof leaderboardEntries.$inferSelect;

export type LeaderboardEntry = {
	playerName: string | null;
} & DbLeaderboardEntryRow;

export type LeaderboardFilter = {
	mode: GameModeId;
	language: LanguageCode;
};

export type { GameModeId, GameDbMode, LanguageCode };
