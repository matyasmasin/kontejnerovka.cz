import crypto from "node:crypto";
import { readFile } from "node:fs/promises";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

const base64url = (value) => Buffer.from(value).toString("base64url");

export const getServiceAccountPath = () =>
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  process.env.GOOGLE_SERVICE_ACCOUNT_FILE ||
  ".secrets/google-service-account.json";

export async function getAccessToken(scopes) {
  const credentialsPath = getServiceAccountPath();
  let credentials;

  try {
    credentials = JSON.parse(await readFile(credentialsPath, "utf8"));
  } catch (error) {
    throw new Error(
      `Google service account key was not found or is invalid at ${credentialsPath}. ` +
        "Create it once and keep it outside git, then set GOOGLE_APPLICATION_CREDENTIALS."
    );
  }

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("Google service account key is missing client_email or private_key.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: credentials.client_email,
    scope: scopes.join(" "),
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`;
  const signature = crypto.createSign("RSA-SHA256").update(unsignedToken).sign(credentials.private_key);
  const assertion = `${unsignedToken}.${signature.toString("base64url")}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Google token request failed: ${response.status} ${body}`);
  }

  const token = await response.json();
  return token.access_token;
}
