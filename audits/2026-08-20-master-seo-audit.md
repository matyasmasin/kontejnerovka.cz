# Master SEO audit — Kontejnerovka.cz

Datum auditu: 2026-08-20
Web: https://kontejnerovka.cz/
GA4 služba: Kontejnerovka.cz, property `538305751`

## Executive verdict

Kontejnerovka.cz už není web s problémem základního SEO. Technický základ, metadata, sitemap, schema, interní odkazy a obsahová šíře jsou nadprůměrné. Google zároveň potvrzuje růst: posledních 28 dní v dostupném GSC exportu přineslo 40 kliků proti 13 v předchozím období, tedy růst o 208 %, a průměrná pozice se zlepšila z 23,4 na 16,5.

Hlavní brzdy jsou dnes jinde:

1. **Google indexuje jen menší část portfolia.** K 2026-08-07 bylo indexováno 28 URL a 36 URL bylo ve stavu „Objeveno – aktuálně neindexováno“. Web má přitom 75 indexovatelných URL.
2. **GA4 neměří obchodní výsledek.** Za posledních 28 dní eviduje 40 návštěv, 342 událostí, ale 0 klíčových událostí. Bez spolehlivého `generate_lead`, telefonu a formuláře nelze SEO řídit podle poptávek.
3. **Mobilní výkon zaostává.** Laboratorní Lighthouse naměřil na homepage výkon 72/100 a LCP 6,7 s. Na dvou hlavních podstránkách byl LCP 5,6–6,0 s.
4. **Mnoho lokálních a servisních stránek je obsahově příliš podobných.** Nejde o penalizaci, ale o slabší důvod pro Google, aby všechny procházel a indexoval.
5. **Chybí veřejná důvěra mimo vlastní web.** Identita provozovatele je dohledatelná, ale veřejné výsledky neukázaly silnou vrstvu recenzí, lokálních katalogů a nezávislých citací odpovídající konkurentům.

### Celkové skóre

| Oblast | Skóre | Stav |
| --- | ---: | --- |
| Technické SEO | 92/100 | Silné |
| Indexace a crawl efektivita | 55/100 | Kritická růstová brzda |
| On-page a informační architektura | 82/100 | Silné, ale s překryvy |
| Obsah a topical authority | 78/100 | Dobré portfolio, potřeba unikátních důkazů |
| Mobilní výkon a UX | 66/100 | Potřeba optimalizace LCP a kontrastu |
| Local SEO a důvěra | 61/100 | Entita ověřitelná, externí důkazy slabé |
| Měření a konverzní SEO | 38/100 | Největší provozní riziko |
| **Celkem** | **69/100** | **Web roste, ale obchodní přínos se neměří a velká část URL není indexována** |

## Použité podklady

- GA4 UI, posledních 28 dní: `2026-07-23` až `2026-08-19`.
- GA4 UI, doplňkové karty za posledních 7 dní.
- GSC export a analýza z `2026-08-10`, data do `2026-08-08`.
- GSC indexace aktualizovaná `2026-08-07`.
- Fresh crawl lokálního zdrojového webu `2026-08-20`.
- Laboratorní Lighthouse `2026-08-20` na lokální kopii stejného HTML, CSS, JS a obrázků.
- Veřejné výsledky vyhledávání a konkurence `2026-08-20`.
- Kontrola repozitáře: větev `main` je shodná s `origin/main`, HEAD `a243ed3`.

Omezení: PageSpeed Insights API nemělo dostupnou kvótu a doména pravděpodobně nemá dostatečný CrUX vzorek. Lighthouse hodnoty jsou laboratorní, ne field Core Web Vitals. Automatický GSC/GA4 API import stále selhává na `invalid_grant`; GA4 data byla proto odečtena přímo z přihlášeného rozhraní.

## 1. GA4: výkon návštěvnosti a měření

### Posledních 28 dní

| Metrika | Hodnota |
| --- | ---: |
| Návštěvy | 40 |
| Aktivní uživatelé | 21 |
| Noví uživatelé | 17 |
| Relace se zapojením | 26 |
| Míra zapojení | 65 % |
| Průměrná doba zapojení / relaci | 1:17 |
| Události | 342 |
| Klíčové události | **0** |

