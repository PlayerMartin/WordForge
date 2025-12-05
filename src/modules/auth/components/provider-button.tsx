'use client';

import { type ClientSafeProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

import { Button } from '@/components/ui';

import { GitHubIcon } from './github-icon';

type ProviderButtonProps = {
	provider: ClientSafeProvider;
	onClick: () => void;
};

export const ProviderButton = ({
	provider: { id, name },
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
			leftIcon={icon}
		>
			Continue with {name}
		</Button>
	);
};
