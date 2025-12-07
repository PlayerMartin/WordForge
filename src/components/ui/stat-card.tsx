import Card from './card';

type StatCardProps = {
	value: string | number;
	label: string;
	colorClass?: 'primary' | 'secondary' | 'accent' | 'warning' | 'default';
	size?: 'sm' | 'lg';
};

const colorMap = {
	primary: 'text-primary-600',
	secondary: 'text-secondary-600',
	accent: 'text-accent-600',
	warning: 'text-warning-600',
	default: 'text-surface-900'
} as const;

const sizeMap = {
	sm: 'text-lg font-semibold',
	lg: 'text-3xl font-bold'
} as const;

export const StatCard = ({
	value,
	label,
	colorClass = 'primary',
	size = 'lg'
}: StatCardProps) => (
	<Card className={size === 'lg' ? 'text-center' : ''}>
		{size === 'lg' ? (
			<>
				<p className={`${sizeMap[size]} ${colorMap[colorClass]}`}>
					{value}
				</p>
				<p className="text-sm text-surface-500">{label}</p>
			</>
		) : (
			<>
				<p className="text-sm text-surface-500">{label}</p>
				<p className={`${sizeMap[size]} ${colorMap[colorClass]}`}>
					{value}
				</p>
			</>
		)}
	</Card>
);
