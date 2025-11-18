// ============================================
// VALIDATORS - Validačné schémy (Zod)
// ============================================
//
// Sem patria Zod schémy pre validáciu formulárov a dát
//
// Schémy:
// - signUpSchema - Registračný formulár
//   - email (email format)
//   - password (min 8 chars, obsahuje číslo a veľké písmeno)
//   - confirmPassword (musí sa zhodovať s password)
//   - username (min 3 chars, max 20 chars, alphanumeric + underscore)
//
// - gameSettingsSchema - Validácia herných nastavení
//   - mode, scoringMode, visibilityMode, language
//   - turnTimeLimit (7-15 sekúnd)
//   - globalTimeLimit (60-600 sekúnd)
//
// - profileUpdateSchema - Update profilu
//   - username (optional)
//   - image (optional, URL)
//
// Použitie:
// import { signUpSchema } from '@/lib/utils/validators'
// const result = signUpSchema.safeParse(formData)
//
// Integrácia s React Hook Form:
// import { zodResolver } from '@hookform/resolvers/zod'
// useForm({ resolver: zodResolver(signUpSchema) })
//
// Poznámka: Nainštalovať:
// npm install zod @hookform/resolvers/zod
