// ============================================
// GAME CONSTANTS (module-scoped)
// ============================================

import z from 'zod';

// Timers
export const GAME_TIMERS = {
	DEFAULT_TURN_TIME: 10,
	DEFAULT_GAME_TIME: 300
} as const;

export const GAME_LIVES = {
	INITIAL_LIVES: 3
} as const;

export const GAME_RULES = {
	MIN_WORD_LENGTH: 2
} as const;

export const GAME_SCORING = {
	TEMPO_POINTS_PER_WORD: 1,
	LENGTH_DIVISOR: 3
} as const;

// Zod + TypeScript cant handle dynamic schemas
export const SUPPORTED_LANGUAGES = {
	EN: { code: 'EN', name: 'English', flag: '🇬🇧', enabled: true },
	CZ: { code: 'CZ', name: 'Čeština', flag: '🇨🇿', enabled: true },
	SK: { code: 'SK', name: 'Slovenčina', flag: '🇸🇰', enabled: false }
} as const;
export const LanguageCodeSchema = z.enum(['EN', 'CZ', 'SK']);

export type LanguageCode = z.infer<typeof LanguageCodeSchema>;
// APIs
export const WORDS_API = (language: string, word: string) =>
	`https://freedictionaryapi.com/api/v1/entries/${language}/${word}`;
