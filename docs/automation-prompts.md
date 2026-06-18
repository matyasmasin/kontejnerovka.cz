# Kontejnerovka.cz - specifikace automatizaci pro Codex app

Tento dokument je pripraveny jako zdroj pravdy pro nastaveni automatizaci v Codex app. Pokud je budes vytvaret nebo upravovat rucne v aplikaci, kopiruj logiku odsud.

## Spolecna pravidla pro vsechny automatizace

- Web je `https://kontejnerovka.cz`
- Workspace je `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery`
- Vzdy precist:
  - `docs/automation-plan.md`
  - `docs/kontejnerovka-rust-webu.md`
  - `docs/seo-content-log.md`
  - `docs/seo-opportunities.md`
  - `docs/seo-scorecard.md`
- Pokud jde o SEO, mereni nebo konverze, zkusit `node scripts/fetch-google-data.mjs`
- Vystup ma byt jednoduse cesky pro majitele bez IT/SEO znalosti
- Maximalne 3 doporuceni
- Vzdy 1 nejlepsi dalsi krok
- Kdyz chybi data, napsat `nelze overit`
- Po kazdem behu zapsat kratky souhrn do `docs/reports/YYYY-MM.md`

## Aktualni operacni stav k 2026-06-07

- GA4 property pro `Kontejnerovka.cz` je potvrzena jako `538305751`.
- Google Business Profile `kontejnerovka.cz` existuje a je overeny.
- Ve WEDOS DNS byl 2026-05-28 pridan TXT zaznam pro Search Console overeni domeny `kontejnerovka.cz`.
- Google pristup je funkcni pres lokalni OAuth credential `.secrets/google-gsc-ga4-oauth.json`, ulozeny mimo git.
- `node scripts/check-google-config.mjs` i `node scripts/fetch-google-data.mjs` byly 2026-06-07 overene.
- GSC a GA4 data se ukladaji mimo verejny web do `/Users/claude/Documents/Claude/kontejnerovka-private-growth/data`.
- Pokud dalsi beh resi mereni, SEO nebo lokalni duveru, ma nejdriv zkusit `node scripts/fetch-google-data.mjs` a pri uspechu pouzit aktualni data.

## 1. Master SEO kontrola

- ID: `kontejnerovka-master-seo-kontrola`
- Frekvence: 2x za mesic
- Typ: hodnotici, bez zasahu do webu

### Prompt

Pro web Kontejnerovka.cz proved master SEO kontrolu. Nejde o denni monitoring ani o dlouhy audit. Cilem je podivat se na web, dostupne dokumenty a historii a rozhodnout, jaka je ted jedna nejlepsi dalsi akce pro rust webu.

Nejdriv over: web je https://kontejnerovka.cz, workspace je /Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery a branch je spravna. Precti docs/automation-plan.md, docs/kontejnerovka-rust-webu.md, docs/seo-content-log.md, docs/seo-opportunities.md, docs/seo-scorecard.md a posledni relevantni report v docs/reports/.

Pokud jde o SEO nebo mereni, nejdriv zkus spustit node scripts/fetch-google-data.mjs. Kdyz data nejsou, otevrene to napis a nic si nedomyslej.

Zkontroluj hlavni stranky, prioritni lokality, interni prolinkovani, canonical, title/meta, schema, formulare a hlavni konverzni cestu. Navaz na posledni zmeny a doporuceni. Neprovadej zadne zmeny na webu.

Vystup strukturovat: Stav, Shrnuti pro majitele, Semafor, Fakta, Hypotezy, Co chybi k jistote, Co doporucuji udelat ted, Co muze pockat, Co potrebuji od majitele, Nejlepsi dalsi krok, Zapis do dokumentu.

Zapis:
- pokud jde o zmenu smeru nebo dulezite zjisteni, zapis do docs/kontejnerovka-rust-webu.md
- kratky souhrn vzdy zapis do docs/reports/YYYY-MM.md

## 2. Mesicni obsahovy / SEO tah

- ID: `kontejnerovka-obsahovy-seo-tah`
- Frekvence: 1x za mesic
- Typ: vykonny, mala bezpecna uprava

### Prompt

Pro web Kontejnerovka.cz udelej jeden maly obsahovy nebo SEO tah na existujici strance. Cilem neni vymyslet mnoho navrhu, ale provest jednu malou bezpecnou zmenu s nejvetsim potencialem.

Nejdriv over: web je https://kontejnerovka.cz, workspace je /Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery a branch je spravna. Precti docs/automation-plan.md, docs/kontejnerovka-rust-webu.md, docs/seo-content-log.md, docs/seo-opportunities.md, docs/seo-quality-checklist.md, docs/seo-scorecard.md a posledni relevantni report v docs/reports/.

Pokud jde o SEO nebo mereni, nejdriv zkus spustit node scripts/fetch-google-data.mjs. Kdyz data nejsou, rozhoduj konzervativne.

