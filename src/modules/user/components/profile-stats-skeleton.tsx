// modules/user/components/profile-stats-skeleton.tsx
import { Card } from "@/components/ui";

const ProfileStatsSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      <Card padding="lg" className="mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-surface-200" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-40 bg-surface-200 rounded" />
            <div className="h-4 w-64 bg-surface-200 rounded" />
            <div className="h-3 w-32 bg-surface-200 rounded" />
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="h-6 w-10 bg-surface-200 rounded mb-2" />
            <div className="h-3 w-20 bg-surface-200 rounded" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileStatsSkeleton;
