# Design QA — Local Authority redesign

Datum: 2026-08-04
Rozsah: celý český i anglický web, homepage, službové podstránky, navigace, poptávkový tok a responzivita

## Vizuální pravda a společné porovnání

- Vybraný desktopový směr: `/Users/claude/.codex/generated_images/019fce1a-70c4-7372-a4d5-c0a4bd209bdc/exec-836c7689-c82b-48e0-88db-63f2048ca517.png`
- Vybraný mobilní směr: `/Users/claude/.codex/generated_images/019fce1a-70c4-7372-a4d5-c0a4bd209bdc/exec-fc22cedb-cbca-46c0-be74-8e304439204b.png`
- Implementace desktop 1440 × 1024 CSS px, DPR 1, výchozí stav: `audits/2026-08-04-local-authority-build/home-desktop-1440x1024.png`
- Implementace mobil 390 × 844 CSS px, DPR 1, výchozí stav: `audits/2026-08-04-local-authority-build/home-mobile-390x844.png`
- Společný desktopový vstup: `audits/2026-08-04-local-authority-build/comparison-desktop.png`
- Společný mobilní vstup: `audits/2026-08-04-local-authority-build/comparison-mobile.png`
- Podstránka desktop: `audits/2026-08-04-local-authority-build/odvoz-suti-desktop-1440x1024.png`
- Podstránka mobil: `audits/2026-08-04-local-authority-build/odvoz-suti-mobile-390x844.png`

Referenční návrh a implementace byly normalizovány na shodnou šířku a výšku viewportu a otevřeny společně v jednom porovnávacím obrazu. Kontrola pokrývá první obrazovku, přechod do výběru služby a samostatnou službovou podstránku. Další výřezy nebyly potřeba: hlavní vizuální rizika byla soustředěná v hero, kontaktní liště a dříve nečitelném proof panelu.

## Vizuální výsledek

- P0: 0
- P1: 0
- P2: 0
- P3: 1 — záměrná odlišnost fotografie; implementace používá skutečné provozní fotografie místo ilustračního obrazu z návrhu.

Zachovaná je stejná kompozice: kompaktní černá hlavička, krémový editorial hero, výrazná černá typografie, oranžové primární CTA, skutečná fotografie techniky, plovoucí kontaktní lišta, task-first výběr služeb a černý blok důvodů. Mobilní implementace používá větší skutečné textové a dotykové rozměry než dlouhý prezentační mock, aby byla čitelná na reálném 390px viewportu.

## Opravy během QA

1. Desktopový nadpis byl upraven ze čtyř na tři řádky a hero dostal pevný rytmus 720 px; kontaktní lišta je ve stejné výšce jako ve vybraném směru.
2. Mobilní kicker byl obnoven, CTA a fotografie byly srovnány s referencí a kontaktní lišta převedena z vysokého stacku do kompaktního třísloupcového bloku.
3. Výběr služeb byl rozšířen na pět úloh, doplněna bourací práce a odstraněny zbytečné mobilní mezititulky před hlavní službou.
4. Tmavá sekce byla zkrácena na tři jasné důvody a převedena do stejného desktopového i mobilního systému.
5. P1 chyba z původního screenshotu — bílý text na bílých proof kartách — byla odstraněna globálně na všech podstránkách zvýšením specificity nového systému.
6. Podstránkové hero přestalo dědit tmavý filtr a modrou ilustrační korbu; používá skutečnou provozní fotografii.
7. Mobilní telefonní CTA bylo obnoveno i na podstránkách, nejen na homepage.

## Funkční a technická kontrola

- Ověřené viewporty: 390 × 844 a 1440 × 1024.
- Ověřené trasy: `/`, `/sluzby.html`, `/cenik.html`, `/kontakt.html`, `/zemni-prace.html`, `/odvoz-suti.html`, `/en/`.
- Ve všech reprezentativních kombinacích se šířka dokumentu rovná šířce viewportu; nebyl nalezen horizontální overflow.
- Načtené Lucide ikony: 0 nevyřešených značek.
- Mobilní menu: otevření, `aria-expanded=true`, zobrazení scrimu, uzamčení scrollu, zavření a návrat do skrytého stavu ověřeny.
- Formulář: telefon, obec, služba, popis a souhlas byly vyplněny bez odeslání; hodnoty se správně propsaly a submit zůstal dostupný.
- FAQ: první dotaz se rozbalil a odpověď byla dostupná.
- Konzole po interakcích: 0 warningů, 0 errorů.
- `node scripts/site-quality-gate.mjs`: 117 HTML souborů, jednotná cache verze `20260804l`, žádné rozbité lokální odkazy ani chybějící základní landmarky.
- `git diff --check`: redesignové soubory bez whitespace chyb; existující trailing whitespace zůstává pouze v uživatelském dokumentu `docs/seo-scorecard.md` mimo rozsah změny.

final result: passed

---

# Design QA — produkční homepage v4, desktop + mobil

