"use server";

import { headers } from "next/headers";
import { contactForm } from "@/content/contact";
import { buildEnquiryNotification } from "@/lib/contact/notification";
import { isRateLimited } from "@/lib/contact/rate-limit";
import { verifyTurnstile } from "@/lib/contact/turnstile";
import {
  contactFields,
  hasErrors,
  normalizeContact,
  validateContact,
  type ContactValues,
  type FieldErrors,
} from "@/lib/contact/validation";
import { getEmailSetup } from "@/lib/email";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: FieldErrors;
  /** Echoed back so the form can be repopulated (also without JavaScript). */
  values?: Partial<ContactValues>;
  firstName?: string;
};

/** Humans can't complete the form this fast; bots often do. */
const MIN_FILL_TIME_MS = 2500;

export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Spam trap 1 — honeypot. Real visitors never see or fill this field.
  // Bots get a normal "success" so they learn nothing.
  if (String(formData.get("website") ?? "").trim() !== "") return { status: "success" };

  // Spam trap 2 — fill time, measured in the browser (no clock skew). Absent
  // without JavaScript, in which case the check is skipped.
  const elapsed = Number(formData.get("elapsed"));
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < MIN_FILL_TIME_MS) return { status: "success" };

  const raw: Record<string, unknown> = {};
  for (const field of contactFields) raw[field] = formData.get(field);
  const values = normalizeContact(raw);

  const fieldErrors = validateContact(values);
  if (hasErrors(fieldErrors)) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const requestHeaders = await headers();
  const ip = (requestHeaders.get("x-forwarded-for")?.split(",")[0] ?? requestHeaders.get("x-real-ip") ?? "unknown").trim();

  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "You've sent several enquiries in a short time. Please wait a few minutes and try again.",
      values,
    };
  }

  const captcha = await verifyTurnstile(formData.get("cf-turnstile-response")?.toString() ?? null, ip);
  if (!captcha.ok) {
    return { status: "error", message: "We couldn't confirm you're human. Please try again.", values };
  }

  const setup = getEmailSetup();
  if (!setup.ok) {
    console.error(`[contact] Email is not configured: ${setup.reason}`);
    return { status: "error", message: contactForm.error, values };
  }

  const email = buildEnquiryNotification(values, { submittedAt: new Date() });
  const result = await setup.provider.send({
    from: setup.from,
    to: setup.to,
    replyTo: values.email,
    ...email,
  });

  if (!result.ok) {
    console.error(`[contact] Delivery via ${setup.provider.name} failed: ${result.error}`);
    return { status: "error", message: contactForm.error, values };
  }

  return { status: "success", firstName: values.name.split(" ")[0] };
}
