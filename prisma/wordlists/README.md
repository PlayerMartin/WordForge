# Wordlists Priečinok

Sem patria slovníky pre validáciu slov v hre.

## Štruktúra súborov:

- `en.txt` - Anglický slovník
- `cz.txt` - Český slovník
- `sk.txt` - Slovenský slovník (voliteľné)
- `vulgar_en.txt` - Zoznam vulgárnych slov v angličtine (voliteľné)
- `vulgar_cz.txt` - Zoznam vulgárnych slov v češtine (voliteľné)

## Formát súborov:

- Každý riadok = jedno slovo
- Lowercase
- Bez diakritiky (alebo s diakritikou podľa jazyka)
- Bez duplicít
- Sorted alphabetically (voliteľné, ale pomôže pri debugovaní)

## Kde nájsť wordlisty:

1. **Anglický slovník:**
   - SCOWL (Spell Checker Oriented Word Lists)
   - https://github.com/dwyl/english-words
   - https://github.com/first20hours/google-10000-english

2. **Český slovník:**
   - https://github.com/wooorm/dictionaries/tree/main/dictionaries/cs
   - http://www.nechybujte.cz/slovnik-soucasne-cestiny
   - IJP (Institut pro jazyk český)

3. **Slovenský slovník:**
   - https://github.com/essential-data/sk-dictionary
   - SASS (Slovenská akadémia vied)

## Implementácia:

Po stiahnutí wordlistov:
1. Umiestniť súbory sem (prisma/wordlists/)
2. Upraviť seed.ts script na načítanie týchto súborov
3. Spustiť `npx prisma db seed` na import do databázy

## Veľkosť:

- Odporúčaná veľkosť: 10 000 - 50 000 slov na jazyk
- Pre MVP: môžete začať s menším slovníkom (5 000 slov)
- Neskoršie rozšíriť na kompletný slovník