Vyber jednu existujici stranku s nejvetsim potencialem. Muze jit o title/meta, H1/H2, kratke rozsireni textu, interni prolinkovani, CTA nebo jinou malou bezpecnou upravu. Nevytvarej novou stranku, nedel velky redesign a neupravuj vice stranek najednou bez silneho duvodu.

Po zmene:
- zapis upravu do docs/seo-content-log.md
- kratky souhrn zapis do docs/reports/YYYY-MM.md
- udelej quality checklist
- commit a push

Vystup strukturovat: Co se menilo, Proc zrovna toto, Fakta, Rizika, Co ocekavam, Nejlepsi dalsi krok, Zapis do dokumentu.

## 3. Mesicni lokalni duvera a GBP checklist

- ID: `kontejnerovka-mesicni-lokalni-duvera`
- Frekvence: 1x za mesic
- Typ: hodnotici, bez zasahu do webu

### Prompt

Pro web Kontejnerovka.cz priprav mesicni lokalni duveru a Google Business Profile checklist pro majitele. Vystup musi byt jednoduchy, kratky a prakticky.

Nejdriv over: web je https://kontejnerovka.cz, workspace je /Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery a branch je spravna. Precti docs/automation-plan.md, docs/kontejnerovka-rust-webu.md, docs/seo-content-log.md, docs/seo-opportunities.md, docs/seo-scorecard.md a posledni relevantni report v docs/reports/.

Zhodnot:
- recenze,
- realne fotky,
- reference,
- duveryhodnost webu,
- lokalni priority,
- Google Business Profile, pokud jde stav overit.

Kdyz neco nejde overit, napis nelze overit. Neprovadej zadne zmeny na webu.

Vystup strukturovat: Stav, Shrnuti pro majitele, Semafor, Fakta, Co chybi k jistote, Co doporucuji udelat ted, Co muze pockat, Co potrebuji od majitele, Nejlepsi dalsi krok, Zapis do dokumentu.

Zapis:
- kratky souhrn vzdy zapis do docs/reports/YYYY-MM.md
- pokud vznikne vetsi navrh, zapis ho do docs/seo-opportunities.md

## 4. Mesicni scorecard a mereni

- ID: `kontejnerovka-mesicni-scorecard-a-mereni`
- Frekvence: 1x za mesic
- Typ: hodnotici, bez zasahu do webu

### Prompt

Pro web Kontejnerovka.cz priprav mesicni scorecard a kontrolu mereni. Cilem je jednoduse rict majiteli, jestli web roste, co to brzdi a co ma udelat dalsi mesic.

Nejdriv over: web je https://kontejnerovka.cz, workspace je /Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery a branch je spravna. Precti docs/automation-plan.md, docs/measurement-plan.md, docs/seo-scorecard.md, docs/kontejnerovka-rust-webu.md, docs/seo-content-log.md, docs/seo-data/README.md a posledni relevantni report v docs/reports/.

Nejdriv zkus spustit node scripts/fetch-google-data.mjs. Pokud data nejsou, napis to otevrene. Zohledni i docs/seo-data/kpi-leads-template.csv, pokud je vyplneny.

Over:
- GSC a GA4 dostupnost,
- hlavni konverzni udalosti,
- formulare,
- manualni evidenci poptavek,
- scorecard proti minulemu mesici.

Neprovadej zadne zmeny na webu.

Zapis:
- aktualizuj docs/seo-scorecard.md
- kratky souhrn zapis do docs/reports/YYYY-MM.md
- pokud se meni strategicky smer, dopln docs/kontejnerovka-rust-webu.md

## 5. Kvartalni strategicky audit

- ID: `kontejnerovka-kvartalni-strategicky-audit`
- Frekvence: 1x za 3 mesice
- Typ: hodnotici, bez zasahu do webu

### Prompt

Pro web Kontejnerovka.cz proved kvartalni strategicky audit. Cilem je porovnat, co se delo v poslednich 3 mesicich, co zafungovalo, co ne a jak ma vypadat dalsi obdobi.

Nejdriv over: web je https://kontejnerovka.cz, workspace je /Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery a branch je spravna. Precti docs/automation-plan.md, docs/automation-audit.md, docs/kontejnerovka-rust-webu.md, docs/seo-content-log.md, docs/seo-opportunities.md, docs/seo-scorecard.md a vsechny relevantni mesicni reporty v docs/reports/.

Pokud jde o SEO nebo mereni, nejdriv zkus spustit node scripts/fetch-google-data.mjs.

Vyhodnot:
- co se realne zmenilo,
- co prineslo signal rustu,
- co se opakovalo bez dopadu,
- ktere typy ukolu maji smysl delat dal,
- co ma byt dalsi priorita pro 3 mesice.

Vystup musi byt jednoduchy, cesky a urceny pro majitele.

Zapis:
- hlavni zapis do docs/kontejnerovka-rust-webu.md
- kratky souhrn do docs/reports/YYYY-MM.md

## 6. Konkurenčni pruzkum 20 realnych konkurentu

