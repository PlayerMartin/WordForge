"use client";

import { FinishGame, GameExists } from "@/actions/gameActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GameClientProps {
  gameId: string;
}

const GameClient = ({ gameId }: GameClientProps) => {
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const validateGameID = async () => {
      const res = await GameExists(gameId);
      if (!res) {
        setError("Game ID is not valid");
        return;
      }
    };
    validateGameID();
  }, []);

  const leaveGame = async () => {
    await FinishGame(gameId);
    router.push("/");
  };

  return (
    <div>
      {!error && <h1>Welcome to game {gameId}</h1>}
      {!error && <button onClick={leaveGame}>Leave</button>}

      {error && <h1>{error}</h1>}
    </div>
  );
};

export default GameClient;
