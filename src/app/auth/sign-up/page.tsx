import Link from 'next/link';

import { Card } from '@/components/ui';
import { SignUpForm } from '@/modules/auth/components/sign-up-form';

const SignUpPage = () => (
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
				<SignUpForm />

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

export default SignUpPage;
