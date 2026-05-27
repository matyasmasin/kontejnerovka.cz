# Kontejnerovka.cz - plan automatizaci na 6 mesicu

Tento dokument popisuje automatizace, jejich smysl a pravidla. Cilem neni mnoho vystupu ani caste kontroly pro kontroly samotne. Cilem je neustaly, ale klidny rust webu pomoci nekolika opakovanych kroku, ktere jsou srozumitelne i pro majitele bez IT a SEO znalosti.

## Casovy horizont

- Start: 2026-05-26
- Delka: 6 mesicu
- Mezivyhodnoceni: po 3 mesicich
- Zaverecny strategicky report: po 6 mesicich

## Hlavni rozhodnuti po master revizi

- Denni technicka kontrola je pro tento web zrusena jako zbytecne siroky a malo prinosny format.
- Misto denniho hlidani funguje jednodussi mesicni rytmus, ktery kazdy mesic prinese konkretni doporuceni nebo malou zmenu.
- Hlavni logika je: mene kontrol, vice rozhodnuti a vice navaznosti na historii.
- Kazdy beh ma bud:
  - navrhnout jednu nejlepsi akci,
  - nebo provest jednu malou bezpecnou zmenu na existujici strance,
  - nebo jasne rict, proc se ted nema delat nic a na co se ma pockat.

## Aktivni rytmus rustu

Master pristup pro tento web je 4 navstevy za mesic plus 1x za kvartal. To je dost casto na prubezne zlepsovani, ale ne tak casto, aby system vyrabel sum.

| Automatizace | ID | Frekvence | Ucel | Stav |
| --- | --- | --- | --- | --- |
| Master SEO kontrola | `kontejnerovka-master-seo-kontrola` | 2x za mesic, 13 behu | Podivat se na web, dokumenty a data, navrhnout jednu nejlepsi akci a zapsat ji s kontextem. | aktivni |
| Mesicni obsahovy / SEO tah | `kontejnerovka-obsahovy-seo-tah` | 1x za mesic, 6 behu | Udelat jednu malou bezpecnou upravu na existujici strance, pokud dava smysl podle dat a historie. | aktivni |
| Mesicni lokalni duvera a GBP checklist | `kontejnerovka-mesicni-lokalni-duvera` | 1x za mesic, 6 behu | Dat majiteli jednoduche ukoly pro recenze, fotky, reference a Google Business Profile. | aktivni |
| Mesicni scorecard a mereni | `kontejnerovka-mesicni-scorecard-a-mereni` | 1x za mesic, 6 behu | Jednoduse rict, jestli web roste, co se zmenilo a co udelat dalsi mesic. | aktivni |
| Kvartalni strategicky audit | `kontejnerovka-kvartalni-strategicky-audit` | 2 behy po 3 mesicich | Vyhodnotit 3 a 6 mesicu rustu a navrhnout dalsi obdobi. | aktivni |

## Spolecny standard vystupu

Kazda automatizace musi:

- overit spravny web `https://kontejnerovka.cz`,
- overit spravny workspace,
- pokud vyhodnocuje SEO, mereni nebo konverze, nejdrive zkusit spustit `node scripts/fetch-google-data.mjs`,
- precist posledni relevantni dokumenty,
- precist posledni relevantni zapis ve vlastni pameti automatu, pokud existuje,
- navazat na predchozi doporuceni,
- jasne oddelit fakta, hypotezy a doporuceni,
- oznacit vystup jako omezeny, pokud chybi GSC, GA4 nebo rucni data,
- dat maximalne 3 hlavni doporuceni,
- vybrat jednu nejlepsi dalsi akci,
- zapsat vysledek do urceneho dokumentu,
- zapsat kratky souhrn behu do centralniho mesicniho reportu v `docs/reports/YYYY-MM.md`,
- nehalucinovat recenze, fotky, vysledky ani data.

## Mesicni kalendar a typy behu

- 1. tyden v mesici
  - `master SEO kontrola`
  - cil: zjistit, co je ted nejsilnejsi prilezitost a co nedava smysl delat.
- 2. tyden v mesici
  - `mesicni obsahovy / SEO tah`
  - cil: udelat jednu malou bezpecnou zmenu na existujici strance.
- 3. tyden v mesici
  - `master SEO kontrola`
  - cil: overit navaznost, interne prolinkovani, prioritu lokalit a backlog.
- 4. tyden v mesici
  - `mesicni lokalni duvera a GBP checklist` plus `mesicni scorecard a mereni`
  - cil: dat majiteli jasny seznam ukolu a jednoduche zhodnoceni, jestli web roste.

### 1. Master SEO kontrola

Kazdy tyden ma zodpovedet jen 4 otazky:

1. Co se od minula realne zmenilo?
2. Co je ted nejsilnejsi prilezitost pro rust?
3. Co je jedna vec, kterou ma Codex udelat nebo navrhnout?
4. Kam se to ma zapsat, aby se na to navazalo priste?

Tento beh:

- kontroluje homepage, hlavni sluzby, prioritni lokality a hlavni konverzni cesty,
- porovnava web s `docs/kontejnerovka-rust-webu.md`, `docs/seo-content-log.md`, `docs/seo-opportunities.md` a `docs/seo-scorecard.md`,
- nesmi vyrabet dlouhy audit bez rozhodnuti,
- musi skoncit jednou nejlepsi dalsi akci.

