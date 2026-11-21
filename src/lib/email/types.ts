export type EmailMessage = {
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
};

export type SendResult = { ok: true; id?: string } | { ok: false; error: string };

/** Implement this to add a new email provider (SES, SMTP relay, …). */
export interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<SendResult>;
}
