# Owner Action List

Jednoduchy akcni seznam pro majitele. Slouzi k tomu, aby automatizace nevyrabely jen reporty, ale udrzovaly jasny seznam ukolu, navrhu, hotovych zmen a kontrol dopadu.

| Datum | Stav | Priorita | Typ | URL / oblast | Ukol | Proc | Kdo | Kontrola dopadu |
|---|---|---|---|---|---|---|---|---|
| 2026-06-07 | ceka-na-data | vysoka | mereni | GSC / GA4 / poptavky | Pri dalsim scorecardu overit, zda jsou dostupna cerstva SEO a konverzni data | Bez dat se neda s jistotou rict, co realne pomaha rustu | AI | Pri pristim mesicnim scorecardu |
| 2026-06-07 | navrh | stredni | provoz | Majitelsky proces | Jednou mesicne schvalit nebo odmitnout presne jeden nejlepsi dalsi krok | Automatizace ma vest k rozhodnuti, ne k hromade reportu | Majitel | Kazdy mesic po master souhrnu |
| 2026-06-07 | ceka-na-data | vysoka | GSC / GA4 | Google data | Dodat nebo nastavit `.secrets/google-service-account.json`, `GOOGLE_APPLICATION_CREDENTIALS` a `GA4_PROPERTY_ID` | Test `node scripts/fetch-google-data.mjs` nenasel service account a GA4 property ID | AI / spravce pristupu | Po nastaveni znovu spustit `node scripts/fetch-google-data.mjs` |
