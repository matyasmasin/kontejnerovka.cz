// Synchronizace zkráceného poptávkového formuláře na službových a lokalitních stránkách.
//
// Šablona formuláře níže je jediný zdroj pravdy pro CZ stránky (EN generuje
// build-english-site.mjs). Skript blok ohraničený markery
// <!-- mini-inquiry:start --> / <!-- mini-inquiry:end --> při každém spuštění
// NAHRADÍ aktuální šablonou — úprava formuláře = upravit šablonu a spustit:
//
//   node scripts/add-mini-inquiry.mjs
//
// Novou stránku stačí přidat do seznamu `pages`. Předmět e-mailu se skládá
// z prvního eyebrow textu stránky (např. "Odvoz suti", "Praha 5").
// Skript po zápisu každý soubor zpětně ověří a při jakékoli nesrovnalosti
// skončí chybou (exit 1), aby selhání nemohlo projít tiše.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const MARKER_START = "<!-- mini-inquiry:start -->";
const MARKER_END = "<!-- mini-inquiry:end -->";

const pages = [
  // služby
  "zemni-prace.html",
  "vykop-zakladu.html",
  "vykop-bazenu.html",
  "vykop-jezirka.html",
  "odbahneni-rybniku.html",
  "rovnani-terenu.html",
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
  "kontejnery-hostivice.html",
  "kontejnery-kladno.html",
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
];

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const miniForm = (slug, subjectLabel) => `      ${MARKER_START}
      <section class="section mini-inquiry" id="poptavka" aria-labelledby="mini-inquiry-title">
        <div class="section-head compact">
          <p class="eyebrow">Rychlá poptávka</p>
          <h2 id="mini-inquiry-title">Pošlete poptávku rovnou z této stránky</h2>
          <p>Stačí telefon, obec a co se má odvézt nebo dovézt. Fotka místa nebo odpadu nacenění urychlí. Ozvu se s cenou nebo krátkým doplňujícím dotazem.</p>
        </div>
        <form class="inquiry-form mini-form" action="https://api.web3forms.com/submit" method="POST" enctype="multipart/form-data" data-mini-form>
          <input type="hidden" name="access_key" value="a631aa36-18b8-499a-b6e9-16990f180fd2">
          <input type="hidden" name="subject" value="${escapeHtml(`Rychlá poptávka — ${subjectLabel} (Kontejnerovka.cz)`)}">
          <input type="hidden" name="from_name" value="Kontejnerovka.cz">
          <input type="hidden" name="redirect" value="https://kontejnerovka.cz/dekujeme.html">
          <input type="hidden" name="page_url" value="https://kontejnerovka.cz/${slug}">
          <input type="checkbox" name="botcheck" tabindex="-1" style="display: none;">
          <div class="form-row">
            <label>
              Telefon
              <input type="tel" name="phone" autocomplete="tel" inputmode="tel" pattern="(?:\\+420\\s*)?[0-9](?:[\\s.\\-]?[0-9]){8}" title="Zadejte české telefonní číslo, například 738 505 028 nebo +420 738 505 028." required>
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
          <p class="field-note form-photo-note">Fotku odpadu nebo místa pošlete po odeslání poptávky na <a href="tel:+420738505028">738 505 028</a> (SMS/WhatsApp) nebo na <a href="mailto:info@kontejnerovka.cz">info@kontejnerovka.cz</a> — urychlí nacenění.</p>
          <button class="btn btn-primary" type="submit">
            <i data-lucide="send" aria-hidden="true"></i>
            Odeslat poptávku
          </button>
          <p class="form-note" data-mini-form-note></p>
          <p class="form-privacy">Odesláním posíláte údaje pro nacenění a vyřízení poptávky. Podrobnosti jsou v části <a href="ochrana-osobnich-udaju.html">ochrana osobních údajů</a>. Spěcháte? Zavolejte <a href="tel:+420738505028">738&nbsp;505&nbsp;028</a>.</p>
        </form>
      </section>
      ${MARKER_END}
`;

const getSubjectLabel = (slug, html) => {
  const eyebrow = html.match(/<p class="eyebrow">([^<]+)<\/p>/);
  if (!eyebrow) return null;
  return eyebrow[1].replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
};

// Vloží/aktualizuje blok a vrátí seznam chyb (prázdný = OK).
const processPage = (slug) => {
  const file = path.join(rootDir, slug);
  let html;
  try {
    html = readFileSync(file, "utf8");
  } catch {
    return [`soubor neexistuje`];
  }

  const subjectLabel = getSubjectLabel(slug, html);
  if (!subjectLabel) return [`nenalezen eyebrow text pro předmět e-mailu`];

  const block = miniForm(slug, subjectLabel);
  const markerRe = /[ \t]*<!-- mini-inquiry:start -->[\s\S]*?<!-- mini-inquiry:end -->\n?/;
  // starší nasazení bez markerů (jen sekce)
  const legacyRe = /[ \t]*<section class="section mini-inquiry"[\s\S]*?<\/section>\n?/;

  let action;
  if (markerRe.test(html)) {
    html = html.replace(markerRe, block);
    action = "aktualizováno";
  } else if (legacyRe.test(html)) {
    html = html.replace(legacyRe, block);
    action = "převedeno na markery";
  } else {
    const mainCloses = html.match(/<\/main>/g) || [];
    if (mainCloses.length !== 1) return [`má ${mainCloses.length}× </main>, čekán právě 1`];
    html = html.replace(/[ \t]*<\/main>/, (match) => {
      const prefix = match.startsWith(" ") || match.startsWith("\t") ? "" : "\n";
      return `${prefix}${block}    </main>`;
    });
    action = "vloženo";
  }

  html = html.replaceAll("kontakt.html#formular", "#poptavka");

  // ověření PŘED zápisem — při chybě se soubor nezmění
  const errors = [];
  const count = (re) => (html.match(re) || []).length;
  if (count(/<!-- mini-inquiry:start -->/g) !== 1) errors.push("blok není v souboru právě jednou");
  if (count(/data-mini-form\b/g) < 1) errors.push("chybí data-mini-form");
  if (count(/<form[^>]*data-mini-form/g) !== 1) errors.push("formulář není v souboru právě jednou");
  if (count(/id="poptavka"/g) !== 1) errors.push('kotva id="poptavka" není právě jednou');
  if (html.includes("kontakt.html#formular")) errors.push("zbyl odkaz na kontakt.html#formular");
  if (!html.includes(`value="https://kontejnerovka.cz/${slug}"`)) errors.push("page_url neodpovídá souboru");
  if (errors.length) return errors;

  writeFileSync(file, html, "utf8");
  // kontrola po zápisu: co je na disku, je to, co jsme chtěli zapsat
  if (readFileSync(file, "utf8") !== html) return ["obsah na disku neodpovídá zapsanému"];

  console.log(`OK (${action}, předmět: ${subjectLabel}): ${slug}`);
  return [];
};

let failed = 0;
for (const slug of pages) {
  const errors = processPage(slug);
  for (const error of errors) {
    failed += 1;
    console.error(`CHYBA ${slug}: ${error}`);
  }
}

if (failed) {
  console.error(`Selhalo: ${failed} chyb — chybné soubory NEBYLY zapsány.`);
  process.exitCode = 1;
} else {
  console.log(`Hotovo: ${pages.length} stránek synchronizováno.`);
}
