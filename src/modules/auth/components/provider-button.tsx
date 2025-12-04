'use client';

import { type ClientSafeProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

import { Button } from '@/components/ui';

import { GitHubIcon } from './github-icon';

type ProviderButtonProps = {
	provider: ClientSafeProvider;
	isLoading: boolean;
	onClick: () => void;
};

export const ProviderButton = ({
	provider: { id, name },
	isLoading,
	onClick
}: ProviderButtonProps) => {
	let icon: ReactNode | null = null;
	switch (id) {
		case 'github':
			icon = <GitHubIcon />;
			break;
		default:
			break;
	}

	return (
		<Button
			type="button"
			variant="outline"
			fullWidth
			onClick={onClick}
			disabled={isLoading}
			leftIcon={icon}
		>
			Continue with {name}
		</Button>
	);
};