- ID: `kontejnerovka-konkurecni-pruzkum-20`
- Frekvence: ad hoc / 1x za kvartal
- Typ: hodnotici, bez zasahu do webu

### Prompt

Pro web Kontejnerovka.cz proved master konkurencni pruzkum 20 realnych konkurentu z nejblizsi obsluhovane oblasti. Cilem neni napsat dlouhy obecny audit, ale pochopit, co realne funguje konkurenci v okoli a co z toho ma smysl prevzit na nas web.

Nejdriv over:
- web je `https://kontejnerovka.cz`
- workspace je `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery`
- branch je spravna

Pak precti:
- `docs/automation-master-standard.md`
- `docs/automation-plan.md`
- `docs/kontejnerovka-rust-webu.md`
- `docs/seo-opportunities.md`
- `docs/seo-scorecard.md`
- `docs/ai-search-external-trust-plan.md`
- posledni relevantni zapis v `docs/reports/`
- pokud existuje, posledni konkurencni nebo SEO audit v `docs/`

Zamereni konkurentu:
- hledej 20 realnych konkurentu nebo srovnatelnych lokalnich hracu v oblastech Svarov u Unhoste, Unhost, Nucice u Rudne, Rudna, Kladno, Hostivice, Praha-zapad, Beroun, Rakovnik, Slany, Zdice, Kraluv Dvur a nejblizsi prakticky obsluhovane okoli
- ber jen konkurenty, kteri realne nabizeji aspon cast sluzeb jako: pristaveni kontejneru, odvoz suti, odvoz zeminy, odvoz odpadu, dovoz materialu nebo zemni prace
- preferuj vlastni firemni weby; katalogy nebo mapove profily pouzij jen jako doplnkovy signal pro lokalni duveru a viditelnost

U kazdeho konkurenta over pokud mozno:
- hlavni web a hlavni lokalni/sluzbove URL
- sitemapu nebo indexovatelnou strukturu webu
- title/H1 a jestli cili presne na `sluzba + lokalita`
- navigaci, interni prolinkovani a jestli maji jasne money stranky
- cenik, orientacni cenu, objemy, nosnost, pronajem, dobu pristaveni, FAQ
- formular, telefon, CTA, fotky, reference, recenze, Google profil, NAP a dalsi trust prvky
- schema, FAQ, lokalni landing pages, blog/poradnu, techniku, vozovy park, povoleni, realizace
- jestli maji slabiny, ktere nechceme kopirovat: spam lokalit, duplicitni texty, doorway pages, slaby UX, nejasne sliby, fake trust

Konkretne zkus odpovedet na otazky:
1. Co dela 20 realnych konkurentu lepe nez Kontejnerovka.cz?
2. Co maji konkurenti slabsi a je to nase prilezitost?
3. Ktere prvky se opakuji u vice konkurentu a pravdepodobne fungují obchodne nebo SEO?
4. Co z toho ma smysl prevzit na nas web bez kopirovani a bez SEO spamu?
5. Co naopak neprebirat, i kdyz to konkurence dela casto?

Pravidla:
- pouzij internet a pracuj jen s realne overenymi strankami
- u kazdeho tvrzeni se opirej o konkretni URL, screenshot, sitemapu, title, CTA, trust signal nebo lokalni stranku
- kdyz neco nejde overit, napis `nelze overit`
- nevymyslej data o recenzich, vykonu nebo obchodnim dopadu
- nesmis doporucit slepe kopirovani textu nebo struktury konkurence
- zohledni i riziko kanibalizace a doorway pages
- AI search a lokalni duvera ber jako soucast SEO: všímej si recenzi, fotek, Google Business Profile, referenci, techniky, FAQ, lokalnich proof bodu a jasne entity
- neprovadej zmeny na webu; jde o rozhodovaci podklad

Vystup strukturovat pro majitele:
- Stav
- Shrnutí
- Semafor
- 20 konkurentu v kratke tabulce: konkurent / lokalita / co ma silne / co ma slabe / co stoji za prevzeti
- Opakujici se vzorce, ktere konkurenci zjevne fungují
- Co funguje jim a chybi nam
- Co funguje nam a jim chybi
- Co bychom meli prevzit ted
- Co neprebirat
- Fakta
- Hypotezy
- Co chybi k jistote
- Doporuceni: maximalne 3 body
- Nejlepsi dalsi krok: presne 1 akce
- Zapis do dokumentu

Ocekavany format zaveru:
- rozlis `lokalne upraveno / pushnuto / nasazeno live / zmereno`
- maximalne 3 doporuceni
- presne 1 nejlepsi dalsi krok
- jednoduse cesky, srozumitelne pro majitele bez IT

Zapis:
- pokud jde o novy strategicky smer nebo konkurencni mezeru, zapis do `docs/kontejnerovka-rust-webu.md`
- kratky souhrn zapis do `docs/reports/YYYY-MM.md`
- pokud vznikne vetsi backlog, zapis do `docs/seo-opportunities.md`