### Kanály

| Kanál | Návštěvy | Podíl | Relace se zapojením | Míra zapojení | Prům. zapojení | Události |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Direct | 27 | 67,5 % | 13 | 48,15 % | 0:31 | 172 |
| Organic Search | 13 | 32,5 % | 13 | **100 %** | **2:51** | 170 |

Organika má při malém vzorku dramaticky lepší kvalitu než direct. Každá organická relace byla zapojená a průměrná doba zapojení byla více než pětkrát delší. To potvrzuje, že SEO přivádí relevantní uživatele; problém není kvalita organiky, ale její objem, indexace a měření poptávek.

### Vstupní stránky — všechny kanály

| Landing page | Návštěvy | Aktivní uživatelé | Noví uživatelé | Prům. zapojení | Klíčové události |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 15 | 6 | 3 | 0:47 | 0 |
| `/cenik.html` | 9 | 7 | 6 | 0:37 | 0 |
| `(not set)` | 6 | 3 | 0 | 0:10 | 0 |
| `/odvoz-suti.html` | 2 | 2 | 2 | 3:53 | 0 |
| `/index.html` | 1 | 1 | 1 | 0:00 | 0 |
| `/kontakt.html` | 1 | 1 | 1 | 0:00 | 0 |
| `/kontejnery-beroun.html` | 1 | 1 | 0 | 14:23 | 0 |
| `/kontejnery-nucice.html` | 1 | 1 | 1 | 1:35 | 0 |
| `/kontejnery-rakovnik.html` | 1 | 1 | 1 | 1:30 | 0 |
| `/lokality.html` | 1 | 1 | 1 | 0:38 | 0 |

`/cenik.html` je druhá nejsilnější landing page, ale nepřenáší uživatele do měřené konverze. `(not set)` tvoří 15 % návštěv, což je při tak malém účtu příliš vysoký podíl. `/index.html` je přístupná varianta homepage; canonical míří správně na `/`, ale serverový 301 na root by data a duplicitu vyčistil lépe.

### Posledních 7 dní

- 10 návštěv: 5 direct a 5 organic.
- Organic zdroje: Google 3 návštěvy, Seznam 2 návštěvy.
- Viditelné události: `page_view` 34, `user_engagement` 30, `session_start` 9, `scroll` 10, `form_start` 7, `calculator_step_change` 2, `analytics_consent_granted` 4.
- Nejsou vidět `click_phone`, `lead_form_submit` ani `generate_lead`.

### Kritické závěry pro měření

1. **Klíčové události nejsou funkčně nastavené nebo k nim nedochází.** `generate_lead`, `lead_form_submit` a `click_phone` musí být ověřeny v DebugView a relevantní události označeny jako klíčové.
2. **GSC není propojeno s GA4.** GA4 samo nabídlo propojení ověřené domain property `sc-domain:kontejnerovka.cz`. Bez něj chybí organic query a Google Organic Search Traffic reporty.
3. **GA4 API OAuth je rozbitý.** Skript `node scripts/fetch-google-data.mjs` znovu skončil na `invalid_grant` u GSC i GA4.
4. **Consent a QA provoz zkreslují data.** GA4 načítá gtag i bez souhlasu v advanced Consent Mode, ale plné analytické uložení povolí jen při souhlasu. Interní testování není spolehlivě odděleno.
5. **Formuláře jdou přes Web3Forms.** Odeslání naviguje pryč na externí endpoint a až potom na děkovací stránku. Událost těsně před navigací je potřeba ověřit na reálném testu; obchodně autoritativní konverzí má být návštěva děkovací stránky / potvrzený lead, ne samotný `form_start`.

## 2. GSC: růst, CTR a indexace

### Posledních 28 dní vs. předchozích 28 dní

