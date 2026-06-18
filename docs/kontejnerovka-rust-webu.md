# Kontejnerovka.cz - denik rustu webu

Tento dokument je hlavni denik pro dlouhodoby rust webu Kontejnerovka.cz. Slouzi k tomu, aby bylo po 3 a 6 mesicich jasne, co se na webu delo, co se zlepsilo, co se neprokazalo a co ma majitel udelat jako dalsi krok.

## Pravidla prace

- Web: https://kontejnerovka.cz
- Workspace: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery`
- Hlavni cil: vice relevantnich telefonatu a poptavek na kontejnerovou dopravu, odvoz odpadu a dovoz materialu.
- Prioritni oblast: Svarov u Unhoste, Unhost, Nucice u Rudne, Rudna, Kladensko, Praha-zapad, Hostivice, Beroun, Kladno, Rakovnik, Horovice, Slany, Zdice, Kraluv Dvur a okoli.
- Automatizace musi vzdy rozlisit fakta, hypotezy a doporuceni.
- Pokud chybi data z GSC, GA4 nebo rucni evidence, vystup je omezeny a nesmi tvrdit obchodni vysledek.
- Vetsi zmeny webu se nezavadeji bez zapisu do `docs/seo-opportunities.md` a bez jasneho duvodu.

## Co znamena, ze web roste

SEO rust znamena vice relevantnich organickych zobrazeni a kliku z dotazu, ktere souvisi se sluzbami a lokalitami. Konverzni rust znamena vice kliknuti na telefon, vice odeslanych formularu a vice e-mailovych poptavek. Obchodni rust znamena vice realnych zakazek, coz lze overit jen podle rucni evidence majitele.

Sledujeme hlavne:

- pocet indexovanych stranek,
- organicka zobrazeni,
- organicke kliky,
- CTR,
- dotazy s lokalnim zamerem,
- zobrazeni a kliky na prioritni stranky,
- kliknuti na telefon,
- odeslani formulare,
- realne poptavky,
- realne zakazky, pokud jsou rucne doplnene.

## Baseline - 2026-05-26

### Fakta z repozitare a produkce

- Sitemap v repozitari obsahuje 45 URL.
- `robots.txt` odkazuje na `https://kontejnerovka.cz/sitemap.xml`.
- Produkcni web byl v posledni kontrole dostupny na `https://kontejnerovka.cz`.
- Prioritni produkcni URL po poslednim nasazeni vracely HTTP 200: homepage, `sitemap.xml`, `robots.txt`, `kontejnery-nucice.html`, `kontejnery-unhost.html`, `kontejnery-rudna.html`.
- Homepage, Nucice, Unhost a Rudna byly produkcne overene po nasazeni poslednich lokalnich uprav.
- Google Search Console sitemap byla 2026-05-26 znovu odeslana a ukazovala stav `Uspesne` s 45 objevenymi strankami.
- V Google Search Console bylo 2026-05-26 pozadano o indexovani techto URL: homepage, `kontejnery-nucice.html`, `kontejnery-unhost.html`, `kontejnery-rudna.html`, `lokality.html`, `cenik.html`, `poradna.html`.
- GA4 ID v kodu: `G-BCXFMBWZJ4`.
- Formular pouziva Web3Forms a posila poptavku na `info@kontejnerovka.cz`.
- Web meri nebo pripravuje eventy pro telefon, e-mail, formular, CTA a dekovaci stranku, pokud uzivatel povoli analyticke cookies.

### Co nelze z baseline zatim spolehlive overit

- Realne GSC dotazy, zobrazeni, kliky, CTR a pozice nejsou v repozitari ulozene.
- Realna GA4 data, pocty udalosti a konverze nejsou v repozitari ulozene.
- Stav Google Business Profile nelze overit z repozitare.
- Pocet recenzi, fotek a realnych realizaci nelze overit z repozitare.
- Pocet realnych telefonatu, poptavek a zakazek zatim neni rucne doplnen.

### Prioritni stranky pro sledovani

- Homepage: `https://kontejnerovka.cz/`
- Sluzby: `sluzby.html`
- Cenik: `cenik.html`
- Lokality: `lokality.html`
- Poradna: `poradna.html`
- Reference: `reference.html`
- O nas: `o-nas.html`
- Kontakt/formular: homepage sekce `#kontakt`
- Lokality s nejvyssi obchodni prioritou: `kontejnery-unhost.html`, `kontejnery-nucice.html`, `kontejnery-rudna.html`, `kontejnery-hostivice.html`, `kontejnery-kladno.html`, `kontejnery-praha-zapad.html`
- Sluzby s nejvyssi obchodni prioritou: `pristaveni-kontejneru.html`, `kontejner-na-sut.html`, `odvoz-suti.html`, `odvoz-zeminy.html`, `odvoz-odpadu.html`, `dovoz-recyklatu.html`, `dovoz-pisku-sterku.html`

## Prvni strategicky zapis - 2026-05-26

### Stav

Omezeny baseline je zalozeny. Technicky zaklad webu vypada pripraveny na dalsi mereni, ale obchodni vyhodnoceni zatim nelze delat bez GSC/GA4 exportu a rucni evidence poptavek.

### Shrnutí pro majitele

Web ma pripravenou strukturu, lokality, sitemapu, Google Search Console a zakladni GA4 mereni. Ted je hlavni nenechat web jen "viset", ale pravidelne sledovat, co Google ukazuje, co lide opravdu hledaji a ktere lokality prinaseji poptavky. K tomu slouzi automatizace a dokumenty v tomto adresari.

### Semafor

- Zelena: technicky zaklad webu, sitemap, lokality, GA4 ID v kodu, formular.
- Oranzova: chybi realna data z GSC/GA4 exportu a rucni evidence poptavek.
- Cervena: zatim neni potvrzeny stav Google Business Profile, recenzi a realnych fotek.

