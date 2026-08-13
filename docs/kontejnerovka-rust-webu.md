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

## Strategicky zapis - 2026-08-03 - data a indexace jsou stale vyssi priorita nez dalsi obsah

### Stav

Omezeny vystup. Dnesni master kontrola nepotvrdila novou kritickou chybu v HTML, canonicalech, schema, formularich ani interni navigaci. Hlavni priorita se proto neposouva k dalsi editaci webu, ale zustava u odblokovani Google dat a potvrzeni indexacniho follow-upu po zasahu z `2026-07-28`.

### Shrnutí pro majitele

Web dnes nevypada jako rozbity. Homepage, `lokality.html`, `kontakt.html`, `pristaveni-kontejneru.html`, `odvoz-suti.html`, `odvoz-odpadu.html`, `odvoz-zeminy.html`, `kontejner-na-zeminu.html`, `kontejnery-unhost.html`, `kontejnery-nucice.html` i `kontejnery-rudna.html` drzi title, canonical, schema, telefon `728 505 028`, CTA a formularovou cestu. Verejny snapshot uz u kontrolovanych prioritnich URL ukazuje aktualni telefon a novy obsah, takze telefonni incident uz dnes nevypada jako hlavni live blocker. Nejvetsi brzda je stale stejna: `node scripts/fetch-google-data.mjs` 2026-08-03 znovu spadl na `invalid_grant`, lead sheet je prazdny a bez GSC/GA4 exportu nejde potvrdit, jestli se po rucnim odeslani 4 money pages opravdu zveda indexace a jestli cervencove live upravy nesou signal rustu.

### Semafor

- Zelena: live web je technicky konzistentni, formularova cesta funguje, `robots.txt` je otevrene pro hlavni AI crawlery a live sitemapa drzi `62` URL.
- Oranzova: aktualni verejny snapshot uz ukazuje spravne telefonni cislo a aktualni text na prioritnich URL, ale bez GSC nelze potvrdit, jestli jde i o skutecny posun v Google indexaci a vykonu.
- Cervena: GSC/GA4 import je stale blokovany `invalid_grant`, GBP recenze / fotky / metriky stale nelze overit a `docs/seo-data/kpi-leads-template.csv` zustava prazdny.

### Co je dobra zprava

- Live HTML i repo drzi spravne `728 505 028`; dnesni kontrola `en/areas.html` a `vykop-bazenu.html` nepotvrdila stary telefon v aktualnim live kodu.
- Hlavni money pages i prioritni lokality maji FAQ/Service/Breadcrumb nebo Collection schema, canonicaly a funkcni mini-formulare.
- Interne prolinkovani je silne: homepage, `sluzby.html`, `cenik.html` a `lokality.html` posilaji uzivatele i crawl na prioritni service a lokalitni URL.

### Co je problem

- `node scripts/fetch-google-data.mjs` 2026-08-03 znovu selhal pro GSC i GA4 na `invalid_grant`.
- `docs/seo-data/kpi-leads-template.csv` je stale prazdny, takze obchodni dopad nejde potvrdit ani rucne.
- Stav Google Business Profile nelze z dostupnych podkladu overit v recenzich, fotkach ani metrikach, proto AI / lokalni duvera zustava jen `castecna`.

### Co se zmenilo od minula

- Proti zapisu z `2026-07-20` se dnes nepodarilo zopakovat domnenku, ze live HTML jeste nekde drzi stare cislo `738 505 028`; kontrolovane live URL uz nesou spravny telefon a aktualni obsah.
- Nezmenil se datovy blocker: import GSC/GA4 je stale nefunkcni a bez nej nejde navazat na GSC odeslani z `2026-07-28`.
- Priorita se proto jemne posouva od `snippet cleanup` k presnejsimu `data + indexation follow-up`, protoze cista live chyba uz dnes neni reprodukovana.

### Fakta

- Workspace a branch souhlasi: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery`, branch `main`.
- `node scripts/fetch-google-data.mjs` 2026-08-03 selhal pro GSC i GA4 na `invalid_grant`.
- Live `robots.txt` povoluje `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `CCBot` i `*`; `Disallow` je jen `/docs/`.
- Live `sitemap.xml` dnes obsahuje `62` URL.
- `docs/seo-data/kpi-leads-template.csv` obsahuje jen hlavicku a zadny lead.
- Title/H1/canonical jsou na prioritnich dvojicich rozlisene: `odvoz-suti.html` vs. `kontejner-na-sut.html`, `odvoz-zeminy.html` vs. `kontejner-na-zeminu.html`, `kontejnery-rudna.html` vs. `kontejnery-nucice.html`.

### Hypotezy

- Hlavni technicky bug s telefonem uz muze byt pro Google vyreseny a zbyvajici nesoulady byly spis dosluhujici snippet nebo starsi index, ne aktualni live chyba.
- Pokud se obnovi pristup do GSC a GA4, dalsi kontrola uz bude umet rozhodnout, jestli dalsi tah ma jit do indexace CZ money pages, do `lokality.html`, nebo do verejneho trust baliku.
- Riziko kanibalizace mezi podobnymi service a lokalitnimi URL existuje, ale dnes nema vetsi dopad nez nejasna indexace a chybejici data.

### Co chybi k jistote

- Cerstvy GSC export nebo live GSC follow-up po `2026-07-28`, hlavne stav `pristaveni-kontejneru.html`, `odvoz-suti.html`, `odvoz-odpadu.html` a `kontejner-na-zeminu.html`.
- Cerstvy GA4 export bez QA sumu.
- Screenshot nebo export GBP: recenze, fotky, hovory, prokliky a trasy.
- Rucni evidence telefonatu a poptavek v `docs/seo-data/kpi-leads-template.csv`.

