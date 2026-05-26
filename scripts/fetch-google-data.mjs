import { spawnSync } from "node:child_process";

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
  console.error("\nSome Google data imports failed. This is expected until API credentials and GA4_PROPERTY_ID are configured.");
  process.exit(1);
}

console.log("\nGoogle data import finished.");
