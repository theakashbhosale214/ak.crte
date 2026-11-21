import { budgetOptions, serviceOptions } from "@/content/contact";

/**
 * Enquiry form rules, shared by the browser (instant feedback) and the
 * server action (the source of truth). No dependencies, so it adds almost
 * nothing to the client bundle.
 */

export const contactFields = ["name", "email", "phone", "company", "service", "budget", "message"] as const;

export type ContactField = (typeof contactFields)[number];
export type ContactValues = Record<ContactField, string>;
export type FieldErrors = Partial<Record<ContactField, string>>;

export const fieldLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  phone: { max: 25 },
  company: { max: 120 },
  message: { min: 20, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s().-]+$/;
const serviceValues = new Set<string>(serviceOptions.map((option) => option.value));
const budgetValues = new Set<string>(budgetOptions.map((option) => option.value));

/** Pull known fields out of any record (e.g. FormData entries) as trimmed strings. */
export function normalizeContact(input: Record<string, unknown>): ContactValues {
  const read = (key: ContactField) => {
    const value = input[key];
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: read("name").replace(/\s+/g, " "),
    email: read("email").toLowerCase(),
    phone: read("phone"),
    company: read("company"),
    service: read("service"),
    budget: read("budget"),
    message: read("message"),
  };
}

export function validateContact(values: ContactValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length < fieldLimits.name.min) errors.name = "Please enter your full name.";
  else if (values.name.length > fieldLimits.name.max) errors.name = "Please keep your name under 100 characters.";

  if (!values.email) errors.email = "Please enter your email address.";
  else if (values.email.length > fieldLimits.email.max || !EMAIL_PATTERN.test(values.email))
    errors.email = "Please enter a valid email address, like name@company.com.";

  if (values.phone) {
    const digits = values.phone.replace(/\D/g, "").length;
    if (values.phone.length > fieldLimits.phone.max || !PHONE_PATTERN.test(values.phone) || digits < 7 || digits > 15)
      errors.phone = "Please enter a valid phone number, or leave this blank.";
  }

  if (values.company.length > fieldLimits.company.max)
    errors.company = "Please keep the company name under 120 characters.";

  if (!values.service) errors.service = "Please choose the service you need.";
  else if (!serviceValues.has(values.service)) errors.service = "Please choose one of the listed services.";

  if (values.budget && !budgetValues.has(values.budget)) errors.budget = "Please choose one of the listed ranges.";

  if (!values.message) errors.message = "Please tell us a little about your project.";
  else if (values.message.length < fieldLimits.message.min)
    errors.message = "Please add a little more detail (at least 20 characters).";
  else if (values.message.length > fieldLimits.message.max)
    errors.message = "Please keep your description under 5,000 characters.";

  return errors;
}

export function hasErrors(errors: FieldErrors) {
  return Object.keys(errors).length > 0;
}
