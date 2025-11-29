// ============================================
// WORD INPUT - Input pole pre zadávanie slov
// ============================================
//
// Sem patrí:
// - Textové input pole (controlled component)
// - Validácia v reálnom čase (minimálne: začína správnym písmenom)
// - Submit na Enter alebo tlačidlo
// - Vizuálny feedback (zelený border ak začína správne, červený ak nie)
// - Automatický focus po submite/začiatku hry
// - Prevod na lowercase a odstránenie diakritiky podľa nastavení
//
// Props:
// - requiredLetter: string
// - onSubmit: (word: string) => void
// - disabled: boolean (počas validácie alebo keď je čas vypršaný)
// - language: "en" | "cz" | "sk"
//
// Client Component ("use client")
// Použiť useState pre lokálny stav inputu
