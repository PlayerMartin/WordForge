import { cn } from '@/lib/utils/cn';

export type SpinnerProps = {
	size?: 'sm' | 'md' | 'lg';
	className?: string;
};

const Spinner = ({ size = 'md', className }: SpinnerProps) => {
	const sizes = {
		sm: 'w-4 h-4 border-2',
		md: 'w-6 h-6 border-2',
		lg: 'w-10 h-10 border-3'
	};

	return (
		<div
			className={cn(
				'animate-spin rounded-full border-solid border-current border-t-transparent',
				sizes[size],
				className
			)}
			role="status"
			aria-label="Loading"
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

export default Spinner;
