// ============================================
// LEADERBOARD TYPES - Typy pre rebríčky
// ============================================
//
// Sem patria typy pre rebríčky a filtre

import { Language, GameMode } from './game'
import { PublicUserProfile } from './user'

// = Filter pre rebríček =
export interface LeaderboardFilter {
  mode: GameMode
  language: Language
}

// = Záznam na rebríčku =
export interface LeaderboardEntry {
  id: string
  rank: number // pozícia (1, 2, 3, ...)
  user: PublicUserProfile
  score: number
  wordCount: number
  longestWord: string | null
  achievedAt: Date
  isCurrentUser?: boolean // true ak je to aktuálny používateľ
}

// = Kompletný rebríček =
export interface Leaderboard {
  filter: LeaderboardFilter
  entries: LeaderboardEntry[]
  totalEntries: number
  currentUserRank: number | null // pozícia aktuálneho používateľa (ak nie je v top 100)
}