### Nejlepsi dalsi krok

Doplnit jednou tydne do `docs/seo-data/kpi-leads-template.csv`, kolik bylo telefonatu/poptavek, odkud byly a jestli z nich vznikla zakazka.

## Strategicky zapis - 2026-05-27 - zmena rytmu automatizaci

### Stav

Strategie automatizaci byla zjednodusena. Denni technicka kontrola byla vyhodnocena jako zbytecna a system je nove postaveny na pravidelnem rustovem rytmu 4x za mesic plus kvartalni revize.

### Shrnutí pro majitele

Pro tento typ webu nema smysl, aby Codex chodil na web kazdy den a hledal technicke drobnosti. Vetsi hodnotu ma, kdyz se nekolikrat za mesic podiva na web, historii zmen a dostupna data a z toho navrhne jednu rozumnou akci nebo udela jednu malou bezpecnou upravu. Tato zmena ma vest k tomu, aby z automatizaci nevznikal sum, ale postupny posun.

### Semafor

- Zelena: zmenou se zjednodusil provozni system a zlepsila se srozumitelnost pro majitele.
- Oranzova: skutecny prinos noveho rytmu se ukaze az po nekolika tydnech.
- Cervena: bez GSC, GA4 a rucni evidence poptavek zustane cast rozhodnuti porad omezena.

### Nejlepsi dalsi krok

Drzet novy rytmus aspon 4-8 tydnu a sledovat, jestli kazdy mesic vznika jasny seznam akci, log zmen a jednoducha scorecard bez zbytecnych kontrol.

### Zapis do dokumentu

Od teto zmeny se ma kratky vystup kazde automatizace zapisovat take do centralniho mesicniho reportu v `docs/reports/YYYY-MM.md`, aby slo po case vyhodnotit, co system doporucoval a co se opravdu menilo.

## Operacni zapis - 2026-05-28 - Google napojeni a lokalni duvera

### Stav

Castecne odblokovano. Google podklady pro automatizace uz nejsou jen predpoklad: GA4 property je potvrzena, Google Business Profile je potvrzeny a Search Console ma pripraveny DNS TXT zaznam, ale overeni domeny se muze jeste propisovat.

### Shrnutí pro majitele

Nejvetsi posun je, ze uz vime, ze `kontejnerovka.cz` ma skutecne GA4 property a overeny Google Business Profile. To znamena, ze lokalni duvera uz neni jen plan na webu. Zbyvajici technicky krok je dokoncit overeni Search Console v tomto uctu a pak pridat service account, aby automatizace mohly tahat GSC a GA4 data bez rucniho exportu.

### Semafor

- Zelena: GA4 property potvrzena, GBP profil potvrzen a overen, DNS TXT pro GSC vlozen do WEDOS.
- Oranzova: Search Console overeni muze cekat na DNS propagaci do 60 minut nebo dele.
- Cervena: bez dokonceneho GSC overeni a bez service accountu zustavaji SEO a mereni stale castecne omezena.

### Co je dobra zprava

- GA4 property ID pro web je potvrzene jako `538305751`.
- Google Business Profile `kontejnerovka.cz` existuje a ma stav `Overeno`.
- DNS pro domenu spravuje WEDOS a TXT zaznam pro Search Console byl pridan bez zasahu do GitHub Pages hostingu.

### Co je problem

- Search Console v tomto uctu zatim neukazuje potvrzene vlastnictvi domeny, jen cekajici DNS overeni.
- Zatim neni vytvoreny ani pridan service account pro API import.
- U GBP stale nejsou v dokumentaci potvrzene recenze, fotky a hlavni kategorie.

### Co se zmenilo od minula

- Drive byl GBP stav `nelze overit`; nyni je potvrzeno, ze profil existuje a je overeny.
- Drive bylo GA4 v dokumentaci jen jako `G-BCXFMBWZJ4` v kodu; nyni je potvrzeno i ciselne property ID `538305751`.
- Search Console uz neni cista neznama: DNS TXT zaznam pro overeni domeny byl vlozen 2026-05-28 do WEDOS.

### Fakta

- GA4 property pro `Kontejnerovka.cz` ma ID `538305751`.
- V GA4 je potvrzeny admin pristup ke sluzbe.
- GBP seznam firem ukazuje profil `kontejnerovka.cz` se stavem `Overeno`.
- Ve WEDOS DNS je pridan TXT zaznam `google-site-verification=...` pro root domeny.

### Hypotezy

- Po propagaci DNS pujde Search Console overit bez dalsiho technickeho zasahu.
- Jakmile bude GSC overena a service account pridan, mesicni scorecard bude umet pracovat s realnymi daty misto odhadu.

### Co chybi k jistote

- Potvrzeni, ze Search Console overeni uz proslo.
- Service account e-mail a JSON klic ulozeny mimo git.
- Stav recenzi, fotek a kategorie v detailu GBP profilu.

### Co doporucuji udelat ted

- Znovu zkusit overeni domeny v Search Console po propagaci DNS.
- Po potvrzeni vytvorit service account a pridat ho do GSC a GA4.
- V GBP zkontrolovat recenze, fotky a hlavni kategorii a zapsat to pri dalsim behu lokalni duvery.

### Co muze pockat

- Mesicni GBP prispevky.
- Slozitejsi rozsireni obsahu podle GSC dat, dokud data nejsou tahana automaticky.

### Co potrebuji od majitele

- Potvrdit, az Search Console ukaze uspesne overeni.
- Dodat nebo schvalit service account pristup pro GSC a GA4.
- Dodat par vlastnich fotek a prvni recenze pro dalsi lokalni trust beh.

### Nejlepsi dalsi krok

