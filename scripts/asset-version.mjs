import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

export const getAssetVersion = (rootDir = process.cwd()) => {
  const hash = createHash("sha256");

  for (const file of ["styles.css", "script.js", "assets/icons.js"]) {
    hash.update(readFileSync(path.join(rootDir, file)));
  }

  return hash.digest("hex").slice(0, 10);
};
