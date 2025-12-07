'use server';

import { eq } from 'drizzle-orm';

import { db, users } from '@/lib/db';
import { type UserDetails } from '@/types';

export const GetUserDetailsByIdAction = async (
	userId: string
): Promise<{
	user: UserDetails;
}> => {
	const res = await db.select().from(users).where(eq(users.id, userId));

	if (res.length !== 1) {
		return {
			user: {
				username: 'Uknown',
				email: 'No email',
				createdAt: new Date()
			}
		};
	}

	const user = res[0];

	return {
		user: {
			username: user.name ?? '',
			email: user.email ?? '',
			createdAt: user.createdAt ?? new Date()
		}
	};
};
