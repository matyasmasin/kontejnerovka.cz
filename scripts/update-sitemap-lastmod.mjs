import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = process.cwd();
const sitemapPath = path.join(root, "sitemap.xml");
const origin = "https://kontejnerovka.cz";

function pragueDate(value = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(value);
}

function fileForUrl(url) {
  const parsed = new URL(url);
  if (parsed.origin !== origin) return null;
  if (parsed.pathname === "/") return "index.html";
  if (parsed.pathname.endsWith("/")) return `${parsed.pathname.slice(1)}index.html`;
  return decodeURIComponent(parsed.pathname.slice(1));
}

async function gitOutput(args) {
  try {
    const { stdout } = await execFileAsync("git", args, { cwd: root });
    return stdout.trim();
  } catch {
    return "";
  }
}

async function sourceDate(relativeFile) {
  const absolute = path.join(root, relativeFile);
  const dirty = await gitOutput(["status", "--porcelain", "--", relativeFile]);
  if (dirty) return pragueDate();

  const committed = await gitOutput(["log", "-1", "--format=%cs", "--", relativeFile]);
  if (committed) return committed;

  const stats = await fs.stat(absolute);
  return pragueDate(stats.mtime);
}

const original = await fs.readFile(sitemapPath, "utf8");
const blocks = [...original.matchAll(/<url>\s*[\s\S]*?<\/url>/g)];
let updated = original;
let changed = 0;

for (const match of blocks) {
  const block = match[0];
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
  if (!loc) continue;
  const relativeFile = fileForUrl(loc);
  if (!relativeFile) continue;

  try {
    await fs.access(path.join(root, relativeFile));
  } catch {
    throw new Error(`Sitemap URL has no local source file: ${loc} -> ${relativeFile}`);
  }

  const lastmod = await sourceDate(relativeFile);
  const nextBlock = /<lastmod>[^<]+<\/lastmod>/.test(block)
    ? block.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${lastmod}</lastmod>`)
    : block.replace(/<\/loc>/, `</loc>\n    <lastmod>${lastmod}</lastmod>`);

  if (nextBlock !== block) {
    updated = updated.replace(block, nextBlock);
    changed += 1;
  }
}

await fs.writeFile(sitemapPath, updated, "utf8");
console.log(`Sitemap lastmod updated from source history: ${blocks.length} URLs, ${changed} changed blocks.`);
