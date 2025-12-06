import { GetUserDetailsByIdAction } from '@/actions/user-actions';
import { Card } from '@/components/ui';

const HeaderCard = async ({ userId }: { userId: string }) => {
	const { user } = await GetUserDetailsByIdAction(userId);

	return (
		<Card padding="lg">
			<div className="flex flex-col items-center gap-6 md:flex-row">
				<div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 text-3xl font-bold text-white">
					{user.username.charAt(0).toUpperCase() ?? '?'}
				</div>
				<div className="text-center md:text-left">
					<h1 className="text-2xl font-bold">{user.username}</h1>
					<p className="text-surface-500">{user.email}</p>
					<p className="mt-1 text-sm text-surface-400">
						Member since{' '}
						{user.createdAt.toLocaleDateString('cs-CZ')}
					</p>
				</div>
			</div>
		</Card>
	);
};

export default HeaderCard;
