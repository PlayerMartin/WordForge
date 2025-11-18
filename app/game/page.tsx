// ============================================
// GAME PAGE - Hlavná herná stránka
// ============================================
//
// Sem patrí:
// - GameSetup komponenta (ak hra ešte nezačala)
//   - Výber módu: Solo Classic
//   - Výber skórovania: Tempo (+1/slovo) vs Length (floor(len/3))
//   - Výber režimu: Odkrytá (repeated = 0 bodov) vs Skrytá (repeated = -1 život, 3 životy)
//   - Výber jazyka: EN, CZ, SK
//   - Tlačidlo "Začať hru"
//
// - GamePlay komponenta (keď hra beží)
//   - Render <GameBoard /> s celým stavom hry
//
// - GameResults komponenta (po skončení hry)
//   - Finálne skóre, počet slov, najdlhšie slovo
//   - Porovnanie s osobným rekordom
//   - Pozícia na rebríčku
//   - Tlačidlá: "Hrať znova", "Zobraziť rebríček", "Späť na hlavnú"
//
// Client Component - musí mať interaktivitu, state manažment
