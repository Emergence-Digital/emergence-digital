import type { LeadValues } from "@/lib/lead-validation";

/**
 * Client only: emails a lead form submission through EmailJS, using the
 * template the old contact form used (name, email, phone, message). For forms
 * with `emailCopy` in src/lib/lead-forms.ts. Resolves false instead of throwing.
 */
export async function sendEmailCopy(values: LeadValues): Promise<boolean> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return false;

  // The template has no company field, so it goes at the top of the message.
  const message = values.company ? `Company: ${values.company}\n\n${values.message ?? ""}` : (values.message ?? "");
  try {
    const { default: emailjs } = await import("@emailjs/browser");
    await emailjs.send(
      serviceId,
      templateId,
      {
        name: [values.firstName, values.lastName].filter(Boolean).join(" "),
        email: values.email,
        phone: values.phone || "Not provided",
        message,
      },
      publicKey,
    );
    return true;
  } catch {
    return false;
  }
}
