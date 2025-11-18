// ============================================
// USE LOCAL STORAGE - Custom hook pre local storage
// ============================================
//
// "use client" directive na vrchu!
//
// Sem patrí:
// - Hook pre ukladanie a načítanie z localStorage
// - Type-safe
// - SSR safe (check window)
//
// Export:
// export function useLocalStorage<T>(key: string, initialValue: T) {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     if (typeof window === 'undefined') return initialValue
//
//     try {
//       const item = window.localStorage.getItem(key)
//       return item ? JSON.parse(item) : initialValue
//     } catch (error) {
//       console.error(error)
//       return initialValue
//     }
//   })
//
//   const setValue = (value: T | ((val: T) => T)) => {
//     try {
//       const valueToStore = value instanceof Function ? value(storedValue) : value
//       setStoredValue(valueToStore)
//       if (typeof window !== 'undefined') {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore))
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }
//
//   return [storedValue, setValue] as const
// }
//
// Použitie:
// - Uloženie game settings
// - Uloženie theme preference
// - Uloženie language preference
//
// const [settings, setSettings] = useLocalStorage<GameSettings>('gameSettings', defaultSettings)
