# Kontejnerovka.cz - SEO scorecard

Tento dokument je mesicni prehled pro majitele. Ma byt jednoduchy, srozumitelny a prakticky. Neslouzi jako akademicky SEO report, ale jako odpoved na otazku: roste web a co mame udelat dalsi mesic?

Neni to hlavni provozni log automatizaci. Ten je nove soustredeny v `docs/reports/YYYY-MM.md`, aby se dalo zpetne vyhodnotit, co Codex doporucoval, co se opravdu zmenilo a co se opakovane ukazovalo jako priorita.

## Baseline k 2026-05-26

| Oblast | Stav | Zdroj | Poznamka |
| --- | --- | --- | --- |
| Pocet URL v sitemap | 45 | `sitemap.xml` | Vsechny hlavni sluzby a lokality jsou v sitemape. |
| Stav sitemap v GSC | Uspesne, 45 objevenych stranek | GSC kontrola v prohlizeci 2026-05-26 | V uctu pro automatizace bylo 2026-05-28 zahajeno DNS overeni domeny; ceka se na propagaci TXT zaznamu. |
| Indexace homepage | Indexovana | GSC kontrola v prohlizeci 2026-05-26 | U prioritnich URL bylo pozadano o indexovani. |
| GA4 | Measurement ID `G-BCXFMBWZJ4`, Property ID `538305751` potvrzeno | `script.js`, manualni kontrola v GA4 2026-05-28 | API pristup zatim neni hotovy, ale property je potvrzena. |
| Hlavni konverze | telefon, e-mail, formular, CTA | `script.js`, `index.html` | Udalosti zavisi na souhlasu s analytickymi cookies. |
| Formular | Web3Forms | `index.html` | Odesilani realnych poptavek je potreba prubezne kontrolovat. |
| Google Business Profile | Profil `kontejnerovka.cz` je overeny | Manualni kontrola v GBP 2026-05-28 | Stale chybi zapsat recenze, fotky a kategorie. |
| Recenze | Nelze overit z repozitare | GBP detail zatim nezapsan | Pocet recenzi zatim neni potvrzen v dokumentaci. |
| Realne fotky | Nelze overit z repozitare | GBP detail zatim nezapsan | Nutne doplnovat postupne a overit v GBP i na webu. |
| Rucni evidence poptavek | Neni vyplnena | `docs/seo-data/kpi-leads-template.csv` | Od teto chvile doplnovat tydne. |

## Definice semaforu

- Zelena: web roste nebo je technicky v poradku.
- Oranzova: neni chyba, ale chybi data nebo je potreba neco zlepsit.
- Cervena: problem muze brzdit indexaci, poptavky, duveru nebo mereni.

## Operacni update - 2026-05-28

- GA4 property `538305751` je potvrzena a ma admin pristup.
- Google Business Profile `kontejnerovka.cz` je potvrzeny jako overeny.
- Do WEDOS DNS byl vlozen TXT zaznam pro Search Console overeni domeny.
- Dokud Search Console v tomto uctu neukaze uspesne overeni a nebude vytvoreny service account, zustava automaticke datove vyhodnoceni omezeny.

## Mesicni scorecard - sablona

### Mesic: DOPLNIT

**Stav:** omezeny vystup / 10/10 hotovo  
**Semafor:** zelena / oranzova / cervena

#### Shrnutí pro majitele

DOPLNIT jednoduse 3-5 vetami.

#### Co se zlepsilo

- DOPLNIT

#### Co se zhorsilo nebo brzdi rust

- DOPLNIT

#### Cisla

| Metrika | Aktualne | Minule | Zmena | Zdroj |
| --- | ---: | ---: | ---: | --- |
| Indexovane stranky | nelze overit | - | - | GSC |
| Organicka zobrazeni | nelze overit | - | - | GSC |
| Organicke kliky | nelze overit | - | - | GSC |
| CTR | nelze overit | - | - | GSC |
| Kliknuti na telefon | nelze overit | - | - | GA4 |
| Odeslani formulare | nelze overit | - | - | GA4/Web3Forms |
| Realne poptavky | nedoplneno | - | - | Rucni evidence |
| Realne zakazky | nedoplneno | - | - | Rucni evidence |

#### Co mas tento mesic udelat ty

Maximalne 5 bodu:

- DOPLNIT

#### Nejlepsi dalsi krok

DOPLNIT jednu vetu.