### Co doporucuji udelat ted

- Obnovit Google pristup pro Search Console a GA4 nebo dodat cerstve exporty.
- Hned po obnoveni pristupu overit indexaci 4 priority URL odeslanych v GSC `2026-07-28`.
- Nepridavat dalsi obsah, dokud nebude jasne, jestli se hnou stavajici CZ money pages a `lokality.html`.

### Co muze pockat

- Dalsi nova lokalitni URL.
- Dalsi jemne on-page upravy na service page dvojicich.
- Sirsi reseni kanibalizace, dokud nebude jasny indexacni a datovy obraz.

### Co potrebuji od majitele

- Potvrdit novy OAuth souhlas nebo dodat rucni exporty GSC a GA4.
- Dodat stav GBP: recenze, fotky a screenshot zakladnich metrik.
- Zacit plnit lead sheet, aspon 1x tydne.

### Nejlepsi dalsi krok

Obnovit Google pristup pro Search Console a GA4 a hned potom overit indexaci `pristaveni-kontejneru.html`, `odvoz-suti.html`, `odvoz-odpadu.html` a `kontejner-na-zeminu.html`.

### Zapis do dokumentu

- Lokalne upraveno: jen dokumentace `docs/reports/2026-08.md`, `docs/kontejnerovka-rust-webu.md` a `docs/owner-action-list.md`.
- Pushnuto: ne.
- Nasazeno live: ne.
- Zmereno: jen technicky/live snapshot; obchodni dopad ani GSC/GA4 follow-up dnes zmerit neslo.

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

## Operacni zapis - 2026-06-18 - neexpandovat dalsi mikro-lokality, posilit stavebni odpad

### Stav

Castecne odblokovano a lokalne upraveno. Google import 2026-06-18 uspesne probehl, ale data za obdobi `2026-05-21` az `2026-06-17` jsou stale velmi tenka. Master rozhodnuti proto nebylo tvorit dalsi sublokality Praha, ale posilit existujici money page pro stavebni odpad.

### Shrnutí pro majitele

Na webu uz existuji stranky, ktere pokryvaji Praha 6, Praha 13 a Praha 17 vcetne Ruzyne, Stodulek, Rep a Zlicina. Cerstva data zatim nedavaji oporu pro dalsi drobeni techto lokalit do novych URL. Silnejsi dalsi tah je lepe vysvetlit zakaznikovi, jak resit stavebni odpad, jakou velikost zvolit, co ovlivni cenu a kdy rict, ze potrebuje doklad. To je ted i lokalne upraveno na existujici URL `kontejner-na-stavebni-odpad.html`.

### Semafor

- Zelena: `node scripts/fetch-google-data.mjs` 2026-06-18 uspesne ulozil GSC a GA4 data; hlavni smer je ted podlozeny realnymi daty, ne jen dojmem.
- Oranzova: GSC summary za `2026-05-21` az `2026-06-17` je stale velmi rany a GA4 ukazuje `form_start 3`, `cta_click 3`, ale `click_phone 0` a `lead_form_submit 0`.
- Cervena: bez recenzi, vlastnich fotek a silnejsich trust dukazu nelze tvrdit obchodni dopad ani lokalni autoritu.

### Fakta

- GSC summary pro `2026-05-21` az `2026-06-17` uvadi 20 query rows, 17 page rows a 73 impressions.
- Detailni CSV ukazuji, ze se zobrazuji hlavne homepage, `kontejnery-unhost.html`, `kontejnery-rudna.html`, `kontejnery-nucice.html`, `dovoz-kacirku.html` a `cenik.html`.
- V query datech neni potvrzeny signal pro `zlicin`, `repy`, `stodulky`, `ruzyne`, `praha 5`, `praha 6` ani `praha 13`.
- Existujici URL uz kryji sublokality: `kontejnery-praha-17.html` resi Repy a Zlicin, `kontejnery-praha-13.html` resi Stodulky a `kontejnery-praha-6.html` resi Ruzyne.
- Konkurencni signal z realnych webu casteji opakuje `velikost kontejneru`, `orientacni cena`, `doklad o likvidaci` a jasny CTA flow nez dalsi mikro-lokality.

### Hypotezy

- Posileni intentu `odvoz stavebniho odpadu` na jedne existujici money page prinese vyssi sanci na klik nebo poptavku nez dalsi nova lokalitni URL bez signalu.
- Pokud se pozdeji v GSC objevi realne dotazy pro Repy, Zlicin, Stodulky nebo Ruzyne, pujde to lepe resit jako samostatny follow-up s mensim rizikem kanibalizace.

### Co chybi k jistote

- Vetsi objem GSC dat alespon po 4-8 tydnech od poslednich nasazeni.
- GA4 eventy s realnymi leady misto jen QA a mezikrokovych signalu.
- GBP detail, recenze, fotky a realne obchodni leady.

### Co doporucuji udelat ted

- Nasadit lokalne upravenou stranku `kontejner-na-stavebni-odpad.html` a navazane interni odkazy.
- Nedelat dalsi mikro-lokalitni URL pro Praha sublokality bez noveho datoveho signalu.
- Dale tlacit trust balicek: fotky, mini-realizace, recenze.

### Co muze pockat

- Samostatne URL pro Zlicin, Repy, Stodulky a Ruzyne.
- Dalsi sireni sitemap jen podle brainstormu keywordu.

### Co potrebuji od majitele

- Schvalit nasazeni teto male upravy.
- Dodat nebo potvrdit prvni realne fotky a mini-realizace, aby dalsi rust nesel jen pres text.

### Nejlepsi dalsi krok

