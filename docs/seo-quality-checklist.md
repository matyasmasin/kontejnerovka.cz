# Kontejnerovka.cz - quality checklist

Tento checklist pouzivat pred commitem/pushem, pokud automatizace nebo clovek meni web, obsah, sitemapu nebo technicke SEO.

## Povinne kontroly

- [ ] Pracuji ve spravnem repozitari: `/Users/claude/Documents/Claude/parkovani-ruzyne.cz/autoservis1.cz/kontejnery`
- [ ] Web je stale `https://kontejnerovka.cz`
- [ ] Branch je spravna a `git status` neobsahuje neocekavane zmeny.
- [ ] Zmena ma zapis v `docs/seo-content-log.md`, pokud meni obsah, SEO nebo konverze.
- [ ] Vetsi navrh je v `docs/seo-opportunities.md`, pokud vyzaduje schvaleni majitele.
- [ ] HTML hlavni upravene stranky nema zjevnou syntaktickou chybu.
- [ ] JSON-LD jde parsovat jako JSON.
- [ ] Canonical URL odpovida produkcni URL.
- [ ] Title a meta description davaji smysl pro danou stranku.
- [ ] H1 je jen jeden hlavni nadpis a odpovida ucelu stranky.
- [ ] Interni odkazy funguji a nevedou na chybejici soubor.
- [ ] Sitemap obsahuje nove/dulezite URL, pokud byla pridana stranka.
- [ ] Robots.txt stale odkazuje na produkcni sitemapu.
- [ ] Mobilni zobrazeni hlavni upravene URL nepreteka a CTA zustava pouzitelne.
- [ ] Text neni SEO spam, nema umele opakovani slov a pomaha zakaznikovi.
- [ ] Nebyly pridany vymyslene recenze, fotky, reference ani neoverena tvrzeni.
- [ ] Pokud se zmenil web, probehl commit a push nebo je jasne napsane, proc ne.

## Stop pravidla

Neprovadet nebo necommitovat zmenu, pokud:

- chybi jasny duvod a ocekavany dopad,
- zmena by vytvorila duplicitni lokalni stranku bez hodnoty,
- web byl stejna stranka vyrazne menen pred mene nez 14-28 dny a nejde o P0 chybu,
- nejsou data a jde jen o pocitovou zmenu,
- zmena zasahuje mimo zadani.

