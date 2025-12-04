// app/game/[id]/layout.tsx

import GameHeader from "@/modules/game/components/ui/game-header";

type GameLayoutProps = {
  children: React.ReactNode;
  params: { id: string };
};

const GameLayout = ({ children, params }: GameLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <GameHeader gameId={params.id} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};

export default GameLayout;
