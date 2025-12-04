import { Card } from '@/components/ui';

const ProfileStatsSkeleton = () => (
	<div className="animate-pulse space-y-6">
		<Card padding="lg" className="mb-8">
			<div className="flex flex-col items-center gap-6 md:flex-row">
				<div className="h-24 w-24 rounded-full bg-surface-200" />
				<div className="flex-1 space-y-2">
					<div className="h-5 w-40 rounded bg-surface-200" />
					<div className="h-4 w-64 rounded bg-surface-200" />
					<div className="h-3 w-32 rounded bg-surface-200" />
				</div>
			</div>
		</Card>
		<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
			{Array.from({ length: 4 }).map((_, i) => (
				<Card key={i} className="p-4">
					<div className="mb-2 h-6 w-10 rounded bg-surface-200" />
					<div className="h-3 w-20 rounded bg-surface-200" />
				</Card>
			))}
		</div>
	</div>
);

export default ProfileStatsSkeleton;
