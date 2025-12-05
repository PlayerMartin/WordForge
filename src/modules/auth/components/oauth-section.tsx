'use client';

import { getProviders, signIn, type ClientSafeProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { ProviderButton } from './provider-button';

export const OAuthSection = () => {
	const [providers, setProviders] = useState<ClientSafeProvider[]>([]);

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();
			setProviders(
				res
					? Object.values(res).filter(p => p.id !== 'credentials')
					: []
			);
		};
		fetchProviders();
	}, []);

	const onClick = async (provider: ClientSafeProvider) => {
		await signIn(provider.id, { callbackUrl: '/' });
	};

	return (
		<>
			<div className="relative my-6">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-surface-200" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="bg-white px-4 text-surface-500">
						Or continue with
					</span>
				</div>
			</div>

			<div className="space-y-3">
				{Object.values(providers).map(p => (
					<ProviderButton
						key={p.id}
						provider={p}
						onClick={() => onClick(p)}
					/>
				))}
			</div>
		</>
	);
};
