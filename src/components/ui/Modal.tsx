// ============================================
// MODAL - Modálne okno komponent
// ============================================
//
// Sem patrí:
// - Modálne okno s overlay
// - Close tlačidlo (X)
// - Close on overlay click (voliteľné)
// - Close on ESC key
// - Animácie (fade in/out)
// - Responsive design
//
// Props:
// - isOpen: boolean
// - onClose: () => void
// - title: string
// - children: ReactNode
// - size: "sm" | "md" | "lg" | "xl"
// - closeOnOverlayClick: boolean (default true)
//
// Použiť na:
// - Pauza menu
// - Potvrdenie exit z hry
// - Pravidlá hry
//
// Client Component ("use client")
// Použiť useEffect pre ESC key listener
