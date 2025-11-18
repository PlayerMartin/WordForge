# WordForge - Štruktúra Projektu

Tento dokument popisuje kompletnú štruktúru projektu WordForge.

## Prehľad Štruktúry

```
wordforge/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (metadata, providers)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Globálne štýly + Tailwind
│   │
│   ├── game/                     # Herná sekcia
│   │   ├── layout.tsx            # Game layout (GameProvider)
│   │   └── page.tsx              # Herná stránka (Setup/Play/Results)
│   │
│   ├── leaderboard/              # Rebríčky
│   │   └── page.tsx              # Leaderboard stránka
│   │
│   ├── profile/                  # Používateľský profil
│   │   └── page.tsx              # Profile stránka
│   │
│   ├── auth/                     # Autentifikácia
│   │   ├── signin/
│   │   │   └── page.tsx          # Prihlásenie
│   │   └── signup/
│   │       └── page.tsx          # Registrácia
│   │
│   └── api/                      # API routes
│       └── auth/
│           └── [...nextauth]/
│               └── route.ts      # NextAuth endpoint
│
├── src/
│   ├── components/               # React komponenty
│   │   ├── game/                 # Herné komponenty
│   │   │   ├── GameBoard.tsx     # Hlavný herný board
│   │   │   ├── GameHeader.tsx    # Header (timery, skóre, životy)
│   │   │   ├── RequiredLetter.tsx # Zobrazenie požadovaného písmena
│   │   │   ├── WordInput.tsx     # Input pre slová
│   │   │   ├── WordList.tsx      # Zoznam zadaných slov
│   │   │   ├── GameFeedback.tsx  # Feedback správy
│   │   │   ├── GameSetup.tsx     # Setup obrazovka
│   │   │   └── GameResults.tsx   # Výsledky hry
│   │   │
│   │   ├── ui/                   # Reusable UI komponenty
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Spinner.tsx
│   │   │
│   │   ├── layout/               # Layout komponenty
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── leaderboard/          # Leaderboard komponenty
│   │   │   ├── LeaderboardTable.tsx
│   │   │   └── LeaderboardFilters.tsx
│   │   │
│   │   └── profile/              # Profile komponenty
│   │       ├── StatsCard.tsx
│   │       └── GameHistoryTable.tsx
│   │
│   ├── lib/                      # Utility knižnice a logika
│   │   ├── prisma.ts             # Prisma Client singleton
│   │   │
│   │   ├── game/                 # Herná logika
│   │   │   ├── wordValidator.ts  # Validácia slov
│   │   │   ├── scoreCalculator.ts # Výpočet skóre
│   │   │   └── gameEngine.ts     # Hlavná game logika
│   │   │
│   │   ├── auth/                 # Auth utils
│   │   │   ├── authOptions.ts    # NextAuth config
│   │   │   └── getSession.ts     # Session helpers
│   │   │
│   │   └── utils/                # Utility funkcie
│   │       ├── cn.ts             # Class name merger
│   │       ├── formatters.ts     # Date/time/number formatting
│   │       └── validators.ts     # Zod schemas
│   │
│   ├── actions/                  # Server Actions
│   │   ├── gameActions.ts        # Game-related actions
│   │   ├── leaderboardActions.ts # Leaderboard actions
│   │   ├── userActions.ts        # User actions
│   │   └── wordActions.ts        # Word dictionary actions
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useGameState.ts       # Herný state hook
│   │   ├── useTimer.ts           # Timer hook
│   │   ├── useLocalStorage.ts    # LocalStorage hook
│   │   └── useDebounce.ts        # Debounce hook
│   │
│   ├── contexts/                 # React Contexts
│   │   └── GameContext.tsx       # Game Context Provider
│   │
│   ├── types/                    # TypeScript typy
│   │   ├── game.ts               # Game typy
│   │   ├── user.ts               # User typy
│   │   ├── leaderboard.ts        # Leaderboard typy
│   │   ├── api.ts                # API typy
│   │   └── index.ts              # Export všetkých typov
│   │
│   └── config/                   # Konfiguračné súbory
│       ├── constants.ts          # Aplikačné konštanty
│       └── siteConfig.ts         # Site metadata
│
├── prisma/                       # Databáza
│   ├── schema.prisma             # Databázová schéma
│   ├── seed.ts                   # Seed script
│   └── wordlists/                # Slovníky
│       ├── README.md             # Inštrukcie pre wordlisty
│       ├── en.txt                # Anglický slovník (pridať)
│       ├── cz.txt                # Český slovník (pridať)
│       └── sk.txt                # Slovenský slovník (pridať)
│
├── public/                       # Statické súbory
│   ├── favicon.ico               # Favicon (vytvoriť)
│   ├── og-image.png              # OpenGraph obrázok (vytvoriť)
│   └── icons/                    # Ikony pre PWA (voliteľné)
│
├── .env.example                  # Príklad env variables
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # NPM dependencies
├── README.md                     # Projektová dokumentácia
└── PROJECT_STRUCTURE.md          # Tento súbor

```


### 1. Inicializácia Projektu
```bash
npm install
```

### 2. Nastavenie Databázy
```bash
# Vytvor .env.local súbor
# Pridaj DATABASE_URL a ostatné premenné

# Push schémy do DB
npx prisma db push

# Otvor Prisma Studio (GUI pre DB)
npx prisma studio
```

### 3. Pridanie Wordlistov
- Stiahni wordlisty (pozri `prisma/wordlists/README.md`)
- Umiestni ich do `prisma/wordlists/`
- Implementuj `prisma/seed.ts`
- Spusti `npm run db:seed`

### 4. Nastavenie Auth
- Získaj GitHub OAuth credentials
- Pridaj do `.env.local`
- Implementuj `src/lib/auth/authOptions.ts`

### 5. Vývoj
```bash
npm run dev
```

### 6. Deployment
```bash
# Push do GitHub
git push

# Deploy na Vercel
# Pridaj environment variables vo Vercel dashboard
# Connect k PostgreSQL databáze (Vercel Postgres alebo Supabase)
```

## Technológie

- **Framework:** Next.js 14 (App Router)
- **Styling:** TailwindCSS
- **Database:** PostgreSQL + Prisma
- **Auth:** NextAuth.js
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel
- **State Management:** React Context + Custom Hooks

## Dokumentácia Referencie

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
