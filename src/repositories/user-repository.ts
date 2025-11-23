import { prisma } from "@/lib/prisma";
import { User } from "@/types";
import { Prisma } from "@prisma/client";

export const CreateUser = async (user: User) => {
  try {
    return prisma.user.create({
      data: user,
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        if (error.message.includes("name")) {
          return { ok: false, err: "Username taken" };
        }
        if (error.message.includes("email")) {
          return { ok: false, err: "Email already in use." };
        }
      }
    }

    return { ok: false, err: "Error" };
  }
};

export const FindUserByName = async (name: string) => {
  return await prisma.user.findUnique({
    where: { name: name },
  });
};
