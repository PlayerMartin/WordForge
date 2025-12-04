import { z } from 'zod';

export type User = {
	name: string;
	email: string;
	password: string;
};

// AUTH
export const userSignupSchema = z
	.object({
		name: z.string().min(3, 'Username must be longer than 2 characters'),
		email: z.string().email('Invalid email address'),
		password: z.string().min(3, 'Password must be at least 3 characters'),
		password2: z.string()
	})
	.refine(data => data.password === data.password2, {
		path: ['password2'],
		message: 'Passwords do not match'
	});

export type UserSignupData = z.infer<typeof userSignupSchema>;

export const userSigninSchema = z.object({
	name: z.string().min(3, 'Username must be longer than 2 characters'),
	password: z.string().min(3, 'Password must be at least 3 characters')
});

export type UserSigninData = z.infer<typeof userSigninSchema>;
