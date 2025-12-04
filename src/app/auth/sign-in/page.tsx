'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { getProviders, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { type UserSigninData, userSigninSchema } from '@/types';
import { Button, Card } from '@/components/ui';
import { SignInForm } from '@/modules/auth/components/sign-in-form';

const SignInPage = () => {
	const [providers, setProviders] = useState<Record<string, any> | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const form = useForm<UserSigninData>({
		resolver: zodResolver(userSigninSchema)
	});

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		fetchProviders();
	}, []);

	const handleOAuthSignIn = (providerId: string) => {
		setIsLoading(true);
		signIn(providerId, { callbackUrl: '/' });
	};

	return (
		<div className="flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="mb-8 text-center">
					<h1 className="mb-2 text-3xl font-bold text-surface-900">
						Welcome back
					</h1>
					<p className="text-surface-500">
						Sign in to continue playing WordForge
					</p>
				</div>

				<Card padding="lg" className="animate-fade-in">
					{error && (
						<div className="mb-6 rounded-lg border border-error-200 bg-error-50 p-4">
							<p className="text-sm text-error-600">{error}</p>
						</div>
					)}

					<FormProvider {...form}>
						<SignInForm
							isLoading={isLoading}
							setError={setError}
							setIsLoading={setIsLoading}
						/>
					</FormProvider>

					{providers &&
						Object.values(providers).some(
							(p: any) => p.id !== 'credentials'
						) && (
							<>
								<div className="relative my-6">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-surface-200" />
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="bg-white px-4 text-surface-500">
											Or continue with
										</span>
									</div>
								</div>

								<div className="space-y-3">
									{Object.values(providers)
										.filter(
											(p: any) => p.id !== 'credentials'
										)
										.map((provider: any) => (
											<Button
												key={provider.id}
												type="button"
												variant="outline"
												fullWidth
												onClick={() =>
													handleOAuthSignIn(
														provider.id
													)
												}
												disabled={isLoading}
												leftIcon={
													provider.id ===
														'github' && (
														<svg
															className="h-5 w-5"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																fillRule="evenodd"
																d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
																clipRule="evenodd"
															/>
														</svg>
													)
												}
											>
												Continue with {provider.name}
											</Button>
										))}
								</div>
							</>
						)}

					<p className="mt-6 text-center text-sm text-surface-500">
						Don&apos;t have an account?{' '}
						<Link
							href="/auth/signup"
							className="font-medium text-primary-600 transition-colors hover:text-primary-500"
						>
							Sign up
						</Link>
					</p>
				</Card>
			</div>
		</div>
	);
};

export default SignInPage;
