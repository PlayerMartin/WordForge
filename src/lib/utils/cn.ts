// ============================================
// CN UTILITY - Class name merger (clsx + tailwind-merge)
// ============================================
//
// Sem patrí:
// - Funkcia cn(...classes) pre mergovanie TailwindCSS class names
// - Používa clsx a tailwind-merge
// - Eliminuje konflikty medzi Tailwind classes
//
// Použitie:
// import { cn } from '@/lib/utils/cn'
// <div className={cn('text-red-500', error && 'text-green-500')} />
//
// Implementácia:
// import { clsx, type ClassValue } from 'clsx'
// import { twMerge } from 'tailwind-merge'
//
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
//
// Poznámka: Najprv nainštalovať:
// npm install clsx tailwind-merge
