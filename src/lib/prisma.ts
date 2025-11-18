// ============================================
// PRISMA CLIENT - Singleton Prisma inštancia
// ============================================
//
// Sem patrí:
// - Export globálneho Prisma Client
// - Singleton pattern (aby sa nevytvárali viaceré inštancie v dev mode)
// - Type-safe databázový client
//
// Použitie:
// import { prisma } from '@/lib/prisma'
// const users = await prisma.user.findMany()
//
// Best practice pre Next.js:
// - V development mode Next.js hot-reloaduje, čo by vytvorilo veľa Prisma connections
// - Tento pattern používa global variable na udržanie jednej inštancie
//
// Príklad implementácie:
//
// import { PrismaClient } from '@prisma/client'
//
// const globalForPrisma = global as unknown as { prisma: PrismaClient }
//
// export const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
//   })
//
// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
