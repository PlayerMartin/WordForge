"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUp } from "@/actions/authActions";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignupData, userSignupSchema } from "@/types";
import { AuthInput } from "@/components/auth/auth-input";

export default function SignUpPage() {
  const form = useForm<UserSignupData>({
    resolver: zodResolver(userSignupSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: UserSignupData) => {
    setError(null);
    const res = await SignUp({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (!res.ok) {
      setError(res.err ?? "Error");
      return;
    }
    router.push("/auth/signin");
  };

  return (
    <div>
      <h1>Sign Up</h1>

      {error && <p>{error}</p>}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <AuthInput name="name" placeholder="Name" type="text" />
          <AuthInput name="email" placeholder="Email" type="email" />
          <AuthInput name="password" placeholder="Password" type="password" />
          <AuthInput
            name="password2"
            placeholder="Password Again"
            type="password"
          />
        </FormProvider>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
