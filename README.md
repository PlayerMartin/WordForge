# WordForge

Webová slovná hra, kde hráč skladá slová podľa pravidla "posledné písmeno na prvé písmeno" niečo ako slovný futbal.

## Špecifikácia

### Herné módy (sólo)

| Mód | Popis |
|-----|-------|
| **Tempo** | Body za rýchlosť - čím rýchlejšia odpoveď, tým viac bodov |
| **Length** | Body za dĺžku slova - exponenciálne skórovanie (2^dĺžka) |
| **Hidden** | 3 životy, nevidíš použité slová |
| **Challenge** | Slovo musí obsahovať zadané písmeno/reťazec |

### Hlavné funkcie

- Validácia slov cez externé slovníkové API
- Časovač na ťah (10s) a celkovú hru (5min pre tempo)
- Viacjazyčná podpora (EN, CZ)
- Rebríčky podľa módu a jazyka
- Štatistiky hráča

### Autentifikácia

- Email/heslo registrácia
- GitHub OAuth
- JWT session (7 dní)

## Tech stack

| Vrstva | Technológia |
|--------|-------------|
| Framework | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS |
| Databáza | LibSQL (SQLite) + Drizzle ORM |
| Auth | NextAuth.js + bcryptjs |

## Štruktúra projektu

```
/src
├── /actions         Server actions (game, auth, leaderboard, user)
├── /app             Next.js app router
├── /components      UI komponenty
├── /lib             DB schema, auth config, utils
├── /modules         Feature moduly (game, auth, leaderboard, user)
└── /types           TypeScript definície
```

## Inštalácia

```bash
npm install
```

### Konfigurácia (.env)

```env
TURSO_DATABASE_URL="file:./dev.db"
TURSO_AUTH_TOKEN=""
NEXTAUTH_URL="http://localhost:3000/"
NEXTAUTH_SECRET="nejaky-nahodny-string-min-32-znakov"
```

### Databáza

```bash
npm run db:push
```

## Skripty

| Príkaz | Popis |
|--------|-------|
| `npm run dev` | Spustí dev server |
| `npm run build` | Produkčný build |
| `npm run db:push` | Push schémy do DB |
| `npm run db:generate` | Generovanie migrácií |
| `npm run lint` | Lint check |
