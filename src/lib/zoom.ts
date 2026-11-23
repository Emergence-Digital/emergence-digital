/**
 * Server-only Zoom client for registering workshop buyers for a Zoom Events event.
 *
 * Uses a Server-to-Server OAuth app (marketplace.zoom.us → Developers → Build an
 * app → Server-to-Server OAuth app) with the Zoom Events ticket scope
 * (zoom_events:write:ticket:admin). Each buyer gets a ticket through
 * POST /zoom_events/events/{eventId}/tickets with send_notification on, so Zoom
 * Events emails them its confirmation with their join link, plus the event's
 * reminders. (Zoom Events can't take registrants through the Webinar API.)
 * See SETUP.md, "Paid workshops".
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

export interface EventAttendee {
  email: string;
  firstName: string;
  lastName?: string;
  /** Our own reference, shown against the ticket in Zoom (the Stripe Checkout Session ID). */
  externalTicketId?: string;
}

interface CreateTicketsResponse {
  tickets?: { ticket_id?: string; email?: string; event_join_link?: string }[];
  errors?: { email?: string; error_code?: number | string; message?: string }[];
  message?: string;
  code?: number;
}

/** Zoom's per-ticket error for someone who already has a ticket: a retried webhook, so not a failure. */
const ALREADY_REGISTERED = /already|exist|duplicate/i;

/**
 * Gives someone a ticket to a Zoom Events event and returns their personal join link. Zoom Events emails them
 * its confirmation (send_notification). A repeat for someone who already has a ticket is treated as done.
 */
export async function createEventTicket(
  eventId: string,
  ticketTypeId: string,
  attendee: EventAttendee,
): Promise<{ joinUrl?: string; alreadyRegistered?: boolean }> {
  const token = await accessToken();
  const response = await zoomFetch(
    "create-ticket",
    `https://api.zoom.us/v2/zoom_events/events/${encodeURIComponent(eventId)}/tickets`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        tickets: [
          {
            email: attendee.email,
            first_name: attendee.firstName,
            ...(attendee.lastName ? { last_name: attendee.lastName } : {}),
            ticket_type_id: ticketTypeId,
            ...(attendee.externalTicketId ? { external_ticket_id: attendee.externalTicketId } : {}),
            send_notification: true,
          },
        ],
      }),
    },
  );
  const result: CreateTicketsResponse = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ZoomError("create-ticket", response.status, result.message ?? `code ${result.code ?? "?"}`);
  }

  // A 201 can still carry a per-ticket error (the batch endpoint reports each one).
  const error = result.errors?.[0];
  if (error) {
    const detail = `${error.error_code ?? "?"}: ${error.message ?? "no message"}`;
    if (ALREADY_REGISTERED.test(error.message ?? "")) return { alreadyRegistered: true };
    throw new ZoomError("create-ticket", response.status, detail);
  }
  return { joinUrl: result.tickets?.[0]?.event_join_link };
}
