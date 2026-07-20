import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const cacheVersion = "20260720c";
const ignoredDirs = new Set([".git", "audits", "node_modules"]);
const failures = [];

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

function fail(file, message) {
  failures.push(`${path.relative(root, file)}: ${message}`);
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)]
      .slice(1)
      .map((match) => [match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? ""]),
  );
}

function localPath(fromFile, reference) {
  const clean = reference.split(/[?#]/)[0];
  if (!clean || clean === "/") return path.join(root, "index.html");
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(clean)) return null;
  const resolved = clean.startsWith("/")
    ? path.join(root, clean.slice(1))
    : path.resolve(path.dirname(fromFile), clean);
  return path.extname(resolved) ? resolved : path.join(resolved, "index.html");
}

const files = await walk(root);
for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  const isVerificationFile = /^google[a-z0-9]+\.html$/i.test(path.basename(file));
  const isRedirect = /<meta\b[^>]*http-equiv=["']refresh["']/i.test(html);
  if (isVerificationFile) continue;
  if (!/<html\b[^>]*\blang=(?:"[^"]+"|'[^']+')/i.test(html)) fail(file, "missing document language");
  if (!/<title>[^<]+<\/title>/i.test(html)) fail(file, "missing title");
  if (!isRedirect && !/<meta\b[^>]*\bname=["']description["']/i.test(html)) fail(file, "missing meta description");
  if (!isRedirect && !/<main\b/i.test(html)) fail(file, "missing main landmark");
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (!isRedirect && h1Count !== 1) fail(file, `expected one h1, found ${h1Count}`);

  const ids = [...html.matchAll(/\bid=(?:"([^"]+)"|'([^']+)')/gi)].map((match) => match[1] ?? match[2]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicates.length) fail(file, `duplicate ids: ${duplicates.join(", ")}`);

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!("alt" in attributes(match[0]))) fail(file, `image missing alt: ${match[0].slice(0, 90)}`);
  }

  for (const match of html.matchAll(/<(?:link|script)\b[^>]*(?:href|src)=["'](?:\.\.\/)?(?:styles\.css|script\.js)\?v=([^"']+)["'][^>]*>/gi)) {
    if (match[1] !== cacheVersion) fail(file, `stale asset cache version ${match[1]}`);
  }

  const refs = [];
  for (const match of html.matchAll(/<(?:a|img|script|link|source)\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    for (const key of ["href", "src"]) if (attrs[key]) refs.push(attrs[key]);
    if (attrs.srcset) refs.push(...attrs.srcset.split(",").map((item) => item.trim().split(/\s+/)[0]));
  }
  for (const ref of refs) {
    const target = localPath(file, ref);
    if (!target || ref.startsWith("#")) continue;
    try {
      await fs.access(target);
    } catch {
      fail(file, `broken local reference ${ref}`);
    }
  }
}

if (failures.length) {
  console.error(`Site quality gate failed (${failures.length} findings):`);
  for (const item of failures) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Site quality gate passed: ${files.length} HTML files, cache ${cacheVersion}, no broken local references.`);
