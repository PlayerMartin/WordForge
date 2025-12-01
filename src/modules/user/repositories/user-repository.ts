import { db, users } from "@/lib/db";
import { User } from "@/types";
import { DrizzleQueryError, eq } from "drizzle-orm";

export const CreateUser = async (user: User) => {
  try {
    await db.insert(users).values({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof DrizzleQueryError) {
      const msg = error.cause?.message.toLowerCase();
      //unique constraint violation
      if (msg?.startsWith("sqlite_constraint") && msg?.includes("unique")) {
        if (msg.includes("name")) {
          return { ok: false, err: "Username taken" };
        }
        if (msg.includes("email")) {
          return { ok: false, err: "Email already in use." };
        }
      }
    }

    return { ok: false, err: "Error" };
  }
};

export const FindUserByName = async (name: string) => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.name, name))
    .limit(1);

  return result[0] ?? null;
};
