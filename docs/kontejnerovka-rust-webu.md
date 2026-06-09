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