Nasadit posilenou stranku `kontejner-na-stavebni-odpad.html` a po 14-30 dnech zkontrolovat, jestli prinesla prvni kliky nebo formularovy signal.

## Strategicky zapis - 2026-07-06 - technika drzi, ale dalsi rust stale brzdi trust a necerstva data

### Stav

Omezeny vystup.

- Analyzovane obdobi dat: posledni ulozene GSC `2026-05-25` az `2026-06-21`, posledni ulozene GA4 `2026-05-21` az `2026-06-17`.
- Cerstvost produkce: live web overen 2026-07-06, homepage, `kontejnery-unhost.html`, `kontejnery-nucice.html`, `kontejnery-rudna.html`, `cenik.html`, `reference.html`, `o-nas.html`, `kontakt.html` a `dekujeme.html` vraceji HTTP 200.
- Omezeni dat: `node scripts/fetch-google-data.mjs` 2026-07-06 znovu selhal pro GSC i GA4 na `invalid_grant`; GBP detail, recenze a fotky nelze z dostupnych podkladu cerstve potvrdit.

### Shrnuti pro majitele

Web dnes nebrzdi rozbita technika. Hlavni stranky, prioritni lokality, formulare, canonical i schema jsou live funkcni a interni prolinkovani mezi homepage, lokality, cenikem a prioritnimi URL dava smysl. Soucasne ale porad chybi nejsilnejsi verejny dukaz, ze sluzba opravdu jezdi v deklarovanych lokalitach: skutecne fotky, aspon prvni recenze a kratka mini-realizace. Dokud chybi i cerstva Google data, neni duvod otevirat dalsi SEO zmeny nebo nove URL.

### Semafor

- Zelena: live technika drzi, hlavni konverzni cesta funguje a priority URL jsou indexovatelne.
- Oranzova: posledni pouzitelna GSC a GA4 data jsou stare k `2026-06-21` a `2026-06-17`; cerstvy import je znovu blokovany.
- Cervena: AI a lokalni duvera zustava jen castecna, protoze chybi potvrzene GBP podklady, recenze a vlastni fotky z realnych zakazek.

### Fakta

- `node scripts/fetch-google-data.mjs` 2026-07-06 selhal pro GSC i GA4 na `Google OAuth refresh failed: 400 invalid_grant`.
- Live homepage 2026-07-06 vraci `robots: index, follow`, canonical `https://kontejnerovka.cz/`, title `Kontejnery a odvoz suti | Unhošť, Rudná, Nučice, Kladno` a funkcni Web3Forms formular s redirectem na `dekujeme.html`.
- `index.html`, `sluzby.html`, `cenik.html` a `lokality.html` odkazuji na prioritni URL `kontejnery-unhost.html`, `kontejnery-nucice.html`, `kontejnery-rudna.html` a trust URL `reference.html`, `o-nas.html`.
- Posledni ulozeny GSC page export ukazuje 6 kliku a 726 zobrazeni; nejvice se zobrazuji homepage, `dovoz-kacirku.html`, `kontejnery-rudna.html`, `kontejnery-nucice.html` a `kontejnery-unhost.html`.
- U `kontejnery-unhost.html`, `kontejnery-nucice.html`, `kontejnery-rudna.html`, `sluzby.html` a `lokality.html` jsou stale videt near-win pozice zhruba mezi 5 az 7, ale s velmi slabym CTR.
- Search dotazy dostupne pres web i ulozena data ukazuji, ze pri lokalnich dotazech Kontejnerovku casto prekryvaji katalogy typu Firmy.cz nebo konkurencni weby; z vlastnich URL se v aktualnim snapshotu ukazala hlavne homepage a `kontejnery-nucice.html`.
- Produkcni `www` host jde 301 na non-`www`; `https://kontejnerovka.cz/index.html` ale zustava dostupne jako 200 s canonical na root URL.

### Hypotezy

- Nejvyssi sance na dalsi rust ted neni v dalsim copy nebo nove URL, ale v prvnim verejnem trust baliku propojenem mezi homepage, `reference.html` a Google Business Profile.
- Jakmile pribude aspon jedna realna recenze a prvni vlastni fotky z prioritnich lokalit, muze to zvednout duveru uzivatele i lokalni signal rychleji nez dalsi on-page ladeni.
- Dalsi SEO uprava bez cerstvych GSC/GA4 dat by ted mela nizsi navratnost a vyssi riziko, ze budeme ladit spatnou vec.

### Co chybi k jistote

- Cerstvy GSC a GA4 import po `2026-07-06`.
- Aktualni GBP detail: kategorie, recenze, fotky, hovory, prokliky a trasy.
- Rucni evidence telefonatu, formularu a realnych zakazek.

### AI a lokalni duvera

Hodnoceni: `castecna`

- Silne: entita, NAP, schema `LocalBusiness`, `sameAs`, `hasMap`, canonical, FAQ a funkcni konverzni cesta.
- Slabe: chybi cerstve a verejne overitelne recenze, fotky a mini-realizace.
- Nelze urcit: realny vykon GBP a realny obchodni dopad cervnovych live zmen.

### Co doporucuji udelat ted

- Dodat prvni verejny trust balik z realne zakazky: 1 Google recenzi, 3-5 vlastnich fotek a 1 kratkou anonymni mini-realizaci z Unhoste, Nucic, Rudne nebo Kladna.
- Obnovit OAuth pro GSC a GA4, aby dalsi kontrola nepracovala se starymi daty.
- Nepoustet zadne nove URL ani dalsi vetsi SEO upravy, dokud nebude hotovy trust balik a cerstvy import.

### Co muze pockat

- Dalsi mikro-lokality nebo nova servisni URL.
- Dalsi copy polish na title, canonical nebo schema, protoze dnes nevypadaji jako hlavni brzda.

