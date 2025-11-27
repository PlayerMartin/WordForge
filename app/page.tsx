"use client";

import { JoinGame } from "@/actions/gameActions";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// ============================================
// HOMEPAGE - Úvodná stránka aplikácie
// ============================================
//
// Sem patrí:
// - Hero sekcia s názvom "WordForge" a popisom hry
// - Tlačidlá "Hrať hru" (odkaz na /game)
// - Výber jazyka (EN, CZ, SK)
// - Preview herných módov (Solo Classic, Tempo vs Length)
// - Preview rebríčkov (top 3 hráči)
// - Call-to-action pre registráciu/prihlásenie
// - Footer s odkazmi
//
// Server Component - môže načítať top hráčov z DB priamo

const Home = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const onClick = async () => {
    if (!session?.user.id) {
      router.push("/auth/signin");
      return;
    }

    router.push("/game");
  };

  return (
    <>
      {session && session.user ? (
        <p>Signed in as {session.user.name}</p>
      ) : (
        <p>Not signed in</p>
      )}

      {session && session.user ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <>
          <button onClick={() => signIn()}>Sign in</button>
          <button onClick={() => router.push("auth/signup")}>Sign up</button>
        </>
      )}

      <button onClick={onClick}>Start game</button>
    </>
  );
};

export default Home;
