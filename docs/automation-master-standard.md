# Automation Master Standard

Tento standard plati pro vsechny ne-PPC automatizace webu Kontejnerovka.cz.

## Cil

Automatizace maji dlouhodobe zlepsovat web tak, aby tomu rozumel i majitel bez IT znalosti. Vystup nesmi byt obecny audit. Musi vest k jasnemu rozhodnuti, co se ma udelat jako dalsi nejlepsi krok.

## Povinna pravidla

- Nejdriv over spravny web, workspace, branch a datovy zdroj.
- Vzdy uved absolutni datum analyzovaneho obdobi a cerstvost dat.
- Pokud chybi cerstva data z GSC, GA4, mereni poptavek nebo ekonomika, oznac vystup jako omezeny.
- Oddel fakta, hypotezy a co chybi k jistote.
- Rozlisuj: co bylo skutecne upraveno, co je jen navrh, co musi udelat majitel a co vyzaduje schvaleni.
- Kazde doporuceni musi byt navazane na konkretni URL, dotaz, datovy signal, technickou chybu, konkurencni mezeru nebo konverzni problem.
- Zakazane jsou obecne SEO rady bez opory v datech nebo konkretni strance.
- AI Search je soucast SEO, ne samostatny hack. Pri kazdem SEO rozhodnuti zohledni, jestli web pomaha Googlu a AI systemum pochopit entitu, sluzby, lokality, duveryhodnost a odpovedi na realne otazky zakazniku.
- U AI Search / externi duvery kontroluj hlavne: crawlability, indexaci, snippet eligibility, jasne titulky/H1, odpovedi v obsahu, LocalBusiness/Organization schema, `sameAs`/`hasMap`, NAP konzistenci, Google Business Profile, realne recenze, realne fotky, verejne profily a relevantni prirozene zminky.
- Nepridavej AI-only texty, `llms.txt`, umele zminky, spam katalogy, fake recenze ani schema, ktere neodpovida viditelnemu obsahu. Google AI vysledky vychazeji z bezneho kvalitniho SEO, ne z triku.
- Pred tvrzenim, ze zmena realne pomaha webu, rozlis stav: lokalne upraveno / pushnuto / nasazeno live / zmereno. Lokalni uprava bez nasazeni neni obchodni dopad.
- Maximalne 3 doporuceni. Vzdy oznac presne 1 nejlepsi dalsi krok.
- Pokud automatizace provede zmenu, musi zapsat kontrolu dopadu za 2 az 4 tydny do `docs/owner-action-list.md`.
- Pokud zmena, commit, push, import dat nebo zapis selze, uved to jako nedokonceny krok.

## Provozni rytmus majitele

Majitel bez IT znalosti ma resit jen rozhodnuti, ne technicke detaily.

- Kazdy mesic precti jen master souhrn a majitelskou scorecard.
- U kazdeho webu schval nebo odmitni presne jeden nejlepsi dalsi krok.
- Neres vice nez 3 priority napric vsemi weby najednou.
- Kdyz automatizace oznaci `ceka-na-majitele`, dodej jen pozadovany vstup: cenu, fotku, referenci, obchodni pravidlo nebo schvaleni.
- Technicke ukoly patri AI nebo vyvojari, ne majiteli.

## Schvalovaci pravidla

Automatizace musi jasne rozlisit:

- `hotovo`: zmena uz probehla a je zapsana.
- `navrh`: jen doporuceni, nic se zatim nemenilo.
- `schvalit`: vyzaduje souhlas majitele pred zmenou.
- `ceka-na-majitele`: chybi obchodni vstup.
- `ceka-na-data`: bez dat nejde rozhodnout s dobrou jistotou.
- `zmerit-dopad`: zmena probehla a ceka na kontrolu vysledku.

Bez schvaleni nemen ceny, obchodni sliby, recenze, reference, fotografie, pravni texty ani zasadni strukturu nabidky.

## Kontrola dat

Pred zaverem vzdy uved cerstvost dat.

- Cerstva data: obvykle do 7 dni pro zdravotni kontrolu a do 35 dni pro mesicni scorecard.
- Omezena data: starsi, nekompletni nebo jen rucni export.
- Chybejici data: vystup musi byt oznacen jako omezeny.
- Pro AI Search a lokalni autoritu jsou povinne datove vstupy podle dostupnosti: GSC, GA4/konverze, Google Business Profile metriky, pocet a tematika recenzi, fotky, mapove prokliky, hovory, rezervace/poptavky a seznam verejnych profilu nebo zminek.
- Pokud chybi GBP metriky, recenze, fotky nebo obchodni data, nesmis tvrdit, ze web ziskava lokalni autoritu. Muzes jen rict, co je technicky pripravene a co musi dodat majitel nebo spravce profilu.

Pokud chybi obchodni data, napr. poptavky, telefonaty, rezervace nebo kvalita zakazek, nesmis tvrdit, ze zmena realne vydelava. Muzes tvrdit jen zlepseni viditelnosti, techniky nebo pravdepodobne sance na konverzi.

## Mereni dopadu

Kazda provedena zmena musi mit kontrolu dopadu.

- Male SEO nebo UX zmeny kontroluj za 2 az 4 tydny.
- Vetsi obsahove a strategicke zmeny kontroluj za 4 az 8 tydnu.
- AI Search / externi duveru kontroluj mesicne pres snapshot hlavnich dotazu, stav GBP, stav recenzi/fotek, konzistenci verejnych profilu a realne poptavky. Rucni AI snapshot je orientacni signal, ne samostatny dukaz rustu.
- U kazde kontroly uved: co se zmenilo, jaka metrika se sleduje, vysledek a dalsi rozhodnuti.

Bez kontroly dopadu se nova podobna zmena nema opakovat donekonecna.

## Povinnost aktualizovat akcni seznam

Kdyz vznikne ukol, navrh nebo provedena zmena, aktualizuj `docs/owner-action-list.md`.

Minimalni format polozky:

| Datum | Stav | Priorita | Typ | URL / oblast | Ukol | Proc | Kdo | Kontrola dopadu |
|---|---|---|---|---|---|---|---|---|

Stavy:

- `hotovo`
- `navrh`
- `ceka-na-majitele`
- `ceka-na-data`
- `schvalit`
- `zmerit-dopad`

## Povinne shrnuti pro majitele

Na konci kazde automatizace pouzij tento format:

1. Stav: `zelena`, `oranzova`, nebo `cervena`
2. Co se realne zmenilo
3. Co jsem skutecne upravil
4. Co je jen navrh
5. Co musi udelat majitel
6. Fakta
7. Hypotezy
8. Co chybi k jistote
9. Doporuceni: maximalne 3 body
10. Nejlepsi dalsi krok: presne 1 akce
11. Duvera v zaver: vysoka / stredni / nizka
