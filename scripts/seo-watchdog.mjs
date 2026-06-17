import fs from "node:fs";
import path from "node:path";
import "./load-env.mjs";

// Pojistka pro kontejnerovku: overi, ze GSC/GA4 data byla nedavno obnovena,
// a zapise stav do souboru. Bezi po fetch-google-data.mjs. Nic nemeni - jen cte a hlasi.
// Exit 0 = zdrave, exit 1 = zastarale/chybi. Cerstvost = cas posledni aktualizace souboru
// (kontejnerovka prepisuje ploche soubory, nepouziva datovane snapshoty).

const PRIVATE_DATA_DIR =
  process.env.KONTEJNEROVKA_PRIVATE_DATA_DIR ||
  "/Users/claude/Documents/Claude/kontejnerovka-private-growth/data";
const reportingDir = path.join(PRIVATE_DATA_DIR, "reporting");
const statusPath = path.join(reportingDir, "seo-health-status.md");
const logPath = path.join(reportingDir, "seo-health-log.csv");

const WARN_DAYS = 9;
const ALERT_DAYS = 16;
const todayIso = new Date().toISOString().slice(0, 10);

function newestMtimeDays(subdir) {
  const dir = path.join(PRIVATE_DATA_DIR, subdir);
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".csv") || f.endsWith(".md"));
  if (!files.length) return null;
  const newest = Math.max(...files.map((f) => fs.statSync(path.join(dir, f)).mtimeMs));
  return Math.round((Date.now() - newest) / 86400000);
}

const gscAge = newestMtimeDays("gsc");
const ga4Age = newestMtimeDays("ga4");

function classify(age) {
  if (age == null) return { status: "ALERT", semafor: "🔴" };
  if (age <= WARN_DAYS) return { status: "OK", semafor: "🟢" };
  if (age <= ALERT_DAYS) return { status: "WARNING", semafor: "🟡" };
  return { status: "ALERT", semafor: "🔴" };
}

// Celkovy stav = ten horsi z GSC a GA4 (GSC je dulezitejsi, ale hlidame oboji).
const gsc = classify(gscAge);
const order = { OK: 0, WARNING: 1, ALERT: 2 };
const worst = order[gsc.status] >= order[classify(ga4Age).status] ? gsc : classify(ga4Age);

let message;
if (gscAge == null) {
  message = "Chybi GSC data. Stahovani nikdy nebezelo nebo se neco rozbilo. Spust: node scripts/fetch-google-data.mjs";
} else if (worst.status === "OK") {
  message = `Kontejnerovka data jsou cerstva (GSC ${gscAge} dni, GA4 ${ga4Age == null ? "chybi" : ga4Age + " dni"}).`;
} else if (worst.status === "WARNING") {
  message = `Data se prestala obnovovat (GSC ${gscAge} dni, GA4 ${ga4Age == null ? "chybi" : ga4Age + " dni"}). Spust: node scripts/fetch-google-data.mjs`;
} else {
  message = `Data jsou zastarala (GSC ${gscAge} dni, GA4 ${ga4Age == null ? "chybi" : ga4Age + " dni"}). Zkontroluj sit a pristup (node scripts/check-google-config.mjs), pak node scripts/fetch-google-data.mjs`;
}

fs.mkdirSync(reportingDir, { recursive: true });

const statusMd = [
  "# SEO health status - kontejnerovka.cz",
  "",
  `Kontrola: ${todayIso}`,
  `Stav: ${worst.semafor} ${worst.status}`,
  `GSC data stari: ${gscAge == null ? "chybi" : gscAge + " dni"}`,
  `GA4 data stari: ${ga4Age == null ? "chybi" : ga4Age + " dni"}`,
  "",
  message,
  "",
  "_Soubor automaticky prepisuje scripts/seo-watchdog.mjs._",
  "",
].join("\n");
fs.writeFileSync(statusPath, statusMd);

const header = "kontrola,stav,gsc_stari_dni,ga4_stari_dni\n";
const row = `${todayIso},${worst.status},${gscAge ?? ""},${ga4Age ?? ""}\n`;
if (!fs.existsSync(logPath)) fs.writeFileSync(logPath, header);
fs.appendFileSync(logPath, row);

console.log(`${worst.semafor} ${worst.status}: ${message}`);
console.log(`Status zapsan: ${statusPath}`);
process.exit(worst.status === "OK" ? 0 : 1);
