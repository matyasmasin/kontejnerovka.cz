import path from "node:path";
import { writeFile } from "node:fs/promises";
import "./load-env.mjs";
import { getAccessToken } from "./google-auth.mjs";
import {
  ensureOutputDir,
  getCompleteDateRange,
  getPreviousDateRange,
  sum,
  writeCsv,
  writeMarkdown,
} from "./google-data-utils.mjs";

const SITE_URL = process.env.GSC_SITE_URL || "https://kontejnerovka.cz/";
const API_ROOT = "https://searchconsole.googleapis.com/webmasters/v3";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

async function gscRequest(token, endpoint, options = {}) {
  const response = await fetch(`${API_ROOT}${endpoint}`, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Search Console API failed: ${response.status} ${body}`);
  }

  return response.json();
}

async function queryPerformance(token, dateRange, dimensions) {
  const body = {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    dimensions,
    rowLimit: 25000,
  };

  const encodedSite = encodeURIComponent(SITE_URL);
  const data = await gscRequest(token, `/sites/${encodedSite}/searchAnalytics/query`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return (data.rows || []).map((row) => ({
    keys: (row.keys || []).join(" | "),
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
}

async function main() {
  const token = await getAccessToken([SCOPE]);
  const outputDir = await ensureOutputDir("gsc");
  const current = getCompleteDateRange(28);
  const previous = getPreviousDateRange(28);

  const datasets = [
    ["queries-last-28-days", current, ["query"]],
    ["pages-last-28-days", current, ["page"]],
    ["queries-prev-28-days", previous, ["query"]],
    ["pages-prev-28-days", previous, ["page"]],
  ];

  const results = {};
  for (const [name, range, dimensions] of datasets) {
    const rows = await queryPerformance(token, range, dimensions);
    results[name] = rows;
    await writeCsv(path.join(outputDir, `gsc-${name}.csv`), ["keys", "clicks", "impressions", "ctr", "position"], rows);
  }

  const encodedSite = encodeURIComponent(SITE_URL);
  const sitemaps = await gscRequest(token, `/sites/${encodedSite}/sitemaps`);
  await writeFile(path.join(outputDir, "gsc-sitemaps.json"), JSON.stringify(sitemaps, null, 2), "utf8");

  const currentQueries = results["queries-last-28-days"];
  const previousQueries = results["queries-prev-28-days"];
  const currentClicks = sum(currentQueries, "clicks");
  const previousClicks = sum(previousQueries, "clicks");
  const currentImpressions = sum(currentQueries, "impressions");
  const previousImpressions = sum(previousQueries, "impressions");

  await writeMarkdown(
    path.join(outputDir, "latest-gsc-summary.md"),
    `# GSC summary - Kontejnerovka.cz

Site: ${SITE_URL}
Current period: ${current.startDate} to ${current.endDate}
Previous period: ${previous.startDate} to ${previous.endDate}

## Current period

- Query rows: ${currentQueries.length}
- Page rows: ${results["pages-last-28-days"].length}
- Clicks: ${currentClicks}
- Impressions: ${currentImpressions}

## Previous period

- Query rows: ${previousQueries.length}
- Page rows: ${results["pages-prev-28-days"].length}
- Clicks: ${previousClicks}
- Impressions: ${previousImpressions}

## Change

- Clicks: ${currentClicks - previousClicks}
- Impressions: ${currentImpressions - previousImpressions}

Source: Search Console API
`
  );

  console.log(`GSC data saved to ${outputDir}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
