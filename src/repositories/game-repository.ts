import { prisma } from "@/lib/prisma";
import { GameSettings } from "@/types";

export const CreateGame = async (userId: string, settings: GameSettings) => {
  return await prisma.game.create({
    data: {
      ...settings,
      userId: userId,
      score: 0,
      wordCount: 0,
      wordsUsed: [],
    },
  });
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

export const FindActiveGame = async (userId: string) => {
  return await prisma.game.findFirst({
    where: {
      userId: userId,
      finishedAt: null,
    },
  });
};
