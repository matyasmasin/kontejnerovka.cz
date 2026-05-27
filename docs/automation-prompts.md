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
