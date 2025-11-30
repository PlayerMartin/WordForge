"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SignUp } from "@/actions/authActions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSignupData, userSignupSchema } from "@/types";
import { Button, Card, Input } from "@/components/ui";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignupData>({
    resolver: zodResolver(userSignupSchema),
  });

  const onSubmit = async (data: UserSignupData) => {
    setError(null);
    setIsLoading(true);

    try {
      const res = await SignUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (!res.ok) {
        setError(res.err ?? "Something went wrong. Please try again.");
        return;
      }

      router.push("/auth/signin");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-surface-900 mb-2">
            Create account
          </h1>
          <p className="text-surface-500">
            Join WordForge and start playing
          </p>
        </div>

        <Card padding="lg" className="animate-fade-in">
          {error && (
            <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
              <p className="text-sm text-error-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Username"
              placeholder="Choose a username"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
              error={errors.password?.message}
              {...register("password")}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              error={errors.password2?.message}
              {...register("password2")}
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isLoading}
              className="mt-6"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-surface-500">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </Card>

      </div>
    </div>
  );
}