Datum: 2026-08-05
Rozsah: skutečná homepage, task-first výběr služby, případová studie, pořadí konverzního toku, dvoukroková poptávka a sticky mobilní akce

## Vizuální pravda, implementace a normalizace

- Primární mobilní zdroj: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-figma-design-recommendations/mobile-redesign-current-inspired-390.png`
- Zaměřený zdroj výběru služby: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-figma-design-recommendations/mobile-redesign-services-390.png`
- Zaměřený zdroj poptávky: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-figma-design-recommendations/mobile-redesign-quote-390.png`
- Desktopový strukturální zdroj: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-figma-design-recommendations/recommended-layout-desktop-mobile.jpg`
- Mobilní implementace hero: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-final-redesign-qa/mobile-390-hero-final.png`
- Mobilní implementace výběru: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-final-redesign-qa/mobile-390-chooser-final.png`
- Mobilní implementace formuláře: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-final-redesign-qa/mobile-390-form-step1-final.png`
- Desktopová implementace hero: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-final-redesign-qa/desktop-1440-hero-final.png`
- Desktopová implementace výběru: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-final-redesign-qa/desktop-1440-chooser-final.png`
- Mobilní společné vstupy: `compare-hero-final.png`, `compare-chooser-final.png`, `compare-form-final.png` ve složce `audits/2026-08-05-final-redesign-qa/`.
- Desktopový společný vstup: `audits/2026-08-05-final-redesign-qa/compare-desktop-final.png`.
- Mobilní zdroj i implementace: 390 × 844 obrazových bodů, 390 × 844 CSS px, DPR 1. Ve společných vstupech byly obě strany rovnoměrně zmenšeny na 360 × 779 bez změny poměru stran.
- Desktopový zdroj i implementace: 1440 × 1024 obrazových bodů, 1440 × 1024 CSS px, DPR 1. Strukturální board a dva skutečné browser rendery jsou ve stejném společném vstupu.
- Stav: zavřené menu; hero nahoře; výběr s jednou aktivní kartou; formulář samostatně v kroku 1 a kroku 2.

## Povinné fidelity oblasti

- Typografie: Inter se stejnými fallbacky jako produkce; zachované těžké display váhy, utažené řádkování, černá hierarchie a oranžový uppercase kicker. Hero má shodné zalomení a velmi podobnou optickou hustotu jako vybraný mobilní směr.
- Rozestupy a layout: 67px mobilní hlavička, minimálně 44px dotykové cíle, 78px task karty, 54px primární CTA a 60px sticky panel. Desktop používá pětisloupcový task grid, mobil jedn sloupec; na obou viewpor­tech je horizontální overflow 0 px.
- Barvy a tokeny: zachované produkční tokeny černá `#0b100d`, oranžová `#ff6500`, žlutá značka a krémový podklad. Aktivní výběr používá oranžový rámeček a měkký oranžový povrch stejně jako návrh.
- Obrazová kvalita: stejné reálné fotografie projektu a vozidla, správný poměr stran a `object-fit: cover`; žádné placeholdery, CSS kresby ani náhradní SVG. Ikony jsou z existující projektové Lucide sady.
- Copy a obsah: hero je věrný vybranému návrhu. Produkční výběr přidává pátou relevantní zakázku „Dovézt materiál“ a formulář zachovává souhlas a volitelnou přílohu, protože jde o reálný lead flow, ne statický mock.

## Porovnávací historie P0/P1/P2

1. První průchod — P1 chování: synchronizace task karty a selectu opakovaně vyvolávala `change` a končila `Maximum call stack size exceeded`. Oprava: `change` se posílá jen při skutečné změně hodnoty. Post-fix čistá relace: 0 warningů, 0 errorů.
2. První průchod — P2 desktop: plovoucí kontaktní karta byla oříznutá hranou hero. Oprava: autoritní hero má `overflow: visible`; finální důkaz `desktop-1440-hero-final.png` ukazuje celou 104px kartu.
3. První průchod — P2 mobil: legacy pravidlo nechávalo sticky CTA v `display: none`. Oprava: finální mobilní cascade obnovuje `display: grid` a zachovává řízení viditelnosti podle `is-past-hero`, `is-in-form-zone` a otevřeného menu. Důkaz `mobile-390-process-pass2.png`.
4. První průchod — P2 fokus: programaticky zaměřený `legend` dostal těsný prohlížečový outline. Oprava: fokus zůstal pro asistivní technologie, ale vizuální outline se odstranil; finální druhý krok je v `mobile-390-form-step2-final.png`.
5. Finální společné vstupy ukazují bez dalších P0/P1/P2 rozdílů shodný hero, stejný vizuální jazyk karet a stejnou dvoukrokovou logiku. Odlišné začlenění formuláře do existující černé kontaktní sekce je záměrná produkční integrace, nikoli vizuální regres.

## Funkční a technická kontrola