| Metrika | Předchozí období | Poslední období | Změna |
| --- | ---: | ---: | ---: |
| Kliky | 13 | 40 | **+207,7 %** |
| Zobrazení | 856 | 1 720 | **+100,9 %** |
| CTR | 1,52 % | 2,33 % | +0,81 p. b. |
| Průměrná pozice | 23,44 | 16,53 | zlepšení o 6,91 |

Web prokazatelně roste. Růst není jen větší počet impresí; současně se zlepšila pozice i CTR.

### Zařízení

| Zařízení | Kliky poslední / předchozí | Imprese poslední / předchozí | CTR poslední / předchozí | Pozice poslední / předchozí |
| --- | --- | --- | --- | --- |
| Mobil | 23 / 8 | 860 / 214 | 2,7 % / 3,7 % | 8,0 / 10,8 |
| Desktop | 15 / 5 | 847 / 641 | 1,8 % / 0,8 % | 25,3 / 27,7 |
| Tablet | 2 / 0 | 13 / 1 | 15,4 % / 0 % | 6,4 / 6,0 |

Mobilní imprese narostly přibližně o 302 %, ale mobilní CTR kleslo z 3,7 % na 2,7 %. To je nejrychlejší příležitost: titulky, description a důkazy ve snippetu mohou získat více kliků bez čekání na nové pozice.

### Indexace

| Stav | Počet URL |
| --- | ---: |
| Indexováno | 28 |
| Objeveno – aktuálně neindexováno | 36 |
| Vyloučeno pomocí noindex | 3 |
| Stránka s přesměrováním | 3 |
| Nenalezeno 404 | 1 |

Největší SEO problém není blokace robotem ani chyba sitemap. Google URL zná, ale u 36 z nich ještě nenašel dostatečný důvod k procházení. V kombinaci s vysokou podobností lokálních šablon a slabším interním link equity je to logický stav.

### Ověřené query příležitosti

| Dotaz | Kliky | Imprese | Pozice | Akce |
| --- | ---: | ---: | ---: | --- |
| kontejner na odpad | 0 | 56 | 5,0 | Vyjasnit jednu cílovou URL, posílit CTR a důkaz služby |
| odvoz suti kladno | 0 | 33 | 10,6 | Posílit `/odvoz-suti-kladno.html`, interní odkazy a lokální důkazy |
| kontejner na zeminu | 0 | 19 | 19,1 | Přesun z 2. na 1. stránku pomocí interních odkazů a case evidence |
| výkopová zemina | 0 | 17 | 16,4 | Propojit zemní práce, výkopy a `/odvoz-zeminy.html` |
| odvoz bioodpadu | 0 | 10 | 7,6 | CTR a konkrétní příklady zahradních zakázek |
| kontejnery rudná | 0 | 10 | 9,1 | Snippet + skutečná lokální realizace |
| likvidace stavební suti | 0 | 9 | 8,7 | Doplnit doklad/legální předání a přesný termín do viditelné copy |
| odvoz suti beroun | 0 | 12 | 16,2 | Posílit služba × lokalita, ne vytvářet další šablonovou URL |

### Ověřené page příležitosti

| URL | Kliky | Imprese | Pozice | Priorita |
| --- | ---: | ---: | ---: | --- |
| `/lokality.html` | 0 | 104 | 6,6 | P0 CTR |
| `/odvoz-zeminy-kladno.html` | 0 | 52 | 9,2 | P0 CTR + interní odkazy |
| `/kontejner-na-zeminu.html` | 0 | 50 | 15,6 | P1 autorita |
| `/vyklizeni-odpad.html` | 0 | 40 | 11,9 | P1 přesun na 1. stránku |
| `/rovnani-terenu.html` | 0 | 32 | 7,5 | P0 CTR + indexační důkazy |
| `/vykop-jezirka.html` | 0 | 26 | 7,4 | P0 CTR + reálná realizace |
| `/vykop-bazenu.html` | 0 | 21 | 7,7 | P0 CTR + reálná realizace |
| `/kontejnery-unhost.html` | 1 | 154 | 7,8 | **Největší okamžitý CTR win** |

## 3. Fresh technický crawl

### Výsledek

