'use server';

import { ValidateId } from '@/lib/utils/validation';
import * as userRepository from '@/modules/user/repositories/user-repository';
import { type UserDetails } from '@/types';

export const GetUserDetailsByIdAction = async (
	userId: string
): Promise<{
	user: UserDetails;
}> => {
	if (!ValidateId(userId))
		return {
			user: {
				username: 'InvalidUserId',
				email: 'No email',
				createdAt: new Date()
			}
		};

	const res = await userRepository.FindById(userId);

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
