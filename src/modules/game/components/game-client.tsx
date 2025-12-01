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
import HiddenModeClient from "./modes/hidden-mode-client";
import ChallangeContainPartModeClient from "./modes/challange-contain-part-mode-client";

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

  if (session.status === "loading" || (!game && !error)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="text-center max-w-md">
          <h1 className="text-xl font-bold text-surface-900 mb-2">{error}</h1>
          <p className="text-surface-500 mb-4">
            Something went wrong with this game.
          </p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!game) {
    return null;
  }

  switch (game.mode) {
    case "solo_length":
      return <LengthModeClient game={game} />;

    case "solo_tempo":
      return <TempoModeClient game={game} />;

    case "solo_challenge_contain_part":
      return <ChallangeContainPartModeClient game={game} />;

    case "solo_hidden":
      return <HiddenModeClient game={game} />;
  }
};

export default GameClient;
