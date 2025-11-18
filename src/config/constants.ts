// ============================================
// CONSTANTS - Aplikačné konštanty
// ============================================
//
// Sem patria všetky konštanty pre aplikáciu

// = Herné konštanty =
export const GAME_CONSTANTS = {
  // Defaultné časovače
  DEFAULT_TURN_TIME: 10, // sekundy
  DEFAULT_GLOBAL_TIME: 300, // 5 minút

  // Limity časovačov
  MIN_TURN_TIME: 7,
  MAX_TURN_TIME: 15,
  MIN_GLOBAL_TIME: 60, // 1 minúta
  MAX_GLOBAL_TIME: 600, // 10 minút

  // Životy
  INITIAL_LIVES: 3,

  // Minimálna dĺžka slova
  MIN_WORD_LENGTH: 2,
} as const

// = Skórovanie =
export const SCORING = {
  TEMPO_POINTS_PER_WORD: 1,
  LENGTH_DIVISOR: 3,
} as const

// = Podporované jazyky =
export const LANGUAGES = {
  EN: { code: 'en', name: 'English', flag: '🇬🇧' },
  CZ: { code: 'cz', name: 'Čeština', flag: '🇨🇿' },
  SK: { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
} as const

// = Herné módy =
export const GAME_MODES = {
  SOLO_CLASSIC: {
    id: 'solo_classic',
    name: 'Solo Classic',
    description: 'Classic word chain game against the clock',
  },
  // Budúce módy:
  // PVP: { id: 'pvp', name: 'PvP', description: '...' },
  // COOP: { id: 'coop', name: 'Co-op', description: '...' },
} as const

// = Leaderboard =
export const LEADERBOARD_CONSTANTS = {
  TOP_COUNT: 100, // Top 100 hráčov
  ITEMS_PER_PAGE: 20,
} as const

// = UI =
export const UI_CONSTANTS = {
  TOAST_DURATION: 3000, // ms
  MODAL_ANIMATION_DURATION: 200, // ms
} as const

// = URL paths =
export const ROUTES = {
  HOME: '/',
  GAME: '/game',
  LEADERBOARD: '/leaderboard',
  PROFILE: '/profile',
  SIGN_IN: '/auth/signin',
  SIGN_UP: '/auth/signup',
} as const
