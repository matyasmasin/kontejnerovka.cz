# Kontejnerovka.cz - master audit automatizaci

Datum auditu: 2026-05-26  
Web: https://kontejnerovka.cz  
Workspace: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery`

## Verdikt

System automatizaci ma spravny zaklad: resi technicky stav, SEO data, obsah, lokalni SEO, Google Business Profile, konkurenci, owner scorecard a 3/6mesicni strategii. To je dobra struktura pro dlouhodoby rust webu.

Pri master kontrole ale byly nalezeny tyto mezery:

- ne vsechny automatizace si povinne cetly hlavni `docs/automation-plan.md`,
- denni technicka kontrola mohla zbytecne vytvaret denni dokumentacni commity i pri stavu bez problemu,
- chybel samostatny audit mereni konverzi, GA4, Web3Forms, cookie souhlasu a rucni evidence poptavek,
- nektere monitoringove automatizace nemely dost explicitne napsane, ze nesmi menit web,
- u nekterych promptu bylo vhodne zprisnit pravidla proti halucinacim, praci bez dat a zbytecnym SEO zasahum.

## Provedene master upravy

- Vsechny automatizace maji byt navazane na `docs/automation-plan.md` jako hlavni provozni standard.
- Monitoringove automatizace maji byt striktne bez zasahu do webu.
- Denni technicka kontrola nema vyrabet zbytecny zapis a commit kazdy den, pokud je vse beze zmeny; zapisuje hlavne P0/P1 problem, zmenu stavu nebo tydenni souhrn.
- Byla doplnena samostatna mesicni automatizace pro mereni a konverze.
- Vystupy maji byt pro majitele jednoduche: co se stalo, jestli je to problem, co udelat, proc, dopad a jeden nejlepsi dalsi krok.

## Co system pokryva

| Oblast | Pokryti | Poznamka |
| --- | --- | --- |
| Technicka stabilita | ano | Denni kontrola dostupnosti, HTTPS, sitemap, robots, odkazu, formularu a schema. |
| GSC / SEO vyhodnoceni | ano | Tydenni kontrola, ale presnost zavisi na exportech nebo pristupu k datum. |
| Obsahovy rust | ano | Dvoutydenni navrhy a ctyrtydenni refresh existujicich stranek. |
| Lokalni SEO | ano | Mesicni lokalni audit hlida i duplicitu a doorway-page riziko. |
| Google Business Profile | ano | Mesicni checklist dava konkretni ukoly pro recenze, fotky a prispevky. |
| Konkurence | ano | Mesicni kontrola hleda mezery, ne kopirovani. |
| Konverze a mereni | doplneno | Samostatny mesicni audit mereni je potreba pro realne rozhodovani podle dat. |
| Owner-friendly vystup | ano | Scorecard a formaty jsou psane pro cloveka bez SEO/IT znalosti. |
| Ochrana proti SEO spamu | ano | Stop pravidla, backlog a quality checklist brani zbytecnym strankam a duplicitam. |
| 3/6mesicni strategie | ano | Kvartalni strategicky audit porovnava stav proti baseline. |

## Realne omezeni

Automatizace samy o sobe nezaruci rust, pokud nebudou dostupna data:

- exporty nebo pristup do Google Search Console,
- GA4 konverzni data,
- rucne doplnene poptavky a zakazky,
- stav Google Business Profile,
- realne fotky a recenze.

Bez techto vstupu muze system delat technicky a obsahovy audit, ale obchodni rust musi oznacit jako neovereny.

## Master hodnoceni po upravach

Po doplneni kontroly mereni a zprisneni pravidel je system navrzeny jako 10/10 provozni ram pro 6mesicni rust webu. Prakticky vysledek bude zaviset hlavne na tom, jestli budou pravidelne doplnovana data a jestli majitel bude plnit jednoduche ukoly: poptavky, recenze, fotky a schvalovani vetsiho backlogu.
