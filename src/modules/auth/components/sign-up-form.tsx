'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Button } from '@/components/ui';
import { userSignupSchema, type UserSignupData } from '@/types';
import { SignUp } from '@/actions/auth-actions';
import { CardError } from '@/components/ui/card-error';
import { AUTH_ERRORS } from '@/constants/error-messages';

import { AuthFormInput } from './auth-input';

export const SignUpForm = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<UserSignupData>({
		resolver: zodResolver(userSignupSchema)
	});
	const router = useRouter();

	const onSubmit = async (data: UserSignupData) => {
		setIsLoading(true);

		const res = await SignUp({
			name: data.name,
			email: data.email,
			password: data.password
		});

		if (!res.ok) {
			setError(res.err ?? AUTH_ERRORS.GENERIC);
			setIsLoading(false);
			return;
		}

		router.push('/auth/sign-in');
	};

	return (
		<>
			{error && <CardError error={error} />}

			<FormProvider {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<AuthFormInput
						label="Username"
						name="name"
						placeholder="Choose your username"
					/>
					<AuthFormInput
						label="Email"
						name="email"
						type="email"
						placeholder="Enter your email"
					/>
					<AuthFormInput
						label="Password"
						name="password"
						placeholder="Create a password"
						type="password"
					/>
					<AuthFormInput
						label="Confirm password"
						name="password2"
						placeholder="Confirm your password"
						type="password"
					/>

					<Button
						type="submit"
						fullWidth
						size="lg"
						loading={isLoading}
						className="mt-6"
					>
						Create Account
					</Button>
				</form>
			</FormProvider>
		</>
	);
};
