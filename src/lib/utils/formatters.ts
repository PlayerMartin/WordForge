// ============================================
// FORMATTERS - Pomocné funkcie pre formátovanie
// ============================================
//
// Sem patrí:
// - Funkcia formatTime(seconds)
//   - Prevod sekúnd na "MM:SS" format
//   - Napr. 125 -> "02:05"
//   - Return: string
//
// - Funkcia formatDate(date, locale)
//   - Formátovanie dátumu podľa locale
//   - Return: string
//
// - Funkcia formatNumber(number, locale)
//   - Formátovanie čísla s tisícovými oddeľovačmi
//   - Return: string
//
// - Funkcia formatPercentage(value, decimals)
//   - Formátovanie percentá
//   - Napr. 0.8567 -> "85.7%"
//   - Return: string
//
// Použitie:
// import { formatTime, formatDate } from '@/lib/utils/formatters'
// const timeStr = formatTime(125) // "02:05"
//
// Implementácia:
// - Pure funkcie
// - Export jednotlivých funkcií
