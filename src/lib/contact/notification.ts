import "server-only";
import { brand } from "@/config/brand";
import { budgetOptions, serviceOptions } from "@/content/contact";
import type { ContactValues } from "./validation";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const labelFor = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((option) => option.value === value)?.label ?? value;

/** Builds the internal "new enquiry" email. Every user value is escaped. */
export function buildEnquiryNotification(values: ContactValues, meta: { submittedAt: Date }) {
  const service = labelFor(serviceOptions, values.service);
  const budget = values.budget ? labelFor(budgetOptions, values.budget) : "Not specified";

  const rows: [string, string][] = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone || "Not provided"],
    ["Company", values.company || "Not provided"],
    ["Service", service],
    ["Budget", budget],
  ];

  const subject = `New enquiry: ${service} — ${values.name}`;
  const timestamp = meta.submittedAt.toISOString();

  const text = [
    `New enquiry from the ${brand.name} website`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Project description:",
    values.message,
    "",
    `Submitted: ${timestamp}`,
    "Reply to this email to respond directly.",
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f4f5f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#15171a">
  <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb">
    <tr><td style="padding:24px 28px;border-bottom:1px solid #e5e7eb">
      <p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b7280">${escapeHtml(brand.name)} · New enquiry</p>
      <h1 style="margin:8px 0 0;font-size:20px;line-height:1.3">${escapeHtml(service)} — ${escapeHtml(values.name)}</h1>
    </td></tr>
    <tr><td style="padding:20px 28px">
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 0;width:110px;color:#6b7280;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b7280">Project description</p>
      <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(values.message)}</p>
    </td></tr>
    <tr><td style="padding:16px 28px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280">
      Submitted ${escapeHtml(timestamp)} · Reply to this email to respond directly.
    </td></tr>
  </table>
</body></html>`;

  return { subject, text, html };
}
