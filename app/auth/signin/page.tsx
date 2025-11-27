"use client";

import { AuthInput } from "@/components/auth/auth-input";
import { UserSigninData, userSigninSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);
  const form = useForm<UserSigninData>({
    resolver: zodResolver(userSigninSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const onSubmit = async (data: UserSigninData) => {
    setError(null);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (!res?.error) {
      router.replace("/");
      return;
    }

    switch (res.error) {
      case "user_not_found":
        setError("User does not exist");
        break;
      case "invalid_password":
        setError("Incorrect password");
        break;
      case "provider_account":
        setError("You signed up using a provider, not credentials");
        break;
      default:
        setError("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>

      {error && <p>{error}</p>}

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormProvider {...form}>
          <AuthInput name="name" placeholder="Name" type="text" />
          <AuthInput name="password" placeholder="Password" type="password" />
        </FormProvider>

        <button type="submit">Sign In</button>
      </form>

      {providers &&
        Object.values(providers)
          .filter((p: any) => p.id !== "credentials")
          .map((provider: any) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
    </div>
  );
}
