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

const Home = () => <h1 className="text-3xl">WordForge</h1>;

export default Home;
