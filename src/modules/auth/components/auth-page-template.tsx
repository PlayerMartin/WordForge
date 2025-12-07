import Link from 'next/link';

import { Card } from '@/components/ui';

type AuthPageTemplateProps = {
	title: string;
	subtitle: string;
	children: React.ReactNode;
	footerText: string;
	footerLinkText: string;
	footerLinkHref: string;
};

export const AuthPageTemplate = ({
	title,
	subtitle,
	children,
	footerText,
	footerLinkText,
	footerLinkHref
}: AuthPageTemplateProps) => (
	<div className="flex items-center justify-center p-4">
		<div className="w-full max-w-md">
			<div className="mb-8 text-center">
				<h1 className="mb-2 text-3xl font-bold text-surface-900">
					{title}
				</h1>
				<p className="text-surface-500">{subtitle}</p>
			</div>

			<Card padding="lg" className="animate-fade-in">
				{children}

				<p className="mt-6 text-center text-sm text-surface-500">
					{footerText}{' '}
					<Link
						href={footerLinkHref}
						className="font-medium text-primary-600 transition-colors hover:text-primary-500"
					>
						{footerLinkText}
					</Link>
				</p>
			</Card>
		</div>
	</div>
);
