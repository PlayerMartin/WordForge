// app/game/[id]/error.tsx
"use client";

import { Button, Card } from "@/components/ui";
import Link from "next/link";

const GameError = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Card className="text-center max-w-md">
      <h1 className="text-xl font-bold text-surface-900 mb-2">Something went wrong</h1>
      <p className="text-surface-500 mb-4">
        We couldn&apos;t load this game.
      </p>
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </Card>
  </div>
);

export default GameError;