### 2. Mesicni obsahovy / SEO tah

Tento beh je vykonny, ne jen hodnotici. Ma:

- vybrat jednu existujici stranku s nejvetsim potencialem,
- udelat jednu malou bezpecnou upravu obsahu, interniho prolinkovani, title/meta nebo CTA,
- zapsat zmenu do `docs/seo-content-log.md`,
- zapsat duvod a ocekavani dopadu,
- po zmene udelat quality checklist, commit a push.

Nesmi:

- vytvaret zbytecne nove stranky,
- delat vice velkych zmen najednou,
- opakovat upravu stejne stranky bez noveho duvodu nebo dat.

### 3. Mesicni lokalni duvera a GBP checklist

Tento beh ma byt velmi jednoduchy pro majitele. Ma:

- sepsat konkretni ukoly pro recenze, fotky, reference a GBP,
- navazat na to, co uz bylo minule doporuceno,
- zapsat jen to, co je opravdu potreba udelat tento mesic.

### 4. Mesicni scorecard a mereni

Tento beh ma spojit technicky pohled a obchodni realitu:

- co se zlepsilo,
- co se nezlepsilo,
- co brani rustu,
- co udelat dalsi mesic.

Pokud chybi GSC, GA4 nebo rucni evidence, musi to byt napsane otevrene a bez domysleni.

## Pravidla pro zasahy do webu

- Hodnotici automatizace web nemeni.
- Vykonna automatizace `kontejnerovka-obsahovy-seo-tah` muze provest malou bezpecnou upravu, pokud ma jasny duvod.
- Vetsi zmeny se zapisuji do `docs/seo-opportunities.md` a cekaji na schvaleni.
- Po uprave webu musi probehnout quality checklist, commit a push.

## Kam se co zapisuje

- `docs/reports/YYYY-MM.md`
  - centralni mesicni report pro vsechny automatizace,
  - kazdy beh sem prida kratky zapis: co zjistil, co doporucil, co udelal a co je dalsi krok,
  - je to hlavni misto pro pozdejsi vyhodnoceni, jestli system opravdu pomaha.
- `docs/kontejnerovka-rust-webu.md`
  - hlavni denik rustu,
  - zmena smeru, nove zjisteni, nove priority, mesicni nebo kvartalni shrnuti,
  - ne zapis kazde drobnosti.
- `docs/seo-content-log.md`
  - kazda realna uprava webu nebo obsahu,
  - proc se zmena delala a co ma prinaset.
- `docs/seo-opportunities.md`
  - vetsi napady, ktere se nemaji delat hned,
  - veci cekajici na schvaleni majitele nebo data.
- `docs/seo-scorecard.md`
  - mesicni prehled pro majitele,
  - jednoducha rec: roste to, nebo ne.
- `docs/seo-data/kpi-leads-template.csv`
  - rucni evidence poptavek a zakazek.

## Jak ma vypadat zapis do centralniho reportu

Kazdy beh ma do `docs/reports/YYYY-MM.md` pridat kratky blok:

- datum,
- nazev automatizace,
- stav: `bez zmeny`, `doporuceno`, `upraveno`, `blokovano`,
- co je hlavni zjisteni,
- co je nejlepsi dalsi krok,
- na ktere dokumenty nebo stranky se navazuje.

Smysl je jednoduchy: kdyz se nekdo za 2 nebo 6 mesicu podiva zpet, musi rychle videt posloupnost rozhodnuti, ne jen izolovane logy.

## Doporucovaci logika pro Codex

Master pravidlo je jednoduche: nedavat majiteli mnoho ukolu. Kazdy beh ma skoncit:

- maximalne 3 doporucenimi,
- 1 nejlepsim dalsim krokem,
- jasnym vysvetlenim proc zrovna toto ma nejvetsi smysl ted.

Typy doporuceni:

- `Udelat ted`
  - mala bezpecna zmena s vysokou pravdepodobnosti prinosu.
- `Naplanovat`
  - vetsi navrh, ktery ma smysl, ale potrebuje schvaleni nebo podklady.
- `Pockat na data`
  - vec, kterou by bylo unahlene delat bez GSC, GA4 nebo rucnich poptavek.

## Automaticky import Google dat

API import je pripraveny ve skriptech:

- `scripts/fetch-gsc.mjs`
- `scripts/fetch-ga4.mjs`
- `scripts/fetch-google-data.mjs`

Nastaveni je popsane v `docs/seo-data/google-api-setup.md`. Dokud chybi service account a ciselne GA4 Property ID, automatizace musi oznacit datove vyhodnoceni jako omezene.

Citliva data se neukladaji do verejneho webu. Vychozi privatni slozka je:

`/Users/claude/Documents/Claude/kontejnerovka-private-growth/data`

## Hlavni rizika, kterym se system vyhyba

- SEO spam.
- Doorway pages pro male obce bez realne hodnoty.
- Prilis caste kontroly bez rozhodnuti.
- Opakovane upravy stejne stranky bez dat.
- Hodnoceni uspechu po par dnech.
- Vymyslene recenze nebo nepravdive fotky.
- Spousteni reklam bez mereni konverzi.

## Master audit automatizaci

Detailni kontrola automatizaci je zapsana v `docs/automation-audit.md`. Pokud se automatizace budou menit, musi se audit aktualizovat.

Hotove promptove specifikace pro nastavovani v Codex app jsou v `docs/automation-prompts.md`.