Dokoncit Search Console overeni v tomto uctu a hned potom pripravit service account pro GSC a GA4 API.

## Format dalsich zapisu

Kazdy dalsi zapis ma pouzit tuto strukturu:

1. Datum a typ kontroly
2. Stav: `10/10 hotovo` nebo `omezeny vystup`
3. Shrnutí pro majitele
4. Semafor: zelena / oranzova / cervena
5. Co je dobra zprava
6. Co je problem
7. Co se zmenilo od minula
8. Fakta
9. Hypotezy
10. Co chybi k jistote
11. Co doporucuji udelat ted
12. Co muze pockat
13. Co potrebuji od majitele
14. Nejlepsi dalsi krok

## Strategicky zapis - 2026-06-01 - master SEO kontrola bez zmen na webu

### Stav

Omezeny vystup. Technicky a obsahovy zaklad webu vypada konzistentne, ale GSC a GA4 data stale nejdou automaticky stahnout. Nejvetsi viditelna mezera pro dalsi rust uz ted neni v title, canonical nebo formulari, ale v chybejicich realnych dukazech z provozu.

### Shrnutí pro majitele

Web je po technicke strance pripraveny lepe, nez byvalo u podobnych lokalnich webu zvykem: hlavni i prioritni stranky maji title, meta description, canonical, schema, interni prolinkovani, telefon, formular a dekovaci stranku. Soucasne je ale na homepage i v sekci realizaci otevrene videt, ze skutecne fotky a reference se teprve maji doplnit. To je ted nejvetsi brzda duvery a pravdepodobne i dalsiho lokalniho rustu.

### Semafor

- Zelena: hlavni stranky, prioritni lokality, formular, dekovaci stranka a zakladni schema jsou pritomne a konzistentni.
- Oranzova: automaticke GSC a GA4 vyhodnoceni bylo 2026-06-01 blokovane chybejicim service account JSON a `GA4_PROPERTY_ID`; od 2026-06-07 je import odblokovany pres OAuth credential `.secrets/google-gsc-ga4-oauth.json` a `GA4_PROPERTY_ID=538305751`.
- Cervena: web i verejne indexovatelny obsah stale komunikuji, ze realne fotky a dukazy budou doplneny az pozdeji.

### Fakta

- `node scripts/fetch-google-data.mjs` 2026-06-01 selhal: chybi `.secrets/google-service-account.json` a chybi ciselne `GA4_PROPERTY_ID`.
- Homepage ma canonical, LocalBusiness schema, CTA na telefon a formular a sekci vizualni duvery pripravenou na realne fotky.
- Formular na homepage i na `kontakt.html` je funkcni pres Web3Forms, ma 3 kroky, upload fotky a redirect na `dekujeme.html`.
- `script.js` meri `click_phone`, `click_email`, `form_start`, `lead_form_submit`, `cta_click`, kalkulacku a dekovaci stranku.
- Prioritni lokality `kontejnery-unhost.html`, `kontejnery-nucice.html`, `kontejnery-rudna.html`, `kontejnery-hostivice.html`, `kontejnery-kladno.html` a `kontejnery-praha-zapad.html` jsou navazane z homepage, `lokality.html`, `sluzby.html` a `cenik.html`.
- Homepage stale obsahuje texty typu `Fotky techniky, kontejneru a zakazek budeme doplnovat z provozu` a `Prvni priorita po spusteni: doplnovat vlastni fotky auta, kontejneru, nakladky a hotovych zakazek`.
- Stranka `reference.html` je poctive pripravena jako plan duvery, ale zatim jeste nefunguje jako silny dukaz realnych realizaci.

### Hypotezy

- Nejvetsi dalsi rust muze prinest prvni sada realnych fotek a 2-3 kratkych anonymnich mini-realizaci z prioritnich lokalit, protoze to posili duveru navstevnika i lokalni signal pro Google Business Profile.
- Bez GSC a GA4 importu nelze potvrdit, jestli uz nejaka konkretni lokalita nebo sluzba tahne vic nez ostatni.
- Dalsi nove SEO stranky by ted mely mensi prinos nez dukazy, ze sluzba opravdu jezdi v deklarovanych lokalitach.

### Co chybi k jistote

- Realna GSC data pro dotazy, kliky a zobrazeni podle stranek a lokalit.
- Realna GA4 data pro telefon, formular a kalkulacku.
- Overitelny stav poctu recenzi v Google Business Profile.
- Potvrzeni, kolik pouzitelnych vlastnich fotek a realizaci ma majitel uz ted k dispozici.

### Co doporucuji udelat ted

- Pripravit prvni balicek 5-10 vlastnich fotek auta, kontejneru, pristaveni a hotove zakazky z okoli Svarova, Unhoste, Nucic, Rudne nebo Kladenska.
- Ke 2-3 fotkam dopsat kratky anonymni kontext: lokalita, typ odpadu nebo materialu a co ovlivnilo cenu nebo pristup.
- Soubzne dokoncit API pristup pro GSC a GA4, aby dalsi master kontrola uz nebyla slepa na data.

### Co muze pockat

- Dalsi nove lokalitni nebo obsahove stranky bez datoveho duvodu.
- Jemne prepisy title a meta na strankach, ktere uz dnes maji zakladni SEO prvky vyresene.

### Co potrebuji od majitele

- 5-10 realnych fotek z provozu, idealne z prioritnich lokalit.
- Informaci, zda lze pouzit anonymni popis 2-3 hotovych zakazek bez adresy a bez osobnich udaju.
- Aktualni Google credential mimo git je pripraveny a overeny; ciselne `GA4_PROPERTY_ID=538305751` je lokalne nastavene.

### Nejlepsi dalsi krok

