'use server';

import bcrypt from 'bcryptjs';

import * as userRepository from '@/modules/user/repositories/user-repository';
import { type User } from '@/types';
import { ValidateUser } from '@/lib/utils/validation';

export const SignUp = async (user: User) => {
	if (!ValidateUser(user)) return { ok: false, err: 'Invalid user format' };

	const hash = await bcrypt.hash(user.password, 10);

	return await userRepository.CreateUser({ ...user, password: hash });
};
