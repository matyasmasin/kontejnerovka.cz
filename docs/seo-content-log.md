# Kontejnerovka.cz - log obsahovych a SEO uprav

Kazda vetsi obsahova, SEO nebo konverzni uprava musi mit zapis. Diky tomu lze po tydnech a mesicich poznat, co se zmenilo a co sledovat.

## Zaznamy

### 2026-07-09 - trust ověřovací vrstva na homepage a 3 near-win lokalitách

- Co se zmenilo: na `index.html`, `kontejnery-unhost.html`, `kontejnery-nucice.html` a `kontejnery-rudna.html` byly doplneny bloky `trust-proof-panel` s primymi odkazy na `reference.html`, `o-nas.html` a `technika.html`.
- Proc se to zmenilo: rucni GSC kontrola v Search Console 2026-07-08 ukazala, ze web ma funkcni sitemapu, ale jen `22` indexovanych stranek, `60` neindexovanych a nejvic vykonu dnes drzi homepage, Rudna, Nučice a Unhošť. Master rozhodnuti proto nebylo tvorit dalsi URL, ale posilit duveru na par viditelnych CZ strankach, ktere uz sbiraji imprese.
- Ocekavany dopad: vyssi duvera pred klikem na telefon nebo formular, vic prokliku na `reference.html`, `o-nas.html` a `technika.html` a silnejsi signal, ze za sluzbou stoji konkretni provozovatel s overitelnou technikou a firemnimi udaji.
- Zdroj dat nebo duvod: Search Console live kontrola `2026-07-08` ve property `sc-domain:kontejnerovka.cz`; ve vykonu za posledni 3 mesice vedly `/`, `kontejnery-rudna.html`, `kontejnery-nucice.html` a `kontejnery-unhost.html`.
- Kdo/automatizace zmenu navrhla: manualni master SEO/CRO implementace po GSC kontrole.
- Nasazeno: lokalne upraveno.
- Commit:
- Co sledovat po zmene: GSC pro homepage, `kontejnery-unhost.html`, `kontejnery-nucice.html`, `kontejnery-rudna.html`; v GA4 `click_phone`, `form_start`, `generate_lead` a chovani uzivatelu, kteri se prokliknou na `reference.html`, `o-nas.html` a `technika.html`.
- Minimalni doba vyhodnoceni: 14-30 dni pro prvni konverzni signal, 4-8 tydnu pro organicky dopad.

### 2026-06-18 - trust proof vrstva na top money pages

- Co se zmenilo: na `pristaveni-kontejneru.html`, `kontejner-na-zeminu.html`, `odvoz-odpadu.html`, `odvoz-zeminy.html`, `kontejner-na-sut.html` a `odvoz-suti.html` byly doplneny bloky `trust-proof-panel` s primym odkazem na `reference.html` a `o-nas.html`.
- Proc se to zmenilo: obsah uz byl silny, ale na casti top money pages chybela stejna overovaci vrstva jako na homepage; uzivatel mel rychle dostat potvrzeni, kdo sluzbu provozuje a kde si to muze overit.
- Ocekavany dopad: vyssi duvera pred odeslanim formulare nebo klikem na telefon, lepsi interni prolinkovani na proof URL a mensi zavislost na footer linku.
- Zdroj dat nebo duvod: manualni master SEO/CRO implementace po nasledne kontrole nejsilnejsich servisnich URL; soucasne 2026-06-18 uspesne probehl `node scripts/fetch-google-data.mjs` pro GSC i GA4.
- Kdo/automatizace zmenu navrhla: manualni master SEO implementace.
- Nasazeno: ano, po commitu/pushi na `main` a po uspesnem GitHub Pages deploy v tomto behu.
- Commit: `ff30971`
- Co sledovat po zmene: `click_phone`, `form_start`, `generate_lead` a vstupy na 6 upravenych URL; zvlast zda roste proklik na `reference.html` a `o-nas.html`.
- Minimalni doba vyhodnoceni: 14-30 dni pro prvni konverzni signal, 28-56 dni pro stabilnejsi organicky signal.

### 2026-06-18 - posileni intentu "odvoz stavebniho odpadu" na existujici URL

- Co se zmenilo: stranka `kontejner-na-stavebni-odpad.html` byla pretargetovana z uzsiho `kontejner na stavebni odpad` na sirsi a obchodnejsi intent `odvoz stavebniho odpadu a kontejner`; doplneny byly velikostni rozhodovaci bloky, cenove a dokladove rozhodovaci body, nove FAQ a silnejsi interni odkazy z `sluzby.html`, `odvoz-odpadu.html`, `poradna.html` a `cenik.html`.
- Proc se to zmenilo: cerstvy import GSC a GA4 z 2026-06-18 ukazuje, ze web ma stale velmi malo dat a nema signal pro dalsi mikro-lokality Praha 5/6/13/17 pod uroven existujicich hubu. Soucasne konkurence casto ziskava poptavky rychlejsim rozhodnutim pres velikosti, cenove kotvy a doklady, ne dalsimi doorway URL.
- Ocekavany dopad: lepsi relevance pro dotazy kolem stavebniho odpadu, rychlejsi rozhodnuti pred zavolanim nebo formularem a silnejsi vnitrni cluster mezi cenikem, poradnou, odvozem odpadu a service money page.
- Zdroj dat nebo duvod: `node scripts/fetch-google-data.mjs` uspesne probehl 2026-06-18; GSC summary pracuje s obdobim `2026-05-21` az `2026-06-17`, GA4 summary se stejnym obdobim ukazuje `form_start 3`, `cta_click 3`, ale stale `click_phone 0` a `lead_form_submit 0`; konkurencni signal ukazuje opakovane motivy `velikost kontejneru`, `cena predem` a `doklad o likvidaci`.
- Kdo/automatizace zmenu navrhla: manualni master SEO kontrola s malou bezpecnou implementaci.
- Nasazeno: lokalne upraveno.
- Commit:
- Co sledovat po zmene: GSC dotazy a imprese pro `kontejner-na-stavebni-odpad.html`, GA4 `click_phone`, `form_start`, `lead_form_submit`, `generate_lead` a pruchod z `cenik.html`, `odvoz-odpadu.html` a `poradna.html` na tuto URL.
- Minimalni doba vyhodnoceni: 14-30 dni pro prvni signal, 4-8 tydnu pro organicky dopad.