### Co potrebuji od majitele

- Kratce potvrdit, z jake posledni zakazky lze zverejnit fotky a anonymni mini-realizaci.
- Poslat aspon jednu recenzi nebo potvrdit, komu ma byt po zakazce odeslana prosba o recenzi.

### Nejlepsi dalsi krok

Do 2026-07-20 dodat prvni verejny trust balik z realne zakazky a nasadit ho na homepage, `reference.html` a Google Business Profile; to ma dnes vyssi potencial nez dalsi SEO upravy.

### Zapis do dokumentu

- Lokalne upraveno: `docs/kontejnerovka-rust-webu.md`, `docs/owner-action-list.md`, `docs/reports/2026-07.md`.
- Pushnuto: ne.
- Nasazeno live: ne.
- Zmereno: jen z live kontroly 2026-07-06 a z poslednich ulozenych GSC/GA4 exportu; novy import 2026-07-06 selhal.

## Strategicky zapis - 2026-07-20 - nejdriv obnovit Google pristup a docistit snippet telefonu

### Stav

Omezeny vystup.

- Analyzovane obdobi dat: posledni ulozene GSC `2026-05-25` az `2026-06-21`, posledni ulozene GA4 `2026-05-21` az `2026-06-17`.
- Cerstvost produkce: live web, `robots.txt`, `sitemap.xml`, homepage, `lokality.html`, `cenik.html`, `kontakt.html`, `kontejnery-unhost.html`, `kontejnery-nucice.html`, `kontejnery-rudna.html` a `en/contact.html` overeny `2026-07-20`; vsechny vratily HTTP `200`.
- Omezeni dat: `node scripts/fetch-google-data.mjs` 2026-07-20 znovu selhal pro GSC i GA4 na `invalid_grant`; GBP detail, recenze, fotky a cerstve metriky nelze z dostupnych podkladu potvrdit.

### Shrnuti pro majitele

Technika uz dnes nevypada jako hlavni brzda rustu. Hlavni CZ i EN stranky maji title, meta, canonical, schema, formular i funkcni interni prolinkovani a `www` korektne presmerovava na non-`www`. Dnesni nejvetsi problem je jiny: Google stale ve verejnych snippetech u vice URL ukazuje stare cislo `738 505 028`, i kdyz live web uz ma vsude spravne `728 505 028`, a soucasne se znovu nepodarilo stahnout cerstva GSC a GA4 data. Proto ma dnes nejvyssi navratnost nejdriv obnovit Google pristup a nechat hlavni URL znovu precist.

### Semafor

- Zelena: live hlavni stranky, prioritni lokality, canonicaly, schema i formular funguji; sitemap ma `62` live URL a `www` host jde `301` na hlavni domenu.
- Oranzova: posledni pouzitelna GSC a GA4 data jsou stale cervnova a nove mereni je blokovane `invalid_grant`.
- Cervena: verejny Google snapshot stale u vice URL ukazuje stare telefonni cislo, coz muze brzdit CTR, duveru i primy kontakt.

### Fakta

- `node scripts/fetch-google-data.mjs` 2026-07-20 selhal pro GSC i GA4 na `Google OAuth refresh failed: 400 invalid_grant`.
- Live homepage, `lokality.html`, `cenik.html`, `kontakt.html`, `kontejnery-unhost.html`, `kontejnery-nucice.html`, `kontejnery-rudna.html` a `en/contact.html` maji `200`, canonical na vlastni URL, relevantni title/H1 a schema typu `LocalBusiness`, `FAQPage`, `BreadcrumbList`, `CollectionPage`, `ContactPage` nebo `WebSite` podle typu stranky.
- `robots.txt` je dostupny a odkazuje na `https://kontejnerovka.cz/sitemap.xml`; live sitemap obsahuje `62` URL.
- `https://www.kontejnerovka.cz/` i `http://kontejnerovka.cz/` jdou `301` na `https://kontejnerovka.cz/`, takze `www` split v poslednim GSC exportu vypada spis jako historicky otisk nez aktualni redirect problem.
- Posledni ulozeny GSC page export ukazuje jako hlavni CZ URL homepage (`2` kliky / `138` impresi), `dovoz-kacirku.html` (`2` / `31`), `kontejnery-nucice.html` (`1` / `35`), `kontejnery-rudna.html` (`1` / `52`), zatimco `kontejnery-unhost.html` ma `66` impresi a `0` kliku a `lokality.html` `46` impresi a `0` kliku.
- Ve verejnem Google snapshotu 2026-07-20 se stale ukazuje stare `738 505 028` u vice URL, mimo jine u `/en/`, `cenik.html`, `lokality.html`, `kontejnery-unhost.html`, `kontejnery-nucice.html` a `kontejnery-rudna.html`, i kdyz otevrene stranky uz nesou `728 505 028`.
- V repozitari zustavaly stare cislo jen v internich podkladech `docs/citace-a-recenze-texty.md` a `docs/hlas-znacky.md`; ty byly dnes lokalne sjednoceny na `728 505 028`.

### Hypotezy

- Nejvetsi okamzity blocker uz neni chybejici trust balik, ale stale chybny telefon ve verejnem Google snapshotu spojeny s nefunkcnim pristupem do Search Console a GA4.
- Jakmile se obnovi Google pristup a probehne recrawl hlavnich URL, muze se zlepsit jak snippet konzistence, tak schopnost rozumne merit dalsi rozhodnuti.
- Trust balik zustava dulezity, ale az jako dalsi krok po vycisteni verejnych kontaktu a obnove dat.

### Co chybi k jistote

