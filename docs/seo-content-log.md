# Kontejnerovka.cz - log obsahovych a SEO uprav

Kazda vetsi obsahova, SEO nebo konverzni uprava musi mit zapis. Diky tomu lze po tydnech a mesicich poznat, co se zmenilo a co sledovat.

## Zaznamy

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
