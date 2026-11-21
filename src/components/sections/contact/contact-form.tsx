"use client";

import {
  Suspense,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, CircleCheckBig, CircleExclamationPoint, LoaderCircle } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { budgetOptions, contactForm, serviceOptions } from "@/content/contact";
import { useIsClient } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";
import {
  contactFields,
  fieldLimits,
  hasErrors,
  normalizeContact,
  validateContact,
  type ContactField,
  type FieldErrors,
} from "@/lib/contact/validation";
import { TurnstileWidget } from "./turnstile-widget";

const initialState: ContactState = { status: "idle" };

/** The form control behind a delegated form event, if it is one of our fields. */
function fieldFrom(target: EventTarget): { name: ContactField; value: string } | null {
  if (
    !(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)
  )
    return null;
  const name = target.name as ContactField;
  return contactFields.includes(name) ? { name, value: target.value } : null;
}

const control =
  "w-full rounded-xl border border-line-strong bg-ink-900/70 px-4 text-[0.9375rem] text-fg placeholder:text-fg-faint transition-[border-color,box-shadow] duration-200 hover:border-line-bright focus:border-signal-400/70 focus:ring-4 focus:ring-signal-400/15 focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger/70 aria-[invalid=true]:focus:ring-danger/15";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  className,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-fg">
        <span>
          {label}
          {optional ? null : (
            <span aria-hidden className="text-signal-400">
              {" "}
              *
            </span>
          )}
        </span>
        {optional ? <span className="text-xs font-normal text-fg-subtle">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm text-danger">
          <CircleExclamationPoint aria-hidden className="mt-0.5 size-3.5 shrink-0" strokeWidth={2.25} />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-fg-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/** Pre-selects the service from `?service=<slug>` links across the site. */
function ServicePreselect({ selectId }: { selectId: string }) {
  const service = useSearchParams().get("service");
  useEffect(() => {
    if (!service) return;
    const select = document.getElementById(selectId) as HTMLSelectElement | null;
    if (select && Array.from(select.options).some((option) => option.value === service)) {
      select.value = service;
    }
  }, [service, selectId]);
  return null;
}

function SuccessPanel({ firstName, onReset }: { firstName?: string; onReset: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="flex min-h-[28rem] animate-rise flex-col items-start justify-center py-6 [--rise-y:12px]"
    >
      <span className="grid size-14 place-items-center rounded-full border border-signal-400/40 bg-signal-400/10 text-signal-300 shadow-[0_0_40px_rgb(197_240_74/0.25)]">
        <CircleCheckBig aria-hidden className="size-7" strokeWidth={1.75} />
      </span>
      <h3 className="mt-8 text-display-md text-fg">
        {firstName ? `Thank you, ${firstName}.` : "Thank you."}
        <span className="block text-fg-muted">Your enquiry is on its way.</span>
      </h3>
      <p className="mt-5 max-w-md text-fg-muted">{contactForm.success.text}</p>
      <Button variant="secondary" onClick={onReset} className="mt-8">
        {contactForm.success.again}
      </Button>
    </div>
  );
}

function ContactForm({ onReset, turnstileSiteKey }: { onReset: () => void; turnstileSiteKey?: string }) {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const isClient = useIsClient();
  const formRef = useRef<HTMLFormElement>(null);
  const elapsedRef = useRef<HTMLInputElement>(null);
  const mountedAt = useRef(0);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Server-side field errors replace client ones whenever a new result arrives.
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    setErrors(state.fieldErrors ?? {});
  }

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  if (state.status === "success") {
    return <SuccessPanel firstName={state.firstName} onReset={onReset} />;
  }

  const currentValues = () => {
    const form = formRef.current;
    return normalizeContact(form ? Object.fromEntries(new FormData(form)) : {});
  };

  // Validate a field once the visitor leaves it; re-check fields that are already flagged.
  const revalidate = (field: ContactField, onlyIfFlagged: boolean) => {
    if (onlyIfFlagged && !errors[field]) return;
    const message = validateContact(currentValues())[field];
    setErrors((previous) => ({ ...previous, [field]: message }));
  };

  const handleBlur = (event: FocusEvent<HTMLFormElement>) => {
    const field = fieldFrom(event.target);
    if (!field) return;
    if (field.value.trim() === "" && !errors[field.name]) return;
    revalidate(field.name, false);
  };

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    const field = fieldFrom(event.target);
    if (field) revalidate(field.name, true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const found = validateContact(currentValues());
    if (hasErrors(found)) {
      event.preventDefault();
      setErrors(found);
      const first = contactFields.find((field) => found[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    if (elapsedRef.current) elapsedRef.current.value = String(Math.round(performance.now() - mountedAt.current));
  };

  const values = state.values ?? {};
  const describedBy = (field: ContactField, hint?: boolean) =>
    errors[field] ? `${field}-error` : hint ? `${field}-hint` : undefined;
  const formError = state.status === "error" && !hasErrors(errors) ? state.message : undefined;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      onChange={handleChange}
      noValidate={isClient}
      aria-describedby="contact-form-status"
      className="relative"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={fieldLimits.name.max}
            defaultValue={values.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={cn(control, "h-12")}
          />
        </Field>
        <Field id="email" label="Business email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={fieldLimits.email.max}
            defaultValue={values.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={cn(control, "h-12")}
          />
        </Field>
        <Field id="phone" label="Phone number" optional error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={fieldLimits.phone.max}
            defaultValue={values.phone}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={cn(control, "h-12")}
          />
        </Field>
        <Field id="company" label="Company / business name" optional error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={fieldLimits.company.max}
            defaultValue={values.company}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy("company")}
            className={cn(control, "h-12")}
          />
        </Field>
        <Field id="service" label="Service required" error={errors.service}>
          <div className="relative">
            <select
              id="service"
              name="service"
              required
              defaultValue={values.service ?? ""}
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy("service")}
              className={cn(control, "h-12 appearance-none pr-10")}
            >
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-subtle" />
          </div>
        </Field>
        <Field id="budget" label="Estimated budget" optional error={errors.budget}>
          <div className="relative">
            <select
              id="budget"
              name="budget"
              defaultValue={values.budget ?? ""}
              aria-invalid={errors.budget ? true : undefined}
              aria-describedby={describedBy("budget")}
              className={cn(control, "h-12 appearance-none pr-10")}
            >
              <option value="">Prefer not to say</option>
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-fg-subtle" />
          </div>
        </Field>
        <Field
          id="message"
          label="Project description"
          error={errors.message}
          hint="A few sentences about your goals, timeline and anything you already have."
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            maxLength={fieldLimits.message.max}
            defaultValue={values.message}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", true)}
            className={cn(control, "min-h-36 resize-y py-3 leading-relaxed")}
          />
        </Field>
      </div>

      {/* Spam protection: a field people never see, and the time taken to fill the form. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input ref={elapsedRef} type="hidden" name="elapsed" defaultValue="" />

      {turnstileSiteKey ? <TurnstileWidget siteKey={turnstileSiteKey} className="mt-6" /> : null}

      <div id="contact-form-status" role="status" aria-live="polite" className="empty:hidden">
        {formError ? (
          <p className="mt-6 flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/[0.07] p-4 text-sm text-fg">
            <CircleExclamationPoint aria-hidden className="mt-0.5 size-4 shrink-0 text-danger" strokeWidth={2.25} />
            {formError}
          </p>
        ) : null}
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">
          {contactForm.privacyNote}{" "}
          <Link href="/privacy" className="underline decoration-line-bright underline-offset-2 hover:text-fg">
            Privacy Policy
          </Link>
        </p>
        <Button type="submit" size="lg" withArrow={!isPending} disabled={isPending} aria-disabled={isPending}>
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              {contactForm.submitting}
            </span>
          ) : (
            contactForm.submit
          )}
        </Button>
      </div>

      <Suspense fallback={null}>
        <ServicePreselect selectId="service" />
      </Suspense>
    </form>
  );
}

/** Wraps the form so "Send another enquiry" can start completely fresh. */
export function ContactFormPanel({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [instance, setInstance] = useState(0);
  return (
    <ContactForm key={instance} turnstileSiteKey={turnstileSiteKey} onReset={() => setInstance((n) => n + 1)} />
  );
}
