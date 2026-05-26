# SEO data - navod pro majitele

Tahle slozka slouzi pro jednoduche exporty a rucni cisla. Nemusis rozumet SEO. Staci sem pravidelne doplnovat nebo ukladat data podle navodu.

## Jednou tydne

Otevri `kpi-leads-template.csv` a dopln:

- datum,
- odkud byl zakaznik, pokud to vis,
- lokalitu,
- sluzbu,
- jestli prisel telefon, formular nebo e-mail,
- jestli z toho vznikla zakazka,
- orientacni hodnotu,
- poznamku.

Jednoduse: staci jednou tydne doplnit, kolik bylo telefonatu/poptavek a odkud priblizne byly.

## Jednou mesicne - Google Search Console

Preferovana cesta je automaticky API import podle `google-api-setup.md`.

Pokud API jeste neni nastavene a mas pristup do Google Search Console:

1. Otevri vykon ve vysledcich vyhledavani.
2. Nastav obdobi za poslednich 28 dni.
3. Exportuj dotazy a stranky.
4. Uloz soubor sem jako napriklad `gsc-2026-06.csv`.

Automatizace pak z techto dat muze lepe poznat, ktere stranky rozsirit a kde se vyplati cekat.

## Jednou mesicne - GA4

Preferovana cesta je automaticky API import podle `google-api-setup.md`.

Pokud API jeste neni nastavene a mas pristup do Google Analytics:

1. Zkontroluj udalosti: kliknuti na telefon, odeslani formulare, kliknuti na e-mail.
2. Exportuj nebo opis hlavni cisla do mesicni scorecard.

Pokud export nejde, staci do scorecard dopsat cisla rucne.

## Dulezite

- Nevymyslet cisla.
- Kdyz data nejsou, napsat `nelze overit`.
- U realnych zakazek staci orientacni hodnota, neni potreba presna ucetni evidence.
- Necommitovat citliva GSC/GA4 data, poptavky ani obchodni vysledky do verejneho webu.
