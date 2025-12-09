'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Button } from '@/components/ui';
import { type UserSigninData, userSigninSchema } from '@/types';
import { CardError } from '@/components/ui/card-error';
import { AUTH_ERRORS } from '@/constants/error-messages';

import { AuthFormInput } from './auth-input';

export const SignInForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const form = useForm<UserSigninData>({
		resolver: zodResolver(userSigninSchema)
	});
	const router = useRouter();

	const handleCredentialsSignIn = async (data: UserSigninData) => {
		setIsLoading(true);

		const res = await signIn('credentials', {
			...data,
			redirect: false
		});

		if (!res?.error) {
			router.replace('/');
			return;
		}

		setIsLoading(false);

		switch (res.error) {
			case 'user_not_found':
				setError(AUTH_ERRORS.USER_NOT_FOUND);
				break;
			case 'invalid_password':
				setError(AUTH_ERRORS.INVALID_PASSWORD);
				break;
			case 'provider_account':
				setError(AUTH_ERRORS.PROVIDER_ACCOUNT);
				break;
			default:
				setError(AUTH_ERRORS.GENERIC);
		}
	};

	return (
		<>
			{error && <CardError error={error} />}

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
						disabled={isLoading}
						fullWidth
						size="lg"
						className="mt-6"
					>
						Sign In
					</Button>
				</form>
			</FormProvider>
		</>
	);
};