| Kontrola | Výsledek |
| --- | ---: |
| HTML soubory | 117 |
| Indexovatelné HTML | 75 |
| URL v sitemap | 75 |
| Indexovatelné URL chybějící v sitemap | 0 |
| Neindexovatelné URL v sitemap | 0 |
| Chybějící title | 0 |
| Duplicitní title | 0 |
| Chybějící description | 0 |
| Duplicitní description | 0 |
| Indexovatelné stránky bez přesně jednoho H1 | 0 |
| Chybějící canonical | 0 |
| Rozbité lokální odkazy | 0 |
| Obrázky bez ALT | 0 |
| JSON-LD bloky | 349 |
| Nevalidní JSON-LD | 0 |
| Indexovatelné stránky pod 350 slov | 0 |

To je velmi silný technický základ. Další plošné přepisování title, canonicalů, FAQ nebo schema nepřinese srovnatelný efekt jako indexace, měření, výkon a důvěra.

### Drobné technické problémy

- Devět title je laboratorně delších než 60 znaků. Není to automatická chyba; zkracovat pouze tam, kde GSC ukazuje slabé CTR.
- `/index.html` zůstává samostatně přístupná a objevuje se v GA4. Canonical je správně `/`, ale vhodnější je serverový 301.
- `site-quality-gate` selhává na 126 nálezech: 63 stránek stále používá starý cache-busting asset version `20260804c` pro CSS i JS. Část českého webu má `20260805b`. Po změně společného CSS/JS tak mohou různé URL servírovat starší cache.
- Automatizovaný `seo-growth-gate` prošel: 10 prioritních index pages, 6 CTR pages, 75 sitemap URL a přítomné conversion eventy v kódu.
- Sitemap `lastmod` je nyní čerstvá: 38 URL má `2026-08-13`, 35 URL `2026-08-05` a 2 URL `2026-08-10`. Starší doporučení „obnovit lastmod“ je splněno.

### Interní odkazy — nejslabší money pages

| URL | Počet interních odkazů |
| --- | ---: |
| `/odvoz-suti-hostivice.html` | 2 |
| `/dovoz-betonu.html` | 3 |
| `/kontejnery-hostoun-dobroviz-stredokluky.html` | 3 |
| `/kontejnery-nizbor-hyskov-zelezna.html` | 3 |
| `/kontejnery-praha-vychod.html` | 3 |
| `/zemni-prace-kladno.html` | 3 |
| `/kontejnery-chynava-podkozi.html` | 4 |
| `/kontejnery-lodenice-morina-srbsko.html` | 4 |
| `/kontejnery-rakovnik.html` | 4 |
| `/odbahneni-rybniku.html` | 4 |

Žádná indexovatelná URL není úplný orphan, ale 2–4 odkazy jsou pro lokální komerční stránku slabý signál. Přidávat odkazy jen na URL, které mají ověřenou GSC impresi nebo jasný obchodní význam.

## 4. Výkon a Core Web Vitals

### Laboratorní Lighthouse

| Stránka / režim | Performance | SEO | Accessibility | Best Practices | FCP | LCP | CLS | TBT | Přenos |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage mobil | 72 | 100 | 96 | 100 | 2,4 s | **6,7 s** | 0 | 0 ms | 1,96 MB |
| Homepage desktop | 93 | 100 | 97 | 100 | 0,4 s | 1,8 s | 0 | 0 ms | 3,25 MB |
| Ceník mobil | 77 | 100 | 96 | 100 | 1,8 s | **6,0 s** | 0 | 50 ms | 0,79 MB |
| Odvoz suti mobil | 76 | 100 | 96 | 100 | 2,4 s | **5,6 s** | 0 | 0 ms | 1,61 MB |

### Největší zdroje problému

- `gtag.js`: přibližně 496 kB v každém testu, načten před uživatelským souhlasem.
- Homepage hero portrait: přibližně 697 kB.
- `/odvoz-suti.html` načítá `truck-crane-extended.jpg`: přibližně 813 kB.
- Společný `styles.css`: přibližně 208 kB; Lighthouse odhaduje 98–154 kB nepoužitých pravidel podle stránky.
- Společný `script.js`: přibližně 60 kB. Odhad nepoužitého JS zahrnuje i část GA knihovny.
- Homepage desktop načítá několik dalších obrázků 285–500 kB a celkem 3,25 MB.
- Render-blocking úspora na mobilu je odhadována přibližně 0,95–1,05 s.

