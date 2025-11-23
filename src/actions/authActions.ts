"use server";

import { CreateUser } from "@/repositories/user-repository";
import { User } from "@/types";
import bcrypt from "bcryptjs";

export const SignUp = async (user: User) => {
  const hash = await bcrypt.hash(user.password, 10);

  return await CreateUser({ ...user, password: hash });
};
