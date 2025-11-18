// ============================================
// AUTH OPTIONS - NextAuth konfigurácia
// ============================================
//
// Sem patrí:
// - Export authOptions pre NextAuth
// - Konfigurácia providers (GitHub, Google, Credentials)
// - Callbacks:
//   - session: pridať userId, username do session objektu
//   - jwt: pridať custom data do JWT tokenu
//   - signIn: vytvorenie používateľa v DB pri prvom prihlásení (OAuth)
//
// - Pages konfigurácia:
//   - signIn: '/auth/signin'
//   - signUp: '/auth/signup'
//   - error: '/auth/error'
//
// - Prisma Adapter pre ukladanie sessions
//
// Použitie v route.ts:
// import { authOptions } from '@/lib/auth/authOptions'
// const handler = NextAuth(authOptions)
//
// Použitie v Server Components:
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth/authOptions'
// const session = await getServerSession(authOptions)
//
// Implementácia:
// import { NextAuthOptions } from 'next-auth'
// import { PrismaAdapter } from '@next-auth/prisma-adapter'
// import GitHubProvider from 'next-auth/providers/github'
// import { prisma } from '@/lib/prisma'
//
// export const authOptions: NextAuthOptions = { ... }
