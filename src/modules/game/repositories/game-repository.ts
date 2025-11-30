// modules/game/repositories/game-repository.ts
import { db, games } from "@/lib/db";
import { GameSettings } from "@/types";
import { eq, and, isNull, desc  } from "drizzle-orm";
import { LibsqlError } from "@libsql/client";

type FinishGameData = {
  score?: number;
  wordsUsed?: string[];
};

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

export const FinishGame = async (gameId: string, data?: FinishGameData) => {
  try {
    const updates: any = {
      finishedAt: new Date(),
    };

    if (typeof data?.score === "number") {
      updates.score = data.score;
    }

    if (data?.wordsUsed) {
      updates.wordsUsed = data.wordsUsed;
    }

    const result = await db
      .update(games)
      .set(updates)
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

export const ListGamesByUserId = async (userId: string, limit = 10) => {
  const result = await db
    .select()
    .from(games)
    .where(eq(games.userId, userId))
    .orderBy(desc(games.startedAt))
    .limit(limit);

  return result;
};
