// modules/game/components/profile/recent-games-skeleton.tsx
import { Card } from "@/components/ui";

const RecentGamesSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-5 w-32 bg-surface-200 rounded" />
      <Card>
        <div className="divide-y divide-surface-200">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 px-2"
            >
              <div className="space-y-2">
                <div className="h-4 w-32 bg-surface-200 rounded" />
                <div className="h-3 w-24 bg-surface-200 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-16 bg-surface-200 rounded-full" />
                <div className="h-4 w-12 bg-surface-200 rounded" />
                <div className="h-8 w-20 bg-surface-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RecentGamesSkeleton;
