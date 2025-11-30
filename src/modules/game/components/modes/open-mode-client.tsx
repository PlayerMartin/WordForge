// modules/game/components/modes/open-mode-client.tsx
"use client";

import { DbGame } from "@/types/game";
import { Button, Card } from "@/components/ui";
import Link from "next/link";

interface OpenModeClientProps {
  game: DbGame;
}

const OpenModeClient = ({ game }: OpenModeClientProps) => {


  return (
    <Card className="max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold text-surface-900 mb-2">
        Open Mode
      </h1>
      <p className="text-surface-500 mb-4">
        We&apos;re still working on this mode.
      </p>
      <p className="text-surface-400 text-sm mb-6">
        The game record exists, but gameplay for Open Mode isn&apos;t implemented yet.
      </p>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </Card>

  );
};

export default OpenModeClient;