- Cerstvy GSC a GA4 import po `2026-07-20`.
- Potvrzeny stav Google Business Profile: kategorie, recenze, fotky, hovory, prokliky a trasy.
- Rucni evidence telefonatu, formularu a realnych zakazek.

### AI a lokalni duvera

Hodnoceni: `castecna`

- Silne: entita, NAP, schema, canonicaly, lokalitni hub, priorizovane lokality a funkcni formular.
- Slabe: verejny snippet stale nese cast historicky spatneho kontaktu a chybi cerstve trust signaly z GBP.
- Nelze urcit: realny vykon GBP a dopad cervencovych uprav bez novych dat.

### Co doporucuji udelat ted

- Obnovit Google pristup pro Search Console a GA4 a hned potom znovu nechat precist homepage, `/en/`, `kontejnery-unhost.html`, `kontejnery-nucice.html` a `kontejnery-rudna.html`.
- Po uspesnem recrawlu overit, jestli verejne snippety vsude ukazuji `728 505 028`.
- Trust balik s recenzi a fotkami nechat jako dalsi krok, ne jako prvni.

### Co muze pockat

- Dalsi mala on-page SEO uprava na `lokality.html`, `cenik.html` nebo prioritnich lokalitach.
- Dalsi nova URL nebo dalsi rozsireni EN sekce.

### Co potrebuji od majitele

- Potvrdit nebo obnovit pristup, pres ktery pujde znovu fungovat Search Console a GA4 import.
- Pokud je pristup v jinem uctu, dodat jen potrebny login flow nebo export; neni potreba zadne nove SEO zadani.

### Nejlepsi dalsi krok

Obnovit Google pristup a po oprave telefonu znovu nechat precist hlavni CZ/EN URL, aby zmizelo stare cislo ze snippetů a dalsi kontrola uz bezela na cerstvych datech.

### Zapis do dokumentu

- Lokalne upraveno: `docs/citace-a-recenze-texty.md`, `docs/hlas-znacky.md`, `docs/kontejnerovka-rust-webu.md`, `docs/owner-action-list.md`, `docs/reports/2026-07.md`.
- Pushnuto: ne.
- Nasazeno live: ne.
- Zmereno: omezeně; live kontrola probehla 2026-07-20, posledni ulozena GSC data konci `2026-06-21` a GA4 `2026-06-17`.

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

## Operacni zapis - 2026-06-18 - systematicky polish slabsich podstranek

### Stav

10/10 lokalne upraveno. Slabsi lokalni a servisni URL byly dorovnany bliz k hlavnimi money pages bez dalsiho rozsirovani sitemap a bez zmen backendu.

### Shrnuti pro majitele

Web uz nemel hlavni rezervu v dalsich novych URL, ale v tom, ze cast podstranek pusobila proti `cenik.html`, `odvoz-suti.html` nebo `kontejner-na-sut.html` slabsi textove i vizualne. Proto byly na 44 CZ podstrankach systematicky doplneny chybejici vizualni proof bloky, prakticke decision bloky a jasnejsi mikrocopy, co ma zakaznik poslat pro cenu. Soucasne byl 2026-06-18 znovu overen funkcni Google import pro GSC a GA4, takze dalsi kontrola dopadu uz neni datove blokovana.

### Semafor

- Zelena: 44 podstranek je obsahove konzistentnejsich a lepe navazuje na hlavni decision layer webu.
- Oranzova: zmena je zatim cerstve nasazena a nema jeste odstup pro obchodni vyhodnoceni.
- Cervena: AI a lokalni duvera zustava jen castecna, dokud majitel nedoda dalsi realne fotky, mini-realizace a recenze.

### Co je dobra zprava

- Slabsi lokalni URL jako `kontejnery-praha-5.html`, `kontejnery-praha-6.html`, `kontejnery-slany.html`, `odvoz-suti-kladno.html` a `odvoz-zeminy-kladno.html` dostaly silnejsi vizualni a decision vrstvu.
- Servisni URL typu `kontejner-na-beton.html`, `dovoz-pisku.html`, `dovoz-sterku.html`, `odvoz-odpadu.html` a `odvoz-betonu.html` ted lip vysvetluji, co rozhoduje cenu a co ma zakaznik poslat.
- `node scripts/fetch-google-data.mjs` 2026-06-18 uspesne ulozil cerstva GSC a GA4 data do privatni datove slozky.

### Co je problem

- Zmena je rozsahla, ale stale prevazne textova a UX; bez odstupu zatim nejde tvrdit realny rust poptavek.
- Chybi dalsi realne trust podklady od majitele, takze AI/lokalni duvera neroste jen kodem a copy.

### Co se zmenilo od minula

- Predtim byly nejlip dotazene hlavne homepage, `cenik.html` a hlavni service pages; ted je silnejsi decision layer rozsiren i na slabsich 44 podstranek.
- Datova blokace `invalid_grant` uz v tomto behu nepotvrdila problem; GSC i GA4 import probehl uspesne.

### Fakta

