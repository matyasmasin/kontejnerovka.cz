# Owner Action List

Jednoduchy akcni seznam pro majitele. Slouzi k tomu, aby automatizace nevyrabely jen reporty, ale udrzovaly jasny seznam ukolu, navrhu, hotovych zmen a kontrol dopadu.

| Datum | Stav | Priorita | Typ | URL / oblast | Ukol | Proc | Kdo | Kontrola dopadu |
|---|---|---|---|---|---|---|---|---|
| 2026-06-09 | hotovo | stredni | SEO on-page | /kontejnery-unhost.html | Upravit title, H1, meta description a FAQ pro Unhošť a dotaz odvoz suti | GSC za 2026-05-12 az 2026-06-08 ukazuje 18 impresi, 0 kliku a prumernou pozici 8.72; dotaz `odvoz suti unhost` je na pozici 9 a stranka je vhodny near-win | AI | 2026-06-30 zkontrolovat GSC CTR, kliky a pozici URL |
| 2026-06-09 | zmerit-dopad | stredni | SEO kontrola | /kontejnery-unhost.html | Vyhodnotit dopad Unhošť near-win upravy | Overit, jestli se z impresi na prvni strane stavaji kliky a prvni konverzni signaly | AI | 2026-06-30 porovnat GSC a GA4 s obdobim 2026-05-12 az 2026-06-08 |
| 2026-06-07 | ceka-na-data | vysoka | mereni | GSC / GA4 / poptavky | Pri dalsim scorecardu overit, zda jsou dostupna cerstva SEO a konverzni data | Bez dat se neda s jistotou rict, co realne pomaha rustu | AI | Pri pristim mesicnim scorecardu |
| 2026-06-07 | navrh | stredni | provoz | Majitelsky proces | Jednou mesicne schvalit nebo odmitnout presne jeden nejlepsi dalsi krok | Automatizace ma vest k rozhodnuti, ne k hromade reportu | Majitel | Kazdy mesic po master souhrnu |
| 2026-06-07 | hotovo | vysoka | GSC / GA4 | Google data | Nastavit funkcni Google credential pro GSC a GA4 import | OAuth credential `.secrets/google-gsc-ga4-oauth.json` ma GSC i GA4 scope, GA4 Data API bylo zapnuto a `node scripts/fetch-google-data.mjs` prosel | AI + majitel pri OAuth souhlasu | Pri dalsim scorecardu pouzit data z privatni slozky |
