import { Card } from '@/components/ui';

const LeaderboardSkeleton = () => (
	<Card padding="sm">
		<div className="animate-pulse overflow-x-auto">
			<table className="w-full">
				<thead>
					<tr className="border-b border-surface-200 bg-surface-50">
						<th className="px-6 py-4 text-left">
							<div className="h-4 w-12 rounded bg-surface-200" />
						</th>
						<th className="px-6 py-4 text-left">
							<div className="h-4 w-16 rounded bg-surface-200" />
						</th>
						<th className="px-6 py-4 text-right">
							<div className="ml-auto h-4 w-12 rounded bg-surface-200" />
						</th>
						<th className="px-6 py-4 text-right">
							<div className="ml-auto h-4 w-12 rounded bg-surface-200" />
						</th>
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 5 }).map((_, i) => (
						<tr key={i} className="border-b border-surface-100">
							<td className="px-6 py-4">
								<div className="h-8 w-8 rounded-full bg-surface-200" />
							</td>
							<td className="px-6 py-4">
								<div className="h-4 w-24 rounded bg-surface-200" />
							</td>
							<td className="px-6 py-4 text-right">
								<div className="ml-auto h-4 w-12 rounded bg-surface-200" />
							</td>
							<td className="px-6 py-4 text-right">
								<div className="ml-auto h-4 w-8 rounded bg-surface-200" />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</Card>
);

export default LeaderboardSkeleton;
