// modules/game/components/game-client.tsx
"use client";

import { GetGame } from "@/actions/gameActions";
import { Button, Card } from "@/components/ui";
import { DbGame } from "@/types/game";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LengthModeClient from "./modes/length-mode-client";
import TempoModeClient from "./modes/tempo-mode-client";
import OpenModeClient from "./modes/open-mode-client";
import HiddenModeClient from "./modes/hidden-mode-client";



interface GameClientProps {
  gameId: string;
}

const GameClient = ({ gameId }: GameClientProps) => {
  const session = useSession();
  const [game, setGame] = useState<DbGame | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGame = async () => {
      if (session.status === "loading") return;

      const dbGame = (await GetGame(gameId)) as DbGame | null;

      if (!dbGame) {
        setError("Game ID is not valid");
        return;
      }
      if (dbGame.userId !== session.data?.user.id) {
        setError("Unauthorized");
        return;
      }
      if (dbGame.finishedAt) {
        setError("Game already ended");
        return;
      }

      setGame(dbGame);
    };

    loadGame();
  }, [session.status, session.data?.user?.id, gameId]);

  // Loading state
  if (session.status === "loading" || (!game && !error)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="text-center max-w-md">
          <h1 className="text-xl font-bold text-surface-900 mb-2">{error}</h1>
          <p className="text-surface-500 mb-4">Something went wrong with this game.</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!game) {
    // Should not reach here, but just in case
    return null;
  }

  // Switch by game.mode (stored in DB)
  switch (game.mode) {
    case "solo_length":
      return <LengthModeClient game={game} />;

    case "solo_tempo":
      return <TempoModeClient game={game} />;

    case "solo_open":
      return <OpenModeClient game={game} />;

    case "solo_hidden":
      return <HiddenModeClient game={game} />;

    default:
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Card className="text-center max-w-md">
            <h1 className="text-xl font-bold text-surface-900 mb-2">Unknown game mode</h1>
            <p className="text-surface-500 mb-4">
              This game was created with an unsupported mode.
            </p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </Card>
        </div>
      );
  }
};

export default GameClient;
