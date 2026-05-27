# Kontejnerovka.cz - log obsahovych a SEO uprav

Kazda vetsi obsahova, SEO nebo konverzni uprava musi mit zapis. Diky tomu lze po tydnech a mesicich poznat, co se zmenilo a co sledovat.

## Zaznamy

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
