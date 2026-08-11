"use client";

import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import Button from "@/components/ui/Button";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white border border-dark-green/20 rounded-lg px-4 py-3 text-body placeholder:text-muted focus:outline-none focus:border-mid-green transition-colors duration-200 text-sm";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
      {status === "success" ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 rounded-full bg-mid-green/10 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 13l4 4L19 7"
                stroke="#4A7C59"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="font-serif text-2xl font-bold text-dark-green mb-2">
            Message Sent!
          </h3>
          <p className="text-muted">
            Thanks for getting in touch. We&apos;ll be back to you shortly.
          </p>
          <button
            className="mt-6 text-sm text-mid-green underline underline-offset-2"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold tracking-widest uppercase text-muted mb-2"
              >
                Name <span className="text-mid-green">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold tracking-widest uppercase text-muted mb-2"
              >
                Email <span className="text-mid-green">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            {/* Phone (optional) */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold tracking-widest uppercase text-muted mb-2"
              >
                Phone <span className="text-muted font-normal normal-case">(optional)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+61 4xx xxx xxx"
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold tracking-widest uppercase text-muted mb-2"
              >
                Message <span className="text-mid-green">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <p className="text-sm text-red-600">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              disabled={status === "sending"}
              className="w-full justify-center text-center"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
