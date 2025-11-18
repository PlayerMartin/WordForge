// ============================================
// USE TIMER - Custom hook pre časovače
// ============================================
//
// "use client" directive na vrchu!
//
// Sem patrí:
// - Reusable hook pre countdown timer
// - Auto-decrement každú sekundu
// - Pause/Resume/Reset funkcie
// - Callback pri vypršaní času
//
// Export:
// export function useTimer(initialTime: number, onExpire?: () => void) {
//   const [timeLeft, setTimeLeft] = useState(initialTime)
//   const [isRunning, setIsRunning] = useState(false)
//
//   useEffect(() => {
//     if (!isRunning || timeLeft <= 0) return
//
//     const interval = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           onExpire?.()
//           setIsRunning(false)
//           return 0
//         }
//         return prev - 1
//       })
//     }, 1000)
//
//     return () => clearInterval(interval)
//   }, [isRunning, timeLeft, onExpire])
//
//   return {
//     timeLeft,
//     isRunning,
//     start: () => setIsRunning(true),
//     pause: () => setIsRunning(false),
//     reset: (time?: number) => {
//       setTimeLeft(time ?? initialTime)
//       setIsRunning(false)
//     },
//   }
// }
//
// Použitie:
// const { timeLeft, start, pause } = useTimer(10, () => console.log('Time up!'))
