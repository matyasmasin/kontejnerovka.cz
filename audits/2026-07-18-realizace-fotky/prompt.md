# Produkční prompt: nové fotografie Kontejnerovka.cz

Jednej jako koordinovaný seniorní tým složený z UX/UI designéra, CRO specialisty, SEO specialisty, webového vývojáře, editora obsahu, specialisty na výkon a QA inženýra.

## Cíl

Prohlédni si živý web `https://kontejnerovka.cz/`, lokální zdrojový kód a všech šest dodaných fotografií. Vyber pro každý kvalitní a obsahově odlišný snímek místo, kde nejvíce zvýší důvěryhodnost, srozumitelnost služby a pravděpodobnost poptávky. Výsledek rovnou implementuj, otestuj a nasaď na produkci.

## Zásady

- Fotografie používej jako důkaz skutečné práce, ne jako dekoraci.
- Nevymýšlej obec, datum, typ nákladu, cenu, zákaznickou recenzi ani výsledek, který z podkladů nelze ověřit.
- Nezveřejňuj přesnou adresu zákazníka.
- Kurátoruj: téměř totožné nebo kompozičně slabší snímky nemusí být použity.
- Zachovej současný vizuální systém webu, jeho tón hlasu a responzivní chování.
- Připrav popisné české i anglické `alt` texty a texty bez keyword stuffingu.
- Obrázky optimalizuj pro web, odstraň metadata, nastav správné rozměry a lazy loading mimo kritický hero obsah.
- Nezhorši LCP, CLS, mobilní použitelnost, formulář ani navigaci.
- Chraň existující rozpracované změny v repozitáři a commituj pouze soubory související s tímto zadáním.

## Doporučená informační architektura

1. Stránka Realizace: vytvoř z nejsilnějších a vzájemně odlišných záběrů skutečný případový blok s kontextem místa, podmínkami přístupu, technikou a galerií.
2. Hero stránky Realizace: použij nejsilnější široký záběr, pokud má vhodnou kompozici pro textový překryv.
3. Hlavní stránka: použij jeden akční záběr u karty Přistavení kontejneru a odkaž na odpovídající službu.
4. Stránka Přistavení kontejneru: nahraď obecnější fotografii snímkem z reálného výjezdu.
5. Anglické ekvivalenty uprav tam, kde se změna týká stejného obsahu.

## Kontrola kvality před nasazením

- Validní HTML a funkční odkazy na nové obrázky.
- Správné relativní cesty v české i anglické verzi.
- Kontrola na desktopu a mobilu v reálném prohlížeči.
- Bez chyb v konzoli a bez nechtěného horizontálního posunu.
- Ověření, že se produkční deploy dokončil a nové soubory vracejí HTTP 200.
- Závěrečný report musí uvést přesné umístění každého použitého snímku, důvod výběru a seznam nepoužitých duplicit.
