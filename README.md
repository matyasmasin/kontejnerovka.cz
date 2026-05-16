# Kontejnerovka.cz

Jednoduchý statický web pro kontejnerovou dopravu, odvoz odpadu a dovoz stavebních materiálů.

Stránky:

- `index.html` hlavní stránka
- `sluzby.html` služby a typy zakázek
- `lokality.html` lokální landing page pro Prahu a Středočeský kraj
- `cenik.html` vysvětlení nacenění
- `poradna.html` praktická poradna
- `odvoz-suti.html`, `odvoz-zeminy.html`, `dovoz-pisku-sterku.html` službové landing pages
- `kontejnery-praha.html`, `kontejnery-beroun.html`, `kontejnery-kladno.html`, `kontejnery-rakovnik.html` lokální landing pages

Lokální náhled:

```sh
python3 -m http.server 4173
```

Potom otevřít `http://127.0.0.1:4173/`.

Měření je připravené přes event hooky v `script.js`. Po vytvoření Google Analytics stačí doplnit standardní `gtag.js` snippet do hlavičky.
