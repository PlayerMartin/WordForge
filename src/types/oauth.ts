import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
	type Session = {
		user: {
			id: string;
		} & DefaultSession['user'];
	};
}

declare module 'next-auth/jwt' {
	type JWT = {
		id: string;
	};
}
