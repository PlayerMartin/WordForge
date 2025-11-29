// ============================================
// GAME FEEDBACK - Feedback pre hráča
// ============================================
//
// Sem patrí:
// - Zobrazenie správ pre hráča:
//   - "Správne! +X bodov"
//   - "Slovo už bolo použité! -1 život" (Skrytá)
//   - "Slovo už bolo použité! 0 bodov" (Odkrytá)
//   - "Slovo nezačína písmenom X!"
//   - "Slovo neexistuje v slovníku!"
//   - "Výborne! Dlhé slovo!" (bonus feedback)
//
// - Animované zobrazenie (fade in/out)
// - Rôzne farby podľa typu (success/error/warning)
// - Auto-dismiss po 2-3 sekundách
//
// Props:
// - message: string | null
// - type: "success" | "error" | "warning" | null
//
// Client Component ("use client")
// Použiť useEffect pre auto-dismiss
