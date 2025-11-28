"use client";

import { Button, Card } from "@/components/ui";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session.data?.user) {
    router.push("/auth/signin");
    return null;
  }

  const user = session.data.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            WordForge
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-surface-600">{user.name}</span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card padding="lg" className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase() || "?"}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-surface-900">{user.name}</h1>
                <p className="text-surface-500">{user.email}</p>
                <p className="text-sm text-surface-400 mt-1">
                  Member since recently
                </p>
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <h2 className="text-xl font-bold text-surface-900 mb-4">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <p className="text-3xl font-bold text-primary-600">0</p>
              <p className="text-sm text-surface-500">Games Played</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-secondary-600">0</p>
              <p className="text-sm text-surface-500">Total Score</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-accent-600">0</p>
              <p className="text-sm text-surface-500">Words Used</p>
            </Card>
            <Card className="text-center">
              <p className="text-3xl font-bold text-warning-600">0</p>
              <p className="text-sm text-surface-500">Best Score</p>
            </Card>
          </div>

          {/* Personal Records */}
          <h2 className="text-xl font-bold text-surface-900 mb-4">Personal Records</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card>
              <p className="text-sm text-surface-500">Longest Word</p>
              <p className="text-lg font-semibold text-surface-900">-</p>
            </Card>
            <Card>
              <p className="text-sm text-surface-500">Most Words in Game</p>
              <p className="text-lg font-semibold text-surface-900">0</p>
            </Card>
            <Card>
              <p className="text-sm text-surface-500">Average WPM</p>
              <p className="text-lg font-semibold text-surface-900">0</p>
            </Card>
            <Card>
              <p className="text-sm text-surface-500">Accuracy</p>
              <p className="text-lg font-semibold text-surface-900">0%</p>
            </Card>
          </div>

          {/* Recent Games */}
          <h2 className="text-xl font-bold text-surface-900 mb-4">Recent Games</h2>
          <Card>
            <div className="text-center py-8 text-surface-500">
              <p>No games played yet</p>
              <Link href="/">
                <Button className="mt-4">Play Your First Game</Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
