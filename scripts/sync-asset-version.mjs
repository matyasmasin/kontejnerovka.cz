import fs from "node:fs/promises";
import path from "node:path";
import { getAssetVersion } from "./asset-version.mjs";

const root = process.cwd();
const ignoredDirs = new Set([".git", "audits", "node_modules"]);
const cacheVersion = getAssetVersion(root);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirs.has(entry.name)) continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolute)));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(absolute);
  }

  return files;
}

let changed = 0;
for (const file of await walk(root)) {
  const source = await fs.readFile(file, "utf8");
  const updated = source.replace(
    /((?:\.\.\/)?(?:styles\.css|script\.js)\?v=)[^"'\s>]+/g,
    `$1${cacheVersion}`,
  );

  if (updated === source) continue;
  await fs.writeFile(file, updated, "utf8");
  changed += 1;
}

console.log(`Asset version ${cacheVersion} synchronized in ${changed} HTML files.`);