- Lokalne upraveny byly: `dovoz-betonu.html`, `dovoz-kacirku.html`, `dovoz-pisku.html`, `dovoz-recyklatu.html`, `dovoz-sterku.html`, `kontejner-na-beton.html`, `kontejner-na-stavebni-odpad.html`, `kontejnery-beroun.html`, `kontejnery-chynava-podkozi.html`, `kontejnery-horovice.html`, `kontejnery-hostoun-dobroviz-stredokluky.html`, `kontejnery-kraluv-dvur.html`, `kontejnery-lodenice-morina-srbsko.html`, `kontejnery-nizbor-hyskov-zelezna.html`, `kontejnery-nucice.html`, `kontejnery-praha-13.html`, `kontejnery-praha-17.html`, `kontejnery-praha-5.html`, `kontejnery-praha-6.html`, `kontejnery-praha-vychod.html`, `kontejnery-rakovnik.html`, `kontejnery-slany.html`, `kontejnery-unhost.html`, `kontejnery-zdice.html`, `lokality.html`, `odbahneni-rybniku.html`, `odvoz-betonu.html`, `odvoz-dreva-bioodpadu.html`, `odvoz-odpadu.html`, `odvoz-suti-hostivice.html`, `odvoz-suti-kladno.html`, `odvoz-suti-praha-zapad.html`, `odvoz-suti-rekonstrukce-koupelny.html`, `odvoz-zeminy-kladno.html`, `povoleni-kontejner-praha.html`, `recyklat-prijezdova-cesta.html`, `rovnani-terenu.html`, `technika.html`, `velkoobjemovy-kontejner.html`, `vykop-bazenu.html`, `vykop-jezirka.html`, `vykop-zakladu.html`, `zemni-prace-kladno.html` a `zemni-prace.html`.
- Hromadna implementace je zapsana v `scripts/upgrade-subpages.mjs`.
- Kontrolni check po uprave potvrdil, ze upravene stranky nemaji duplikovany H1 ani rozbity trustbar a ze nove CTA nevede do prazdneho kotvoveho odkazu.

### Hypotezy

- Po nasazeni se nejrychleji muze zvednout kvalita mikro-konverzi na lokalnich service+local URL, ktere predtim pusobily nejslabsi.
- Silnejsi vizualni proof a decision mikrocopy muze snizit rozdil mezi lokalnimi a hlavnimi money pages i pro AI/citacove pochopeni webu.

### Co chybi k jistote

- Porovnani GSC a GA4 pred a po zmene s odstupem alespon 14-30 dni.
- Rucni doplneni realnych trust podkladu od majitele.

### Co doporucuji udelat ted

- Nasadit upravy live a nechat je bez dalsiho rozsahleho prepisu aspon 14 dni.
- Vyhodnotit hlavne `click_phone`, `form_start`, `generate_lead` a vstupy na lokalnich/service landing pages.
- Nepokracovat hned do dalsiho hromadneho prepisu; nejdriv zmerit, jestli tento systematicky polish realne zvedl zapojeni.

### Co muze pockat

- Dalsi nova lokalitni URL.
- Sirsi rozsireni poradny nebo EN casti.

### Co potrebuji od majitele

- Dodat dalsi realne fotky a mini-realizace, pokud ma web jit i v AI/lokalni duvere z `castecna` na `silna`.

### Nejlepsi dalsi krok

Po 14-30 dnech zkontrolovat GSC/GA4 u lokalnich a servisnich podstranek, jestli se po tomto systematickem polishi zvedly mikro-konverze a engagement.

### Zapis do dokumentu

- Lokalne upraveno v tomto behu: 44 CZ podstranek + `scripts/upgrade-subpages.mjs` + `docs/reports/2026-06.md` + `docs/seo-content-log.md` + `docs/owner-action-list.md`.
- Pushnuto: ano, po commitu a pushi na `main` v tomto behu.
- Nasazeno live: ano, po overeni GitHub Pages deploy v tomto behu.
- Zmereno: technicky ano; obchodni dopad zatim ne.

## 2026-06-18 - trust proof vrstva na top money pages

Po systematickem polishi se ukazalo, ze dalsi rychly zisk uz nelezi v dalsich novych URL, ale v preneseni overeni firmy primo na nejsilnejsi service pages. Proto byly lokalne doplneny `trust-proof-panel` bloky na `pristaveni-kontejneru.html`, `kontejner-na-zeminu.html`, `odvoz-odpadu.html`, `odvoz-zeminy.html`, `kontejner-na-sut.html` a `odvoz-suti.html`.

Tyto bloky neposouvaji web dalsim SEO balastem, ale zkracuji cestu mezi navstevou a duverou: uzivatel hned vidi, kdo sluzbu provozuje, ze jde o platce DPH a kde si muze otevrit `reference.html` nebo `o-nas.html`. To je realisticky vyssi ROI nez dalsi textove rozsirovani tematu nebo dalsi mikro-lokalitni URL bez signalu.

## Strategicky zapis - 2026-08-13 - web roste, ale dalsi tah ma byt maly a oprety o existujici URL

### Stav

Lokalne upraveno, ale datove stale omezeno. Live GSC kontrola `2026-08-13` uz umoznuje rict, ze web roste, jen stale ne poctive pres API import a bez GA4 / GBP kompletace.

### Shrnuti pro majitele

Nejdulezitejsi zmena proti minulemu mesici je jednoducha: web uz neroste jen v dojmu, ale i v GSC. Neni tedy potreba otevirat dalsi nove stranky. Rozumnejsi je dotahovat male near-win kroky na existujicich CZ URL, ktere uz sbiraji imprese, a pritom poctive priznat, ze `node scripts/fetch-google-data.mjs` stale pada na `invalid_grant`, GBP stav recenzi / fotek nemame a lead sheet je prazdny.

### Fakta