- Viewporty: 390 × 844 a 1440 × 1024; horizontální overflow 0 px.
- Mobilní menu: otevření, `aria-expanded=true`, scrim a stav body ověřeny.
- Výběr služby: právě jedna karta má `aria-pressed=true`; hodnota se přenese do `select[name="service"]`.
- Formulář: validace prázdného kroku 1, přechod 1 → 2, návrat 2 → 1, zachování obce, termínu a služby, zobrazení správných tlačítek a skrytí sticky CTA ve form zone.
- Odeslání na Web3Forms nebylo při QA provedeno; zabránilo se externímu testovacímu leadu. Native validace finálního kroku zabránila odeslání bez telefonu, popisu a souhlasu.
- Console po čistém mobilním i desktopovém průchodu: 0 warningů, 0 errorů.
- Browser-rendered důkazy jsou uloženy v `audits/2026-08-05-final-redesign-qa/`.
- `node --check script.js`: passed.
- `node scripts/site-quality-gate.mjs`: passed, 117 HTML souborů, žádné rozbité lokální reference.
- `git diff --check -- index.html styles.css script.js`: passed. Existující trailing whitespace zůstává pouze v uživatelském dokumentu `docs/seo-scorecard.md` mimo rozsah změny.

## Findings

- P0: 0
- P1: 0
- P2: 0
- P3: 1 — produkční chooser má pět konkrétních úloh místo čtyř v mobilním mocku; zvyšuje pokrytí skutečných služeb a zachovává stejný vizuální systém.

final result: passed

---

# Design QA — mobilní návrh inspirovaný současným webem

Datum: 2026-08-05
Rozsah: samostatný mobilní homepage návrh 390 px, první obrazovka, výběr služby, dvoukroková poptávka a sticky CTA

## Vizuální pravda a normalizace

- Zdrojový vizuál: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-figma-design-recommendations/current-home-mobile-top-390.jpg`
- Implementace: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-figma-design-recommendations/mobile-redesign-current-inspired-390.png`
- Společné porovnání: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery/audits/2026-08-05-figma-design-recommendations/mobile-design-qa-comparison.png`
- Viewport a stav: 390 × 844 CSS px, DPR 1, homepage nahoře, zavřené menu, sticky CTA skryté do opuštění hero.
- Zdroj i implementace mají 390 × 844 obrazových bodů; nebylo potřeba přepočítávat hustotu ani ořez.
- Zaměřené kontrolní výřezy: `mobile-redesign-services-390.png` a `mobile-redesign-quote-390.png` ve stejné auditní složce.

## Povinné fidelity oblasti

- Typografie: Inter a systémové fallbacky odpovídají živému webu. Zachována černá výrazná display hierarchie, těžké váhy, krátký line-height a oranžový uppercase kicker.
- Rozestupy a rytmus: hlavička 68 px, ovládací cíle 44 px, hero obraz začíná prakticky ve stejné výšce jako zdroj. Karty služeb mají minimálně 78 px, CTA 54 px a sticky akce 48 px.
- Barvy a tokeny: zachované černá `#0b100d`, oranžová `#ff5b00`, žlutý brand mark a krémový podklad. Kontrast primárních prvků je srovnatelný se zdrojem.
- Obrazové podklady: použity stejné reálné fotografie `hero-real-mobile.webp` a `realizace-kontejner-rodinny-dum-03.webp`; bez placeholderů a bez náhradních kreslených ikon. Ikony načítá existující projektová Lucide sada.
- Copy: hero nadpis, úvodní text, hlavní CTA, telefon a claim odpovídají současnému webu. Další sekce zachovávají osobní první osobu a přímou domluvu.

## Porovnávací historie

1. První průchod: P2 — kicker se zalamoval do dvou řádků a posouval celý první viewport. P2 — sticky panel byl viditelný už nahoře a překrýval přímý kontakt.
2. Opravy: kicker byl zmenšen na 9,5 px, utažen a uzamčen na jeden řádek; sticky CTA se nyní objeví až po opuštění hero. Kontaktní karta byla doplněna o stejný sekundární popis jako živý web.
3. Post-fix důkaz: `mobile-design-qa-comparison.png` ukazuje shodnou kompozici hlavičky, hero, obou CTA, fotografii i přímý kontakt. Nezůstaly žádné P0/P1/P2 rozdíly.

## Funkční a technická kontrola

- Mobilní menu se otevře, nastaví `aria-expanded=true`, odkaz zavře menu a přesune na správnou sekci.
- Výběr služby aktualizuje jediný aktivní stav a `aria-pressed`.
- Poptávka přejde z kroku 1 do kroku 2, přesune focus na telefon a po vyplnění zobrazí potvrzení.
- FAQ se rozbalí a odpověď je viditelná.
- Dokument má 390 px bez horizontálního overflow, 0 nevyřešených ikon a 0 chyb v konzoli.

## Zbývající P3

- Doporučený návrh je záměrně o něco kompaktnější než živý web a dostává výběr služby blíž k prvnímu scrollu; nejde o chybu fidelity, ale o konverzní optimalizaci v rámci stejného designového jazyka.

final result: passed
