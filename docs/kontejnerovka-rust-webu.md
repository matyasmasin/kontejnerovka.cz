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

