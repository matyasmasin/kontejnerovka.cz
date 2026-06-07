# Automaticke napojeni GSC a GA4

Tento navod slouzi k tomu, aby automatizace nemusely cekat na rucni exporty. Po jednorazovem nastaveni budou skripty umet tahat data z Google Search Console a GA4 pres oficialni API.

## Co je potreba od majitele

1. Google Cloud projekt.
2. Zapnute API:
   - Google Search Console API
   - Google Analytics Data API
3. Google credential ulozeny lokalne mimo git. Muze to byt service account nebo OAuth `authorized_user`.
4. Credential musi mit pristup do Search Console property `https://kontejnerovka.cz/`.
5. Credential musi mit pristup do GA4 property jako Viewer nebo Analyst.
6. Pokud se pouzije OAuth credential, musi mit scopes `webmasters.readonly` a `analytics.readonly`.
7. Ciselne GA4 Property ID. Pro tento web je potvrzene `538305751`. Pozor: neni to `G-BCXFMBWZJ4`, ale ciselne ID property.

## Aktualni lokalni konfigurace

Repozitar ma pripraveny `.env.example` a lokalni ignorovany soubor `.env.local`.
Skripty si `.env.local` nacitaji automaticky, takze pri beznem spusteni neni nutne psat env promenne do prikazu.

Aktualni hodnoty po odblokovani 2026-06-07:

```sh
GOOGLE_APPLICATION_CREDENTIALS=.secrets/google-gsc-ga4-oauth.json
GA4_PROPERTY_ID=538305751
GSC_SITE_URL=https://kontejnerovka.cz/
KONTEJNEROVKA_PRIVATE_DATA_DIR=/Users/claude/Documents/Claude/kontejnerovka-private-growth/data
```

Pred importem spustit:

```sh
node scripts/check-google-config.mjs
```

Tento test overi, jestli je nastavene ciselne GA4 Property ID, jestli existuje JSON credential a jestli ma potrebny typ a scopes.

## Kam ulozit klic

Aktualni funkcni OAuth credential:

```sh
.secrets/google-gsc-ga4-oauth.json
```

Doporucene misto pro pripadny budouci service account:

```sh
.secrets/google-service-account.json
```

Slozka `.secrets/` je v `.gitignore` a nesmi se commitovat.

## Kde budou data

Surova GSC/GA4 data se neukladaji do verejneho webu. Ukladaji se mimo repozitar do privatni slozky:

```sh
/Users/claude/Documents/Claude/kontejnerovka-private-growth/data
```

To je dulezite, protoze GitHub Pages publikuje soubory z weboveho repozitare. Privatni analyticka data, poptavky a obchodni vysledky nemaji byt verejne dostupne.

## Spusteni importu

Po priprave credentialu staci:

```sh
node scripts/fetch-google-data.mjs
```

Jednorazove lze hodnoty prepsat i primo v prikazu:

```sh
GOOGLE_APPLICATION_CREDENTIALS=.secrets/google-gsc-ga4-oauth.json \
GA4_PROPERTY_ID=538305751 \
node scripts/fetch-google-data.mjs
```

Volitelne lze upravit cilovou slozku:

```sh
KONTEJNEROVKA_PRIVATE_DATA_DIR=/Users/claude/Documents/Claude/kontejnerovka-private-growth/data \
GOOGLE_APPLICATION_CREDENTIALS=.secrets/google-gsc-ga4-oauth.json \
GA4_PROPERTY_ID=538305751 \
node scripts/fetch-google-data.mjs
```

## Pridani service accountu do Google sluzeb

Po vytvoreni service account klice otevrit JSON a zkopirovat hodnotu `client_email`.
Tento e-mail musi dostat pristup:

- Google Search Console: property `https://kontejnerovka.cz/`, role alespon Restricted/Viewer podle dostupne volby.
- GA4 Admin: property `538305751`, role Viewer nebo Analyst.

Pokud `node scripts/fetch-google-data.mjs` vrati `403`, lokalni klic je pravdepodobne spravny, ale service account nema pristup do GSC nebo GA4.

## Obnova OAuth credentialu

Pokud OAuth credential prestane fungovat nebo bude potreba znovu udelit scopes, spustit:

```sh
node scripts/create-google-oauth-credential.mjs
```

Skript otevře Google souhlas, ulozi novy credential do `.secrets/google-gsc-ga4-oauth.json` a potom lze znovu spustit:

```sh
node scripts/fetch-google-data.mjs
```

## Co skripty vytvori

Google Search Console:

- `gsc/gsc-queries-last-28-days.csv`
- `gsc/gsc-pages-last-28-days.csv`
- `gsc/gsc-queries-prev-28-days.csv`
- `gsc/gsc-pages-prev-28-days.csv`
- `gsc/latest-gsc-summary.md`

GA4:

- `ga4/ga4-events-last-28-days.csv`
- `ga4/ga4-landing-pages-last-28-days.csv`
- `ga4/ga4-events-prev-28-days.csv`
- `ga4/ga4-landing-pages-prev-28-days.csv`
- `ga4/latest-ga4-summary.md`

## Jak s tim maji pracovat automatizace

Automatizace nejdrive zkusi spustit:

```sh
node scripts/fetch-google-data.mjs
```

Pokud API pristup neni nastaveny, musi napsat `data nejsou dostupna` a nesmi si nic vymyslet.

Pokud data existuji, maji vyhodnocovat:

- GSC dotazy a stranky,
- CTR,
- pozice 4-15,
- GA4 udalosti telefon/e-mail/formular,
- landing pages,
- rucni poptavky z privatni evidence.
