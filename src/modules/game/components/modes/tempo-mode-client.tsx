// modules/game/components/modes/tempo-mode-client.tsx
"use client";

import { DbGame } from "@/types/game";
import { Button, Card } from "@/components/ui";
import Link from "next/link";

interface TempoModeClientProps {
  game: DbGame;
}

const TempoModeClient = ({ game }: TempoModeClientProps) => {
  return (
    <Card className="max-w-2xl mx-auto text-center">
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

  );
};

export default TempoModeClient;