### Přístupnost

Všechny testované stránky selhaly pouze na kontrastu barev:

- oranžové `eyebrow` texty na světlém pozadí mají kontrast okolo 2,78:1;
- mobilní homepage hero má nedostatečný overlay pod bílým H1 a leadem;
- oranžový telefon v tmavém kontakt boxu nesplňuje 4,5:1;
- desktopový oranžový telefon těsně nedosahuje požadovaných 3:1 pro velký text.

### Doporučené technické řešení

1. Převést zbývající velké JPG/WEBP na správně dimenzované AVIF/WEBP varianty a používat `srcset`/`sizes`.
2. Pro mobil posílat skutečně mobilní hero, ideálně pod 180 kB; pro subpage hero pod 250 kB.
3. Rozdělit CSS na critical shell + page bundles nebo alespoň odstranit staré nevyužité redesign bloky.
4. GA4 načíst až po prvním renderu / idle, případně až po souhlasu. Kritické click/form eventy mohou volat loader při první interakci.
5. Přidat explicitní preload jen pro skutečný LCP obrázek konkrétní šablony, ne pro více kandidátů.
6. Sjednotit asset version na nový hash odvozený z obsahu souboru.
7. Opravit hero overlay a oranžové textové odstíny; zachovat oranžovou pro dekoraci, ale pro drobný text použít tmavší odstín.

## 5. Obsah, cannibalizace a architektura

### Co funguje

- Web pokrývá celý komerční funnel: kontejner, odvoz suti/zeminy/odpadu, dovoz materiálů, zemní práce, lokality, povolení i cenu.
- Homepage jasně komunikuje vlastní techniku, přímý kontakt a cenu potvrzenou předem.
- H1, title, description, canonical a schema jsou konzistentní.
- Stránky mají dostatečnou textovou hloubku a formulář nebo jasnou cestu k poptávce.
- Reálné fotografie a jméno provozovatele posilují E-E-A-T.

### Riziko šablonové podobnosti

Cosine podobnost hlavního textu ukázala velmi blízké páry:

| Stránky | Podobnost |
| --- | ---: |
| Praha 5 × Praha 6 | 0,877 |
| Kontejner na suť × Odvoz suti | 0,872 |
| Praha 17 × Praha 6 | 0,857 |
| Králův Dvůr × Zdice | 0,845 |
| Kontejner na beton × Odvoz betonu | 0,843 |
| Nučice × Rudná | 0,820 |
| Kontejner na zeminu × Odvoz zeminy | 0,815 |
| Dovoz recyklátu × Recyklát na příjezdovou cestu | 0,775 |

Nejde o automatický „duplicate content penalty“. Praktický problém je, že Google při omezeném crawl budgetu a nové doméně upřednostní jen několik variant. To odpovídá 36 objeveným, ale neprocházeným URL.

### Pravidlo pro další obsah

Nevytvářet další lokalitní URL, dokud stávající portfolio nepřekročí alespoň 60–70 % indexace a dokud nové URL nemají vlastní:

- reálnou zakázku nebo foto z lokality;
- unikátní příjezdové / dopravní omezení;
- konkrétní obsluhované obce a trasu;
- vlastní reference nebo ověřitelný proof;
- odlišnou komerční potřebu, ne jen jiné jméno města.

### Cannibalizace, kterou je potřeba změřit v GSC

- `kontejner-na-sut.html` vs. `odvoz-suti.html`;
- `kontejner-na-beton.html` vs. `odvoz-betonu.html`;
- `kontejner-na-zeminu.html` vs. `odvoz-zeminy.html`;
- `kontejner-na-stavebni-odpad.html` vs. `odvoz-odpadu.html`;
- lokality hub vs. jednotlivé místní stránky;
- `dovoz-pisku-sterku.html` vs. detailní materiálové URL.

