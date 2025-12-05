import Link from 'next/link';

import { Card } from '@/components/ui';
import { SignInForm } from '@/modules/auth/components/sign-in-form';
import { OAuthSection } from '@/modules/auth/components/oauth-section';

const SignInPage = () => (
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
				<SignInForm />

				<OAuthSection />

				<p className="mt-6 text-center text-sm text-surface-500">
					Don&apos;t have an account?{' '}
					<Link
						href="/auth/sign-up"
						className="font-medium text-primary-600 transition-colors hover:text-primary-500"
					>
						Sign up
					</Link>
				</p>
			</Card>
		</div>
	</div>
);

export default SignInPage;
