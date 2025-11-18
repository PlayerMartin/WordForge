// ============================================
// LEADERBOARD FILTERS - Filtre pre rebríček
// ============================================
//
// Sem patrí:
// - Filter komponenty pre:
//   - Mód: Solo Classic (neskôr PvP, Challenges)
//   - Skórovanie: Tempo, Length
//   - Režim: Odkrytá, Skrytá
//   - Jazyk: EN, CZ, SK
//
// - Select/Dropdown komponenty alebo tabs
// - Pri zmene filtra -> update URL search params (useSearchParams)
// - Automatické načítanie nových dát pri zmene filtra
//
// Props:
// - currentFilters: FilterState
// - onFilterChange: (filters: FilterState) => void
//
// Client Component ("use client")
