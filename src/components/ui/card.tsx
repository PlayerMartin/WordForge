import { type HTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export type CardProps = {
	hover?: boolean;
	padding?: 'none' | 'sm' | 'md' | 'lg';
} & HTMLAttributes<HTMLDivElement>;

const Card = ({
	className,
	hover = false,
	padding = 'md',
	children,
	...props
}: CardProps) => {
	const paddings = {
		none: '',
		sm: 'p-3',
		md: 'p-5',
		lg: 'p-8'
	};

	return (
		<div
			className={cn(
				'rounded-xl border border-surface-200 bg-white shadow-sm',
				paddings[padding],
				hover &&
					'cursor-pointer transition-all duration-200 hover:border-surface-300 hover:shadow-md',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export default Card;
