// ============================================
// GAME CONTEXT - React Context pre hernú logiku
// ============================================
//
// "use client" directive na vrchu!
//
// Sem patrí:
// - React Context pre zdieľanie herného stavu v komponentoch
// - Provider komponent
// - Custom hook useGame() pre prístup ku contextu
//
// Štruktúra:
//
// type GameContextType = {
//   gameState: GameState | null
//   startGame: (settings: GameSettings) => void
//   submitWord: (word: string) => Promise<GameFeedback>
//   pauseGame: () => void
//   resumeGame: () => void
//   endGame: () => void
//   resetGame: () => void
// }
//
// const GameContext = createContext<GameContextType | undefined>(undefined)
//
// export function GameProvider({ children }: { children: ReactNode }) {
//   // Použiť useGameState hook
//   const gameLogic = useGameState(...)
//
//   return (
//     <GameContext.Provider value={gameLogic}>
//       {children}
//     </GameContext.Provider>
//   )
// }
//
// export function useGame() {
//   const context = useContext(GameContext)
//   if (!context) throw new Error('useGame must be used within GameProvider')
//   return context
// }
//
// Použitie:
// - Obaliť /game layout s <GameProvider>
// - V komponentoch použiť useGame() hook
//
// const { gameState, submitWord } = useGame()
