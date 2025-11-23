"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@/types";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export const SignUp = async (user: User) => {
  const hash = await bcrypt.hash(user.password, 10);

  try {
    await prisma.user.create({
      data: { ...user, password: hash },
    });
    return { ok: true };
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
