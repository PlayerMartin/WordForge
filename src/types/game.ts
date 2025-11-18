// ============================================
// GAME TYPES - Typy pre hernú logiku
// ============================================
//
// Sem patria všetky TypeScript typy a interfaces pre hru

// = Jazyky =
export type Language = 'en' | 'cz' | 'sk'

// = Herné módy =
export type GameMode = 'solo_classic' | 'pvp' | 'coop' | 'challenge'

// = Skórovacie módy =
export type ScoringMode = 'tempo' | 'length'

// = Režimy viditeľnosti =
export type VisibilityMode = 'open' | 'hidden'

// = Herné nastavenia =
export interface GameSettings {
  mode: GameMode
  scoringMode: ScoringMode
  visibilityMode: VisibilityMode
  language: Language
  turnTimeLimit: number // sekundy
  globalTimeLimit: number // sekundy
}

// = Jedno slovo v hre =
export interface GameWord {
  word: string
  length: number
  points: number
  timestamp: number // kedy bolo zadané (pre WPM výpočet)
}

// = Stav hry =
export interface GameState {
  // Nastavenia
  settings: GameSettings

  // Aktuálny stav
  status: 'setup' | 'playing' | 'paused' | 'finished'
  score: number
  lives: number | null // null pre "open" mód, 3 pre "hidden"
  wordsUsed: GameWord[]
  requiredLetter: string // písmeno, ktorým musí slovo začínať

  // Časovače
  turnTimeLeft: number // sekundy zostávajúce na ťah
  globalTimeLeft: number // sekundy zostávajúce v hre

  // Feedback
  lastFeedback: GameFeedback | null

  // Štatistiky
  successfulAttempts: number
  totalAttempts: number
  startTime: number | null
  endTime: number | null
}

// = Feedback pre hráča =
export interface GameFeedback {
  type: 'success' | 'error' | 'warning'
  message: string
  timestamp: number
}

// = Výsledky hry =
export interface GameResults {
  score: number
  wordCount: number
  longestWord: string | null
  averageLength: number
  wpm: number // words per minute
  accuracy: number // 0-100%
  wordsUsed: GameWord[]
}

// = Validačný výsledok =
export interface WordValidationResult {
  valid: boolean
  error?: 'wrong_letter' | 'not_in_dictionary' | 'already_used' | 'too_short'
  message?: string
}
