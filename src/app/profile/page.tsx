import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth/authOptions';
import {
	StatisticsGrid,
	HeaderCard,
	PersonalRecords,
	RecentGames
} from '@/modules/user/components';

const Page = async () => {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		redirect('/auth/sign-in');
	}
	const userId = session.user.id;

	return (
		<div className="mx-auto mt-4 max-w-5xl space-y-8">
			<HeaderCard userId={userId} />
			<StatisticsGrid userId={userId} />
			<PersonalRecords userId={userId} language="EN" />
			<PersonalRecords userId={userId} language="CZ" />
			<RecentGames userId={userId} />
		</div>
	);
};

export default Page;
