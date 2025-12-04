import { forwardRef, type InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export type InputProps = {
	label?: string;
	error?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, label, error, leftIcon, rightIcon, id, ...props }, ref) => {
		const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

		return (
			<div className="w-full">
				{label && (
					<label
						htmlFor={inputId}
						className="mb-1.5 block text-sm font-medium text-surface-700"
					>
						{label}
					</label>
				)}
				<div className="relative">
					{leftIcon && (
						<div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
							{leftIcon}
						</div>
					)}
					<input
						ref={ref}
						id={inputId}
						className={cn(
							'w-full rounded-lg border bg-white px-4 py-2.5 text-surface-900 placeholder:text-surface-400',
							'transition-all duration-200',
							'focus:outline-none focus:ring-2 focus:ring-offset-0',
							'disabled:cursor-not-allowed disabled:bg-surface-100 disabled:text-surface-500',
							error
								? 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
								: 'border-surface-300 focus:border-primary-500 focus:ring-primary-500/20',
							leftIcon && 'pl-10',
							rightIcon && 'pr-10',
							className
						)}
						{...props}
					/>
					{rightIcon && (
						<div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">
							{rightIcon}
						</div>
					)}
				</div>
				{error && (
					<p className="mt-1.5 text-sm text-error-500">{error}</p>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
