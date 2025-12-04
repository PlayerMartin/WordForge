import { Card } from '@/components/ui';

type ProfileHeaderCardProps = {
	name: string | null;
	email: string | null;
};

const ProfileHeaderCard = ({ name, email }: ProfileHeaderCardProps) => (
	<Card padding="lg" className="mb-8">
		<div className="flex flex-col items-center gap-6 md:flex-row">
			<div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 text-3xl font-bold text-white">
				{name?.charAt(0).toUpperCase() ?? '?'}
			</div>
			<div className="text-center md:text-left">
				<h1 className="text-2xl font-bold text-surface-900">{name}</h1>
				<p className="text-surface-500">{email}</p>
				<p className="mt-1 text-sm text-surface-400">
					Member since recently
				</p>
			</div>
		</div>
	</Card>
);

export default ProfileHeaderCard;
