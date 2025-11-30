// modules/user/components/profile-header-card.tsx
import { Card } from "@/components/ui";

interface ProfileHeaderCardProps {
  name: string | null;
  email: string | null;
}

const ProfileHeaderCard = ({ name, email }: ProfileHeaderCardProps) => {
  return (
    <Card padding="lg" className="mb-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          {name?.charAt(0).toUpperCase() || "?"}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-surface-900">{name}</h1>
          <p className="text-surface-500">{email}</p>
          <p className="text-sm text-surface-400 mt-1">Member since recently</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeaderCard;
