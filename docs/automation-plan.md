# Kontejnerovka.cz - plan automatizaci na 6 mesicu

Tento dokument popisuje automatizace, jejich smysl a pravidla. Cilem neni mnoho vystupu. Cilem jsou pravidelna, srozumitelna a datove podlozena rozhodnuti.

## Casovy horizont

- Start: 2026-05-26
- Delka: 6 mesicu
- Mezivyhodnoceni: po 3 mesicich
- Zaverecny strategicky report: po 6 mesicich

## Vytvorene typy automatizaci

| Automatizace | ID | Frekvence | Ucel | Stav |
| --- | --- | --- | --- | --- |
| Denni technicka kontrola | `kontejnerovka-denni-technicka-kontrola` | denne, 183 behu | Hlidat dostupnost, HTTPS, sitemap, robots, odkazy, formular, schema a prioritni URL. | aktivni |
| Tydenni Search Console / SEO kontrola | `kontejnerovka-tydenni-gsc-seo-kontrola` | tydne, 26 behu | Vyhodnocovat indexaci, dotazy, CTR, pozice 4-15 a jednu nejlepsi SEO akci tydne. | aktivni |
| Obsahove SEO navrhy | `kontejnerovka-obsahove-seo-navrhy` | kazde 2 tydny, 13 behu | Navrhovat nebo delat male bezpecne obsahove upravy podle dat a obchodniho potencialu. | aktivni |
| SEO refresh stranek | `kontejnerovka-seo-refresh-stranek` | kazde 4 tydny, 6 behu | Upravit maximalne 3 existujici stranky s nejvetsim potencialem. | aktivni |
| Mesicni owner scorecard | `kontejnerovka-mesicni-owner-scorecard` | mesicne, 6 behu | Jednoduse rict majiteli, jestli web roste a co udelat tento mesic. | aktivni |
| Mesicni lokalni SEO audit | `kontejnerovka-mesicni-lokalni-seo-audit` | mesicne, 6 behu | Hlidat lokality, duplicitu, doorway-page riziko a lokalni obchodni smysl. | aktivni |
| Google Business Profile checklist | `kontejnerovka-google-business-profile-checklist` | mesicne, 6 behu | Dat majiteli konkretni ukoly k recenzim, fotkam, sluzbam a GBP prispevkum. | aktivni |
| Mesicni konkurencni kontrola | `kontejnerovka-mesicni-konkurencni-kontrola` | mesicne, 6 behu | Najit konkretni mezery oproti konkurenci bez kopirovani. | aktivni |
| Kvartalni strategicky audit | `kontejnerovka-kvartalni-strategicky-audit` | 2 behy po 3 mesicich | Vyhodnotit 3 a 6 mesicu rustu a navrhnout dalsi obdobi. | aktivni |

## Spolecny standard vystupu

Kazda automatizace musi:

- overit spravny web `https://kontejnerovka.cz`,
- overit spravny workspace,
- precist posledni relevantni dokumenty,
- navazat na predchozi doporuceni,
- jasne oddelit fakta, hypotezy a doporuceni,
- oznacit vystup jako omezeny, pokud chybi GSC, GA4 nebo rucni data,
- dat maximalne 3 hlavni doporuceni,
- vybrat jednu nejlepsi dalsi akci,
- zapsat vysledek do urceneho dokumentu,
- nehalucinovat recenze, fotky, vysledky ani data.

## Pravidla pro zasahy do webu

- Monitoringove automatizace web nemeni.
- Obsahove a SEO refresh automatizace mohou provest male bezpecne upravy, pokud maji jasny duvod.
- Vetsi zmeny se zapisuji do `docs/seo-opportunities.md` a cekaji na schvaleni.
- Po uprave webu musi probehnout quality checklist, commit a push.

## Hlavni rizika, kterym se system vyhyba

- SEO spam.
- Doorway pages pro male obce bez realne hodnoty.
- Opakovane upravy stejne stranky bez dat.
- Hodnoceni uspechu po par dnech.
- Vymyslene recenze nebo nepravdive fotky.
- Spousteni reklam bez mereni konverzi.