- Live GSC property `sc-domain:kontejnerovka.cz` otevrena `2026-08-13` ukazuje za posledni 3 mesice `65` kliku, `3 142` impresi, CTR `2,1 %` a prumernou pozici `18,1`.
- Denni rozpad dostupny do `2026-08-11` dava rolling compare `2026-07-15` az `2026-08-11` = `42` kliku / `1 920` impresi / CTR `2,19 %` proti `18` klikum / `936` impresim / CTR `1,92 %` v `2026-06-17` az `2026-07-14`.
- Plny mesic `2026-07-01` az `2026-07-31` drzi `33` kliku a `1 476` impresi proti `10` klikum a `714` impresim v `2026-06-01` az `2026-06-30`.
- Top viditelne CZ URL v live GSC drzi hlavne homepage, `kontejnery-rudna.html`, `kontejnery-nucice.html`, `kontejnery-unhost.html`, `odvoz-zeminy.html` a `pristaveni-kontejneru.html`.
- Index summary `2026-08-13` ukazuje `28` indexovanych a `43` neindexovanych URL; hlavni bucket `Objeveno - momentalne neindexovano` stale uvadi `36` URL.
- Rucni URL inspection u vice prioritnich URL z tohoto bucketu uz vratila stav `na Googlu`, takze bucket vypada jako smiseny nebo castecne zpozdeny signal, ne jako cista fronta pro dalsi hromadne zasahy.
- `node scripts/fetch-google-data.mjs` znovu selhal `2026-08-13` pro GSC i GA4 na `invalid_grant`.

### Hypotezy

- Dalsi rust spis zrychli CTR a trust dotahovani na existujicich URL nez dalsi nova obsahova expanze.
- V bucketu `Objeveno - momentalne neindexovano` nema smysl slepe delat dalsi hromadne zmeny, dokud se jednotlive priority neoveruji inspekci.
- `technika.html` je rozumna proof URL pro dalsi posilovani, protoze pomaha jak duvere, tak odpovedi na praktickou otazku pristupu a vahy.

### AI a lokalni duvera

Hodnoceni: `castecna`

- Silne: jasna entita, schema, canonicaly, lokalitni a service struktura, realne fotky vlastniho auta, FAQ a funkcni konverzni cesta.
- Slabe: chybi dolozeny GBP stav recenzi / fotek / metrik a chybi rucni evidence leadu.
- Nelze urcit: obchodni dopad rustu bez GA4 a lead sheetu.

### Co doporucuji udelat ted

- Nasadit lokalni zmenu `odvoz-zeminy.html` -> `technika.html` a po 14 az 28 dnech zmerit, jestli se zveda proklik a duvera na teto service page.
- Nepridavat dalsi nove URL.
- Po majiteli chtit jen obnoveni Google pristupu, GBP snapshot a prvni vyplneni lead sheetu.

### Nejlepsi dalsi krok

Nasadit maly trust interlink z `odvoz-zeminy.html` na `technika.html` a pri dalsi kontrole zmerit, jestli existujici viditelna service page lepe posila uzivatele i crawl na proof URL.

### Zapis do dokumentu

- Lokalne upraveno: `odvoz-zeminy.html`, `docs/seo-content-log.md`, `docs/owner-action-list.md`, `docs/reports/2026-08.md`, `docs/kontejnerovka-rust-webu.md`.
- Pushnuto: ne.
- Nasazeno live: ne.
- Zmereno: ano, live GSC monthly compare a index summary; GA4, GBP a obchodni dopad ne.

Soucasne byl 2026-06-18 znovu uspesne spusten `node scripts/fetch-google-data.mjs`, takze dalsi kontrola dopadu uz neni blokovana pristupem k GSC/GA4. Pokud se po nasazeni zvednou `click_phone`, `form_start` a vstupy na techto 6 URL, bude to potvrzeni, ze dalsi rust ma vest pres trust a decision layer, ne pres dalsi expanzi sitemap.

## Strategicky zapis - 2026-08-04 - cervencovy GSC rust je potvrzen, dalsi tah ma byt indexace

### Stav

Omezeny, ale tentokrat silnejsi vystup. Live Search Console v Codexu uz umoznila poctive srovnat `2026-07-01` az `2026-07-31` proti `2026-06-01` az `2026-06-30`, i kdyz API import GSC/GA4 stale pada na `invalid_grant`.

### Shrnuti pro majitele

Web se v cervenci v Google opravdu pohnul. Cervenec prinesl `33` kliku a `1 476` impresi proti `10` klikum a `714` impresim v cervnu, CTR se zvedlo z `1,40 %` na `2,24 %`. To je dost silny signal, ze cervencove live upravy a dosavadni rustovy smer nebyly mimo. Z toho ale neplyne, ze je ted spravny dalsi krok pridavat dalsi obsah. Silnejsi logika je overit, jestli uz se do indexu dostavaji hlavni CZ money pages, protoze prave tam muze byt dalsi rust rychlejsi nez v dalsim rozsirovani sitemap.

### Semafor

- Zelena: GSC uz potvrzuje realny mesicni rust, ne jen dojem nebo rolling snapshot.
- Oranzova: GA4 compare, lead sheet a GBP detail stale chybi, takze obchodni dopad a lokalni autoritu nelze potvrdit.
- Cervena: API import stale pada na `invalid_grant` a posledni dolozeny indexacni obraz zustava slaby.

### Fakta

- Live GSC `2026-08-04` ukazuje za posledni 3 mesice `45` kliku, `2 360` impresi, CTR `1,9 %` a prumernou pozici `19,1`; data byla aktualizovana zhruba `pred 5 hodinami`.
- Rucne sesbirana denni GSC data davaji presny compare: `2026-07-01` az `2026-07-31` = `33` kliku, `1 476` impresi, CTR `2,24 %`; `2026-06-01` az `2026-06-30` = `10` kliku, `714` impresi, CTR `1,40 %`.
- Viditelne query mix v poslednich 3 mesicich stale obsahuje slabe nebo mimo-zamerne dotazy jako `container czech republic`, `container brno` a `rent tank prague`, zatimco CZ service dotazy typu `odvoz suti` uz ziskavaji prvni kliky.
- `node scripts/fetch-google-data.mjs` dnes stale selhal pro GSC i GA4 na `invalid_grant`.
- Posledni dolozeny indexacni follow-up z `2026-07-28` mel `21` indexovanych URL, `50` neindexovanych URL a `43` URL ve stavu `Objeveno – momentalne neindexovano`.

