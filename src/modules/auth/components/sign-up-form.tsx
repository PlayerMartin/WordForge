'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { Button } from '@/components/ui';
import { userSignupSchema, type UserSignupData } from '@/types';
import { SignUp } from '@/actions/auth-actions';

import { AuthFormInput } from './auth-input';

type SignUpFormProps = {
	setError: (msg: string | null) => void;
};

export const SignUpForm = ({ setError }: SignUpFormProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const form = useForm<UserSignupData>({
		resolver: zodResolver(userSignupSchema)
	});
	const router = useRouter();

	const onSubmit = async (data: UserSignupData) => {
		setError(null);
		setIsLoading(true);

		try {
			const res = await SignUp({
				name: data.name,
				email: data.email,
				password: data.password
			});

			if (!res.ok) {
				setError(res.err ?? 'Something went wrong. Please try again.');
				return;
			}

			router.push('/auth/sign-in');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
	);
};
