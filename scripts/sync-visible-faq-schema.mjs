import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const htmlFiles = execSync("rg --files -g '*.html'", { cwd: rootDir, encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean)
  .filter((file) => !file.startsWith("google"));

const decodeEntities = (value) =>
  value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const textFromHtml = (value) =>
  decodeEntities(String(value || "").replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const typeIs = (node, type) => {
  const nodeType = node?.["@type"];
  return Array.isArray(nodeType) ? nodeType.includes(type) : nodeType === type;
};

const collectFaqFromNode = (node, output = []) => {
  if (!node || typeof node !== "object") return output;

  if (typeIs(node, "FAQPage") && Array.isArray(node.mainEntity)) {
    for (const item of node.mainEntity) {
      const question = textFromHtml(item?.name || "");
      const answer = textFromHtml(item?.acceptedAnswer?.text || "");
      if (question && answer) output.push([question, answer]);
    }
  }

  if (Array.isArray(node["@graph"])) {
    node["@graph"].forEach((child) => collectFaqFromNode(child, output));
  }

  return output;
};

const removeFaqFromNode = (node) => {
  if (!node || typeof node !== "object") return { node, removed: false };

  if (typeIs(node, "FAQPage")) return { node: null, removed: true };

  if (Array.isArray(node["@graph"])) {
    let removed = false;
    const graph = [];
    for (const child of node["@graph"]) {
      const result = removeFaqFromNode(child);
      removed = removed || result.removed;
      if (result.node) graph.push(result.node);
    }

    if (!graph.length) return { node: null, removed: true };
    return { node: { ...node, "@graph": graph }, removed };
  }

  return { node, removed: false };
};

const extractVisibleFaq = (html) => {
  const seen = new Set();
  const items = [];
  const detailsRe = /<details\b[\s\S]*?<summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi;
  for (const match of html.matchAll(detailsRe)) {
    const question = textFromHtml(match[1]);
    const answer = textFromHtml(match[2]);
    const key = question.toLowerCase();
    if (!question || !answer || seen.has(key)) continue;
    seen.add(key);
    items.push([question, answer]);
  }
  return items;
};

const extractSchemaFaq = (html) => {
  const items = [];
  const scriptRe = /<script\b(?=[^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(scriptRe)) {
    if (!match[1].includes("FAQPage")) continue;
    try {
      collectFaqFromNode(JSON.parse(match[1]), items);
    } catch {
      // Invalid JSON-LD is handled by removing/rebuilding the FAQ schema below.
    }
  }
  const seen = new Set();
  return items.filter(([question]) => {
    const key = question.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const faqSchemaScript = (faq) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
  return `    <script type="application/ld+json" data-visible-faq>${JSON.stringify(schema, null, 2)}</script>`;
};

const visibleFaqSection = (faq, locale) => {
  const title = locale === "en" ? "Common questions" : "Časté otázky";
  const eyebrow = locale === "en" ? "FAQ" : "Dotazy";
  return `      <section class="section faq" data-schema-visible-faq>
        <div class="section-head compact"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>
        <div class="faq-list">
${faq.map(([question, answer]) => `          <details><summary>${question}</summary><p>${answer}</p></details>`).join("\n")}
        </div>
      </section>
`;
};

const shouldInsertVisibleFaq = (file) =>
  !/(^|\/)(404|dekujeme|thank-you|privacy|ochrana-osobnich-udaju)\.html$/.test(file);

const removeExistingFaqSchemas = (html) => {
  const scriptRe = /[ \t]*<script\b(?=[^>]*type="application\/ld\+json")[^>]*>[\s\S]*?<\/script>\n?/gi;
  return html.replace(scriptRe, (script) => {
    if (!script.includes("FAQPage")) return script;
    const body = script.replace(/^[\s\S]*?>/, "").replace(/<\/script>\s*$/i, "");
    try {
      const parsed = JSON.parse(body);
      const result = removeFaqFromNode(parsed);
      if (!result.removed) return script;
      if (!result.node) return "";
      return `    <script type="application/ld+json">${JSON.stringify(result.node, null, 2)}</script>\n`;
    } catch {
      return "";
    }
  });
};

let changed = 0;
let insertedVisibleSections = 0;
let rebuiltSchemas = 0;

for (const file of htmlFiles) {
  const fullPath = path.join(rootDir, file);
  let html = readFileSync(fullPath, "utf8");
  const original = html;
  const schemaFaq = extractSchemaFaq(html);
  let visibleFaq = extractVisibleFaq(html);

  if (!visibleFaq.length && schemaFaq.length && shouldInsertVisibleFaq(file)) {
    const locale = file.startsWith("en/") ? "en" : "cs";
    const section = visibleFaqSection(schemaFaq, locale);
    if (/<section class="cta-band"/.test(html)) {
      html = html.replace(/[ \t]*<section class="cta-band"/, `${section}      <section class="cta-band"`);
    } else {
      html = html.replace(/[ \t]*<\/main>/, `${section}    </main>`);
    }
    visibleFaq = schemaFaq;
    insertedVisibleSections += 1;
  }

  html = removeExistingFaqSchemas(html);

  if (visibleFaq.length) {
    html = html.replace(/\s*<\/head>/i, `\n${faqSchemaScript(visibleFaq)}\n  </head>`);
    rebuiltSchemas += 1;
  }

  if (html !== original) {
    writeFileSync(fullPath, html, "utf8");
    changed += 1;
  }
}

console.log(
  `FAQ sync complete: ${changed} files changed, ${insertedVisibleSections} visible FAQ sections inserted, ${rebuiltSchemas} FAQ schemas rebuilt.`
);
