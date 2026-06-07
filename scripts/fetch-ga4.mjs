import path from "node:path";
import "./load-env.mjs";
import { getAccessToken } from "./google-auth.mjs";
import { ensureOutputDir, getCompleteDateRange, getPreviousDateRange, writeCsv, writeMarkdown } from "./google-data-utils.mjs";

const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const API_ROOT = "https://analyticsdata.googleapis.com/v1beta";
const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

if (!PROPERTY_ID) {
  console.error("GA4_PROPERTY_ID is missing. Use the numeric GA4 property ID, not the G- measurement ID. Run node scripts/check-google-config.mjs.");
  process.exit(1);
}

async function runReport(token, body) {
  const response = await fetch(`${API_ROOT}/properties/${PROPERTY_ID}:runReport`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GA4 Data API failed: ${response.status} ${text}`);
  }

  return response.json();
}

const normalizeReport = (report) => {
  const dimensions = (report.dimensionHeaders || []).map((header) => header.name);
  const metrics = (report.metricHeaders || []).map((header) => header.name);
  return (report.rows || []).map((row) => {
    const item = {};
    dimensions.forEach((name, index) => {
      item[name] = row.dimensionValues?.[index]?.value || "";
    });
    metrics.forEach((name, index) => {
      item[name] = row.metricValues?.[index]?.value || "0";
    });
    return item;
  });
};

async function fetchEvents(token, dateRange) {
  return normalizeReport(
    await runReport(token, {
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }, { name: "totalUsers" }],
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 250,
    })
  );
}

async function fetchLandingPages(token, dateRange) {
  return normalizeReport(
    await runReport(token, {
      dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
      dimensions: [{ name: "landingPagePlusQueryString" }, { name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }, { name: "totalUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 500,
    })
  );
}

async function main() {
  const token = await getAccessToken([SCOPE]);
  const outputDir = await ensureOutputDir("ga4");
  const current = getCompleteDateRange(28);
  const previous = getPreviousDateRange(28);

  const currentEvents = await fetchEvents(token, current);
  const previousEvents = await fetchEvents(token, previous);
  const currentLandingPages = await fetchLandingPages(token, current);
  const previousLandingPages = await fetchLandingPages(token, previous);

  await writeCsv(path.join(outputDir, "ga4-events-last-28-days.csv"), ["eventName", "eventCount", "totalUsers"], currentEvents);
  await writeCsv(path.join(outputDir, "ga4-events-prev-28-days.csv"), ["eventName", "eventCount", "totalUsers"], previousEvents);
  await writeCsv(
    path.join(outputDir, "ga4-landing-pages-last-28-days.csv"),
    ["landingPagePlusQueryString", "sessionDefaultChannelGroup", "sessions", "totalUsers"],
    currentLandingPages
  );
  await writeCsv(
    path.join(outputDir, "ga4-landing-pages-prev-28-days.csv"),
    ["landingPagePlusQueryString", "sessionDefaultChannelGroup", "sessions", "totalUsers"],
    previousLandingPages
  );

  const keyEvents = ["click_phone", "click_email", "lead_form_submit", "form_start", "cta_click", "generate_lead"];
  const eventSummary = keyEvents
    .map((eventName) => {
      const currentRow = currentEvents.find((row) => row.eventName === eventName);
      const previousRow = previousEvents.find((row) => row.eventName === eventName);
      return `- ${eventName}: ${currentRow?.eventCount || 0} (previous: ${previousRow?.eventCount || 0})`;
    })
    .join("\n");

  await writeMarkdown(
    path.join(outputDir, "latest-ga4-summary.md"),
    `# GA4 summary - Kontejnerovka.cz

Property ID: ${PROPERTY_ID}
Current period: ${current.startDate} to ${current.endDate}
Previous period: ${previous.startDate} to ${previous.endDate}

## Key events

${eventSummary}

## Rows

- Current events: ${currentEvents.length}
- Current landing pages: ${currentLandingPages.length}
- Previous events: ${previousEvents.length}
- Previous landing pages: ${previousLandingPages.length}

Source: GA4 Data API
`
  );

  console.log(`GA4 data saved to ${outputDir}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
