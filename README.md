# wordforge

WordForge je rýchla a znovuhrateľná slovná hra pre web, kde hráč v sóle preteká s časom a skladá platné slová podľa pravidla "posledné písmeno -> prvé písmeno". MVP je sólo slovný futbal s viacerými spôsobmi skórovania, jazykmi a rebríčkami. Potom pridáme ťahové PvP a coop na rovnakom jadre.

============================================
INŠTALÁCIA BALÍČKOV
============================================

1. Spustite: npm install
2. Doinštalujte voliteľné balíčky podľa potreby:
   - TanStack Table (pre tabuľky): npm install @tanstack/react-table
   - Uploadthing (pre upload avatars): npm install uploadthing @uploadthing/react
   - Lucide icons (ikony): npm install lucide-react
   - next-pwa (PWA support): npm install next-pwa
3. Po inštalácii:
   - npx prisma generate (vygeneruje Prisma Client)
   - Vytvorte .env súbor (použite .env.example ako šablónu)
