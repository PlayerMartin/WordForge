'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui';

type ProfileHeaderActionsProps = {
	userName: string | null;
};

const ProfileHeaderActions = ({ userName }: ProfileHeaderActionsProps) => (
	<div className="flex items-center gap-4">
		<span className="text-surface-600">{userName}</span>
		<Button variant="ghost" size="sm" onClick={() => signOut()}>
			Sign out
		</Button>
	</div>
);

export default ProfileHeaderActions;
