import { Card } from '@/components/ui';

const RecentGamesSkeleton = () => (
	<div className="animate-pulse space-y-4">
		<div className="h-5 w-32 rounded bg-surface-200" />
		<Card>
			<div className="divide-y divide-surface-200">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="flex items-center justify-between px-2 py-3"
					>
						<div className="space-y-2">
							<div className="h-4 w-32 rounded bg-surface-200" />
							<div className="h-3 w-24 rounded bg-surface-200" />
						</div>
						<div className="flex items-center gap-3">
							<div className="h-5 w-16 rounded-full bg-surface-200" />
							<div className="h-4 w-12 rounded bg-surface-200" />
							<div className="h-8 w-20 rounded bg-surface-200" />
						</div>
					</div>
				))}
			</div>
		</Card>
	</div>
);

export default RecentGamesSkeleton;
