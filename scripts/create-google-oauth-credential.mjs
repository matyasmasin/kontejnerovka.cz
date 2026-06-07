import crypto from "node:crypto";
import http from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "./load-env.mjs";
import { getServiceAccountPath } from "./google-auth.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(repoRoot, ".secrets/google-gsc-ga4-oauth.json");
const tokenUri = "https://oauth2.googleapis.com/token";
const scopes = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly",
];

async function readOAuthClient() {
  const candidates = [
    process.env.GOOGLE_OAUTH_CLIENT_FILE,
    process.env.GOOGLE_OAUTH_SEED_FILE,
    getServiceAccountPath(),
    "/Users/claude/.codex/secrets/autoservis1-gsc-credential.json",
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      const data = JSON.parse(await readFile(candidate, "utf8"));
      if (data.client_id && data.client_secret) {
        return { clientId: data.client_id, clientSecret: data.client_secret, source: candidate };
      }
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error("No OAuth client_id/client_secret found. Provide GOOGLE_OAUTH_CLIENT_FILE or a valid authorized_user JSON.");
}

function listen(port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer();
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

async function main() {
  const { clientId, clientSecret, source } = await readOAuthClient();
  const port = Number(process.env.GOOGLE_OAUTH_PORT || 8767);
  const redirectUri = `http://127.0.0.1:${port}/oauth2callback`;
  const state = crypto.randomBytes(16).toString("hex");
  const server = await listen(port);

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", scopes.join(" "));
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  authUrl.searchParams.set("state", state);

  console.log("Google OAuth setup for Kontejnerovka.cz");
  console.log(`OAuth client source: ${source}`);
  console.log(`Callback: ${redirectUri}`);
  console.log(`Output: ${outputPath}`);
  console.log("\nOpen this URL and approve access:\n");
  console.log(authUrl.toString());
  console.log("\nWaiting for Google callback...");

  const done = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("OAuth setup timed out after 10 minutes.")), 10 * 60 * 1000);

    server.on("request", async (request, response) => {
      try {
        const url = new URL(request.url, redirectUri);
        if (url.pathname !== "/oauth2callback") {
          response.writeHead(404);
          response.end("Not found");
          return;
        }

        if (url.searchParams.get("state") !== state) {
          throw new Error("OAuth state mismatch.");
        }

        const error = url.searchParams.get("error");
        if (error) throw new Error(`Google returned OAuth error: ${error}`);

        const code = url.searchParams.get("code");
        if (!code) throw new Error("Google callback did not include an authorization code.");

        const tokenResponse = await fetch(tokenUri, {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
          }),
        });

        const tokenText = await tokenResponse.text();
        if (!tokenResponse.ok) throw new Error(`Token exchange failed: ${tokenResponse.status} ${tokenText}`);

        const token = JSON.parse(tokenText);
        if (!token.refresh_token) {
          throw new Error("Google did not return a refresh_token. Re-run with prompt=consent or remove old app access and try again.");
        }

        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(
          outputPath,
          `${JSON.stringify(
            {
              type: "authorized_user",
              client_id: clientId,
              client_secret: clientSecret,
              refresh_token: token.refresh_token,
              token_uri: tokenUri,
              scopes,
            },
            null,
            2
          )}\n`,
          "utf8"
        );

        response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
        response.end("Google access saved. You can close this tab and return to Codex.");
        clearTimeout(timer);
        resolve();
      } catch (error) {
        response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
        response.end(error.message);
        clearTimeout(timer);
        reject(error);
      }
    });
  });

  try {
    await done;
    console.log(`\nSaved OAuth credential to ${outputPath}`);
    console.log("Set GOOGLE_APPLICATION_CREDENTIALS to this path and run node scripts/fetch-google-data.mjs.");
  } finally {
    server.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