Misto dalsi SEO stranky ted pripravit prvni sadu realnych fotek a 2-3 kratkych anonymnich realizaci z prioritnich lokalit; to je momentalne nejpravdepodobnejsi dalsi rustovy krok pro duveru i konverze.

## Kvartalni strategicky audit - 2026-06-11

### Stav

Omezeny kvartalni vystup.

- Analyzovane obdobi: 2026-03-11 az 2026-06-11.
- Realne hodnotitelne obdobi webu a commitu: 2026-05-16 az 2026-06-11.
- Cerstvost produkce: live web overen 2026-06-11, homepage vraci HTTP 200 a `Last-Modified: Tue, 09 Jun 2026 13:41:48 GMT`.
- Cerstvost dat: posledni uspesny GSC a GA4 import probehl 2026-06-09 a pokryva 2026-05-12 az 2026-06-08.
- Omezeni dat: opakovany beh `node scripts/fetch-google-data.mjs` 2026-06-11 selhal, `docs/seo-data/kpi-leads-template.csv` je prazdny a chybi cerstve GBP metriky, recenze i fotky.

### Kvartalni verdikt pro majitele

Za prvni kvartal se povedlo dostat web z technickeho zakladu do stavu, kdy uz ma sirsi lokalni a obsahovy zaber a prvni organickou viditelnost. Nepovedlo se ale jeste prevest tento rust do silne duvery a do prokazatelnych poptavek. Nejvetsi brzda uz neni dalsi nova stranka, ale chybejici realne dukazy z provozu a nestabilni cerstvost dat.

### Semafor

- Zelena: web je pushnuty a live, ma 94 URL v sitemap, CZ i EN verze, schema, hreflang, formulare, kalkulacku a jasnou entitu provozovatele.
- Oranzova: prvni GSC a GA4 signal uz existuje, ale je maly a cast GA4 provozu je zjevne QA nebo direct test traffic.
- Cervena: chybi manualni evidence poptavek, potvrzene GBP metriky, skutecne recenze a skutecne fotky; bez toho nelze tvrdit obchodni dopad ani silnou lokalni autoritu.

### Co se realne zmenilo

- Pushnuto a nasazeno live mezi 2026-05-16 a 2026-06-09: hlavni CZ struktura, lokalitni a servisni landing pages, kalkulacka, Web3Forms formular, trust bloky, `o-nas.html`, `reference.html`, `technika.html`, Google profil link, anglicka `/en/` verze, jazykovy prepinac, mobile-first upravy a Unhost near-win uprava.
- Zmereno: GSC page export za 2026-05-12 az 2026-06-08 ukazuje 149 impresi a 5 kliku napric 10 URL; GA4 za stejne obdobi ukazuje 48 sessions, z toho jen 3 organic sessions, 3 `form_start`, 3 `cta_click`, 1 `generate_lead`, 0 `click_phone` a 0 `lead_form_submit`.
- Jen lokalne upraveno v tomto behu: strategicke dokumenty `docs/kontejnerovka-rust-webu.md`, `docs/seo-opportunities.md`, `docs/reports/2026-06.md` a `docs/owner-action-list.md`.

### Co fungovalo

- Technicky zaklad a publikacni rytmus: web je dostupny, roboty a sitemap jsou konzistentni a hlavni zmeny se dostaly live.
- Prvni lokalni viditelnost na existujicich CZ URL: `kontejnery-unhost.html`, `kontejnery-rudna.html`, `kontejnery-nucice.html`, `sluzby.html` a `poradna.html` uz sbiraji imprese kolem prumerne pozice 6 az 9.
- Entita a AI-readiness na webu: homepage, `o-nas.html`, `reference.html` a `technika.html` konzistentne uvadeji provozovatele, telefon, ICO, DIC, `LocalBusiness` schema, `sameAs` a `hasMap`.

### Co nefungovalo nebo se neprokazalo

- Dalsi rust se zatim neoprel o realne dukazy z provozu. `reference.html` i homepage stale spis vysvetluji, proc reference teprve vzniknou, nez aby je skutecne ukazovaly.
- Konverzni signal je slaby a obchodni dopad neprokazany. Bez rucni evidence a pri 0 `click_phone` a 0 `lead_form_submit` nelze tvrdit, ze posledni vlna zmen uz prinasi vice poptavek.
- Cerstvost mereni je krehka. Local config je pripraveny, ale novy import 2026-06-11 selhal, takze scorecard neni zatim spolehlivy provozni zdroj.

### AI a lokalni duvera

Hodnoceni: `castecna`

- Silne: jasna entita, NAP, schema, Google profil v `sameAs` a `hasMap`, lokalni texty, FAQ, reference proces, technicka crawlability.
- Slabe: chybi aktualni GBP metriky, potvrzeny pocet recenzi, potvrzeny pocet fotek, verejne mini-realizace a seznam dalsich verejnych profilu nebo prirozenych zminek.
- Nelze urcit s jistotou: jestli Google Business Profile uz sbira hovory, trasy, mapove prokliky nebo jestli AI odpovedi web skutecne preferuji oproti konkurenci.

### Fakta

- Live homepage 2026-06-11 ukazuje CZ/EN prepinac, CTA na telefon a formulare, Google profil link a aktualni asset cache `styles.css?v=20260609c`.
- Lokalni sitemap vyrostla z baseline 45 URL na 94 URL, hlavne kvuli EN zrcadlu a novym trust / service / locality strankam.
- GSC page-level export za 2026-05-12 az 2026-06-08: homepage 67 impresi / 4 kliky / pozice 13.30; `dovoz-kacirku.html` 15 impresi / 1 klik / pozice 8.93; `kontejnery-unhost.html` 18 impresi / 0 kliku / pozice 8.72; `kontejnery-rudna.html` 12 impresi / 0 kliku / pozice 6.42; `kontejnery-nucice.html` 7 impresi / 0 kliku / pozice 6.29.
- GSC query-level export za stejne obdobi ukazuje jen 16 impresi a 0 kliku; to je v konfliktu s page-level souctem a signal je treba brat jako omezeny.
- GSC sitemap snapshot ulozeny 2026-06-09 hlasi `submitted: 47` a `indexed: 0`, i kdyz jednotlive URL uz sbiraji imprese; stav indexace je potreba znovu rucne overit.
- GA4 last-28 ukazuje 48 sessions a 26 users, ale landing page dataset obsahuje vice QA parametru jako `?audit-mobile=1`, `?browser-check=...` nebo `?qa=...`, takze cast provozu neni obchodni.
- `docs/seo-data/kpi-leads-template.csv` je stale prazdny.

