// ============================================
// USE GAME STATE - Custom hook pre herný stav
// ============================================
//
// "use client" directive na vrchu!
//
// Sem patrí:
// - Custom hook pre manažment herného stavu
// - Použitie useReducer alebo useState
// - Timer management (useEffect s intervalmi)
// - Word submission logika
// - Integration s gameEngine functions
//
// Export:
// export function useGameState(settings: GameSettings) {
//   const [gameState, setGameState] = useState<GameState>(() =>
//     initializeGame(settings)
//   )
//
//   // Timer effect
//   useEffect(() => {
//     if (gameState.status !== 'playing') return
//
//     const interval = setInterval(() => {
//       setGameState(prev => updateTimers(prev, 1))
//     }, 1000)
//
//     return () => clearInterval(interval)
//   }, [gameState.status])
//
//   // Submit word handler
//   const submitWord = async (word: string) => {
//     const result = await processWordSubmission(word, gameState)
//     setGameState(result.newGameState)
//     return result.feedback
//   }
//
//   return {
//     gameState,
//     submitWord,
//     pauseGame,
//     resumeGame,
//     resetGame,
//   }
// }
//
// Použitie v komponente:
// const { gameState, submitWord } = useGameState(settings)
