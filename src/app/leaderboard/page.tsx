"use client";

import { Button, Card } from "@/components/ui";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type FilterOption = {
  value: string;
  label: string;
};

const scoringModes: FilterOption[] = [
  { value: "length", label: "Length" },
  { value: "tempo", label: "Tempo" },
];

const visibilityModes: FilterOption[] = [
  { value: "open", label: "Open" },
  { value: "hidden", label: "Hidden" },
];

const languages: FilterOption[] = [
  { value: "en", label: "🇬🇧 English"},
  { value: "cz", label: "🇨🇿 Czech"},
  { value: "sk", label: "🇸🇰 Slovak"},
] as const;

type LanguageOption = {
  value: string;
  label: string;
  available: boolean;
};

export default function LeaderboardPage() {
  const session = useSession();
  const [scoring, setScoring] = useState("length");
  const [visibility, setVisibility] = useState("open");
  const [language, setLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            WordForge
          </Link>
          <div className="flex items-center gap-4">
            {session.data?.user ? (
              <>
                <span className="text-surface-600">{session.data.user.name}</span>
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

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-surface-900 mb-8 text-center">
            Leaderboard
          </h1>

          {/* Filterss */}
          <Card className="mb-8">
            <div className="flex flex-wrap gap-6 justify-center">
              {/* Scoring Mde */}
              <div>
                <p className="text-sm text-surface-500 mb-2 text-center">Scoring</p>
                <div className="flex gap-2">
                  {scoringModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setScoring(mode.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        scoring === mode.value
                          ? "bg-primary-500 text-white"
                          : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visibility Mode */}
              <div>
                <p className="text-sm text-surface-500 mb-2 text-center">Mode</p>
                <div className="flex gap-2">
                  {visibilityModes.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setVisibility(mode.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        visibility === mode.value
                          ? "bg-secondary-500 text-white"
                          : "bg-surface-100 text-surface-600 hover:bg-surface-200"
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <p className="text-sm text-surface-500 mb-2 text-center">Language</p>
                <div className="flex gap-2">
                  {(languages as unknown as LanguageOption[]).map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => lang.available && setLanguage(lang.value)}
                      disabled={!lang.available}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        language === lang.value
                          ? "bg-accent-500 text-white"
                          : lang.available
                            ? "bg-surface-100 text-surface-600 hover:bg-surface-200"
                            : "bg-surface-100 text-surface-400 cursor-not-allowed opacity-50"
                      }`}
                      title={!lang.available ? "Coming soon" : undefined}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Leaderboard Table */}
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-surface-200 bg-surface-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-surface-600">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-surface-600">
                      Player
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-surface-600">
                      Score
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-surface-600">
                      Words
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Empty State */}
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="text-surface-500">
                        <p className="font-medium">No entries yet</p>
                        <p className="text-sm">Be the first to set a record!</p>
                        <Link href="/">
                          <Button className="mt-4">Play Now</Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      </main>
    </div>
  );
}