### Hypotezy

- Cervenec pravdepodobne rostl diky kombinaci cervencovych live uprav a tomu, ze Google zacina lepe chapat hlavni CZ sluzby a lokality.
- Dalsi nejrychlejsi rust uz nemusi lezet v dalsi editaci homepage nebo `lokality.html`, ale v tom, jestli se do indexu dostanou priority `pristaveni-kontejneru.html`, `odvoz-suti.html`, `odvoz-odpadu.html` a `kontejner-na-zeminu.html`.
- Cast impresi stale odteka do dotazu s horsim obchodnim zamerem, takze dalsi obsahova expanze by mohla rust rozmelnit misto toho, aby ho zrychlila.

### Co chybi k jistote

- Aktualni indexacni stav 4 priority URL po GSC odeslani z `2026-07-28`.
- GA4 compare za stejne mesice bez `invalid_grant`.
- GBP recenze, fotky a metriky.
- Rucni evidence leadu v `docs/seo-data/kpi-leads-template.csv`.

### Co doporucuji udelat ted

- V Search Console zkontrolovat indexacni stav `pristaveni-kontejneru.html`, `odvoz-suti.html`, `odvoz-odpadu.html` a `kontejner-na-zeminu.html`.
- Pokud jsou stale mimo index, zopakovat recrawl / URL inspection a teprve potom rozhodnout o dalsi on-page uprave.
- Nepridavat dalsi nove URL ani vetsi obsahovy tah, dokud nebude jasne, jak se chovaji stavajici CZ money pages.

### Co muze pockat

- Dalsi rozsirovani `lokality.html`.
- Nove EN nebo mikro-lokalitni URL.
- Sirsi kanibalizacni cleanup, pokud se priority nejdriv nepropisuji do indexu.

### Co potrebuji od majitele

- Pokud pujde AI jen pres API a ne pres live GSC v prohlizeci, je stale potreba obnovit OAuth nebo dodat exporty.
- Dodat GBP snapshot a zacit plnit lead sheet, jinak nepujde potvrdit obchodni dopad.

### Nejlepsi dalsi krok

V Search Console potvrdit, jestli se `pristaveni-kontejneru.html`, `odvoz-suti.html`, `odvoz-odpadu.html` a `kontejner-na-zeminu.html` po odeslani z `2026-07-28` uz pohnuly do indexu.

### Zapis do dokumentu

- Lokalne upraveno: `docs/reports/2026-08.md`, `docs/kontejnerovka-rust-webu.md`, `docs/owner-action-list.md`.
- Pushnuto: ne.
- Nasazeno live: ne.
- Zmereno: ano, live GSC compare za `2026-07` vs. `2026-06`; obchodni dopad a GA4 ne.

## Strategicky zapis - 2026-08-04 - 4 priority money pages uz jsou indexovane, dalsi near-win je Unhošť

### Stav

Lokalne upraveno, datove silnejsi nez predchozi odhad. Live Search Console dnes potvrdila, ze `pristaveni-kontejneru.html`, `odvoz-suti.html`, `odvoz-odpadu.html` a `kontejner-na-zeminu.html` uz jsou na Googlu a indexovane.

### Shrnuti pro majitele

Indexace 4 prioritnich money pages uz dnes neni hlavni blocker. Tim se rozhodnuti posunulo: dalsi rozumny tah nebylo delat dalsi kontrolu toho sameho, ale vyuzit nejblizsi lokalni near-win. Ten dnes vychazi na `kontejnery-unhost.html`, ktera uz ma slusnou viditelnost na prvni strance, ale slaby proklik. Proto byla lokalne zpresnena tato stranka tak, aby lepe odpovidala formulacim `kontejner Unhost` a `odvoz suti Unhost` a soucasne posilala silnejsi interni signal na `pristaveni-kontejneru.html`.

### Fakta

- `pristaveni-kontejneru.html`, `odvoz-suti.html`, `odvoz-odpadu.html` a `kontejner-na-zeminu.html` dnes v live URL Inspection hlasi `Adresa URL je na Googlu` a `Stránka je indexována`.
- `kontejnery-unhost.html` ve live GSC page filtru ukazuje za posledni 3 mesice `150` impresi, `1` klik, CTR `0,7 %` a prumernou pozici `7,8`.
- Na `kontejnery-unhost.html` byl lokalne upraven title, meta description, OG/Twitter snippet, H1, uvodni odstavec a doplnen interni odkaz na `pristaveni-kontejneru.html`.

### Hypotezy

- Rust uz ted vic brzdi klikatelnost a query-to-snippet match na nekterych lokalnich URL nez samotna indexace priority pages.
- Pokud se po nasazeni pohne CTR `kontejnery-unhost.html`, bude lepsi pokracovat stejnou logikou i na dalsich lokalitnich near-win URL, ne otvirat dalsi obsah.

### Nejlepsi dalsi krok

Nasadit upravu `kontejnery-unhost.html` a za 14 az 28 dni zkontrolovat CTR a query mix teto URL plus proklik na `pristaveni-kontejneru.html`.

### Zapis do dokumentu

- Lokalne upraveno: `kontejnery-unhost.html`, `docs/seo-content-log.md`, `docs/owner-action-list.md`, `docs/reports/2026-08.md`, `docs/kontejnerovka-rust-webu.md`.
- Pushnuto: ne.
- Nasazeno live: ne.
- Zmereno: ano, live GSC URL Inspection + page filter pro Unhošť; GA4 ne.
