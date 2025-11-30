import { db, users } from "@/lib/db";
import { User } from "@/types";
import { eq } from "drizzle-orm";
import { LibsqlError } from "@libsql/client";

export const CreateUser = async (user: User) => {
  try {
    await db.insert(users).values({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return { ok: true };
  } catch (error: unknown) {
    if (error instanceof LibsqlError) {
      //unique constraint violation
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
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
  const result = await db
    .select()
    .from(users)
    .where(eq(users.name, name))
    .limit(1);

  return result[0] ?? null;
};
