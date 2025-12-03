// modules/game/components/ui/game-header.tsx
"use client";

import { Button } from "@/components/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGameEnd } from "../../hooks/use-game-end";

const GameHeader = ({ gameId }: { gameId: string }) => {
  const router = useRouter();
  const { endGame } = useGameEnd({ gameId });

  const leaveGame = () => {
    endGame();
    router.replace("/");
  };

  return (
    <header className="container mx-auto px-4 py-4">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary-600">
          WordForge
        </Link>
        <Button variant="ghost" size="sm" onClick={leaveGame}>
          Leave Game
        </Button>
      </nav>
    </header>
  );
};

export default GameHeader;
