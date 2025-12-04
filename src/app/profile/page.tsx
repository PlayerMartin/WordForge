import { Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import ProfileHeaderActions from '@/modules/user/components/profile-header-actions';
import ProfileStatsSection from '@/modules/user/components/profile-stats-section';
import ProfileStatsSkeleton from '@/modules/user/components/profile-stats-skeleton';
import { authOptions } from '@/lib/auth/authOptions';
import RecentGamesSkeleton from '@/modules/game/components/profile/recent-games-skeleton';
import RecentGamesSection from '@/modules/game/components/profile/recent-games-section';

const ProfilePage = async () => {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		redirect('/auth/signin');
	}

	const user = session.user;

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
			{/* Header */}
			<header className="container mx-auto px-4 py-6">
				<nav className="flex items-center justify-between">
					<Link
						href="/"
						className="text-2xl font-bold text-primary-600"
					>
						WordForge
					</Link>
					<ProfileHeaderActions userName={user.name ?? null} />
				</nav>
			</header>

			{/* Main */}
			<main className="container mx-auto px-4 py-8">
				<div className="mx-auto max-w-4xl space-y-8">
					<Suspense fallback={<ProfileStatsSkeleton />}>
						<ProfileStatsSection
							userId={user.id}
							userName={user.name ?? null}
							userEmail={user.email ?? null}
						/>
					</Suspense>

					<Suspense fallback={<RecentGamesSkeleton />}>
						<RecentGamesSection userId={user.id} />
					</Suspense>
				</div>
			</main>
		</div>
	);
};

export default ProfilePage;
