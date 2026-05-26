# Automaticke napojeni GSC a GA4

Tento navod slouzi k tomu, aby automatizace nemusely cekat na rucni exporty. Po jednorazovem nastaveni budou skripty umet tahat data z Google Search Console a GA4 pres oficialni API.

## Co je potreba od majitele

1. Google Cloud projekt.
2. Zapnute API:
   - Google Search Console API
   - Google Analytics Data API
3. Service account, napriklad `kontejnerovka-analytics-bot`.
4. JSON klic service accountu ulozeny lokalne mimo git.
5. Service account pridany do Search Console property `https://kontejnerovka.cz/`.
6. Service account pridany do GA4 property jako Viewer nebo Analyst.
7. Ciselne GA4 Property ID. Pozor: neni to `G-BCXFMBWZJ4`, ale ciselne ID property.

## Kam ulozit klic

Doporucene misto:

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

```sh
GOOGLE_APPLICATION_CREDENTIALS=.secrets/google-service-account.json \
GA4_PROPERTY_ID=123456789 \
node scripts/fetch-google-data.mjs
```

Volitelne lze upravit cilovou slozku:

```sh
KONTEJNEROVKA_PRIVATE_DATA_DIR=/Users/claude/Documents/Claude/kontejnerovka-private-growth/data \
GOOGLE_APPLICATION_CREDENTIALS=.secrets/google-service-account.json \
GA4_PROPERTY_ID=123456789 \
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

