// modules/game/components/profile/recent-games-section.tsx
import { GetRecentGamesForUser } from "@/actions/gameActions";
import { DbGame } from "@/types/game";
import ProfileRecentGamesList from "./profile-recent-games-list";

interface RecentGamesSectionProps {
  userId: string;
}

const RecentGamesSection = async ({ userId }: RecentGamesSectionProps) => {
  const games = (await GetRecentGamesForUser(userId, 10)) as DbGame[];

  return (
    <>
      <h2 className="text-xl font-bold text-surface-900 mb-4">
        Recent Games
      </h2>
      <ProfileRecentGamesList games={games} />
    </>
  );
};

export default RecentGamesSection;
