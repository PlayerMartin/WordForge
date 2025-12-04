'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui';
import { type UserSigninData, userSigninSchema } from '@/types';

import { AuthFormInput } from './auth-input';

type SignInFormProps = {
	isLoading: boolean;
	setError: (msg: string | null) => void;
	setIsLoading: (value: boolean) => void;
};

export const SignInForm = ({
	isLoading,
	setError,
	setIsLoading
}: SignInFormProps) => {
	const form = useForm<UserSigninData>({
		resolver: zodResolver(userSigninSchema)
	});
	const router = useRouter();

	const handleCredentialsSignIn = async (data: UserSigninData) => {
		setError(null);
		setIsLoading(true);

		try {
			const res = await signIn('credentials', {
				...data,
				redirect: false
			});

			if (!res?.error) {
				router.replace('/');
				return;
			}

			switch (res.error) {
				case 'user_not_found':
					setError('User does not exist');
					break;
				case 'invalid_password':
					setError('Incorrect password');
					break;
				case 'provider_account':
					setError(
						'This account uses social login. Please sign in with GitHub.'
					);
					break;
				default:
					setError('Something went wrong. Please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(handleCredentialsSignIn)}
				className="space-y-4"
			>
				<AuthFormInput
					label="Username"
					name="name"
					placeholder="Enter your username"
				/>
				<AuthFormInput
					label="Password"
					name="password"
					placeholder="Enter your password"
					type="password"
				/>

				<Button
					type="submit"
					fullWidth
					size="lg"
					loading={isLoading}
					className="mt-6"
				>
					Sign In
				</Button>
			</form>
		</FormProvider>
	);
};
