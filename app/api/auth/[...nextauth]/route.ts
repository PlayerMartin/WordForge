import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "@/lib/prisma";

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

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