### Hypotezy

- Nejrychlejsi rust v dalsim kvartalu neprijde z dalsiho rozsireni sitemap, ale z prvniho trust balicku: realne fotky, 2-3 mini-realizace a prvni Google recenze.
- Unhost, Rudna a Nucice jsou realisticke near-win lokality, kde muze maly trust signal a dalsi CTR prace prineset prvni organicke kliky.
- EN verze muze do budoucna pomoct expatum, ale v tomto kvartalu jeste nema meritelny dukaz, ze by sama otevirala novou poptavku.

### Co chybi k jistote

- Cerstvy uspesny GSC a GA4 import po 2026-06-09.
- Rucni evidence telefonatu, formularu, e-mailu a zakazek.
- GBP detail: kategorie, recenze, fotky, hovory, prokliky, trasy.
- Potvrzeni, zda jsou k dispozici 5-10 pouzitelnych vlastnich fotek a 2-3 anonymni realizace.

### Konkurencni mezery a rizika kanibalizace

- Nejvetsi konkurencni mezera neni v poctu temat, ale v dukazech. Web ma uz dost sirokou tematickou stopu, ale porad slabsi verejnou duveru nez weby nebo profily, ktere maji skutecne fotky, recenze a provozni historii.
- Riziko kanibalizace je nejvyssi kolem zameru `odvoz zeminy`, `kontejner na zeminu` a lokalnich variant Praha-zapad / Unhost / Rudna / Nucice. Pro dalsi kvartal nema smysl tvorit dalsi podobne URL, dokud se nezmeri vykon stavajicich stranek.
- Dalsi EN nebo lokalitni expanze bez dat by zvysila sitemapu, ale ne nutne poptavky.

### Co zastavit

- Zastavit dalsi tvorbu novych lokalitnich, EN a servisnich stranek bez datoveho duvodu.
- Zastavit hodnoceni uspechu podle poctu URL nebo podle samotne pripravenosti schemat bez recenzi, fotek a lead dat.

### Co posilit

- Posilit realne dukazy z provozu na webu i v GBP.
- Posilit disciplinu mereni: uspesny import, cista GA4 data a rucni lead sheet.
- Posilit optimalizaci pouze na existujicich near-win URL, ne na dalsi obsahovou expanzi.

### Strategicke priority pro dalsi kvartal

1. Publikovat prvni trust balicek z realnych zakazek pro homepage, `reference.html` a Google Business Profile.
2. Stabilizovat mereni a oddelit QA provoz od realnych navstev a leadu.
3. Pracovat jen s existujicimi near-win CZ URL a neotvirat dalsi obsah, dokud se nezmeri dopad.

### Nejlepsi dalsi krok

Do 2026-06-30 pripravit a schvalit prvni trust balicek: 5-10 vlastnich fotek, 2-3 anonymni mini-realizace z prioritnich lokalit a prosbu o prvni 3 Google recenze.

## Strategicky zapis - 2026-06-15 - master SEO kontrola po P1 landing pages

### Stav

Omezeny vystup. Produkcni web je technicky v poradku a hlavni konverzni cesta funguje, ale cerstvy GSC/GA4 import 2026-06-15 selhal na `invalid_grant`, Google leady nejsou rucne vyplnene a 6 novych P1 landing pages z 2026-06-15 jeste neni nasazeno live.

### Shrnuti pro majitele

Web dnes nebrzdi rozbita technika ani chybejici formular. Brzdi ho hlavne to, ze stale neukazuje skutecne dukazy z provozu, a ze cerstva data z Googlu nejdou znovu stahnout. Soucasne plati, ze posledni velky SEO tah je zatim jen lokalne upraveny: na live webu je stale 62 URL a nove stranky `odvoz-suti-kladno.html`, `odvoz-suti-praha-zapad.html`, `odvoz-suti-hostivice.html`, `odvoz-zeminy-kladno.html`, `kontejner-na-beton.html` a `zemni-prace-kladno.html` vraceji 2026-06-15 na produkci `404`.

### Semafor

- Zelena: homepage, cenik, kontakt, lokalitni stranky, canonical, schema, robots, sitemap a Web3Forms formular jsou live funkcni.
- Oranzova: pripraveny P1 obsah existuje lokalne a je interlinkovany, ale neni pushnuty ani nasazeny live; bez nasazeni nemuze prinest rust.
- Cervena: AI a lokalni duvera je stale jen castecna a cerstvy import GSC/GA4 je znovu blokovany OAuth tokenem.

### Fakta

