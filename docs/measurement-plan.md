# Kontejnerovka.cz - plan mereni konverzi

Tento plan rika, co se ma merit, proc a jak se ma vysledek cist. Bez mereni nelze poznat, jestli web opravdu prinasi vice poptavek.

## Hlavni konverze

| Konverze | Event / zdroj | Proc je dulezita | Stav |
| --- | --- | --- | --- |
| Kliknuti na telefon | `click_phone`, `generate_lead` | Pro lokalni sluzbu je telefon casto hlavni poptavka. | pripraveno v `script.js`, realna data nelze overit z repozitare |
| Kliknuti na e-mail | `click_email`, `generate_lead` | Cast lidi bude chtit poslat detaily e-mailem. | pripraveno v `script.js`, realna data nelze overit z repozitare |
| Odeslani formulare | `lead_form_submit`, Web3Forms | Hlavni poptavkovy kanal pro naceneni. | pripraveno v `script.js` a `index.html`, realna data nelze overit z repozitare |
| Zahajeni formulare | `form_start` | Ukaze, zda lide zacinaji poptavku, ale nedokonci ji. | pripraveno v `script.js` |
| Kliknuti na CTA | `cta_click` | Pomaha poznat, ktere vyzvy k akci funguji. | pripraveno v `script.js` |
| Navsteva dekovaci stranky | `generate_lead` na `dekujeme.html` | Potvrzeni formularove poptavky, pokud Web3Forms presmeruje. | pripraveno v `script.js` |

## Dulezite stranky pro sledovani

- `/`
- `/cenik.html`
- `/sluzby.html`
- `/lokality.html`
- `/poradna.html`
- `/kontejnery-unhost.html`
- `/kontejnery-nucice.html`
- `/kontejnery-rudna.html`
- `/kontejnery-hostivice.html`
- `/kontejnery-kladno.html`
- `/kontejnery-praha-zapad.html`
- `/odvoz-suti.html`
- `/odvoz-zeminy.html`
- `/odvoz-odpadu.html`
- `/dovoz-recyklatu.html`
- `/dovoz-pisku-sterku.html`

## Co musi majitel doplnovat rucne

Jednou tydne doplnit do `docs/seo-data/kpi-leads-template.csv`:

- kolik bylo telefonatu,
- kolik bylo formularu/e-mailu,
- lokalitu,
- sluzbu,
- jestli vznikla zakazka,
- orientacni hodnotu zakazky.

Bez teto rucni evidence lze hodnotit SEO a konverzni signaly, ale nelze tvrdit, ze konkretni uprava vydelava.

## Automaticky import GSC a GA4

Pro plne automaticke vyhodnocovani je pripraveny API import:

```sh
node scripts/fetch-google-data.mjs
```

Podrobny navod je v `docs/seo-data/google-api-setup.md`.

Dokud neni nastaveny service account a `GA4_PROPERTY_ID`, reporty musi psat `data nejsou dostupna` a nesmi si domyslet kliky, CTR, pozice ani konverze.

Surova GSC/GA4 data a obchodni data se maji ukládat mimo verejny web do privatni slozky:

```sh
/Users/claude/Documents/Claude/kontejnerovka-private-growth/data
```

## Minimalni UTM a kampanove pravidlo

Pokud se spusti reklama nebo se web sdili v kampani, pouzit UTM parametry:

- `utm_source`
- `utm_medium`
- `utm_campaign`

Priklad: `https://kontejnerovka.cz/?utm_source=letak&utm_medium=offline&utm_campaign=jaro-2026`
