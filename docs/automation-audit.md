# Kontejnerovka.cz - master audit automatizaci

Datum auditu: 2026-05-27
Web: https://kontejnerovka.cz  
Workspace: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery`

## Verdikt

System automatizaci ma spravny zaklad, ale po master revizi bylo zrejme, ze je zbytecne rozsekany a v jedne casti prilis casty. Pro maly lokalni web je silnejsi jednodussi provozni rytmus, ktery pravidelne prinasi rozhodnuti a mensi realne kroky.

Pri master kontrole ale byly nalezeny tyto mezery:

- ne vsechny automatizace si povinne cetly hlavni `docs/automation-plan.md`,
- denni technicka kontrola byla zbytecna a neprinasela dost nove hodnoty vzhledem k frekvenci,
- chybel samostatny audit mereni konverzi, GA4, Web3Forms, cookie souhlasu a rucni evidence poptavek,
- nektere monitoringove automatizace nemely dost explicitne napsane, ze nesmi menit web,
- u nekterych promptu bylo vhodne zprisnit pravidla proti halucinacim, praci bez dat a zbytecnym SEO zasahum,
- chybel jednoduche popsany system, kam se co zapisuje a jak ma Codex navazovat na historii.

## Provedene master upravy

- Vsechny automatizace maji byt navazane na `docs/automation-plan.md` jako hlavni provozni standard.
- Hodnotici automatizace maji byt striktne bez zasahu do webu.
- Denni technicka kontrola byla zrusena a nahrazena jednodussim mesicnim rytmem.
- Hlavni provozni smycka je ted `master SEO kontrola`, ktera ma vzdy zvolit jednu nejlepsi dalsi akci.
- Vykonna zmena webu ma byt oddelena do `mesicniho obsahoveho / SEO tahu`, aby bylo jasne, kdy se jen hodnoti a kdy se meni web.
- Mesicni scorecard a mereni zustavaji jako samostatny majitelsky prehled.
- Byl doplnen API import GSC/GA4 pres oficialni Google API a privatni datova slozka mimo verejny web.
- Vystupy maji byt pro majitele jednoduche: co se stalo, jestli je to problem, co udelat, proc, dopad a jeden nejlepsi dalsi krok.
- Byl dopsan explicitni system, kam se zapisuje rustovy denik, log zmen, backlog prilezitosti a scorecard.
- Byl doplnen centralni mesicni report v `docs/reports/YYYY-MM.md`, aby slo vyhodnocovat automatizace na jednom miste.

## Co system pokryva

| Oblast | Pokryti | Poznamka |
| --- | --- | --- |
| Provozni rytmus | ano | Misto denni kontroly je nastaveny rytmus 4 navstev mesicne plus kvartalni strategicky audit. |
| GSC / SEO vyhodnoceni | ano | Master SEO kontrola ma vzdy vybrat jednu nejlepsi dalsi akci. |
| Obsahovy rust | ano | Mesicni vykonny tah dela jen male bezpecne zmeny na existujicich strankach. |
| Lokalni SEO | ano | Mesicni lokalni duvera hlida i duplicitu, doorway-page riziko a obchodni smysl. |
| Google Business Profile | ano | Mesicni checklist dava konkretni ukoly pro recenze, fotky a prispevky. |
| Konkurence | ano | Konkurencni pohled je soucast master SEO kontroly a kvartalni strategie, ne samostatny sumovy beh. |
| Konverze a mereni | doplneno | Samostatny mesicni audit mereni je potreba pro realne rozhodovani podle dat. |
| Automaticky import dat | doplneno | Skripty `scripts/fetch-google-data.mjs`, `scripts/fetch-gsc.mjs` a `scripts/fetch-ga4.mjs` pripravuji automaticky import po dodani pristupu. |
| Owner-friendly vystup | ano | Scorecard a formaty jsou psane pro cloveka bez SEO/IT znalosti. |
| Centralni reportovani | ano | Kazdy beh ma zapisovat kratky souhrn do `docs/reports/YYYY-MM.md`. |
| Ochrana proti SEO spamu | ano | Stop pravidla, backlog a quality checklist brani zbytecnym strankam a duplicitam. |
| 3/6mesicni strategie | ano | Kvartalni strategicky audit porovnava stav proti baseline. |

## Realne omezeni

Automatizace samy o sobe nezaruci rust, pokud nebudou dostupna data:

- exporty nebo pristup do Google Search Console,
- GA4 konverzni data,
- service account a ciselne GA4 Property ID pro automaticky import,
- rucne doplnene poptavky a zakazky,
- stav Google Business Profile,
- realne fotky a recenze.

Bez techto vstupu muze system delat technicky a obsahovy audit, ale obchodni rust musi oznacit jako neovereny.

## Master hodnoceni po upravach

Po zjednoduseni rytmu, zruseni denniho hlidani a doplneni jasnych zapisovych pravidel je system blizsi tomu, jak by to udelal master pro maly lokalni web. Nejde o maximalni pocet automatu, ale o system, ktery:

- si pamatuje historii,
- nevnucuje zbytecne kontroly,
- vzdy navrhne jednu dalsi rozumnou vec,
- a udrzi poradi mezi fakty, doporucenimi a skutecne provedenymi zmenami.

Prakticky vysledek bude porad zaviset hlavne na tom, jestli budou pravidelne doplnovana data a jestli majitel bude plnit jednoduche ukoly: poptavky, recenze, fotky a schvalovani vetsiho backlogu.
