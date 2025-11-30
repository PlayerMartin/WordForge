// modules/user/components/profile-header-actions.tsx
"use client";

import { Button } from "@/components/ui";
import { signOut } from "next-auth/react";

interface ProfileHeaderActionsProps {
  userName: string | null;
}

const ProfileHeaderActions = ({ userName }: ProfileHeaderActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-surface-600">{userName}</span>
      <Button variant="ghost" size="sm" onClick={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
};

export default ProfileHeaderActions;