### 2026-06-18 - systematicke posileni slabsich podstranek

- Co se zmenilo: na 44 ceskych podstrankach byly doplneny chybejici bloky `visual-proof`, `content-blocks`, `service-note` a na casti lokalnich landing pages i `mobile-action-box`; pro opakovatelnost vznikl skript `scripts/upgrade-subpages.mjs`.
- Proc se to zmenilo: hlavni money pages uz byly silnejsi, ale cast lokalnich a servisnich URL zaostavala textove i graficky. Cilem bylo dorovnat je bez dalsiho nafukovani sitemap a bez velke zmeny struktury webu.
- Ocekavany dopad: lepsi prvni dojem, jasnejsi decision layer pred telefonatem nebo formularem, vyssi relevance pro service+local dotazy a mensi rozdil mezi nejlepsimi a slabsimi podstrankami.
- Zdroj dat nebo duvod: navaznost na master SEO/CRO upravy z 2026-06-18 a pozadavek dotahnout podstranky na konzistentni 10/10 standard; soucasne 2026-06-18 znovu probehl uspesny import `node scripts/fetch-google-data.mjs` pro GSC i GA4.
- Kdo/automatizace zmenu navrhla: manualni master SEO/CRO content polish s hromadnou implementaci.
- Nasazeno: ano, po commitu/pushi na `main` v tomto behu.
- Commit: `70c09a6`
- Co sledovat po zmene: GSC zobrazeni a kliky lokalnich/service URL, GA4 `click_phone`, `form_start`, `generate_lead`, vstupy na `kontejnery-praha-5.html`, `kontejnery-praha-6.html`, `kontejnery-slany.html`, `odvoz-suti-kladno.html`, `odvoz-suti-praha-zapad.html`, `odvoz-zeminy-kladno.html`, `kontejner-na-beton.html` a `zemni-prace.html`.
- Minimalni doba vyhodnoceni: 14-30 dni pro prvni konverzni signal, 4-8 tydnu pro organicky dopad.

### 2026-06-09 - Unhošť near-win CTR a relevance uprava

- Co se zmenilo: na strance `kontejnery-unhost.html` byl zpresnen title, meta description, H1, breadcrumb a FAQ tak, aby stranka explicitneji odpovidala na dotazy kolem `kontejnery Unhost` a `odvoz suti Unhost`.
- Proc se to zmenilo: GSC za obdobi 2026-05-12 az 2026-06-08 ukazuje pro `https://kontejnerovka.cz/kontejnery-unhost.html` 18 impresi, 0 kliku a prumernou pozici 8.72; mezi dotazy je i `odvoz suti unhost` s pozici 9. Tohle je bezpecny near-win na existujici URL bez potreby tvorit novou stranku.
- Ocekavany dopad: lepsi relevance a CTR na lokalni dotazy kolem Unhoste a Svárova, hlavne pro zamer odvozu suti a rychleho pristaveni kontejneru.
- Zdroj dat nebo duvod: Search Console API export `2026-05-12` az `2026-06-08`, soubor `gsc-pages-last-28-days.csv` a `gsc-queries-last-28-days.csv`.
- Kdo/automatizace zmenu navrhla: automatizace `Kontejnerovka obsahovy SEO tah`.
- Nasazeno: ano, po commitu a pushi na `main` v tomto behu.
- Commit:
- Co sledovat po zmene: GSC pro URL `https://kontejnerovka.cz/kontejnery-unhost.html` a dotazy `kontejnery unhost`, `odvoz suti unhost`, impresni CTR a pozici; v GA4 pak `cta_click`, `form_start`, `generate_lead` a pripadne `click_phone` z teto landing page.
- Minimalni doba vyhodnoceni: 14-28 dni, prvni kontrola 2026-06-30.

### 2026-06-09 - Mobile-first jazykovy prepinac CZ/EN

