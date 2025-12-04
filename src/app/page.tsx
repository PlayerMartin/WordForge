"use client";

import { StartGameForMode } from "@/actions/gameActions";
import { Button, Card } from "@/components/ui";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import GameModeSelector from "@/modules/game/components/game-mode-selector";
import { GameModeId } from "@/modules/game/config/modes";
import HowToPlaySection from "@/components/ui/how-to-play-section";

const Home = () => {
  const router = useRouter();
  const session = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedModeId, setSelectedModeId] = useState<GameModeId>("length");

  const handleStartGame = async () => {
    if (!session.data?.user.id) {
      router.push("/auth/signin");
      return;
    }

    setIsLoading(true);
    try {
      const gameID = await StartGameForMode(
        session.data.user.id,
        selectedModeId,
        "en"
      );

      router.push(`/game/${gameID}`);
    } finally {
      setIsLoading(false);
    }
  };

  // --- render ---

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-600">WordForge</div>
          <div className="flex items-center gap-4">
            {session.data?.user ? (
              <>
                <span className="text-surface-600">
                  {session.data.user.name}
                </span>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-surface-900 mb-6">
            Build Words,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              Chain Victory
            </span>
          </h1>
          <p className="text-xl text-surface-600 mb-8">
            A fast-paced word chain game. Start with a letter, type a word, and
            the last letter becomes the next challenge. Race against time!
          </p>

          {/* CTA area – difference between start vs continue */}
          {session.status === "authenticated" ? (
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={handleStartGame}
                loading={isLoading}
              >
                Start New Game
              </Button>
            </div>
          ) : (
            <Button size="lg" onClick={handleStartGame} loading={isLoading}>
              Start Playing
            </Button>
          )}
        </div>

        {/* Rules Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Game Modes (Left Side) */}
            <div>
              <h2 className="text-2xl font-bold text-surface-900 mb-6">
                Game Modes
              </h2>
              <GameModeSelector
                selectedModeId={selectedModeId}
                onChange={setSelectedModeId}
              />
            </div>

            {/* How to Play (Right Side) */}
            <HowToPlaySection />
          </div>
        </div>

        {/* Languagess */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-6">
            {" "}
            Multiple Languages{" "}
          </h2>
          <div className="flex justify-center gap-4">
            <Card
              padding="sm"
              className="px-6 border-2 border-primary-500 bg-surface-900"
            >
              <span className="text-primary-400 font-bold mr-2">EN</span>
              <span className="font-medium text-white">English</span>
            </Card>
            <Card padding="sm" className="px-6 opacity-50 bg-surface-900">
              <span className="text-primary-400 font-bold mr-2">CZ</span>
              <span className="font-medium text-white">Czech</span>
              <span className="block text-xs text-surface-400">
                Coming soon
              </span>
            </Card>{" "}
            <Card padding="sm" className="px-6 opacity-50 bg-surface-900">
              <span className="text-primary-400 font-bold mr-2">SK</span>
              <span className="font-medium text-white">Slovak</span>
              <span className="block text-xs text-surface-400">
                Coming soon
              </span>
            </Card>
          </div>
        </div>
      </main>
      {/* Foter */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-surface-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-surface-500">
          <div>WordForge - Word Chain Game</div>{" "}
          <div className="flex gap-6">
            <Link
              href="/leaderboard"
              className="hover:text-primary-600 transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className="hover:text-primary-600 transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
