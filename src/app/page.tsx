"use client";

import { StartGameForMode } from "@/actions/gameActions";
import { Button, Card } from "@/components/ui";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import GameModeSelector from "@/modules/game/components/game-mode-selector";
import { GameModeId } from "@/modules/game/config/modes";

const rules = [
  {
    step: 1,
    title: "Get a Letter",
    description: "You'll receive a starting letter to begin your word chain.",
  },
  {
    step: 2,
    title: "Type a Word",
    description: "Enter a valid word that starts with the given letter.",
  },
  {
    step: 3,
    title: "Chain It",
    description: "The last letter of your word becomes the next starting letter!",
  },
];

const floatingLetters = [
  { letter: "A", size: 32, left: 5, top: 10, delay: 0, duration: 2.5 },
  { letter: "B", size: 28, left: 14, top: 27, delay: 0.3, duration: 3.2 },
  { letter: "C", size: 45, left: 23, top: 44, delay: 0.6, duration: 2.8 },
  { letter: "W", size: 35, left: 32, top: 61, delay: 0.9, duration: 3.5 },
  { letter: "O", size: 25, left: 41, top: 18, delay: 1.2, duration: 2.3 },
  { letter: "R", size: 40, left: 50, top: 35, delay: 1.5, duration: 3.0 },
  { letter: "D", size: 30, left: 59, top: 52, delay: 1.8, duration: 2.7 },
  { letter: "F", size: 38, left: 68, top: 69, delay: 2.1, duration: 3.3 },
  { letter: "G", size: 33, left: 77, top: 26, delay: 2.4, duration: 2.9 },
  { letter: "E", size: 42, left: 86, top: 43, delay: 2.7, duration: 3.1 },
];

const Home = () => {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [activeRule, setActiveRule] = useState(0);
  const [selectedModeId, setSelectedModeId] = useState<GameModeId>("length");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRule((prev) => (prev + 1) % rules.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
                  <Button variant="ghost" size="sm">Sign in</Button>
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
            A fast-paced word chain game. Start with a letter, type a word,
            and the last letter becomes the next challenge. Race against time!
          </p>
          <Button size="lg" onClick={handleStartGame} loading={isLoading}>
            Start Playing
          </Button>
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


            {/* Rules Carousel  Right Side */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-surface-900 mb-6">
                How to Play
              </h2>
              <div className="relative flex-1 flex flex-col">
                <Card className="relative overflow-hidden flex-1 bg-surface-900">
                  {/* Floating Letters Bockground */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {floatingLetters.map((item) => (
                      <span
                        key={item.letter}
                        className="absolute text-primary-500/20 font-bold select-none animate-bounce"
                        style={{
                          fontSize: `${item.size}px`,
                          left: `${item.left}%`,
                          top: `${item.top}%`,
                          animationDelay: `${item.delay}s`,
                          animationDuration: `${item.duration}s`,
                        }}
                      >
                        {item.letter}
                      </span>
                    ))}
                  </div>

                  {/* Rule Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 transition-all duration-500">
                      {rules[activeRule].step}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 transition-all duration-500">
                      {rules[activeRule].title}
                    </h3>
                    <p className="text-surface-300 transition-all duration-500">
                      {rules[activeRule].description}
                    </p>
                  </div>
                </Card>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-4">
                  {rules.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveRule(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeRule === index
                          ? "bg-primary-500 w-6"
                          : "bg-surface-300 hover:bg-surface-400"
                      }`}
                      aria-label={`Go to rule ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Languagess */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-6">
            Multiple Languages
          </h2>
          <div className="flex justify-center gap-4">
            <Card padding="sm" className="px-6 border-2 border-primary-500 bg-surface-900">
              <span className="text-primary-400 font-bold mr-2">EN</span>
              <span className="font-medium text-white">English</span>
            </Card>
            <Card padding="sm" className="px-6 opacity-50 bg-surface-900">
              <span className="text-primary-400 font-bold mr-2">CZ</span>
              <span className="font-medium text-white">Czech</span>
              <span className="block text-xs text-surface-400">Coming soon</span>
            </Card>
            <Card padding="sm" className="px-6 opacity-50 bg-surface-900">
              <span className="text-primary-400 font-bold mr-2">SK</span>
              <span className="font-medium text-white">Slovak</span>
              <span className="block text-xs text-surface-400">Coming soon</span>
            </Card>
          </div>
        </div>
      </main>

      {/* Foter */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-surface-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-surface-500">
          <div>WordForge - Word Chain Game</div>
          <div className="flex gap-6">
            <Link href="/leaderboard" className="hover:text-primary-600 transition-colors">
              Leaderboard
            </Link>
            <Link href="/profile" className="hover:text-primary-600 transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
