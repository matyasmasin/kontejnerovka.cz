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

const ZEMNI = new Set([
  "zemni-prace.html",
  "vykop-zakladu.html",
  "vykop-bazenu.html",
  "vykop-jezirka.html",
  "odbahneni-rybniku.html",
  "rovnani-terenu.html",
  "zemni-prace-kladno.html",
]);

const pages = [
  // zemní práce
  "zemni-prace.html",
  "vykop-zakladu.html",
  "vykop-bazenu.html",
  "vykop-jezirka.html",
  "odbahneni-rybniku.html",
  "rovnani-terenu.html",
  "zemni-prace-kladno.html",
  "pristaveni-kontejneru.html",
  "kontejner-na-sut.html",
  "kontejner-na-stavebni-odpad.html",
  "kontejner-na-zeminu.html",
  "velkoobjemovy-kontejner.html",
  "odvoz-suti.html",
  "odvoz-suti-rekonstrukce-koupelny.html",
  "odvoz-suti-kladno.html",
  "odvoz-suti-praha-zapad.html",
  "odvoz-suti-hostivice.html",
  "odvoz-zeminy.html",
  "odvoz-zeminy-kladno.html",
  "odvoz-odpadu.html",
  "odvoz-dreva-bioodpadu.html",
  "odvoz-betonu.html",
  "kontejner-na-beton.html",
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
  "kontejnery-chynava-podkozi.html",
  "kontejnery-hostivice.html",
  "kontejnery-hostoun-dobroviz-stredokluky.html",
  "kontejnery-horovice.html",
  "kontejnery-kladno.html",
  "kontejnery-kraluv-dvur.html",
  "kontejnery-lodenice-morina-srbsko.html",
  "kontejnery-nizbor-hyskov-zelezna.html",
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

const PAGE_COPY = {
  "odvoz-suti-kladno.html": {
    locationPlaceholder: "Např. Kladno, Unhošť, Braškov",
    messagePlaceholder: "Např. suť z koupelny, beton, cihly, stavební směs...",
  },
  "odvoz-suti-praha-zapad.html": {
    locationPlaceholder: "Např. Rudná, Hostivice, Unhošť",
    messagePlaceholder: "Např. suť z rekonstrukce, beton, dlažba, stavební směs...",
  },
  "odvoz-suti-hostivice.html": {
    locationPlaceholder: "Např. Hostivice, Jeneč, Dobrovíz",
    messagePlaceholder: "Např. suť z rekonstrukce, beton, stavební směs...",
  },
  "odvoz-zeminy-kladno.html": {
    locationPlaceholder: "Např. Kladno, Unhošť, Braškov",
    messagePlaceholder: "Např. zemina z výkopu, mokrá hlína, zemina s kamením...",
  },
  "kontejner-na-beton.html": {
    locationPlaceholder: "Např. Kladno, Rudná, Hostivice",
    messagePlaceholder: "Např. beton z chodníku, patky, kusový beton s armaturou...",
  },
  "zemni-prace-kladno.html": {
    locationPlaceholder: "Např. Kladno, Unhošť, Velká Dobrá",
    messagePlaceholder: "Např. výkop základů, přípojka, bazén, rovnání terénu...",
  },
  "kontejnery-chynava-podkozi.html": {
    locationPlaceholder: "Např. Chyňava, Podkozí, Nenačovice",
  },
  "kontejnery-lodenice-morina-srbsko.html": {
    locationPlaceholder: "Např. Loděnice, Mořina, Srbsko",
  },
  "kontejnery-nizbor-hyskov-zelezna.html": {
    locationPlaceholder: "Např. Nižbor, Hýskov, Železná",
  },
  "kontejnery-hostoun-dobroviz-stredokluky.html": {
    locationPlaceholder: "Např. Hostouň, Dobrovíz, Kněževes",
  },
};

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const miniForm = (slug, subjectLabel) => {
  const zemni = ZEMNI.has(slug);
  const copy = PAGE_COPY[slug] || {};
  const intro = zemni
    ? "Stačí telefon, obec a co se má vykopat nebo upravit. Fotka místa a vjezdu nacenění urychlí. Ozvu se s cenou nebo krátkým doplňujícím dotazem."
    : "Stačí telefon, obec a co se má odvézt nebo dovézt. Fotka místa nebo odpadu nacenění urychlí. Ozvu se s cenou nebo krátkým doplňujícím dotazem.";
  const messageLabel = zemni ? "Co se má vykopat nebo upravit" : "Co se poveze";
  const locationPlaceholder = copy.locationPlaceholder || "Např. Nučice, Rudná, Unhošť";
  const messagePlaceholder = copy.messagePlaceholder || (zemni
    ? "Např. základy 10×8 m, jáma pro bazén, srovnání zahrady, odbahnění nádrže..."
    : "Např. suť z koupelny, zemina z výkopu, směs po vyklízení...");
  const photoNote = zemni
    ? "Fotku místa a vjezdu můžete přiložit rovnou tady. Když to nepůjde, pošlete ji po odeslání na"
    : "Fotku odpadu nebo místa můžete přiložit rovnou tady. Když to nepůjde, pošlete ji po odeslání na";
  return `      ${MARKER_START}
      <section class="section mini-inquiry" id="poptavka" aria-labelledby="mini-inquiry-title">
        <div class="section-head compact">
          <p class="eyebrow">Rychlá poptávka</p>
          <h2 id="mini-inquiry-title">Pošlete poptávku rovnou z této stránky</h2>
          <p>${intro}</p>
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
              <input type="tel" name="phone" autocomplete="tel" inputmode="tel" pattern="(?:\\+420\\s*)?[0-9](?:[\\s.\\-]?[0-9]){8}" title="Zadejte české telefonní číslo, například 728 505 028 nebo +420 728 505 028." required>
            </label>
            <label>
              Obec / adresa
              <input type="text" name="location" placeholder="${escapeHtml(locationPlaceholder)}" required>
            </label>
          </div>
          <label>
            ${messageLabel}
            <textarea name="message" rows="3" required placeholder="${messagePlaceholder}"></textarea>
          </label>
          <label class="file-upload">
            <span>Fotka místa nebo odpadu <small>volitelné</small></span>
            <input type="file" name="attachment" accept="image/*,.pdf" data-default-file="Vybrat fotku nebo PDF">
            <strong data-file-name>Vybrat fotku nebo PDF</strong>
          </label>
          <p class="field-note form-photo-note">${photoNote} <a href="tel:+420728505028">728 505 028</a> (SMS/WhatsApp) nebo na <a href="mailto:info@kontejnerovka.cz">info@kontejnerovka.cz</a>.</p>
          <button class="btn btn-primary" type="submit">
            <i data-lucide="send" aria-hidden="true"></i>
            Odeslat poptávku
          </button>
          <p class="form-note" data-mini-form-note></p>
          <p class="form-privacy">Vaše údaje použiju jen k odpovědi na poptávku. Podrobnosti jsou v části <a href="ochrana-osobnich-udaju.html">ochrana osobních údajů</a>. Spěcháte? Zavolejte <a href="tel:+420728505028">728&nbsp;505&nbsp;028</a>.</p>
        </form>
      </section>
      ${MARKER_END}
`;
};

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
