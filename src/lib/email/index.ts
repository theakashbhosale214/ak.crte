import "server-only";
import { createConsoleProvider, createPostmarkProvider, createResendProvider } from "./providers";
import type { EmailProvider } from "./types";

export type { EmailMessage, EmailProvider, SendResult } from "./types";

export type EmailSetup =
  | { ok: true; provider: EmailProvider; from: string; to: string[] }
  | { ok: false; reason: string };

function list(value: string | undefined) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * Central email integration point. Configure with environment variables
 * (server-side only — never NEXT_PUBLIC_):
 *
 *   EMAIL_PROVIDER        resend | postmark | console   (optional; inferred from keys)
 *   RESEND_API_KEY        when using Resend
 *   POSTMARK_SERVER_TOKEN when using Postmark
 *   CONTACT_TO_EMAIL      where enquiries are delivered (comma-separated allowed)
 *   CONTACT_FROM_EMAIL    a sender on a domain verified with your provider
 *
 * With nothing configured, development logs messages to the console, while
 * production refuses to pretend an email was sent.
 */
export function getEmailSetup(): EmailSetup {
  const explicit = process.env.EMAIL_PROVIDER?.trim().toLowerCase();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN?.trim();
  const to = list(process.env.CONTACT_TO_EMAIL);
  const from = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";

  const useConsole =
    explicit === "console" || (!explicit && !resendKey && !postmarkToken && process.env.NODE_ENV !== "production");
  if (useConsole) {
    return {
      ok: true,
      provider: createConsoleProvider(),
      from: from || "website@localhost",
      to: to.length ? to : ["enquiries@localhost"],
    };
  }

  let provider: EmailProvider | null = null;
  if (explicit === "resend" || (!explicit && resendKey)) {
    if (!resendKey) return { ok: false, reason: "EMAIL_PROVIDER is 'resend' but RESEND_API_KEY is missing." };
    provider = createResendProvider(resendKey);
  } else if (explicit === "postmark" || (!explicit && postmarkToken)) {
    if (!postmarkToken)
      return { ok: false, reason: "EMAIL_PROVIDER is 'postmark' but POSTMARK_SERVER_TOKEN is missing." };
    provider = createPostmarkProvider(postmarkToken);
  } else if (explicit) {
    return { ok: false, reason: `Unknown EMAIL_PROVIDER '${explicit}'.` };
  }

  if (!provider) return { ok: false, reason: "No email provider is configured." };
  if (!to.length) return { ok: false, reason: "CONTACT_TO_EMAIL is not set." };
  if (!from) return { ok: false, reason: "CONTACT_FROM_EMAIL is not set." };

  return { ok: true, provider, from, to };
}