- Co se zmenilo: do vsech CZ i EN stranek byl pridan viditelny segmentovy prepinac `CZ / EN` v hlavicce, stary textovy jazykovy odkaz byl odstranen z menu, mobilni header byl upraven na rozlozeni brand + jazyk + hamburger a CSS dostalo cache-bust `styles.css?v=20260609a`.
- Proc se to zmenilo: EN verze byla technicky dostupna, ale jazykovy prechod nebyl na mobilu dost viditelny. Cilem bylo, aby cesky i anglicky mluvici navstevnik okamzite poznal, ze web ma druhou jazykovou verzi.
- Ocekavany dopad: lepsi pruchod mezi CZ/EN strankami, vetsi duvera u expatu, mene ztracenych EN navstevniku a stabilnejsi mobilni navigace bez pretecu.
- Zdroj dat nebo duvod: zadani majitele pridat prepinac CZ/EN a zkontrolovat cely web mobile-first.
- Kdo/automatizace zmenu navrhla: manualni UX/CRO/mobile QA uprava.
- Nasazeno: ne, pripraveno v pracovnim stromu.
- Commit:
- Co sledovat po zmene: kliky na jazykovy prepinac, EN landing page views, EN formulare, mobilni kliky na telefon/poptavku, GSC hreflang signaly a pripadne chovani uzivatelu na mobilu.
- Minimalni doba vyhodnoceni: 14-28 dni pro konverzni signal, 4-8 tydnu pro SEO/hreflang signal.

### 2026-06-09 - EN expat lokalizace ceskych realii

- Co se zmenilo: do EN generatoru a pregenerovanych `/en/` stranek byly doplneny prakticke vysvetlivky pro anglicky mluvici zakazniky v Cesku: mapa/adresa jako validni vstup, rozdil mezi Prague-West/Prague-East a mestskymi castmi Prahy, soukromy pozemek vs ulice/chodnik, slovnik pojmu `zabor`, `skladka`, `ICO`, `DIC`, `DPH`, lokalni poznamky na lokalitnich strankach a jasnejsi formulare pro poptavku.
- Proc se to zmenilo: EN zakaznik nebo expat casto nezna ceske odpadove, adresni a administrativni pojmy; web musi pusobit jako lokalni sluzba napsana primo pro nej, ne jako preklad ceskeho katalogu.
- Ocekavany dopad: mene nejistoty pred odeslanim poptavky, lepsi kvalita EN formularu, vice poptavek s map pinem/fotkou, silnejsi duvera diky vysvetleni ceskych firemnich a cenovych realii bez prehnanych slibu.
- Zdroj dat nebo duvod: vlozeny master prompt k EN lokalizaci a manualni audit specifik anglicky mluvicich zakazniku v Praze a Stredoceskem kraji.
- Kdo/automatizace zmenu navrhla: manualni senior English copywriter, localization specialist, expat UX strateg, CRO expert a local SEO/GEO specialista.
- Nasazeno: ne, pripraveno v pracovnim stromu.
- Commit:
- Co sledovat po zmene: EN `click_phone`, `form_start`, `lead_form_submit`, `generate_lead`, kvalitu EN poptavek, podil poptavek s fotkou/map pinem, GSC dotazy pro `/en/`, lokality Prague/Prague-West/Prague-East a realne dotazy kolem permits, VAT a waste terms.
- Minimalni doba vyhodnoceni: 14-28 dni pro prvni konverzni signal, 4-8 tydnu pro organicky a GEO signal.

### 2026-06-09 - CRO uprava pro ceskeho zakaznika a EN expaty

- Co se zmenilo: upravena CZ homepage prvni obrazovka, hlavni CTA, hero facts, duveryhodnostni texty, novy rozhodovaci blok `Proc by zakaznik mel vybrat prave Kontejnerovka.cz`, sekce `Proc objednat`, formulářová mikrocopy a FAQ odpoved k cene; stejna logika byla propsana do EN generatoru a pregenerovanych `/en/` stranek vcetne EN homepage a kontaktniho formulare.
- Proc se to zmenilo: cesky zakaznik nejvic resi rychlou orientacni cenu, termin, skryte priplatky, spravny typ odpadu, jednoduchy telefon a lokalni ferovost; EN/expat zakaznik navic potrebuje proces bez znalosti ceskych pojmu jako sut, zemina nebo smesny stavebni odpad.
- Ocekavany dopad: silnejsi duvod zavolat nebo poslat poptavku behem prvnich 30-60 sekund, mene nejistoty kolem ceny a odpadu, lepsi srozumitelnost formulare a vyssi sance, ze zakaznik posle fotku/adresu/mnozstvi hned v prvni zprave.
- Zdroj dat nebo duvod: manualni CRO/copy/UX audit a cerstvy import GSC/GA4 z 2026-06-09; GA4 zatim ukazuje `form_start` 3, `cta_click` 3, `generate_lead` 1 a `click_phone` 0, GSC 16 impressions a 0 clicks za poslednich 28 dni.
- Kdo/automatizace zmenu navrhla: manualni senior lokalni marketing strateg, CRO specialista, copywriter, SEO/GEO expert a UX auditor.
- Nasazeno: ne, pripraveno v pracovnim stromu.
- Commit:
- Co sledovat po zmene: `click_phone`, `cta_click`, `form_start`, `lead_form_submit`, `generate_lead`, kvalitu textu ve formularich, pocet poptavek s fotkou, GSC dotazy kolem kontejneru/ceny/lokalit a chovani EN stranek.
- Minimalni doba vyhodnoceni: 14-28 dni pro prvni konverzni signal, 4-8 tydnu pro SEO/GEO signal.

