'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

import { LanguageContextProvider } from './language-provider';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		<SessionProvider>
			<LanguageContextProvider> {children}</LanguageContextProvider>{' '}
		</SessionProvider>
	</QueryClientProvider>
);
