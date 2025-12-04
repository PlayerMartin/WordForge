import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import {
	type NextAuthOptions,
	type Session,
	type SessionOptions,
	type User
} from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import bcrypt from 'bcryptjs';

import { type UserSigninData } from '@/types';
import { db } from '@/lib/db';
import { FindUserByName } from '@/modules/user/repositories/user-repository';

export const SIGNIN_PAGE = '/auth/signin';

// PROVIDERS
export const Github = GithubProvider({
	clientId: process.env.GITHUB_CLIENT_ID!,
	clientSecret: process.env.GITHUB_CLIENT_SECRET!
});

export const CustomCredentials = Credentials({
	name: 'Credentials',
	credentials: {
		name: {
			label: 'Username',
			type: 'text'
		},
		password: { label: 'Password', type: 'password' }
	},
	authorize: async credentials => {
		const { name, password } = credentials as UserSigninData;

		const user = await FindUserByName(name);

		if (!user) {
			throw new Error('user_not_found');
		}

		if (!user.password) {
			throw new Error('provider_account');
		}

		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			throw new Error('invalid_password');
		}

		return user;
	}
});

// SESSION CONFIG
export const SessionConfig: Partial<SessionOptions> = {
	strategy: 'jwt',
	maxAge: 7 * 24 * 60 * 60 // 7 days
};

export const jwtCallback = async ({
	token,
	user
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
	token
}: {
	session: Session;
	token: JWT;
}) => {
	session.user.id = token.id;
	return session;
};

// NEXTAUTH OPTIONS
export const authOptions: NextAuthOptions = {
	adapter: DrizzleAdapter(db) as NextAuthOptions['adapter'],
	providers: [Github, CustomCredentials],
	session: SessionConfig,
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: jwtCallback,
		session: sessionCallback
	},
	pages: {
		signIn: SIGNIN_PAGE
	}
};