Rozhodnutí dělat až podle query × page exportu. Pokud se dvě URL střídají pro stejný dotaz a žádná neroste, jednu přesměrovat nebo jasně odlišit intent. Bez tohoto důkazu stránky mechanicky nemažte.

## 6. Local SEO, značka a důvěra

### Silné stránky

- Matyáš Mašín, IČO `01379178`, DIČ `CZ9211070033` a adresa jsou na webu konzistentní.
- Subjekt je veřejně dohledatelný v registrech a jeho činnosti zahrnují odpadové hospodářství, přípravu staveniště a silniční dopravu.
- `LocalBusiness`, `sameAs`, `hasMap`, NAP a Google profil jsou ve schema přítomné.
- Web používá vlastní techniku a reálné fotografie, což je pro lokální službu silný diferenciátor.

### Slabiny

- Ve veřejných výsledcích se neukázala silná recenzní stopa značky.
- Nebyl nalezen zřejmý profil Firmy.cz/Mapy.cz pro značku.
- Konkurent Metrák ve výsledku ukazuje 123 Google hodnocení, cenu předem, 3 dny pronájmu zdarma a doklad o ekologické likvidaci.
- Bikramka komunikuje ceny od konkrétní částky, velikosti 3–14 m³ a dlouhou dostupnost dispečinku.
- Kontejnerovka dobře vysvětluje individuální cenu, ale chybí tvrdé veřejné kotvy: velikosti kontejnerů, reálné modelové zakázky, počet realizací, recenze a doklad/legální předání odpadu.

### Prioritní trust backlog

1. Získat a průběžně publikovat autentické Google recenze; neimportovat nebo nevymýšlet hodnocení.
2. Každý měsíc přidat 5–10 vlastních fotografií do Google Business Profile a 1–2 realizace na web.
3. Založit/ověřit Firmy.cz a Mapy.cz profil se stejným NAP.
4. Doplnit na web skutečné velikosti a nosnosti kontejnerů, pokud jsou stabilní.
5. Vysvětlit legální předání, vážení a případný doklad o likvidaci pouze podle reálného procesu firmy.
6. Na ceník přidat 3–5 skutečných modelových příkladů zakázky. Částky dodat majitelem; nevymýšlet je z konkurence.

## 7. Prioritizovaný akční plán

### P0 — 0 až 7 dní

| Úkol | Dopad | Náročnost | Ověření |
| --- | --- | --- | --- |
| Propojit GSC domain property s GA4 | Vysoký | Nízká | V GA4 vzniknou organic queries/traffic reporty |
| Označit `generate_lead` a finální formulářový lead jako key events | Kritický | Nízká | Realtime/DebugView + key event count |
| Otestovat celý Web3Forms flow na CZ i EN a děkovací stránku | Kritický | Střední | Jeden řízený test, eventy a doručený e-mail |
| Obnovit OAuth credential pro readonly API | Vysoký | Střední | `node scripts/fetch-google-data.mjs` projde |
| Sjednotit CSS/JS asset version | Střední | Nízká | `site-quality-gate` projde |
| Opravit mobilní hero kontrast | Vysoký UX | Nízká | Lighthouse accessibility bez contrast failu |

### P1 — 1 až 4 týdny

| Úkol | Dopad | Náročnost | Ověření |
| --- | --- | --- | --- |
| Zmenšit homepage mobilní hero pod 180 kB | Vysoký | Střední | LCP lab pod 3,5 s |
| Nahradit 813kB hero na odvozu suti | Vysoký | Nízká | LCP lab pod 3,5 s |
| Odložit GA4 script za first render/idle | Střední až vysoký | Střední | gtag nekonkuruje LCP, eventy zůstanou funkční |
| Posílit interní odkazy na 8 GSC opportunity pages | Vysoký | Nízká | crawl link count + indexace za 2–4 týdny |
| Vyladit snippet `/kontejnery-unhost.html` | Vysoký | Nízká | CTR nad současných 0,6 % |
| Vyladit snippet `/lokality.html` | Vysoký | Nízká | první kliky při pozici kolem 6–7 |
| Doplnit unikátní proof na výkopy a zemní práce | Vysoký | Střední | růst CTR a indexace dotčených URL |

