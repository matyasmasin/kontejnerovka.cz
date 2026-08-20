import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];
const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
const script = await fs.readFile(path.join(root, "script.js"), "utf8");

const priorityIndexPages = [
  "kontejnery-praha.html",
  "kontejnery-praha-zapad.html",
  "kontejnery-kladno.html",
  "kontejnery-hostivice.html",
  "kontejnery-beroun.html",
  "kontejner-na-stavebni-odpad.html",
  "dovoz-pisku-sterku.html",
  "dovoz-recyklatu.html",
  "zemni-prace.html",
  "reference.html",
];

const ctrPages = [
  "lokality.html",
  "kontejnery-unhost.html",
  "odvoz-zeminy-kladno.html",
  "rovnani-terenu.html",
  "vykop-jezirka.html",
  "vykop-bazenu.html",
];

const gscOpportunityPages = [
  "lokality.html",
  "kontejnery-unhost.html",
  "odvoz-zeminy-kladno.html",
  "kontejner-na-zeminu.html",
  "vyklizeni-odpad.html",
  "rovnani-terenu.html",
  "vykop-jezirka.html",
  "vykop-bazenu.html",
];

function fail(message) {
  failures.push(message);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const rootEntries = await fs.readdir(root, { withFileTypes: true });
const rootHtmlFiles = rootEntries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => entry.name);
const htmlByFile = new Map(
  await Promise.all(rootHtmlFiles.map(async (file) => [file, await fs.readFile(path.join(root, file), "utf8")])),
);

const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (new Set(locs).size !== locs.length) fail("sitemap.xml contains duplicate <loc> URLs");
if (sitemap.includes("www.kontejnerovka.cz")) fail("sitemap.xml must use only the canonical non-www host");

for (const file of priorityIndexPages) {
  const url = `https://kontejnerovka.cz/${file}`;
  if (!locs.includes(url)) fail(`${file}: missing from sitemap.xml`);

  const inboundPattern = new RegExp(`href=["'](?:/)?${escapeRegex(file)}(?:[?#][^"']*)?["']`, "i");
  const inboundFiles = [...htmlByFile.entries()]
    .filter(([source, html]) => source !== file && inboundPattern.test(html))
    .map(([source]) => source);
  if (inboundFiles.length < 5) fail(`${file}: only ${inboundFiles.length} distinct internal-link sources; expected at least 5`);
}

for (const file of ctrPages) {
  const html = htmlByFile.get(file);
  const title = html?.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || "";
  const description = html?.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)?.[1]?.trim() || "";
  const canonical = html?.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] || "";
  if (title.length < 35 || title.length > 65) fail(`${file}: title length ${title.length}, expected 35–65`);
  if (description.length < 120 || description.length > 165) fail(`${file}: meta description length ${description.length}, expected 120–165`);
  if (canonical !== `https://kontejnerovka.cz/${file}`) fail(`${file}: canonical mismatch (${canonical || "missing"})`);
  if ((html?.match(/<h1\b/gi) || []).length !== 1) fail(`${file}: expected exactly one h1`);
}

for (const file of gscOpportunityPages) {
  const inboundPattern = new RegExp(`href=["'](?:/)?${escapeRegex(file)}(?:[?#][^"']*)?["']`, "i");
  const inboundFiles = [...htmlByFile.entries()]
    .filter(([source, html]) => source !== file && inboundPattern.test(html))
    .map(([source]) => source);
  if (inboundFiles.length < 7) fail(`${file}: only ${inboundFiles.length} distinct internal-link sources; expected at least 7`);
}

for (const eventName of ["click_phone", "click_email", "lead_form_submit", "generate_lead"]) {
  if (!script.includes(`"${eventName}"`)) fail(`script.js: missing analytics event ${eventName}`);
}

if (failures.length) {
  console.error(`SEO growth gate failed (${failures.length} findings):`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`SEO growth gate passed: ${priorityIndexPages.length} priority index pages, ${ctrPages.length} CTR pages, ${gscOpportunityPages.length} GSC opportunity pages, ${locs.length} sitemap URLs, conversion events present.`);
