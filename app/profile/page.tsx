// ============================================
// PROFILE PAGE - Používateľský profil a statistiky
// ============================================
//
// Sem patrí:
// - Profilová sekcia:
//   - Avatar (upload/zmena)
//   - Zobrazované meno (editovateľné)
//   - Email (z autentifikácie)
//   - Dátum registrácie
//
// - Štatistiky:
//   - Celkový počet hier
//   - Najviac slov v jednej hre
//   - Najdlhšie slovo
//   - Priemerná dĺžka slova
//   - Slová za minútu (WPM - words per minute)
//   - Presnosť (úspešné vs neúspešné pokusy)
//   - Breakdown podľa jazykov
//
// - História hier (tabuľka alebo zoznam posledných 10-20 hier)
//   - Dátum, Mód, Skóre, Počet slov
//
// - Osobné rekordy pre každú kombináciu módu/jazyka
//
// Server Component - načíta data z DB
// Editovateľné časti budú Client Components s Server Actions
