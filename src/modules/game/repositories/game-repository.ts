// modules/game/repositories/game-repository.ts
import { db, games } from "@/lib/db";
import { GameSettings } from "@/types";
import { eq, and, isNull } from "drizzle-orm";
import { LibsqlError } from "@libsql/client";

export const CreateGame = async (userId: string, settings: GameSettings) => {
  const result = await db
    .insert(games)
    .values({
      userId,
      mode: settings.mode,
      language: settings.language,
      score: 0,
      wordsUsed: [],
    })
    .returning({ id: games.id });

  return result[0].id;
};

export const FinishGame = async (gameId: string) => {
  try {
    const result = await db
      .update(games)
      .set({ finishedAt: new Date() })
      .where(eq(games.id, gameId))
      .returning({ id: games.id });

    if (result.length === 0) {
      return { ok: false, err: "Game not found" };
    }
  } catch (error: unknown) {
    if (error instanceof LibsqlError) {
      return { ok: false, err: "Game not found" };
    }
    throw error;
  }

  return { ok: true };
};

export const FindActiveGameByUserId = async (userId: string) => {
  const result = await db
    .select({ id: games.id })
    .from(games)
    .where(and(eq(games.userId, userId), isNull(games.finishedAt)))
    .limit(1);

  return result[0]?.id ?? null;
};

export const GetGame = async (gameId: string) => {
  const result = await db
    .select()
    .from(games)
    .where(eq(games.id, gameId))
    .limit(1);

  return result[0] ?? null;
};
