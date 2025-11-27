"use client";

import { FinishGame, JoinGame } from "@/actions/gameActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Game = () => {
  const [gameId, setGameId] = useState("");
  const session = useSession();
  const router = useRouter();

  const joinGame = async () => {
    if (session.status === "loading") {
      return;
    }

    if (session.status === "unauthenticated" || !session.data?.user) {
      router.push("/auth/signup");
      return;
    }

    const game = await JoinGame(session.data?.user.id, {
      mode: "solo_classic",
      scoringMode: "length",
      visibilityMode: "open",
      language: "en",
      turnTimeLimit: -1,
      globalTimeLimit: -1,
    });
    setGameId(game.id);
  };

  const leaveGame = async () => {
    await FinishGame(gameId);
    router.push("/");
  };

  useEffect(() => {
    joinGame();
  }, []);

  return (
    <div>
      {gameId ? <h1>Welcome to game {gameId}</h1> : <h1>Joining game...</h1>}
      <button onClick={leaveGame}>Leave</button>
    </div>
  );
};

export default Game;
