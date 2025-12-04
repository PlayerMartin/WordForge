import { type games } from '@/lib/db/schema';
import { type GameDbMode } from '@/modules/game/config/modes';
import { type LanguageCode } from '@/modules/game/config/constants';

export type GameMode = GameDbMode;
export type Language = LanguageCode;

export type GameSettings = {
	mode: GameMode;
	language: Language;
};

export type DbGameRow = typeof games.$inferSelect;

export type DbGame = {
	mode: GameMode;
	language: Language;
} & DbGameRow;

export type WordValidationResult = {
	valid: boolean;
	error?: 'wrong_letter' | 'not_in_dictionary' | 'already_used' | 'too_short';
	message?: string;
};