### P2 — 1 až 3 měsíce

| Úkol | Dopad | Náročnost | Ověření |
| --- | --- | --- | --- |
| Získat první stabilní vrstvu recenzí | Kritický pro local | Průběžná | GBP počet a recency recenzí |
| Založit/ověřit Firmy.cz/Mapy.cz | Střední | Nízká | indexovaný konzistentní profil |
| Doplnit reálné cenové modely a velikosti | Vysoký pro konverzi | Střední | click/lead rate na ceníku |
| Vyhodnotit 36 neindexovaných URL | Vysoký | Střední | ponechat/posílit/konsolidovat podle GSC |
| Konsolidovat prokázanou cannibalizaci | Střední až vysoký | Střední | stabilní query → jedna URL |
| Odděleně vyhodnotit 12 indexovatelných EN URL | Střední | Nízká | EN leads, ne jen imprese |

## 8. Doporučené KPI

### SEO KPI

- GSC kliky, imprese, CTR a pozice — CZ a EN odděleně.
- Podíl indexovaných URL: cíl nejdříve 60 %, následně 70 %+ bez další expanze.
- Počet opportunity URL na pozici 4–15 s CTR pod 2 %.
- Mobilní CTR u hlavních money pages.

### Obchodní KPI

- `click_phone`.
- `click_email`.
- úspěšný `generate_lead` z děkovací stránky.
- formulářové leady podle landing page a channel group.
- ručně potvrzené poptávky, zakázky a tržby v `docs/seo-data/kpi-leads-template.csv`.
- lead-to-job rate a hodnota zakázky podle služby/lokality.

### Technické KPI

- Mobilní LCP lab pod 3,5 s jako první mezikrok, následně pod 2,5 s.
- CLS pod 0,1 — nyní 0, zachovat.
- Lighthouse accessibility bez kontrastních chyb.
- 0 findings v `site-quality-gate`.
- 0 nečekaných 404 v GSC.

## 9. Co teď nedělat

- Nepřidávat další desítky lokalitních stránek.
- Nepřepisovat plošně všechny title a description; technicky jsou unikátní a většina není problém.
- Nepřidávat další FAQ/schema jen kvůli skóre; 349 validních bloků už není konkurenční výhoda.
- Nevymýšlet ceny, recenze, počet zakázek ani doklady.
- Nekupovat balíčky katalogových odkazů nebo nerelevantní backlinks.
- Nemazat URL jen podle textové podobnosti bez GSC query × page důkazu.

## Finální doporučení

Nejvyšší návratnost nepřinese další obsahová expanze. Nejprve je potřeba:

1. **zprovoznit měření leadů a propojit GSC s GA4;**
2. **dostat existující money pages do indexu pomocí interních odkazů a unikátních důkazů;**
3. **zrychlit mobilní LCP a opravit hero kontrast;**
4. **přidat autentické recenze, fotografie, lokální profily a cenové/objemové kotvy.**

Web už organicky roste. Další fáze musí změnit růst impresí na kliky a kliky na měřené poptávky.

## Zdrojové soubory

- `audits/2026-08-10-gsc-growth-plan/gsc-growth-plan-summary.json`
- `audits/2026-08-10-gsc-growth-plan/gsc-periods.csv`
- `audits/2026-08-10-gsc-growth-plan/gsc-query-opportunities.csv`
- `audits/2026-08-10-gsc-growth-plan/gsc-page-opportunities.csv`
- `audits/2026-08-10-gsc-growth-plan/gsc-indexing-summary.csv`
- `audits/2026-08-10-gsc-growth-plan/gsc-devices.csv`
- `audits/2026-08-10-gsc-trend/gsc-trend-summary.json`
- `sitemap.xml`, `robots.txt`, `llms.txt`
- `scripts/site-quality-gate.mjs`, `scripts/seo-growth-gate.mjs`
- GA4 UI pro property `538305751`
