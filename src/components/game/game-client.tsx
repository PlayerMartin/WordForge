"use client";

import { FinishGame, GetGame } from "@/actions/gameActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GameClientProps {
  gameId: string;
}

const GameClient = ({ gameId }: GameClientProps) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const checkGame = async () => {
      if (session.status === "loading") {
        return;
      }

      const game = await GetGame(gameId);
      if (!game) {
        setError("Game ID is not valid");
        return;
      }
      if (game.userId !== session.data?.user.id) {
        setError("Unauthorized");
        return;
      }
      if (game.finishedAt) {
        setError("Game already ended");
        return;
      }
    };

    checkGame();
  }, [session]);

  const leaveGame = async () => {
    await FinishGame(gameId);
    router.push("/");
  };

  return (
    <div>
      {!error && session.status === "authenticated" && (
        <>
          <h1>Welcome to game {gameId}</h1>
          <button onClick={leaveGame}>Leave</button>
        </>
      )}

      {error && <h1>{error}</h1>}
    </div>
  );
};

export default GameClient;