### 2026-06-07 - GSC a GA4 import odblokovan

- Co se zmenilo: vytvoren funkcni OAuth credential `.secrets/google-gsc-ga4-oauth.json` se scopes pro Search Console a GA4, `.env.local` prepnut na tento credential, zapnuto Google Analytics Data API pro OAuth projekt a uspesne spusten `node scripts/fetch-google-data.mjs`.
- Proc se to zmenilo: majitel chtel vyresit blokaci `Google service account` a `GA4_PROPERTY_ID`; service account nebyl na disku k dispozici, proto byl prakticky problem vyresen bezpecnym OAuth credentialem mimo git.
- Ocekavany dopad: automatizace uz mohou pracovat s realnymi GSC a GA4 daty misto oznacovani vystupu jako datove omezeny.
- Zdroj dat nebo duvod: overeny import 2026-06-07 ulozil GSC data do `/Users/claude/Documents/Claude/kontejnerovka-private-growth/data/gsc` a GA4 data do `/Users/claude/Documents/Claude/kontejnerovka-private-growth/data/ga4`.
- Kdo/automatizace zmenu navrhla: manualni oprava mereni a Google API pristupu.
- Nasazeno: lokalne ano; credential je mimo git a necommituje se.
- Commit:
- Co sledovat po zmene: pravidelny beh `node scripts/fetch-google-data.mjs`, platnost OAuth credentialu, GSC impressions/clicks, GA4 eventy `form_start`, `cta_click`, `generate_lead`, `click_phone` a `lead_form_submit`.
- Minimalni doba vyhodnoceni: import je funkcni hned; SEO/konverzni trendy vyhodnocovat po 4-8 tydnech.

### 2026-06-07 - lokalni konfigurace Google API pro GSC a GA4

- Co se zmenilo: doplnen `.env.example`, lokalni ignorovany `.env.local`, automaticke nacitani env promennych pres `scripts/load-env.mjs`, preflight kontrola `scripts/check-google-config.mjs` a aktualizovane Google import skripty; `GA4_PROPERTY_ID` je nastavene na potvrzenou hodnotu `538305751`.
- Proc se to zmenilo: drive automatizace hlasily dve blokace najednou - chybejici service account a chybejici `GA4_PROPERTY_ID`; cilem bylo odstranit vse, co lze vyresit lokalne bez tajnych udaju v gitu.
- Ocekavany dopad: jednodussi a bezpecnejsi spousteni GSC/GA4 importu, mene falesnych blokaci v reportech a jasny dalsi krok pro majitele nebo spravce pristupu.
- Zdroj dat nebo duvod: reporty a dokumentace uz drive potvrzovaly GA4 property `538305751`; service account JSON na disku nalezen nebyl.
- Kdo/automatizace zmenu navrhla: manualni uprava mereni a SEO infrastruktury.
- Nasazeno: ne, lokalni konfigurace pripravena v pracovnim stromu; realny service account klic se necommituje.
- Commit:
- Co sledovat po zmene: vystup `node scripts/check-google-config.mjs`, uspesnost `node scripts/fetch-google-data.mjs`, pristup service accountu do Search Console a GA4, a pravidelne plneni privatni datove slozky.
- Minimalni doba vyhodnoceni: ihned po vlozeni realneho JSON klice a pridani opravneni v GSC/GA4.

### 2026-06-07 - GEO 10/10 pripravenost webu

