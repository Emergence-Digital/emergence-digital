/**
 * Server-only Zoom client for registering workshop buyers for a webinar.
 *
 * Uses a Server-to-Server OAuth app (Zoom Marketplace → Develop → Build app →
 * Server-to-Server OAuth) with the scope to add webinar registrants. Once a
 * buyer is registered, Zoom sends its own confirmation email with their
 * personal join link, and the webinar's reminder emails. See SETUP.md,
 * "Paid workshops".
 */

import "server-only";

const REQUEST_TIMEOUT_MS = 10_000;

export class ZoomError extends Error {
  constructor(
    readonly step: string,
    /** HTTP status from Zoom; 0 for config, network or timeout errors. */
    readonly status: number,
    readonly detail: string,
  ) {
    super(`Zoom ${step} failed (${status || "no response"}): ${detail}`);
    this.name = "ZoomError";
  }
}

function credentials() {
  const accountId = process.env.ZOOM_ACCOUNT_ID?.trim();
  const clientId = process.env.ZOOM_CLIENT_ID?.trim();
  const clientSecret = process.env.ZOOM_CLIENT_SECRET?.trim();
  return accountId && clientId && clientSecret ? { accountId, clientId, clientSecret } : null;
}

/** True when the three ZOOM_ variables are set. */
export const zoomConfigured = () => credentials() !== null;

async function zoomFetch(step: string, url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  } catch (error) {
    throw new ZoomError(step, 0, error instanceof Error ? error.message : String(error));
  }
}

/** A fresh access token (they last an hour; one per webhook call is plenty at workshop volumes). */
async function accessToken(): Promise<string> {
  const creds = credentials();
  if (!creds) throw new ZoomError("config", 0, "ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID or ZOOM_CLIENT_SECRET is not set");

  const response = await zoomFetch(
    "token",
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(creds.accountId)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${creds.clientId}:${creds.clientSecret}`).toString("base64")}`,
      },
    },
  );
  const result: { access_token?: string; reason?: string } = await response.json().catch(() => ({}));
  if (!response.ok || !result.access_token) {
    throw new ZoomError("token", response.status, result.reason ?? "no access_token in the response");
  }
  return result.access_token;
}

export interface WebinarRegistrant {
  email: string;
  firstName: string;
  lastName?: string;
}

/**
 * Registers someone for a webinar and returns their personal join link. Registering the same email again
 * returns their existing registration, so a retried webhook doesn't double up.
 */
export async function registerForWebinar(webinarId: string, registrant: WebinarRegistrant): Promise<{ joinUrl?: string }> {
  const token = await accessToken();
  const response = await zoomFetch(
    "register",
    `https://api.zoom.us/v2/webinars/${encodeURIComponent(webinarId)}/registrants`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registrant.email,
        first_name: registrant.firstName,
        ...(registrant.lastName ? { last_name: registrant.lastName } : {}),
      }),
    },
  );
  const result: { join_url?: string; message?: string; code?: number } = await response.json().catch(() => ({}));
  if (!response.ok) throw new ZoomError("register", response.status, result.message ?? `code ${result.code ?? "?"}`);
  return { joinUrl: result.join_url };
}
