import crypto from "node:crypto";
import { readFile } from "node:fs/promises";
import "./load-env.mjs";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

const base64url = (value) => Buffer.from(value).toString("base64url");

export const getServiceAccountPath = () =>
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  process.env.GOOGLE_SERVICE_ACCOUNT_FILE ||
  ".secrets/google-service-account.json";

async function readCredentials() {
  const credentialsPath = getServiceAccountPath();

  try {
    return { credentials: JSON.parse(await readFile(credentialsPath, "utf8")), credentialsPath };
  } catch (error) {
    throw new Error(
      `Google credentials file was not found or is invalid at ${credentialsPath}. ` +
        "Create it once and keep it outside git, then set GOOGLE_APPLICATION_CREDENTIALS."
    );
  }
}

async function getServiceAccountAccessToken(credentials, scopes) {
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

async function getAuthorizedUserAccessToken(credentials, scopes) {
  if (!credentials.client_id || !credentials.client_secret || !credentials.refresh_token) {
    throw new Error("Google authorized_user credentials are missing client_id, client_secret or refresh_token.");
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: credentials.refresh_token,
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
  });

  if (scopes.length) body.set("scope", scopes.join(" "));

  const response = await fetch(credentials.token_uri || TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google OAuth refresh failed: ${response.status} ${text}`);
  }

  const token = await response.json();
  return token.access_token;
}

export async function getAccessToken(scopes) {
  const { credentials } = await readCredentials();

  if (credentials.type === "service_account") {
    return getServiceAccountAccessToken(credentials, scopes);
  }

  if (credentials.type === "authorized_user") {
    return getAuthorizedUserAccessToken(credentials, scopes);
  }

  throw new Error(`Unsupported Google credentials type: ${credentials.type || "(missing)"}.`);
}
