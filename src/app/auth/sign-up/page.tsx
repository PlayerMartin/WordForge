'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Card } from '@/components/ui';
import { SignUpForm } from '@/modules/auth/components/sign-up-form';

const SignUpPage = () => {
	const [error, setError] = useState<string | null>(null);

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

					<SignUpForm setError={setError} />

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
