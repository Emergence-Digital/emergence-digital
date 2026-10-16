"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { leadForms, type LeadField, type LeadFormConfig, type LeadFormId } from "@/lib/lead-forms";
import {
  isRequired,
  toE164,
  validateLead,
  validateLeadField,
  type FieldErrors,
  type LeadValues,
} from "@/lib/lead-validation";
import { readAttribution, stripPersonalParams } from "@/lib/attribution";

type FormStatus = "idle" | "submitting" | "success" | "error";

const GENERIC_ERROR =
  "Sorry, we couldn't send your details just now. Please try again, or email contact@emergencedigital.com.au.";

const inputClass =
  "w-full bg-white border rounded-lg px-4 py-3 text-body placeholder:text-muted focus:outline-none transition-colors duration-200 text-sm";
const labelClass = "block text-xs font-semibold tracking-widest uppercase text-muted mb-2";

function errorSummary(fieldErrors: FieldErrors): string {
  const count = Object.keys(fieldErrors).length;
  return `Please check ${count === 1 ? "1 field" : `${count} fields`} and try again.`;
}

function successUrl(form: LeadFormConfig, values: LeadValues): string | null {
  if (form.success.type !== "redirect") return null;
  const url = new URL(form.success.url, window.location.origin);
  if (form.success.prefillBooking) {
    const prefill = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone ? (toE164(values.phone) ?? values.phone) : "",
    };
    for (const [key, value] of Object.entries(prefill)) {
      if (value?.trim()) url.searchParams.set(key, value.trim());
    }
  }
  return url.origin === window.location.origin ? `${url.pathname}${url.search}${url.hash}` : url.toString();
}

interface LeadFormProps {
  formId: LeadFormId;
  className?: string;
}

/**
 * Config-driven lead capture form (fields, tags and success behaviour come from
 * src/lib/lead-forms.ts). Posts to /api/lead with first-touch attribution.
 */
export default function LeadForm({ formId, className = "" }: LeadFormProps) {
  const form: LeadFormConfig = leadForms[formId];
  const router = useRouter();
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;

  const [values, setValues] = useState<LeadValues>(() =>
    Object.fromEntries(form.fields.map((f) => [f.name, ""])),
  );
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState("");

  const mountedAt = useRef(0);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const first = form.fields.find((f) => fieldErrors[f.name]);
    if (first) document.getElementById(fieldId(first.name))?.focus();
  };

  const handleChange = (field: LeadField, value: string) => {
    setValues((prev) => ({ ...prev, [field.name]: value }));
    // Once a field has shown an error, re-check it as the user types so the message clears.
    if (errors[field.name]) {
      const error = validateLeadField(field, value);
      const next = { ...errors };
      if (error) next[field.name] = error;
      else delete next[field.name];
      setErrors(next);
      if (Object.keys(next).length === 0 && status !== "error") setFormError("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const fieldErrors = validateLead(form, values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus("idle");
      setFormError(errorSummary(fieldErrors));
      focusFirstError(fieldErrors);
      return;
    }

    setStatus("submitting");
    setFormError("");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          fields: values,
          attribution: readAttribution(),
          pageUrl: stripPersonalParams(window.location.href),
          website: honeypot,
          elapsedMs: Math.round(performance.now() - mountedAt.current),
        }),
      });
      const result: { ok?: boolean; errors?: FieldErrors } = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        const redirectTo = successUrl(form, values);
        setStatus("success");
        if (redirectTo?.startsWith("/")) router.push(redirectTo);
        else if (redirectTo) window.location.assign(redirectTo);
        return;
      }
      if (result.errors && Object.keys(result.errors).length > 0) {
        setErrors(result.errors);
        setStatus("idle");
        setFormError(errorSummary(result.errors));
        focusFirstError(result.errors);
        return;
      }
      setStatus("error");
      setFormError(GENERIC_ERROR);
    } catch {
      setStatus("error");
      setFormError(GENERIC_ERROR);
    }
  };

  if (status === "success" && form.success.type === "message") {
    return (
      <div className={`bg-white rounded-2xl shadow-sm p-8 md:p-10 ${className}`}>
        <div className="text-center py-10" role="status">
          <div className="w-14 h-14 rounded-full bg-mid-green/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="font-serif text-2xl font-bold text-dark-green mb-2 focus:outline-none"
          >
            {form.success.heading}
          </h3>
          <p className="text-muted">{form.success.body}</p>
        </div>
      </div>
    );
  }

  const busy = status === "submitting" || status === "success";

  return (
    <div className={`bg-white rounded-2xl shadow-sm p-8 md:p-10 ${className}`}>
      <form onSubmit={handleSubmit} noValidate aria-busy={busy}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {form.fields.map((field) => {
            const id = fieldId(field.name);
            const errorId = `${id}-error`;
            const error = errors[field.name];
            const required = isRequired(field);
            const controlClass = `${inputClass} ${
              error ? "border-red-600 focus:border-red-600" : "border-dark-green/20 focus:border-mid-green"
            }`;
            const shared = {
              id,
              name: field.name,
              required,
              "aria-invalid": error ? true : undefined,
              "aria-describedby": error ? errorId : undefined,
              disabled: busy,
            };

            return (
              <div key={field.name} className={field.half ? "" : "sm:col-span-2"}>
                <label htmlFor={id} className={labelClass}>
                  {field.label}{" "}
                  {required ? (
                    <span className="text-mid-green" aria-hidden="true">
                      *
                    </span>
                  ) : (
                    <span className="text-muted font-normal normal-case tracking-normal">(optional)</span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    {...shared}
                    rows={4}
                    value={values[field.name]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={field.placeholder}
                    className={`${controlClass} resize-none`}
                  />
                ) : field.type === "select" ? (
                  <div className="relative">
                    <select
                      {...shared}
                      value={values[field.name]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className={`${controlClass} appearance-none pr-10 ${values[field.name] ? "" : "text-muted"}`}
                    >
                      <option value="">Choose one…</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option} className="text-body">
                          {option}
                        </option>
                      ))}
                    </select>
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      aria-hidden="true"
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dark-green"
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ) : (
                  <input
                    {...shared}
                    type={field.type}
                    inputMode={field.type === "tel" ? "tel" : undefined}
                    autoComplete={field.autoComplete}
                    value={values[field.name]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    placeholder={field.placeholder}
                    className={controlClass}
                  />
                )}

                {error && (
                  <p id={errorId} className="mt-2 text-sm text-red-600">
                    {error}
                  </p>
                )}
              </div>
            );
          })}

          {/* Honeypot: hidden from people and assistive tech; bots that fill every field get a fake success. */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label htmlFor={fieldId("website")}>Leave this field empty</label>
            <input
              id={fieldId("website")}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="sm:col-span-2">
            {/* Always rendered so screen readers announce the message when it appears. */}
            <div aria-live="assertive">
              {formError && <p className="mb-4 text-sm text-red-600">{formError}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={busy}
              className="w-full justify-center text-center"
            >
              {status === "submitting" ? "Sending…" : status === "success" ? "Sent, one moment…" : form.submitLabel}
            </Button>

            <p className="sr-only" aria-live="polite">
              {status === "submitting" ? "Sending your details." : status === "success" ? "Sent. Taking you to the next step." : ""}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
