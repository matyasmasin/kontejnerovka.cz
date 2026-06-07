import { readFile } from "node:fs/promises";
import "./load-env.mjs";
import { getServiceAccountPath } from "./google-auth.mjs";

const requiredApis = ["Google Search Console API", "Google Analytics Data API"];
const propertyId = process.env.GA4_PROPERTY_ID;
const gscSiteUrl = process.env.GSC_SITE_URL || "https://kontejnerovka.cz/";
const credentialsPath = getServiceAccountPath();
const issues = [];
let credentialIdentity = "";
let credentialType = "";
let credentialScopes = [];

if (!propertyId) {
  issues.push("GA4_PROPERTY_ID is missing.");
} else if (!/^\d+$/.test(propertyId)) {
  issues.push(`GA4_PROPERTY_ID must be numeric, not "${propertyId}".`);
}

let credentials;
try {
  credentials = JSON.parse(await readFile(credentialsPath, "utf8"));
} catch {
  issues.push(`Google credentials JSON is missing or invalid at ${credentialsPath}.`);
}

if (credentials) {
  credentialType = credentials.type || "";

  if (credentials.type === "service_account") {
    if (!credentials.client_email) issues.push("Service account JSON is missing client_email.");
    if (!credentials.private_key) issues.push("Service account JSON is missing private_key.");
    credentialIdentity = credentials.client_email || "";
  } else if (credentials.type === "authorized_user") {
    if (!credentials.client_id) issues.push("authorized_user credential is missing client_id.");
    if (!credentials.client_secret) issues.push("authorized_user credential is missing client_secret.");
    if (!credentials.refresh_token) issues.push("authorized_user credential is missing refresh_token.");
    credentialIdentity = "authorized_user OAuth credential";
    credentialScopes = Array.isArray(credentials.scopes) ? credentials.scopes : [];
    if (!credentialScopes.includes("https://www.googleapis.com/auth/webmasters.readonly")) {
      issues.push("authorized_user credential does not list the Search Console scope webmasters.readonly.");
    }
    if (!credentialScopes.includes("https://www.googleapis.com/auth/analytics.readonly")) {
      issues.push("authorized_user credential does not list the GA4 scope analytics.readonly.");
    }
  } else {
    issues.push(`Unsupported Google credentials type: ${credentials.type || "(missing)"}.`);
  }
}

console.log("Google API config check");
console.log(`- GA4_PROPERTY_ID: ${propertyId || "(missing)"}`);
console.log(`- GSC_SITE_URL: ${gscSiteUrl}`);
console.log(`- GOOGLE_APPLICATION_CREDENTIALS: ${credentialsPath}`);
console.log(`- Credential type: ${credentialType || "(not available yet)"}`);
console.log(`- Credential identity: ${credentialIdentity || "(not available yet)"}`);
if (credentialScopes.length) console.log(`- Credential scopes: ${credentialScopes.join(", ")}`);
console.log(`- Required APIs: ${requiredApis.join(", ")}`);

if (issues.length) {
  console.log("\nStatus: not ready");
  for (const issue of issues) console.log(`- ${issue}`);
  console.log("\nNext step: add a service account key with access to GSC and GA4, or create an OAuth credential with both webmasters.readonly and analytics.readonly scopes.");
  process.exit(1);
}

console.log("\nStatus: local config file looks ready for GSC and GA4 API attempts.");
console.log("Next step: run node scripts/fetch-google-data.mjs to test live API permissions.");
