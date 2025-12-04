// ============================================
// GAME CONSTANTS (module-scoped)
// ============================================

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

export const SUPPORTED_LANGUAGES = {
	EN: { code: 'en', name: 'English', flag: '🇬🇧', enabled: true },
	CZ: { code: 'cz', name: 'Čeština', flag: '🇨🇿', enabled: false },
	SK: { code: 'sk', name: 'Slovenčina', flag: '🇸🇰', enabled: false }
} as const;

export type LanguageCode =
	(typeof SUPPORTED_LANGUAGES)[keyof typeof SUPPORTED_LANGUAGES]['code'];
