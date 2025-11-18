// ============================================
// BUTTON - Reusable tlačidlo komponent
// ============================================
//
// Sem patrí:
// - Základný button komponent s variantmi:
//   - variant: "primary" | "secondary" | "danger" | "ghost"
//   - size: "sm" | "md" | "lg"
//   - fullWidth: boolean
//   - disabled: boolean
//   - loading: boolean (zobrazí spinner)
//
// - TailwindCSS classes pre styling
// - Hover/focus/active states
// - Icon support (leftIcon, rightIcon)
//
// Props:
// - children: ReactNode
// - onClick: () => void
// - variant, size, fullWidth, disabled, loading
// - type: "button" | "submit" | "reset" (default "button")
//
// Client alebo Server Component (závisí od použitia)
