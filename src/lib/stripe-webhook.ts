/**
 * Server-only Stripe webhook signature check, so the site doesn't need Stripe's SDK.
 *
 * Stripe signs each delivery: the Stripe-Signature header holds a timestamp (t)
 * and one or more v1 signatures, each an HMAC-SHA256 of "<t>.<raw body>" with
 * the endpoint's signing secret (whsec_…). See
 * https://docs.stripe.com/webhooks#verify-manually.
 */

import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/** Stripe's own libraries reject deliveries signed more than five minutes ago. */
const TOLERANCE_SECONDS = 300;

export function verifyStripeSignature(
  payload: string,
  header: string | null,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): boolean {
  if (!header) return false;

  let timestamp = "";
  const signatures: string[] = [];
  for (const part of header.split(",")) {
    const [key, value] = part.split("=", 2).map((s) => s.trim());
    if (key === "t") timestamp = value ?? "";
    else if (key === "v1" && value) signatures.push(value);
  }

  const t = Number(timestamp);
  if (!timestamp || !Number.isFinite(t) || signatures.length === 0) return false;
  if (Math.abs(nowSeconds - t) > TOLERANCE_SECONDS) return false;

  const expected = Buffer.from(createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex"));
  return signatures.some((signature) => {
    const given = Buffer.from(signature);
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
