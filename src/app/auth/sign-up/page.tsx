'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SignUp } from '@/actions/auth-actions';
import { type UserSignupData, userSignupSchema } from '@/types';
import { Button, Card, Input } from '@/components/ui';

const SignUpPage = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<UserSignupData>({
		resolver: zodResolver(userSignupSchema)
	});

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
		<div className="flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<h1 className="mb-2 text-3xl font-bold text-surface-900">
						Create account
					</h1>
					<p className="text-surface-500">
						Join WordForge and start playing
					</p>
				</div>

				<Card padding="lg" className="animate-fade-in">
					{error && (
						<div className="mb-6 rounded-lg border border-error-200 bg-error-50 p-4">
							<p className="text-sm text-error-600">{error}</p>
						</div>
					)}

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<Input
							label="Username"
							placeholder="Choose a username"
							error={errors.name?.message}
							{...register('name')}
						/>

						<Input
							label="Email"
							type="email"
							placeholder="Enter your email"
							error={errors.email?.message}
							{...register('email')}
						/>

						<Input
							label="Password"
							type="password"
							placeholder="Create a password"
							error={errors.password?.message}
							{...register('password')}
						/>

						<Input
							label="Confirm Password"
							type="password"
							placeholder="Confirm your password"
							error={errors.password2?.message}
							{...register('password2')}
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

					<p className="mt-6 text-center text-sm text-surface-500">
						Already have an account?{' '}
						<Link
							href="/auth/sign-in"
							className="font-medium text-primary-600 transition-colors hover:text-primary-500"
						>
							Sign in
						</Link>
					</p>
				</Card>
			</div>
		</div>
	);
};

export default SignUpPage;
