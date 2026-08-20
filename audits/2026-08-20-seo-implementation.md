# SEO implementation — Kontejnerovka.cz

Datum: 2026-08-20
Navazuje na: `audits/2026-08-20-master-seo-audit.md`

## Dokončené změny

- Sjednocený cache-busting CSS, JS a ikon na SHA-256 hash obsahu. Aktuální hash je `4202e8c98c` a synchronizační skript aktualizuje všech 116 HTML šablon.
- GA4 se načítá po prvním renderu v idle čase; přímá interakce stále spustí loader okamžitě, aby se událost neztratila.
- Událost `generate_lead` byla v GA4 označena jako klíčová událost. Kód současně obsahuje `click_phone`, `click_email`, `lead_form_submit` a deduplikovaný lead z děkovací stránky.
- Velké fotografie byly nahrazeny responzivními a rozměrově vhodnými WebP variantami. Kritický obrázek na `/odvoz-suti.html` klesl z 813 kB na 143 kB.
- Pro mobilní homepage byly vytvořeny malé varianty obrázků karet a responzivní portrét provozovatele.
- Opraven kontrast na homepage i podstránkách; testované šablony nyní procházejí Lighthouse accessibility se skóre 100.
- Upraveny title a description prioritních stránek `/kontejnery-unhost.html`, `/lokality.html`, `/odvoz-zeminy-kladno.html`, `/vykop-bazenu.html`, `/vykop-jezirka.html` a `/vyklizeni-odpad.html`.
- Posíleny interní odkazy na osm GSC opportunity pages. Každá má nyní alespoň sedm různých zdrojových stránek; tento limit hlídá `seo-growth-gate`.
- Aktualizovány pravdivé `lastmod` hodnoty v sitemapě pro obsahově změněné stránky.
- Generátory lokálních, zemních a anglických stránek používají stejný obsahový hash a nové obrázkové assety.

## Lighthouse po změnách

Stejný lokální testovací režim jako v auditu. Hodnoty jsou laboratorní a mezi běhy mohou mírně kolísat.

| Stránka / režim | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | Přenos |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage mobil | 90 | 100 | 100 | 100 | 1,95 s | 3,38 s | 0 | 0,72 MB |
| Homepage desktop | 97 | 100 | 100 | 100 | 0,40 s | 1,20 s | 0,0002 | 2,34 MB |
| Ceník mobil | 94 | 100 | 100 | 100 | 1,96 s | 2,86 s | 0 | 0,50 MB |
| Odvoz suti mobil | 91 | 100 | 100 | 100 | 1,97 s | 3,33 s | 0 | 0,65 MB |

Oproti výchozímu auditu se mobilní Performance zlepšilo z 72 na 90 na homepage, ze 77 na 94 na ceníku a ze 76 na 91 na odvozu suti.

## Ověření

- `node scripts/site-quality-gate.mjs` — prošlo, 117 HTML souborů, bez rozbitých lokálních referencí.
- `node scripts/seo-growth-gate.mjs` — prošlo, 75 sitemap URL, osm opportunity pages a konverzní události.
- Syntaxe všech dotčených JS/MJS generátorů a Python generátoru — prošla.
- Lighthouse: všechny čtyři finální testy mají Accessibility, Best Practices a SEO 100.

## Zbývající externí kroky

1. GA4 propojení s ověřenou Search Console property `kontejnerovka.cz` je připravené na finálním tlačítku **Odeslat**. Dokončení vyžaduje souhlas, protože aktivuje obousměrné sdílení dat a zpřístupní oprávněným uživatelům e-mail propojujícího účtu.
2. Read-only GA4/GSC API OAuth stále vrací `invalid_grant`; je potřeba znovu autorizovat lokální credential.
3. Ostrý test Web3Forms formuláře vytvoří skutečnou externí zprávu. Má smysl ho provést až po výslovném souhlasu a se syntetickými testovacími údaji.
4. `/index.html` nelze na statickém GitHub Pages webu přesměrovat serverovým 301 jen změnou tohoto repozitáře. Vyžaduje hosting/CDN pravidlo.
5. Reálné recenze, lokální citace, fotografie realizací a skutečné cenové příklady musí dodat nebo schválit provozovatel; nebyly doplněny smyšlenými daty.