- Co se zmenilo: doplneny viditelne GEO/AI summary bloky na hlavni ceske a anglicke stranky, sjednocena schema identita pres `https://kontejnerovka.cz/#localbusiness`, rozsirena `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `CollectionPage`, `ContactPage` a `WebSite` JSON-LD data, doplneny lokalni FAQ bloky u anglickych lokalit, expat slovnicek v anglicke poradne, schema/canonical u utility stranek a zkraceny posledni dlouhy EN meta description.
- Proc se to zmenilo: cilem bylo dotahnout web na GEO pripravenost ve dvou smyslech - Generative Engine Optimization pro AI odpovedi a local/geographic readiness pro Prahu, Stredocesky kraj a konkretni obce.
- Ocekavany dopad: lepsi citelnost entity Kontejnerovka.cz pro AI systemy, stabilnejsi lokalni kontext pro Prahu, Prague-West, Prague-East, Unhost, Nucice, Rudna, Kladno, Hostivice a Beroun, prirozenejsi odpovedi na otazky zakazniku a jasnejsi cesta k telefonu nebo poptavce.
- Zdroj dat nebo duvod: manualni master GEO audit a pozadavek dotahnout vsechny doporucene upravy na produkcni standard 10/10.
- Kdo/automatizace zmenu navrhla: manualni senior GEO strateg, SEO specialista, lokalni SEO expert, copywriter, technicky auditor a AI search specialista.
- Nasazeno: ne, pripraveno v pracovnim stromu.
- Commit:
- Co sledovat po zmene: GSC dotazy s lokalitami a sluzbami, indexaci `/en/`, zobrazeni a CTR lokalitnich stranek, kliknuti na telefon, odeslane formulare, kvalitu EN poptavek, AI citace/odpovedi rucnim monitoringem v ChatGPT, Perplexity a Google AI Overviews, a jestli realne poptavky odpovidaji posilenym lokalitam.
- Minimalni doba vyhodnoceni: 4-8 tydnu pro organicky a AI signal, 14-28 dni pro prvni konverzni signal po nasazeni.

### 2026-06-05 - GSC near-win SEO uprava podle exportu

- Co se zmenilo: podle exportu Google Search Console byly zpresneny titulky, meta descriptions, H1 a lokální copy u stranek `odvoz-zeminy.html`, `kontejner-na-zeminu.html`, `dovoz-kacirku.html` a `kontejnery-praha-zapad.html`; doplneny prirozene interni odkazy pro dotazy zemina Praha-zapad, kontejner na zeminu a kacirek Praha.
- Proc se to zmenilo: export z 2026-06-05 ukazal velmi rany, ale uzitecny signal: homepage mela 3 prokliky / 47 zobrazeni, lokalni a servisni stranky se zacinaji zobrazovat kolem pozic 4-10, zatimco dotazy `odvoz zeminy praha zapad` a `kontejner na zeminu` jsou jeste dal a potrebuji silnejsi on-page kontext.
- Ocekavany dopad: lepsi relevance pro konkretni lokalni a materialove dotazy, vetsi sance na posun near-win stranek a prirozenejsi cesta z lokalni stranky na konkretni sluzbu.
- Zdroj dat nebo duvod: `/Users/claude/Downloads/https___kontejnerovka.cz_-Performance-on-Search-2026-06-05.zip`, typ vyhledavani Web, filtr Posledni 3 mesice.
- Kdo/automatizace zmenu navrhla: manualni GSC SEO/CRO interpretace.
- Nasazeno: ne, pripraveno v pracovnim stromu.
- Commit:
- Co sledovat po zmene: dotazy `odvoz zeminy praha zapad`, `kontejner na zeminu`, `dovoz kacirku`, `kacirek praha`; dale stranky `/odvoz-zeminy.html`, `/kontejner-na-zeminu.html`, `/dovoz-kacirku.html`, `/kontejnery-praha-zapad.html`.
- Minimalni doba vyhodnoceni: 4-8 tydnu, protoze aktualni export ma zatim jen desitky zobrazeni a jednotky kliknuti.

### 2026-06-04 - anglicka verze webu `/en/`

- Co se zmenilo: vytvorena samostatna anglicka verze indexovatelnych stranek v adresari `/en/`, vcetne homepage, sluzeb, ceniku, lokalit, poradny, kontaktu, privacy, thank-you a 404; doplneny anglicke meta titles, meta descriptions, CTA, formularove texty, FAQ/poradenske texty, JSON-LD, canonical a hreflang.
- Proc se to zmenilo: cilem je prirozena anglicka lokalizace pro anglicky mluvici zakazniky v Praze a Stredoceskem kraji, ne doslovny preklad ceskeho webu.
- Ocekavany dopad: lepsi srozumitelnost pro expaty a anglicky mluvici zakazniky, jasnejsi cesta k telefonu/poptavce a technicky cista mezinarodni struktura bez strojoveho prekladu.
- Zdroj dat nebo duvod: manualni lokalizacni/copy/SEO zadani podle aktualnich ceskych stranek a pozadavku na produkcni vystup 10/10.
- Kdo/automatizace zmenu navrhla: manualni master copywriter, SEO strateg, lokalizacni specialista a webovy editor.
- Nasazeno: ne, pripraveno v pracovnim stromu.
- Commit:
- Co sledovat po zmene: indexaci `/en/`, hreflang pary v Google Search Console, kliknuti na telefon z anglickych stranek, odeslane anglicke formulare a dotazy z lokalit Prague, Prague-West, Unhošť, Nučice, Rudná, Kladno, Hostivice a Beroun.
- Minimalni doba vyhodnoceni: 4-8 tydnu pro prvni organicky signal, 14-28 dni pro konverzni signal po nasazeni.

### 2026-06-04 - finalni 10/10 polish anglicke verze

- Co se zmenilo: anglicka homepage a pricing dostaly plne lokalizovanou orientacni kalkulacku; `script.js` byl doplnen o anglicke vysledky, faktory, shrnuti a vlozeni odhadu do formulare; servisni stranky byly zjemneny, aby neopakovaly duplicitni sablonovy blok.
- Proc se to zmenilo: prvni anglicka verze byla produkcne silna, ale pro standard 10/10 bylo potreba dotahnout interaktivni konverzni cestu a odstranit posledni sablonovitost.
- Ocekavany dopad: vyssi duvera u anglicky mluvicich zakazniku, lepsi kvalita poptavek, jasnejsi cesta z nejistoty ohledne ceny do formulare nebo telefonu.
- Zdroj dat nebo duvod: rucni finalni QA po lokalizaci a pozadavek majitele dotahnout anglickou verzi na 10/10.
- Kdo/automatizace zmenu navrhla: manualni master CRO/copy/localization polish.
- Nasazeno: ne, pripraveno v pracovnim stromu.
- Commit:
- Co sledovat po zmene: `calculator_start`, `calculator_inquiry_click`, `calculator_use_in_form`, kliknuti na telefon, odeslane EN formulare a kvalitu textu poptavek z kalkulacky.
- Minimalni doba vyhodnoceni: 14-28 dni pro konverzni signal, 4-8 tydnu pro SEO signal.

### 2026-06-04 - master copy polish webu na 10/10 smer

- Co se zmenilo: prepsana hlavni obchodni sdeleni na homepage, ceníku, referencich, o nas a vybranych lokalnich strankach; odstranena viditelna interni SEO rec, zmirnen slabsi "budeme doplnovat" ton a rozbita sablonovitost lokalnich CTA.
- Proc se to zmenilo: texty byly vecne silne, ale misty prilis dlouhe, opakovane a znejici jako SEO strategie misto prime komunikace se zakaznikem.
- Ocekavany dopad: lepsi prvni dojem, jasnejsi cesta k telefonu/poptavce, vetsi duvera u referenci a prirozenejsi lokalni stranky bez umele duplicity.
- Zdroj dat nebo duvod: manualni master copy/CRO audit podle aktualniho obsahu webu a pozadavku majitele na vystup 10/10.
- Kdo/automatizace zmenu navrhla: manualni master copy polish.
- Nasazeno: ne, pripraveno v pracovnim stromu.
- Commit:
- Co sledovat po zmene: kliknuti na telefon, odeslane formulare, chovani na homepage, ceníku a referencich, dotazy na cenu a zda lokalni stranky neprichazeji o organicky vykon.
- Minimalni doba vyhodnoceni: 14-28 dni pro prvni konverzni signal, 4-8 tydnu pro organicky dopad.

### 2026-05-27 - zjednoduseni SEO automatizaci na rustovy rytmus

- Co se zmenilo: denni technicka kontrola byla zrusena jako samostatny provozni format a plan automatizaci byl prestaven na jednodussi rytmus 4x za mesic plus kvartalni strategicky audit.
- Proc se to zmenilo: denni kontrola neprinasela pro maly lokalni web dost nove hodnoty a hrozilo, ze system bude vyrabet vice sumu nez rozhodnuti.
- Ocekavany dopad: mene zbytecnych kontrol, lepsi navaznost na historii, srozumitelnejsi doporuceni pro majitele a vice realnych malych kroku, ktere mohou web posouvat.
- Zdroj dat nebo duvod: master revize provozniho systemu podle aktualniho stavu webu, dokumentace a potreb majitele.
- Kdo/automatizace zmenu navrhla: master navrh provozniho SEO systemu.
- Nasazeno: ano, v dokumentaci a provoznim planu.
- Commit:
- Co sledovat po zmene: jestli master SEO kontrola prinasi lepsi doporuceni nez puvodni denni monitoring a jestli se pravidelne zapisuje historie zmen a doporuceni.
- Minimalni doba vyhodnoceni: 4-8 tydnu, aby bylo videt, jestli novy rytmus vede k lepsim rozhodnutim a mensimu sumu.

### 2026-05-27 - centralni reporty automatizaci

- Co se zmenilo: byla zalozena slozka `docs/reports/` a mesicni centralni report `docs/reports/2026-05.md`, kam se maji zapisovat kratke vystupy vsech SEO automatizaci.
- Proc se to zmenilo: bez jednoho centralniho mista se hure vyhodnocuje, co automatizace doporucovaly, co se opakovalo a co skutecne vedlo ke zmene.
- Ocekavany dopad: lepsi orientace v historii rozhodnuti, jednodussi vyhodnoceni po 2, 3 a 6 mesicich a mensi riziko, ze se doporuceni ztrati mezi vice dokumenty.
- Zdroj dat nebo duvod: master uprava provozniho systemu.
- Kdo/automatizace zmenu navrhla: master navrh automatizacniho reportingu.
- Nasazeno: ano, v dokumentaci a reportovaci strukture.
- Commit:
- Co sledovat po zmene: jestli vsechny dalsi automatizace opravdu zapisují kratky souhrn do mesicniho reportu a jestli se z reportu da rychle poznat priorita a dalsi krok.
- Minimalni doba vyhodnoceni: 1-2 mesice, aby vzniklo dost zaznamu pro porovnani.

### 2026-05-27 - vizualni master polish a social preview

- Co se zmenilo: posilena vizualni identita homepage, doplnen blok pro rychle naceneni v hero sekci, rozsireny duveryhodnostni pruh, pridana sekce pro realne vizualni dukazy a vytvoren OG obrazek `assets/og-kontejnerovka.png`.
- Proc se to zmenilo: web mel silny obsah a SEO zaklad, ale nejvetsi rezerva byla v brandingu, art direction, premium dojmu a priprave na realne fotky.
- Ocekavany dopad: lepsi prvni dojem, vetsi duvera pred telefonatem/poptavkou a profesionalnejsi vzhled pri sdileni webu.
- Zdroj dat nebo duvod: manualni master audit podle aktualniho stavu webu a zpetne vazby k vizualni identite.
- Kdo/automatizace zmenu navrhla: manualni master visual/CRO polish.
- Nasazeno: ano, po commitu/pushi a overeni produkce.
- Commit:
- Co sledovat po zmene: mobilni hero, kliknuti na telefon, odeslani formulare, zobrazeni homepage a budouci doplneni realnych fotek.
- Minimalni doba vyhodnoceni: 14-28 dni pro konverzni signal, fotky doplnovat prubezne po realnych zakazkach.

### 2026-05-26 - zalozeni systemu rustu

- Co se zmenilo: zalozena dokumentace pro 6mesicni system rustu webu.
- Proc se to zmenilo: bez baseline, scorecard, backlogu a logu nelze ferove vyhodnotit rust.
- Ocekavany dopad: lepsi rozhodovani podle dat a mensi riziko nahodnych SEO zasahu.
- Navrhla: manualni priprava podle master promptu.
- Nasazeno: ano, po commitu/pushi dokumentace.
- Co sledovat: zda jsou doplnovana GSC/GA4 data a rucni poptavky.

### 2026-05-26 - ochrana provoznich dokumentu pred indexaci

- Co se zmenilo: do `robots.txt` bylo pridano `Disallow: /docs/`.
- Proc se to zmenilo: provozni SEO dokumenty maji slouzit automatizacim a majiteli, ne jako verejny obsah pro vyhledavace.
- Ocekavany dopad: mensi riziko, ze se technicke deniky, scorecardy a backlogy objevi v indexu.
- Navrhla: manualni priprava systemu rustu.
- Nasazeno: ano, po commitu/pushi.
- Co sledovat po zmene: sitemap musi zustat dostupna a produkcni SEO stranky nesmi byt blokovane.

### 2026-05-26 - master audit a zprisneni automatizaci

- Co se zmenilo: probehl audit vsech Kontejnerovka automatizaci, byl doplnen `docs/automation-audit.md` a do planu byla pridana mesicni automatizace pro mereni a konverze.
- Proc se to zmenilo: system mel dobry zaklad, ale pro realny rust nesmi chybet samostatna kontrola dat, konverzi, formularu, GA4 a rucni evidence poptavek.
- Ocekavany dopad: lepsi rozhodovani podle skutecnych dat a mensi riziko, ze se budou delat obsahove upravy bez vazby na poptavky.
- Navrhla: master kontrola automatizaci.
- Nasazeno: ano, po aktualizaci automatizaci, commitu a pushi.
- Co sledovat po zmene: jestli se pravidelne doplnuji lead data a jestli mesicni audit mereni potvrzuje funkcni konverze.

### 2026-05-26 - oprava GitHub Pages nasazeni

- Co se zmenilo: pridan vlastni workflow `.github/workflows/pages.yml` pro build a deploy statickeho webu, GitHub Pages byl prepnut z `legacy` na `workflow` rezim a `actions/checkout` byl aktualizovan na `v6`.
- Proc se to zmenilo: defaultni GitHub Pages legacy build selhal pri stahovani akce `actions/upload-pages-artifact@v3`, jeste pred samotnym buildem webu.
- Ocekavany dopad: stabilnejsi nasazeni a mensi riziko, ze se do verejneho webu dostanou interni `docs/` nebo `scripts/`.
- Navrhla: reakce na GitHub e-mail `Run failed: pages build and deployment`.
- Nasazeno: ano, posledni GitHub Actions deploy probehl uspesne a produkcni web vraci HTTP 200.
- Co sledovat po zmene: dalsi push musi spustit pouze workflow deploy bez legacy Pages chyboveho e-mailu.

### 2026-05-27 - orientacni kalkulacka ceny

- Co se zmenilo: na homepage a stranku `cenik.html` byla pridana orientacni kalkulacka narocnosti/ceny podle typu zakazky, lokality, velikosti, pristupu a terminu. Kalkulacka umi vlozit shrnuti do hlavniho poptavkoveho formulare.
- Proc se to zmenilo: navstevnik casto nechce hned posilat dlouhy formular, ale potrebuje rychle pochopit rad narocnosti a dalsi krok. Kalkulacka snizuje nejistotu z ceny a vede k telefonu nebo poptavce.
- Ocekavany dopad: vice prokliku na telefon/poptavku, lepsi pochopeni faktoru ceny a vyssi kvalita poptavek diky predvyplnenemu shrnuti.
- Zdroj dat nebo duvod: master CRO/UX navrh podle pozadavku na rychly orientacni odhad `material x objem x km` bez falesne presneho ceniku.
- Kdo/automatizace zmenu navrhla: manualni master CRO uprava.
- Nasazeno: ano, po commitu/pushi a produkcnim overeni v tomto behu.
- Commit:
- Co sledovat po zmene: eventy `calculator_start`, `calculator_complete`, `calculator_call_click`, `calculator_inquiry_click`, `calculator_use_in_form`, kliknuti na telefon, odeslane formulare a kvalitu poptavek.
- Minimalni doba vyhodnoceni: 14-28 dni pro prvni konverzni signal, presnost odhadu upravit az podle realnych zakazek.

### 2026-06-09 - mobile-first audit a vykonnostni uprava

- Co se zmenilo: zkontrolovan cely web na mobilnich sirkach 360, 390 a 430 px; zvetseny tap targety v headeru a jazykovem prepinaci, upraven sticky mobilni CTA text na `Ziskat cenu` / `Get quote`, zkracena cookie lista, zjednoduseny mobilni hero efekt, zmenseny mobilni hero lead a odlozeno nacitani `lucide.min.js` az po prvnim loadu.
- Proc se to zmenilo: mobilni navstevnik musi rychle pochopit cenu, zavolat nebo poslat poptavku bez zbytecneho prekryvani, malych dotykovych ploch a tezkych prvku v prvni obrazovce.
- Ocekavany dopad: pohodlnejsi ovladani na telefonu, mene friction v prvni obrazovce, lepsi mobilni konverzni cesta, mensi blokovani uvodniho vykresleni a lepsi dostupnost telefonu/poptavky.
- Zdroj dat nebo duvod: manualni master mobile-first audit, Browser kontrola, automaticky scan 100 HTML stranek na 360/390/430 px, Lighthouse mobile a realna kontrola menu, CZ/EN prepinace a formulare.
- Kdo/automatizace zmenu navrhla: manualni senior UX/CRO/frontend audit podle pozadavku na mobile-first web.
- Nasazeno: pripraveno k nasazeni v tomto commitu.
- Commit:
- Co sledovat po zmene: mobilni kliknuti na telefon, kliknuti na `Ziskat cenu` / `Get quote`, start a dokonceni formulare, bounce rate z mobilu, Core Web Vitals v GSC a realne poptavky z telefonu.
- Minimalni doba vyhodnoceni: 14-28 dni pro konverzni signaly a 28+ dni pro stabilnejsi GSC/Core Web Vitals data.

### 2026-06-15 - P1 lokalni SEO landing pages po master auditu

- Co se zmenilo: vytvoreny nove money landing pages `odvoz-suti-kladno.html`, `odvoz-suti-praha-zapad.html`, `odvoz-suti-hostivice.html`, `odvoz-zeminy-kladno.html`, `kontejner-na-beton.html` a `zemni-prace-kladno.html`; zpresneny title/H1/schema a interni odkazy na `pristaveni-kontejneru.html`, `odvoz-betonu.html`, `kontejnery-kladno.html`, `kontejnery-praha-zapad.html`, `cenik.html`, `index.html`, `sluzby.html` a `lokality.html`; doplnena sitemap, `llms.txt`, README a generator mini formularu.
- Proc se to zmenilo: audit ukazal chybejici samostatne URL pro nejblizsi komercni dotazy typu `odvoz suti Kladno`, `odvoz suti Praha-zapad`, `odvoz suti Hostivice`, `odvoz zeminy Kladno`, `kontejner na beton`, `zemni prace Kladno` a slabe pokryti `pronajem kontejneru`.
- Ocekavany dopad: vice vstupnich stranek pro lokalni hledani s vysokym nakupnim zamerem, lepsi rozdeleni zameru mezi obecne a lokalni URL, silnejsi interni prolinkovani na telefon/poptavku.
- Zdroj dat nebo duvod: manualni master SEO/CRO audit podle zadani na lokalni sluzby, kontejnerovou dopravu, sut, zeminu a zemni prace.
- Kdo/automatizace zmenu navrhla: manualni master SEO implementace.
- Nasazeno: pripraveno k nasazeni v tomto commitu.
- Commit:
- Co sledovat po zmene: GSC imprese a pozice pro nove URL, kliknuti na telefon, odeslani mini formularu, dotazy s lokalitami Kladno/Praha-zapad/Hostivice a pripadne kanibalizaci s puvodnimi obecnymi strankami.
- Minimalni doba vyhodnoceni: 28-56 dni pro organicke signaly, 14-28 dni pro prvni konverzni signal z internich prokliku.

### 2026-06-18 - decision layer a trust bloky na money pages

- Co se zmenilo: doplneny bloky objemu a volby velikosti na homepage, `cenik.html`, `kontejner-na-sut.html`, `odvoz-suti.html`, `odvoz-zeminy.html`, `kontejner-na-zeminu.html`, `pristaveni-kontejneru.html` a `technika.html`; posilene wordingy k dokladum, orientacni cenove hladiny bez pevneho ceníku, interni prolinkovani a vysvetleni mini-realizaci na `reference.html` a `o-nas.html`.
- Proc se to zmenilo: konkurencni kontrola ukazala, ze nejvetsi mezera nebyla dalsi lokalitni URL, ale slabsi rozhodovaci vrstva pred telefonatem.
- Ocekavany dopad: vyssi ochota zavolat nebo poslat formular z money pages, mene nejistoty kolem velikosti kontejneru, ceny a dokladu.
- Zdroj dat nebo duvod: master SEO/CRO implementace po konkurencnim pruzkumu a po manualni kontrole produkce.
- Kdo/automatizace zmenu navrhla: manualni master SEO implementace.
- Nasazeno: ano, po commitu `c95a291`, pushi na `main` a GitHub Pages deploy 2026-06-18.
- Commit: `c95a291`
- Co sledovat po zmene: kliknuti na telefon, odeslane formulare, vstupy na `cenik.html`, `kontejner-na-sut.html`, `odvoz-suti.html`, `odvoz-zeminy.html` a prvni GSC zmeny u techto URL.
- Minimalni doba vyhodnoceni: 14-30 dni pro prvni konverzni signal, 28-56 dni pro stabilnejsi organicky signal.

## Sablona dalsiho zapisu

### RRRR-MM-DD - nazev upravy

- Co se zmenilo:
- Proc se to zmenilo:
- Ocekavany dopad:
- Zdroj dat nebo duvod:
- Kdo/automatizace zmenu navrhla:
- Nasazeno: ano/ne
- Commit:
- Co sledovat po zmene:
- Minimalni doba vyhodnoceni:
