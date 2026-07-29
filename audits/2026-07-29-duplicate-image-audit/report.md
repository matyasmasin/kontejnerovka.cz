# Kontrola opakovaných fotografií

Datum kontroly: 29. 7. 2026

## Rozsah

- 117 produkčních HTML stránek v české a anglické verzi
- všechny lokální rastrové obrázky načítané přes `src`, `srcset` a `poster`
- vizuální kontrola dotčených sekcí na stránkách Technika a Realizace
- kontrola desktopového zobrazení a načtení opravených obrázků

## Výsledek

Kontrola našla dvě problematické dvojice. V obou případech byly vedle sebe použité dva téměř shodné snímky stejného auta ze stejného místa:

1. `technika.html` — sekce „Tohle auto skutečně jezdí vaše zakázky“
2. `reference.html` — sekce „Vlastní technika zblízka“

Druhý snímek byl v obou sekcích nahrazen výrazně odlišnou vlastní fotografií `assets/iveco-ruka-8t-fixed.webp`, která ukazuje nakládku stavebního materiálu vysokozdvižným vozíkem.

Po opravě:

- 0 chybějících lokálních obrázků
- 0 stejných nebo vizuálně téměř shodných dvojic obrázků uvnitř jedné produkční stránky
- nové fotografie mají odpovídající rozměry, popisky a alternativní text

## Kroky a stav

1. Technika před opravou — problém potvrzen
2. Realizace před opravou — stejný problém potvrzen
3. Technika po opravě — v pořádku
4. Realizace po opravě — v pořádku

## Přístupnost a limity

Alternativní text nové fotografie přesně popisuje viditelnou situaci. Kontrola podobnosti zahrnuje obsahové obrázky vložené do HTML; dekorativní CSS pozadí a sociální náhledové obrázky nejsou považované za galerijní karty. Ze samotných screenshotů nelze potvrdit úplnou shodu s WCAG.

## Důkazy

- `01-technika-before.jpg`
- `02-reference-before.jpg`
- `03-technika-after.jpg`
- `04-reference-after.jpg`
