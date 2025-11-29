// modules/game/components/modes/tempo-mode-client.tsx
"use client";

import { DbGame } from "@/types/game";
import { Button, Card } from "@/components/ui";
import { FinishGame } from "@/actions/gameActions";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface TempoModeClientProps {
  game: DbGame;
}

const TempoModeClient = ({ game }: TempoModeClientProps) => {
  const router = useRouter();

  const leaveGame = async () => {
    await FinishGame(game.id);
    router.push("/");
  };

  return (
    <>
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

      <main className="container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-surface-900 mb-2">
            Tempo Mode
          </h1>
          <p className="text-surface-500 mb-4">
            We&apos;re still working on this mode.
          </p>
          <p className="text-surface-400 text-sm mb-6">
            The game record exists, but gameplay for Tempo Mode isn&apos;t implemented yet.
          </p>
          <Link href="/">
            <Button>Back to home</Button>
          </Link>
        </Card>
      </main>
    </>
  );
};

export default TempoModeClient;
