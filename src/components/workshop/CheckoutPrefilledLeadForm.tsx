"use client";

import { useMemo, useSyncExternalStore } from "react";
import LeadForm from "@/components/sections/LeadForm";
import { CHECKOUT_PREFILL_KEY, type LeadFormId } from "@/lib/lead-forms";

// The stored details don't change while the page is open, so there's nothing to subscribe to.
const subscribe = () => () => {};

function readStored(): string {
  try {
    return sessionStorage.getItem(CHECKOUT_PREFILL_KEY) ?? "";
  } catch {
    return "";
  }
}

/** The stored keys (named for the GHL calendar) and the form fields they fill. */
const FIELD_FOR_KEY: Record<string, string> = {
  first_name: "firstName",
  last_name: "lastName",
  email: "email",
  phone: "phone",
  company: "company",
};

function toInitialValues(raw: string): Record<string, string> {
  try {
    const parsed: unknown = JSON.parse(raw || "{}");
    if (!parsed || typeof parsed !== "object") return {};
    const values: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value !== "string" || !Object.hasOwn(FIELD_FOR_KEY, key)) continue;
      // The phone is kept in +61 form for the calendar; show an Australian number the way people type it.
      values[FIELD_FOR_KEY[key]] = key === "phone" ? value.replace(/^\+61(?=4\d{8}$)/, "0") : value;
    }
    return values;
  } catch {
    return {};
  }
}

interface CheckoutPrefilledLeadFormProps {
  formId: LeadFormId;
  className?: string;
}

/**
 * A <LeadForm /> prefilled with the details a checkout form kept in this tab's sessionStorage (the workshop landing
 * page form keeps them before sending people to Stripe, and they never come back through Stripe). The server render
 * leaves a placeholder, so the form appears once, in the browser, already filled in. Opened in another tab, the
 * fields start empty.
 */
export default function CheckoutPrefilledLeadForm({ formId, className = "" }: CheckoutPrefilledLeadFormProps) {
  const raw = useSyncExternalStore(subscribe, readStored, () => null);
  const initialValues = useMemo(() => (raw === null ? null : toInitialValues(raw)), [raw]);

  if (!initialValues) return <div className={`min-h-[520px] ${className}`} aria-hidden="true" />;
  return <LeadForm formId={formId} initialValues={initialValues} className={className} />;
}
