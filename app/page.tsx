"use client";

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

  if (session && session.user) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <button onClick={() => router.push("auth/signup")}>Sign up</button>
    </>
  );
};

export default Home;
