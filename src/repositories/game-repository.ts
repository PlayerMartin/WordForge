import { prisma } from "@/lib/prisma";
import { GameSettings } from "@/types";

export const CreateGame = async (userId: string, settings: GameSettings) => {
  const game = await prisma.game.create({
    data: {
      ...settings,
      userId: userId,
      score: 0,
      wordCount: 0,
      wordsUsed: [],
    },
    select: {
      id: true,
    },
  });
  return game.id;
};

export const FinishGame = async (gameId: string) => {
  try {
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        finishedAt: new Date(),
      },
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return { ok: false, err: "Game not found" };
    } else {
      throw error;
    }
  }

  return { ok: true };
};

export const FindActiveGameByUserId = async (userId: string) => {
  const game = await prisma.game.findFirst({
    where: {
      userId: userId,
      finishedAt: null,
    },
    select: {
      id: true,
    },
  });
  return game?.id ?? null;
};

export const GameExists = async (gameId: string) => {
  return await prisma.game.findFirst({
    where: {
      id: gameId,
    },
  });
};
