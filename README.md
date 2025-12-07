# WordForge
WordForge je rýchla a znovuhrateľná slovná hra pre web, kde hráč v sóle preteká s časom a skladá platné slová podľa pravidla "posledné písmeno -> prvé písmeno". MVP je sólo slovný futbal s viacerými spôsobmi skórovania, jazykmi a rebríčkami. Potom pridáme ťahové PvP a coop na rovnakom jadre. 

============================================

INŠTALÁCIA BALÍČKOV

============================================

**1. Spustit:**

	    npm install

**2. Doinštalujte voliteľné balíčky podľa potreby**

**3. Po inštalácii:**

- Vytvorte .env súbor

	    TURSO_DATABASE_URL="file:./dev.db"
		TURSO_AUTH_TOKEN=""
		NEXTAUTH_URL="http://localhost:3000/"
		NEXTAUTH_SECRET="nejaky-nahodny-string-min-32-znakov,nejaky-nahodny-string-min-32-znakov"

- Vytvorte db

		npm run db:push
