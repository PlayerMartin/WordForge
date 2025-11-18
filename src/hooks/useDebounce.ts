// ============================================
// USE DEBOUNCE - Custom hook pre debouncing
// ============================================
//
// "use client" directive na vrchu!
//
// Sem patrí:
// - Hook pre debounce value changes
// - Užitočné pre search inputs, live validáciu
//
// Export:
// export function useDebounce<T>(value: T, delay: number = 500): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value)
//
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)
//
//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay])
//
//   return debouncedValue
// }
//
// Použitie:
// - Search v leaderboardoch
// - Live validácia slova (zatiaľ čo používateľ píše)
//
// const [searchTerm, setSearchTerm] = useState('')
// const debouncedSearch = useDebounce(searchTerm, 300)
