// modules/user/components/profile-stats-grid.tsx
import { Card } from "@/components/ui";

interface ProfileStatsGridProps {
  gamesPlayed: number;
  totalScore: number;
  totalWords: number;
  bestScore: number;
}

const ProfileStatsGrid = ({
  gamesPlayed,
  totalScore,
  totalWords,
  bestScore,
}: ProfileStatsGridProps) => {
  return (
    <>
      <h2 className="text-xl font-bold text-surface-900 mb-4">Statistics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <p className="text-3xl font-bold text-primary-600">{gamesPlayed}</p>
          <p className="text-sm text-surface-500">Games Played</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-secondary-600">{totalScore}</p>
          <p className="text-sm text-surface-500">Total Score</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-accent-600">{totalWords}</p>
          <p className="text-sm text-surface-500">Words Used</p>
        </Card>
        <Card className="text-center">
          <p className="text-3xl font-bold text-warning-600">{bestScore}</p>
          <p className="text-sm text-surface-500">Best Score</p>
        </Card>
      </div>
    </>
  );
};

export default ProfileStatsGrid;
