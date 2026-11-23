/**
 * POST /api/stripe/webhook: Stripe tells the site about each completed workshop payment.
 *
 * For a paid Checkout Session from a workshop's payment link (matched on the
 * metadata.event the link copies onto it, see src/lib/workshops.ts):
 *   1. adds the workshop's paid tag to the GHL contact (the client_reference_id
 *      the landing page form passed to Stripe, or else found by email);
 *   2. registers the buyer for the Zoom webinar, so Zoom emails their join link
 *      and reminders, and saves the join link to the contact in GHL.
 *
 * Responds 200 once that's done, or for events it doesn't handle. Responds 5xx
 * when GHL or Zoom fails, so Stripe retries (for up to three days); both steps
 * are safe to repeat. Every outcome is a JSON log line starting "workshop.".
 * Setup (endpoint, events, secrets): SETUP.md, "Paid workshops".
 */

import { NextResponse } from "next/server";
import { verifyStripeSignature } from "@/lib/stripe-webhook";
import { workshopForStripeEvent, type Workshop } from "@/lib/workshops";
import {
  addContactTags,
  getContact,
  logLeadEvent,
  maskEmail,
  updateContactCustomFields,
  upsertContactByEmail,
  type GhlContactSummary,
} from "@/lib/ghl";
import { registerForWebinar, zoomConfigured } from "@/lib/zoom";

/** A few GHL calls and two Zoom calls, each with a 10s timeout. */
export const maxDuration = 30;

const HANDLED_EVENTS = new Set(["checkout.session.completed", "checkout.session.async_payment_succeeded"]);

/** The parts of a Checkout Session this route reads. */
interface CheckoutSession {
  id: string;
  payment_status?: string;
  client_reference_id?: string | null;
  metadata?: Record<string, string> | null;
  amount_total?: number | null;
  currency?: string | null;
  customer_email?: string | null;
  customer_details?: { email?: string | null; name?: string | null } | null;
}

const json = (body: object, status = 200) => NextResponse.json(body, { status });

/** "Jane Q Citizen" → ["Jane", "Q Citizen"]. */
function splitName(name: string | null | undefined): [string, string] {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  return [parts[0] ?? "", parts.slice(1).join(" ")];
}

async function fulfilWorkshopBooking(workshop: Workshop, session: CheckoutSession, email: string) {
  const log = { sessionId: session.id, workshop: workshop.slug, email: maskEmail(email) };
  const [cardFirst, cardLast] = splitName(session.customer_details?.name);

  // 1. GHL: find the contact the landing page form made, then tag it as paid.
  const referenceId = session.client_reference_id?.trim();
  let contactId = referenceId && /^[\w-]{1,200}$/.test(referenceId) ? referenceId : "";
  let contact: GhlContactSummary = {};
  if (contactId) {
    try {
      contact = await getContact(contactId);
    } catch (error) {
      // A stale or edited ID: fall back to finding them by email.
      logLeadEvent("warn", "workshop.contact_lookup_failed", { ...log, contactId, error: String(error) });
      contactId = "";
    }
  }
  if (!contactId) {
    contactId = await upsertContactByEmail({
      email,
      firstName: cardFirst || undefined,
      lastName: cardLast || undefined,
      source: `Workshop payment: ${workshop.name}`,
    });
  }
  await addContactTags(contactId, [workshop.tags.paid]);
  logLeadEvent("info", "workshop.tagged_paid", { ...log, contactId });

  // 2. Zoom: register them, so Zoom sends the join link and reminders.
  if (!workshop.zoomWebinarId || !zoomConfigured()) {
    logLeadEvent("warn", "workshop.zoom_skipped", {
      ...log,
      contactId,
      missing: workshop.zoomWebinarId ? "ZOOM_ env vars" : "zoomWebinarId in workshops.ts",
    });
    return;
  }
  const firstName = contact.firstName?.trim() || cardFirst || email.split("@")[0];
  const lastName = contact.firstName?.trim() ? contact.lastName?.trim() : cardLast;
  const { joinUrl } = await registerForWebinar(workshop.zoomWebinarId, { email, firstName, lastName });
  logLeadEvent("info", "workshop.zoom_registered", { ...log, contactId });

  // A copy of the join link in GHL, for a backup email or a quick lookup. Not worth a retry if it fails.
  if (joinUrl) {
    try {
      await updateContactCustomFields(contactId, [
        { id: workshop.ghlFieldIds.zoomJoinLink, field_value: joinUrl },
        { id: workshop.ghlFieldIds.webinarDate, field_value: workshop.startsAt.slice(0, 10) },
      ]);
    } catch (error) {
      logLeadEvent("warn", "workshop.join_link_not_saved", { ...log, contactId, error: String(error) });
    }
  }
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!secret) {
    logLeadEvent("error", "workshop.webhook_misconfigured", { missing: "STRIPE_WEBHOOK_SECRET" });
    return json({ error: "Not configured." }, 500);
  }

  const payload = await request.text();
  if (!verifyStripeSignature(payload, request.headers.get("stripe-signature"), secret)) {
    logLeadEvent("warn", "workshop.bad_signature", {});
    return json({ error: "Invalid signature." }, 400);
  }

  let event: { id?: string; type?: string; data?: { object?: CheckoutSession } };
  try {
    event = JSON.parse(payload);
  } catch {
    return json({ error: "Invalid payload." }, 400);
  }

  const session = event.data?.object;
  if (!event.type || !HANDLED_EVENTS.has(event.type) || !session?.id) return json({ received: true });

  const workshop = workshopForStripeEvent(session.metadata?.event);
  if (!workshop) return json({ received: true });

  // Bank debits complete the session before the money arrives; their async_payment_succeeded event follows.
  if (session.payment_status !== "paid") {
    logLeadEvent("info", "workshop.awaiting_payment", { sessionId: session.id, status: session.payment_status });
    return json({ received: true });
  }

  const email = (session.customer_details?.email || session.customer_email || "").trim().toLowerCase();
  if (!email) {
    logLeadEvent("error", "workshop.no_email", { sessionId: session.id, workshop: workshop.slug });
    return json({ received: true });
  }

  try {
    await fulfilWorkshopBooking(workshop, session, email);
    return json({ received: true });
  } catch (error) {
    const detail =
      error && typeof error === "object" && "step" in error
        ? { step: (error as { step: string }).step, status: (error as { status?: number }).status, detail: String(error) }
        : { detail: String(error) };
    logLeadEvent("error", "workshop.fulfil_failed", {
      sessionId: session.id,
      eventId: event.id,
      workshop: workshop.slug,
      email: maskEmail(email),
      ...detail,
    });
    return json({ error: "Couldn't finish the booking; Stripe will retry." }, 500);
  }
}
