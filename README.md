# Kontejnerovka.cz

Jednoduchý statický web pro kontejnerovou dopravu, odvoz odpadu a dovoz stavebních materiálů.

Stránky:

- `index.html` hlavní stránka
- `sluzby.html` služby a typy zakázek
- `lokality.html` lokální landing page pro Prahu a Středočeský kraj
- `cenik.html` vysvětlení nacenění
- `poradna.html` praktická poradna
- `o-nas.html` důvěryhodnost, provozovatel a vozový park
- `reference.html` připravená stránka pro reálné realizace a recenze
- `pristaveni-kontejneru.html`, `kontejner-na-sut.html`, `odvoz-suti.html`, `odvoz-zeminy.html`, `odvoz-odpadu.html`, `odvoz-dreva-bioodpadu.html`, `dovoz-pisku-sterku.html`, `dovoz-recyklatu.html`, `dovoz-betonu.html` službové landing pages
- `kontejnery-praha.html`, `kontejnery-praha-5.html`, `kontejnery-praha-zapad.html`, `kontejnery-praha-vychod.html`, `kontejnery-beroun.html`, `kontejnery-horovice.html`, `kontejnery-kladno.html`, `kontejnery-slany.html`, `kontejnery-rakovnik.html` lokální landing pages

Lokální náhled:

```sh
python3 -m http.server 4173
```

Potom otevřít `http://127.0.0.1:4173/`.

Měření je připravené přes event hooky v `script.js`. Po vytvoření Google Analytics stačí doplnit standardní `gtag.js` snippet do hlavičky.

Před a po ostrém spuštění na `kontejnerovka.cz`:

- canonical URL, OpenGraph URL, sitemap a robots držet na ostré doméně
- GitHub Pages custom domain spravovat přes `CNAME`
- ověřit HTTPS certifikát a přesměrování `www`
- založit Google Search Console a odeslat sitemapu
- založit Google Business Profile
- ověřit MX záznamy pro `info@kontejnerovka.cz`
- formulář posílá poptávky přes Web3Forms na `info@kontejnerovka.cz`
- nahradit ilustrační fotky reálnými fotkami auta, kontejnerů a realizací
