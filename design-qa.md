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
