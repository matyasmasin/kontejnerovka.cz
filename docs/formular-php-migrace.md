# Migrace formulare z Web3Forms na vlastni PHP odesilani

Stav k 31.05.2026:

- Autoservis1.cz neposila formular pres Web3Forms. Pouziva vlastni PHP endpoint `send.php` a serverove odeslani pres PHP `mail()`.
- Kontejnerovka.cz je aktualne nasazena pres GitHub Pages. Produkcni odpoved serveru je `server: GitHub.com`.
- GitHub Pages neumi spoustet PHP. Pokud by se formular na produkci ted prepnul na `/send.php`, poptavky by se rozbily.
- Aktualni funkcni reseni pro Kontejnerovka.cz proto zustava Web3Forms.

## Co je pripravene

V repozitari je pripravena PHP verze formulare:

- `server/kontejnerovka-send.php`

Soubor je pripraveny jako budouci `/send.php` pro PHP hosting. Neni soucasti GitHub Pages buildu a na soucasne produkci se nespousti.

Endpoint umi:

- prijmout pole z aktualniho formulare Kontejnerovka.cz,
- odeslat poptavku na `info@kontejnerovka.cz`,
- pripojit prilohu do 8 MB,
- pouzit honeypot ochranu proti botum,
- omezit opakovane odeslani ze stejne site,
- poslat automaticke potvrzeni zakaznikovi, pokud vyplni e-mail,
- presmerovat na `dekujeme.html`,
- zobrazit srozumitelnou chybu, kdyz chybi povinne udaje.

## Co je potreba pro skutecne prepnuti

Prepnuti na stejne reseni jako Autoservis1.cz je mozne az ve chvili, kdy bude Kontejnerovka.cz bezet na hostingu s PHP.

Minimalni pozadavky:

- PHP hosting pro `kontejnerovka.cz`,
- pristup na FTP/SFTP nebo sprava souboru,
- funkcni odesilani e-mailu z hostingu,
- idealne SPF/DKIM/DMARC pro domenu kvuli dorucitelnosti,
- otestovane doruceni na `info@kontejnerovka.cz`,
- zachovane HTTPS.

## Postup migrace

1. Zridit nebo potvrdit PHP hosting pro `kontejnerovka.cz`.
2. Nahrat webove soubory na PHP hosting.
3. Zkopirovat `server/kontejnerovka-send.php` do korene webu jako `send.php`.
4. Ve formularich v `index.html` a `kontakt.html` zmenit:

   ```html
   action="https://api.web3forms.com/submit"
   ```

   na:

   ```html
   action="/send.php"
   ```

5. Odstranit Web3Forms hidden pole, ktera uz nebudou potreba:

   - `access_key`
   - `subject`
   - `from_name`
   - `redirect`

6. Zachovat pole:

   - `page_url`
   - `botcheck`
   - `photo`
   - `souhlas`

7. Otestovat odeslani:

   - bez prilohy,
   - s fotkou,
   - bez volitelneho e-mailu,
   - s e-mailem zakaznika,
   - s chybne vyplnenym formularem,
   - na mobilu.

8. Overit doruceni do schranky `info@kontejnerovka.cz`.
9. Overit automaticke potvrzeni zakaznikovi.
10. Upravit `ochrana-osobnich-udaju.html`, aby uz nezminovala Web3Forms.

## Co zatim nemenit

Dokud web bezi na GitHub Pages:

- neprepinat `action` formulare na `/send.php`,
- neodstranovat Web3Forms hidden pole,
- nemenit text v ochranne osobnich udaju o Web3Forms,
- netvrdit, ze formular bezi pres vlastni server.

## Master doporuceni

Pokud ma web zustat na GitHub Pages, nechat Web3Forms.

Pokud ma byt formular reseny stejne jako u Autoservis1.cz, presunout web na PHP hosting a az potom aktivovat `send.php`.

Nejlepsi dlouhodobe reseni by bylo serverove odesilani pres overeny SMTP ucet domeny, ne jen obycejne PHP `mail()`. K tomu jsou ale potreba SMTP udaje od hostingu nebo e-mailove sluzby.
