// Vygeneruje assets/icons.js — odlehčenou náhradu lucide.min.js obsahující
// jen ikony skutečně použité v HTML. Spouštět po přidání nové ikony:
//   node scripts/build-icons.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const lucide = require(path.join(rootDir, "assets/lucide.min.js"));

const htmlFiles = [];
for (const dir of [rootDir, path.join(rootDir, "en")]) {
  for (const f of readdirSync(dir)) {
    if (f.endsWith(".html")) htmlFiles.push(path.join(dir, f));
  }
}

const used = new Set();
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/data-lucide="([^"]+)"/g)) used.add(m[1]);
}

const pascal = (name) => name.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");

const renderChildren = (nodes) =>
  nodes
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(" ");
      return `<${tag} ${a}/>`;
    })
    .join("");

const entries = [];
const missing = [];
for (const name of [...used].sort()) {
  const node = lucide.icons[pascal(name)];
  if (!node) {
    missing.push(name);
    continue;
  }
  entries.push(`  "${name}": '${renderChildren(node)}'`);
}

if (missing.length) {
  console.error(`Chybi v lucide: ${missing.join(", ")}`);
  process.exit(1);
}

const out = `// Generováno skriptem scripts/build-icons.mjs — needitovat ručně.
// Obsahuje pouze ikony použité na webu (drop-in náhrada lucide.min.js).
(function () {
  var ICONS = {
${entries.join(",\n")}
  };

  var DEFAULTS = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  };

  function createIcons() {
    var elements = document.querySelectorAll("[data-lucide]");
    for (var i = 0; i < elements.length; i += 1) {
      var el = elements[i];
      var name = el.getAttribute("data-lucide");
      var body = ICONS[name];
      if (!body) continue;

      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      for (var key in DEFAULTS) svg.setAttribute(key, DEFAULTS[key]);
      svg.setAttribute("class", "lucide lucide-" + name);
      for (var j = 0; j < el.attributes.length; j += 1) {
        var attr = el.attributes[j];
        if (attr.name === "class") {
          svg.setAttribute("class", svg.getAttribute("class") + " " + attr.value);
        } else {
          svg.setAttribute(attr.name, attr.value);
        }
      }
      svg.innerHTML = body;
      el.replaceWith(svg);
    }
  }

  window.lucide = { createIcons: createIcons };
})();
`;

writeFileSync(path.join(rootDir, "assets/icons.js"), out, "utf8");
console.log(`assets/icons.js: ${used.size} ikon, ${Buffer.byteLength(out)} B`);
