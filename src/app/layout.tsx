import { type Metadata } from 'next';

import { Providers } from '@/components/utils/providers';
import './globals.css';

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
		<body className="min-h-screen bg-surface-50 text-surface-900 antialiased">
			<Providers>{children}</Providers>
		</body>
	</html>
);

export default RootLayout;
