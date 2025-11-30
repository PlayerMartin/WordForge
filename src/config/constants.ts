// ============================================
// CONSTANTS - Aplikačné konštanty
// ============================================
//
// Sem patria všetky konštanty pre aplikáciu

// = Skórovanie =
export const SCORING = {
  TEMPO_POINTS_PER_WORD: 1,
  LENGTH_DIVISOR: 3,
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
