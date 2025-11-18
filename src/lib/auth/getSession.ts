// ============================================
// GET SESSION - Helper pre získanie session
// ============================================
//
// Sem patrí:
// - Funkcia getSession()
//   - Server-side helper pre získanie aktuálnej session
//   - Return: Session | null
//
// - Funkcia getCurrentUser()
//   - Získa aktuálneho používateľa z DB
//   - Return: User | null
//
// - Funkcia requireAuth()
//   - Vyžaduje autentifikáciu, inak redirect na /auth/signin
//   - Return: Session (throw error ak nie je prihlásený)
//
// Použitie:
// import { getCurrentUser, requireAuth } from '@/lib/auth/getSession'
// const user = await getCurrentUser()
//
// Implementácia:
// import { getServerSession } from 'next-auth'
// import { authOptions } from './authOptions'
// import { prisma } from '@/lib/prisma'
//
// export async function getSession() {
//   return await getServerSession(authOptions)
// }
