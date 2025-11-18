// ============================================
// NEXTAUTH API ROUTE - Konfigurácia autentifikácie
// ============================================
//
// Sem patrí:
// - NextAuth konfigurácia
// - Providery (GitHub, Google, Credentials)
// - Callbacks:
//   - session callback (pridať userId, username do session)
//   - jwt callback (pridať custom data do tokenu)
//   - signIn callback (vytvorenie používateľa v DB ak neexistuje)
// - Pages config (custom signin/signup stránky)
// - Prisma Adapter pre ukladanie sessions a accounts v DB
//
// Export handler: export { handler as GET, handler as POST }
