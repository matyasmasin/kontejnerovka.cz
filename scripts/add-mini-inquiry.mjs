// Jednorázová injekce zkráceného poptávkového formuláře na službové a lokalitní stránky.
// Spuštění: node scripts/add-mini-inquiry.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const pages = [
  // služby
  "pristaveni-kontejneru.html",
  "kontejner-na-sut.html",
  "kontejner-na-stavebni-odpad.html",
  "kontejner-na-zeminu.html",
  "velkoobjemovy-kontejner.html",
  "odvoz-suti.html",
  "odvoz-suti-rekonstrukce-koupelny.html",
  "odvoz-zeminy.html",
  "odvoz-odpadu.html",
  "odvoz-dreva-bioodpadu.html",
  "odvoz-betonu.html",
  "vyklizeni-odpad.html",
  "dovoz-pisku.html",
  "dovoz-sterku.html",
  "dovoz-kacirku.html",
  "dovoz-pisku-sterku.html",
  "dovoz-recyklatu.html",
  "dovoz-betonu.html",
  "povoleni-kontejner-praha.html",
  "recyklat-prijezdova-cesta.html",
  // lokality
  "kontejnery-beroun.html",
  "kontejnery-horovice.html",
  "kontejnery-hostivice.html",
  "kontejnery-kladno.html",
  "kontejnery-kraluv-dvur.html",
  "kontejnery-nucice.html",
  "kontejnery-praha-13.html",
  "kontejnery-praha-17.html",
  "kontejnery-praha-5.html",
  "kontejnery-praha-6.html",
  "kontejnery-praha-vychod.html",
  "kontejnery-praha-zapad.html",
  "kontejnery-praha.html",
  "kontejnery-rakovnik.html",
  "kontejnery-rudna.html",
  "kontejnery-slany.html",
  "kontejnery-unhost.html",
  "kontejnery-zdice.html",
];

const miniForm = (slug) => `      <section class="section mini-inquiry" id="poptavka" aria-labelledby="mini-inquiry-title">
        <div class="section-head compact">
          <p class="eyebrow">Rychlá poptávka</p>
          <h2 id="mini-inquiry-title">Pošlete poptávku rovnou z této stránky</h2>
          <p>Stačí telefon, obec a co se má odvézt nebo dovézt. Fotka místa nebo odpadu nacenění urychlí. Ozvu se s cenou nebo krátkým doplňujícím dotazem.</p>
        </div>
        <form class="inquiry-form mini-form" action="https://api.web3forms.com/submit" method="POST" enctype="multipart/form-data" data-mini-form>
          <input type="hidden" name="access_key" value="a631aa36-18b8-499a-b6e9-16990f180fd2">
          <input type="hidden" name="subject" value="Rychlá poptávka z webu Kontejnerovka.cz">
          <input type="hidden" name="from_name" value="Kontejnerovka.cz">
          <input type="hidden" name="redirect" value="https://kontejnerovka.cz/dekujeme.html">
          <input type="hidden" name="page_url" value="https://kontejnerovka.cz/${slug}">
          <input type="checkbox" name="botcheck" tabindex="-1" style="display: none;">
          <div class="form-row">
            <label>
              Telefon
              <input type="tel" name="phone" autocomplete="tel" inputmode="tel" pattern="(?:\\+420\\s*)?[0-9](?:[\\s.-]?[0-9]){8}" title="Zadejte české telefonní číslo, například 738 505 028 nebo +420 738 505 028." required>
            </label>
            <label>
              Obec / adresa
              <input type="text" name="location" placeholder="Např. Nučice, Rudná, Unhošť" required>
            </label>
          </div>
          <label>
            Co se poveze
            <textarea name="message" rows="3" required placeholder="Např. suť z koupelny, zemina z výkopu, směs po vyklízení..."></textarea>
          </label>
          <label class="file-input">
            Fotka odpadu nebo místa <span class="field-note">volitelné</span>
            <input type="file" name="attachment" accept=".jpg,.jpeg,.png,.webp,.heic,.pdf,image/jpeg,image/png,image/webp,application/pdf" data-default-file="JPG, PNG, WEBP, HEIC nebo PDF">
            <span data-file-name>JPG, PNG, WEBP, HEIC nebo PDF</span>
          </label>
          <button class="btn btn-primary" type="submit">
            <i data-lucide="send" aria-hidden="true"></i>
            Odeslat poptávku
          </button>
          <p class="form-note" data-mini-form-note></p>
          <p class="form-privacy">Odesláním posíláte údaje pro nacenění a vyřízení poptávky. Podrobnosti jsou v části <a href="ochrana-osobnich-udaju.html">ochrana osobních údajů</a>. Spěcháte? Zavolejte <a href="tel:+420738505028">738&nbsp;505&nbsp;028</a>.</p>
        </form>
      </section>
`;

let changed = 0;
for (const slug of pages) {
  const file = path.join(rootDir, slug);
  let html = readFileSync(file, "utf8");

  if (html.includes("data-mini-form")) {
    console.log(`SKIP (už má formulář): ${slug}`);
    continue;
  }
  const mainCloses = html.match(/<\/main>/g) || [];
  if (mainCloses.length !== 1) {
    console.error(`CHYBA: ${slug} má ${mainCloses.length}× </main>, přeskakuji`);
    continue;
  }

  // </main> může být na vlastním řádku i nalepený za poslední sekcí
  html = html.replace(/[ \t]*<\/main>/, (match) => {
    const prefix = match.startsWith(" ") || match.startsWith("\t") ? "" : "\n";
    return `${prefix}${miniForm(slug)}    </main>`;
  });
  html = html.replaceAll("kontakt.html#formular", "#poptavka");
  writeFileSync(file, html, "utf8");
  changed += 1;
  console.log(`OK: ${slug}`);
}
console.log(`Hotovo: upraveno ${changed}/${pages.length} stránek.`);
