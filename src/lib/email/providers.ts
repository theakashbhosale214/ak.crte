import "server-only";
import type { EmailMessage, EmailProvider, SendResult } from "./types";

const TIMEOUT_MS = 10_000;

async function readError(response: Response) {
  const body = await response.text().catch(() => "");
  return `${response.status} ${response.statusText}${body ? ` — ${body.slice(0, 300)}` : ""}`;
}

/** Resend — https://resend.com/docs/api-reference/emails/send-email */
export function createResendProvider(apiKey: string): EmailProvider {
  return {
    name: "resend",
    async send(message: EmailMessage): Promise<SendResult> {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: message.from,
            to: message.to,
            reply_to: message.replyTo,
            subject: message.subject,
            html: message.html,
            text: message.text,
          }),
          signal: AbortSignal.timeout(TIMEOUT_MS),
          cache: "no-store",
        });
        if (!response.ok) return { ok: false, error: `Resend: ${await readError(response)}` };
        const data = (await response.json().catch(() => ({}))) as { id?: string };
        return { ok: true, id: data.id };
      } catch (error) {
        return { ok: false, error: `Resend request failed: ${String(error)}` };
      }
    },
  };
}

/** Postmark — https://postmarkapp.com/developer/api/email-api */
export function createPostmarkProvider(serverToken: string): EmailProvider {
  return {
    name: "postmark",
    async send(message: EmailMessage): Promise<SendResult> {
      try {
        const response = await fetch("https://api.postmarkapp.com/email", {
          method: "POST",
          headers: {
            "X-Postmark-Server-Token": serverToken,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            From: message.from,
            To: message.to.join(","),
            ReplyTo: message.replyTo,
            Subject: message.subject,
            HtmlBody: message.html,
            TextBody: message.text,
            MessageStream: "outbound",
          }),
          signal: AbortSignal.timeout(TIMEOUT_MS),
          cache: "no-store",
        });
        if (!response.ok) return { ok: false, error: `Postmark: ${await readError(response)}` };
        const data = (await response.json().catch(() => ({}))) as { MessageID?: string };
        return { ok: true, id: data.MessageID };
      } catch (error) {
        return { ok: false, error: `Postmark request failed: ${String(error)}` };
      }
    },
  };
}

/** Logs instead of sending. Used automatically in development. */
export function createConsoleProvider(): EmailProvider {
  return {
    name: "console",
    async send(message: EmailMessage): Promise<SendResult> {
      console.info(
        `\n[email:console] ${message.subject}\n  to: ${message.to.join(", ")}  reply-to: ${message.replyTo ?? "-"}\n${message.text
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n")}\n`,
      );
      return { ok: true, id: `console-${Date.now()}` };
    },
  };
}