- Overeny web: `https://kontejnerovka.cz`, workspace `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery`, branch `main`.
- `node scripts/fetch-google-data.mjs` 2026-06-15 selhal pro GSC i GA4 na `Google OAuth refresh failed: 400 invalid_grant`; lokalni config pritom vypada spravne a ukazuje `GA4_PROPERTY_ID=538305751`.
- Posledni dostupny GSC souhrn je z 2026-06-13 za obdobi 2026-05-16 az 2026-06-12: 22 impresi a 0 kliku v query summary; posledni GA4 souhrn je z 2026-06-09 za obdobi 2026-05-12 az 2026-06-08: `form_start` 3, `cta_click` 3, `generate_lead` 1, `click_phone` 0, `lead_form_submit` 0.
- Live sitemap 2026-06-15 obsahuje 62 URL; lokalni `sitemap.xml` obsahuje 68 URL.
- Produkce 2026-06-15 vraci `404` pro `odvoz-suti-kladno.html`, `odvoz-suti-praha-zapad.html`, `odvoz-suti-hostivice.html`, `odvoz-zeminy-kladno.html`, `kontejner-na-beton.html` a `zemni-prace-kladno.html`.
- Live homepage, `kontejnery-unhost.html`, `cenik.html`, `kontakt.html` a `dekujeme.html` maji title, meta description, canonical, JSON-LD, CTA na telefon a funkcni formular s redirectem na `dekujeme.html`.
- Live `reference.html` a `o-nas.html` jasne potvrzuji entitu a Google profil, ale zaroven otevrene rikaji, ze recenze a vlastni fotky se teprve doplnuji.
- `docs/seo-data/kpi-leads-template.csv` je stale prazdny.

### Hypotezy

- Nejvetsi obchodni brzda na live webu je stale trust, ne dalsi technicke SEO drobnosti.
- Nove P1 landing pages mohou pomoct az po nasazeni, ale pred tim je potreba hlidat kanibalizaci hlavne mezi `kontejnery-kladno.html` vs `odvoz-suti-kladno.html` a `kontejnery-praha-zapad.html` vs `odvoz-suti-praha-zapad.html`, protoze hubove stranky uz dnes nesou velmi podobny intent v title i H1.
- Bez obnoveneho Google importu a bez lead sheetu by bylo unahlene delat dalsi vlnu lokalnich URL nebo tvrdit, ze posledni obsahova expanze uz funguje.

### Co chybi k jistote

- Cerstvy GSC a GA4 import po 2026-06-15.
- Rucni evidence telefonatu, formularu a realnych zakazek.
- GBP detail: recenze, fotky, kategorie, hovory, prokliky a trasy.
- Potvrzeni, zda chce majitel nejdriv dodat trust dukazy, nebo nejdriv schvalit nasazeni pripravenych P1 landing pages.

### AI a lokalni duvera

Hodnoceni: `castecna`

- Silna cast: entita, NAP, schema, `sameAs`, `hasMap`, lokalni FAQ, crawlability a transparentni provozovatel.
- Slaba cast: realne recenze, realne fotky, mini-realizace, verejne dukazy provozu a potvrzene GBP metriky.
- Nelze urcit: jestli Google Business Profile uz prinasi hovory nebo trasy, protoze tento podklad dnes chybi.

### Co doporucuji udelat ted

- Pripravit trust balicek pro homepage, `reference.html` a Google profil: 5-10 vlastnich fotek, 2-3 anonymni mini-realizace a prosbu o prvni 3 Google recenze.
- Obnovit OAuth credential a znovu spustit `node scripts/fetch-google-data.mjs`, aby dalsi rozhodnuti nestala na tyden starych datech.
- S dalsi obsahovou expanzi pockat; u pripravenych P1 landing pages nejdriv rozhodnout, zda budou nasazene az po dekonfliktu hubovych title/H1 proti novym service+local URL.

### Co muze pockat

- Dalsi nove CZ nebo EN stranky mimo aktualni P1 balicek.
- Jemne prepisy canonical, schema nebo formularu; ty dnes nevypadaji jako hlavni brzda.

### Co potrebuji od majitele

- Fotky a souhlas s anonymnimi mini-realizacemi.
- Kratkou informaci, zda byly ziskany nejake Google recenze nebo pouzitelne fotky mimo repo.
- Pripadne novy OAuth souhlas, pokud je potreba znovu autorizovat Google import.

### Nejlepsi dalsi krok

Do 2026-06-30 dodat prvni trust balicek z realne zakazky a publikovat ho na homepage, `reference.html` a Google profilu; to ma dnes vyssi potencial nez dalsi nenazeny obsah a resi nejsilnejsi viditelnou brzdu duvery i konverze.

### Zapis do dokumentu

- Lokalne upraveno v tomto behu: `docs/kontejnerovka-rust-webu.md`, `docs/reports/2026-06.md`, `docs/owner-action-list.md`.
- Pushnuto: ne.
- Nasazeno live: ne.
- Zmereno: jen z poslednich dostupnych souboru `latest-gsc-summary.md` a `latest-ga4-summary.md`; novy import 2026-06-15 selhal.

## Strategicky zapis - 2026-06-18 - konkurencni pruzkum 20 realnych konkurentu

### Stav

Hotovy rozhodovaci podklad. Probehl webovy pruzkum 20 realnych konkurentu nebo srovnatelnych hracu v oblastech Kladno, Unhost, Rudna, Hostivice, Praha-zapad, Beroun, Kraluv Dvur a Slany. Neslo o mereni jejich vykonu, ale o overeni, co opakovane pouzivaji na webu a co zjevne pomaha rozhodnuti zakaznika.

### Shrnuti pro majitele

Konkurence nevyhrava hlavne lepsim designem ani delsim textem. Nejcasteji vyhrava tim, ze rychle a jednoduse odpovi na prakticke otazky pred zavolanim: jak velky kontejner je k dispozici, jaka je aspon orientacni cena, co se do nej muze dat, jestli je v cene doprava nebo pronajem a jestli umi vystavit potvrzeni o likvidaci odpadu. Nase nejvetsi mezera proti teto casti trhu uz dnes neni dalsi nova lokalita, ale slabsi rozhodovaci vrstva kolem objemu, nosnosti, cenovych prikladu a provoznich dukazu.

### Semafor

