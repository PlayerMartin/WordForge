import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions, Session, SessionOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { UserSigninData } from "@/types";
import bcrypt from "bcryptjs";
import { FindUserByName } from "@/repositories/user-repository";

export const SIGNIN_PAGE = "/auth/signin";

// PROVIDERS
export const Github = GithubProvider({
  clientId: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
});

export const CustomCredentials = Credentials({
  name: "Credentials",
  credentials: {
    name: {
      label: "Username",
      type: "text",
    },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    const { name, password } = credentials as UserSigninData;

    const user = await FindUserByName(name);

    if (!user) {
      throw new Error("user_not_found");
    }

    if (!user.password) {
      throw new Error("provider_account");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("invalid_password");
    }

    return user;
  },
});

// SESSION CONFIG
export const SessionConfig: Partial<SessionOptions> = {
  strategy: "jwt",
  maxAge: 3000,
};

export const jwtCallback = async ({
  token,
  user,
}: {
  token: JWT;
  user?: User;
}) => {
  if (user) {
    token.id = user.id;
  }
  return token;
};

export const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) => {
  session.user.id = token.id;
  return session;
};

// NEXTAUTH OPTIONS
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [Github, CustomCredentials],
  session: SessionConfig,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
  pages: {
    signIn: SIGNIN_PAGE,
  },
};
