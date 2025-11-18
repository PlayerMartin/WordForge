// ============================================
// USER TYPES - Typy pre používateľov
// ============================================
//
// Sem patria typy pre používateľa, profil, štatistiky

import { Language } from './game'

// = Verejný profil používateľa (zobrazený na rebríčku) =
export interface PublicUserProfile {
  id: string
  username: string | null
  image: string | null // avatar URL
}

// = Úplný používateľský profil =
export interface UserProfile extends PublicUserProfile {
  email: string | null
  createdAt: Date
}

// = Štatistiky používateľa pre jeden jazyk =
export interface UserLanguageStats {
  language: Language
  totalGames: number
  totalWords: number
  totalScore: number
  longestWord: string | null
  longestWordLength: number
  averageWordLength: number
  averageWpm: number
  averageAccuracy: number
  updatedAt: Date
}

// = Osobné rekordy =
export interface PersonalBest {
  mode: string
  scoringMode: string
  visibilityMode: string
  language: Language
  score: number
  wordCount: number
  longestWord: string | null
  achievedAt: Date
}