- Zelena: Kontejnerovka je technicky cistejsi nez vetsina sledovanych webu, ma lepsi strukturu sluzeb, lokalit, schema i formulare.
- Oranzova: cast konkurence ma jednodussi, ale obchodne ostrejsi weby, protoze hned ukazuje objemy kontejneru, cenove kotvy a telefon.
- Cervena: stale jsme slabsi v realnych dukazech a v rychlem rozhodovacim bloku `jaky kontejner / jaka cena / co dostanu / co mohu dolozit`.

### Fakta

- Z 20 kontrolovanych webu mela vetsina viditelnou kombinaci `telefon + kratky popis sluzby + lokalita + materialovy seznam`.
- Opakovane se objevovaly objemy a velikosti kontejneru: napriklad `3 m3`, `4 m3`, `6 m3`, `7 m3`, `10 m3`, `12 m3`, `15 m3`.
- Vice konkurentu dava orientacni cenove kotvy nebo cenik primo na homepage nebo na velmi blizke kliknuti: `Bikramka`, `Metrak`, `Kontejnery Šutrák`, `Kontejnery Slaný`, `Kontejnery Protiva`, `TS Rudná`, `kontejnery-tachlovice.cz`.
- Nekolik konkurentu otevrene pouziva silne proof body, ktere pomahaji i B2B a stavebnim zakazkam: potvrzeni o likvidaci odpadu, roky na trhu, fotogalerii, overeni zakazniky, recenze nebo provozni vozovy park. To je videt u `Bikramka`, `BV Kontejnery`, `Agrio Unhošť`, `Metrak`, `Mansy`, `Protiva`, `ABN trans`.
- Presne `sluzba + lokalita` nebo `kontejnery + lokalita` v title/H1 pouzivaji nebo dobre naznacuji treba `BV Kontejnery`, `Kontejnery Tachlovice`, `Kontejnery Beroun`, `Kontejnery Protiva`, `Kontejnery Slaný`, `MM Kontejnery`, `odvozodpadu-kontejnery.cz`.
- Caste jsou i velmi jednoduche UX tahy: `prvni 3 dny zdarma`, `objednat online`, `zobrazit cenik`, `platba kartou`, `pristaveni do 24 hodin`, `nonstop dispecink`.
- Sitemapy nebo jasne indexovatelne struktury se podarilo overit napr. u `bikramka.cz`, `bvkontejnery.cz`, `mm-kontejnery.cz`, `agriounhost.cz`, `kontejnery-tachlovice.cz`, `metrak.cz`, `mansy.cz`, `kontejnery-sutrak.cz`, `kontejnery-protiva.cz`, `zemnipracestefanek.cz`, `abntrans.cz`.

### Hypotezy

- Kdyby Kontejnerovka pridala silny blok `objemy kontejneru + kdy zvolit jakou velikost + orientacni cenove priklady + potvrzeni o likvidaci odpadu`, muze to zvednout duveru i konverzni ochotu rychleji nez dalsi nova lokalitni stranka.
- Nase aktualni struktura sluzeb a lokalit je uz dostatecna na to, aby dalsi rust prisel spis ze zlepseni rozhodovaci vrstvy nez z dalsiho nafukovani sitemap.
- Pokud spojime tuto rozhodovaci vrstvu s realnymi fotkami a mini-realizacemi, budeme proti vetsine lokalni konkurence pusobit nejen obsahove silne, ale i obchodne duveryhodne.

### Co chybi k jistote

- Nejde potvrdit, kterym konkurentum tyto prvky realne vydelavaji vic, protoze nemame jejich interna data.
- U casti konkurentu nelze bez placenych nebo internich dat overit skutecne GSC vykony, konverze nebo leady.
- U nekterych webu byl technicky slabsi hosting nebo certifikat; analyza proto bere jejich obsahove a prodejni vzorce, ne technickou kvalitu jako celek.

### Co doporucuji udelat ted

- Dopsat na Kontejnerovku jasny blok objemu a pouziti kontejneru: velikost, typicky material, na co si dat pozor u suti a zeminy, kdy nestaci jen `m3`, ale hraje roli hmotnost.
- Pridat orientacni cenove kotvy a 2-4 modelove situace z praxe, aby zakaznik rychleji pochopil cenove rozdily bez falesneho pevneho ceniku.
- Viditelne posilit `potvrzeni o likvidaci odpadu`, telefon a provozni proof body na homepage, `cenik.html`, `kontejner-na-sut.html`, `odvoz-suti.html` a Kladno / Praha-zapad hubove stranky.

### Co muze pockat

- Dalsi nove lokalitni nebo EN stranky.
- Rozsireni blogu nebo poradny, pokud nepridava primo lepsi rozhodnuti pred objednavkou.

### Co potrebuji od majitele

- Potvrdit, jestli lze verejne pouzit typicke priklady zakazek a orientacni cenove scenare bez obchodniho problemu.
- Dodat nebo schvalit realne fotky a potvrdit, zda se bezne vystavuje potvrzeni o likvidaci odpadu.

### Nejlepsi dalsi krok

Na web doplnit jednu silnou rozhodovaci vrstvu `objemy kontejneru + orientacni cenove priklady + potvrzeni o likvidaci odpadu`, protoze to je nejcastejsi a nejpraktictejsi vzorec, ktery konkurenci pomaha uz pred prvnim telefonatem.

### Zapis do dokumentu

- Lokalne upraveno v tomto behu: `docs/automation-prompts.md`, `docs/kontejnerovka-rust-webu.md`, `docs/reports/2026-06.md`, `docs/seo-opportunities.md`.
- Pushnuto: ne.
- Nasazeno live: ne.
- Zmereno: ne; jde o konkurencni a obsahovy pruzkum, ne o obchodni dopad.

