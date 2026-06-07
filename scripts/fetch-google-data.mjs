import { spawnSync } from "node:child_process";
import "./load-env.mjs";

const scripts = ["scripts/fetch-gsc.mjs", "scripts/fetch-ga4.mjs"];
let failed = false;

for (const script of scripts) {
  console.log(`\n== ${script} ==`);
  const result = spawnSync(process.execPath, [script], {
    stdio: "inherit",
    env: process.env,
  });

  if (result.status !== 0) {
    failed = true;
    console.error(`${script} did not finish successfully.`);
  }
}

if (failed) {
  console.error("\nSome Google data imports failed. Run node scripts/check-google-config.mjs and verify Google credential access to GSC and GA4.");
  process.exit(1);
}

console.log("\nGoogle data import finished.");
