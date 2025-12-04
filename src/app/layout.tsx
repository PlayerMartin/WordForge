import { type Metadata } from 'next';

import { Providers } from '@/components/utils/providers';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

// TODO doplnit metadata
export const metadata: Metadata = {
	title: {
		default: 'WordForge',
		template: `%s | WordForge`
	},
	description:
		'Fast and replayable word chain game. Compete against time and climb the leaderboards!',
	keywords: ['word game', 'word chain', 'wordforge', 'online game'],
	authors: [{ name: 'Best team' }],
	creator: 'Best team',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: '',
		title: 'WordForge',
		description:
			'Fast and replayable word chain game. Compete against time and climb the leaderboards!',
		siteName: 'WordForge',
		images: [{ url: '' }]
	}
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body className="flex min-h-screen flex-col bg-gradient-to-br from-primary-200 via-white to-secondary-400 text-surface-900">
			<Providers>
				<Header />
				<main className="w-full flex-1">{children}</main>
				<Footer />
			</Providers>
		</body>
	</html>
);

export default RootLayout;