## Operacni zapis - 2026-06-18 - implementace rozhodovaci vrstvy na webu

### Stav

10/10 lokalne upraveno. Hlavni doporucena zmena z konkurencniho pruzkumu byla prevedena do webu bez velkeho rozsireni sitemap: doplneny byly objemy, volba velikosti, cenove hladiny bez falesne pevne ceny, opatrne formulovane doklady a silnejsi interni prolinkovani na hlavnich money strankach.

### Shrnuti pro majitele

Misto dalsiho nafukovani lokalit web ted lip odpovida na to, co clovek resi tesne pred zavolanim: jak velky kontejner zvolit, kdy je dulezitejsi hmotnost nez objem, co cenu posune do jednodussi nebo narocnejsi hladiny a kdy je potreba rict dopredu, ze chcete firemni doklad nebo podklad k odvozu. To je presne ta vrstva, kterou lokalni konkurence casto prodava rychleji nez samotnym SEO obsahem.

### Semafor

- Zelena: hlavni stranky ted maji silnejsi rozhodovaci bloky a lepsi navaznost mezi sluzbou, cenikem, technikou a referencemi.
- Oranzova: textove proof body jsou lepsi, ale stale chybi realne mini-realizace, dalsi vlastni fotky a potvrzeny wording kolem `potvrzeni o likvidaci odpadu`.
- Cervena: zmena jeste neni pushnuta ani nasazena live a bez obnoveneho GSC/GA4 OAuth nejde rychle zmerit dopad.

### Co je dobra zprava

- `index.html` a `cenik.html` nově vysvetluji objemy `3-4 / 5-7 / 9-12 m3` a orientacni cenove hladiny.
- `kontejner-na-sut.html`, `odvoz-suti.html`, `odvoz-zeminy.html`, `kontejner-na-zeminu.html` a `pristaveni-kontejneru.html` dostaly konkretnejsi rozhodovaci bloky podle materialu, pristupu a hmotnosti.
- `technika.html`, `reference.html` a `o-nas.html` silneji navazuji na cenu, doklady, overeni a dalsi krok objednavky.

### Co je problem

- Nelze poctive doplnit realne verejne reference ani `potvrzeni o likvidaci odpadu`, dokud majitel neda podklady a neschvali presne tvrzeni.
- Google import je stale blokovany `invalid_grant`, takze dnes nejde overit, ktere URL si zmenu zaslouzi nejvic podle cerstvych dat.

### Co se zmenilo od minula

- Predtim byl rozhodovaci gap popsany jen v dokumentech; ted je lokalne propsany primo do webu.
- Web se posunul od obecneho `zavolejte a domluvime` k presnejsimu `jaka velikost / jaka cenova hladina / kdy rict doklad`.

### Fakta

- Lokalne upraveny byly: `index.html`, `cenik.html`, `kontejner-na-sut.html`, `odvoz-suti.html`, `odvoz-zeminy.html`, `kontejner-na-zeminu.html`, `pristaveni-kontejneru.html`, `technika.html`, `reference.html`, `o-nas.html`.
- Zmeny jsou obsahove a bezpecne: bez nove JS logiky, bez zmen formularoveho backendu a bez velkeho zasahu do struktury.
- Reference nejsou vymyslene; misto toho byla posilena vysvetlujici vrstva, jak budou mini-realizace vypadat a co je dnes skutecne overitelne.

### Hypotezy

- Po nasazeni live by se mela zvednout ochota volat nebo poslat formular hlavne z `cenik.html`, `kontejner-na-sut.html`, `odvoz-suti.html` a `odvoz-zeminy.html`.
- Silnejsi interní propojeni `cenik -> sluzba -> technika -> reference` muze pomoct i AI a lokalnimu trust cteni bez nutnosti dalsich novych URL.

### Co chybi k jistote

- Cerstva GSC a GA4 data po nasazeni.
- Potvrzeni, zda lze verejne pouzit wording kolem `potvrzeni o likvidaci odpadu`.
- Realne foto a mini-realizace z provozu.

### Co doporucuji udelat ted

- Nasadit zmeny live bez dalsiho odkladu.
- Hned po nasazeni potvrdit, zda lze doplnit i presnejsi wording k dokladum a pripadnemu potvrzeni o likvidaci.
- Do 14-30 dni po nasazeni vyhodnotit chovani na `cenik.html` a hlavnich service pages.

### Co muze pockat

- Dalsi nova lokalitni URL.
- Sirsi rozsireni EN casti nebo poradny.

### Co potrebuji od majitele

- Schvalit wording pro doklady a pripadne `potvrzeni o likvidaci odpadu`.
- Dodat prvni realne fotky nebo souhlas s anonymni mini-realizaci.
- Dokoncit novy OAuth souhlas pro Google import.

### Nejlepsi dalsi krok

Nasadit dnesni lokalni upravy live a do 14-30 dni zkontrolovat, jestli se zvysily kliky na telefon a formulare na `cenik.html` a hlavnich service pages.

### Zapis do dokumentu

- Lokalne upraveno v tomto behu: `index.html`, `cenik.html`, `kontejner-na-sut.html`, `odvoz-suti.html`, `odvoz-zeminy.html`, `kontejner-na-zeminu.html`, `pristaveni-kontejneru.html`, `technika.html`, `reference.html`, `o-nas.html`, `docs/kontejnerovka-rust-webu.md`, `docs/reports/2026-06.md`, `docs/owner-action-list.md`.
- Pushnuto: ano, commit `c95a291`.
- Nasazeno live: ano, overeno na produkci po GitHub Pages deploy 2026-06-18.
- Zmereno: technicky ano; produkcni crawl `75/75` URL ze `sitemap.xml` bez odchylky ve statusu, title, meta description, canonical, H1, viewport, robots a JSON-LD. Obchodni dopad zatim ne.
