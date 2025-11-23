"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  if (!providers) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name} className="mb-2">
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
