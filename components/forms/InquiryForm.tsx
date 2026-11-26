"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  MAX_FILES,
  OWNER_INTENTS,
  PROPERTY_TYPES,
  summarise,
  validateFiles,
  validateInquiry,
  type FieldErrors,
  type Inquiry,
  type LeadType,
} from "@/lib/inquiry";
import { whatsappLink } from "@/data/site";
import { buttonClass, cn } from "@/components/ui/primitives";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { CheckboxField, FieldShell, Honeypot, SelectField, TextAreaField, TextField, controlClass } from "./fields";

export type FormVariant = "owner" | "listing" | "stay" | "contact";

const LEAD_FOR: Record<FormVariant, LeadType> = {
  owner: "owner",
  listing: "buyer",
  stay: "guest",
  contact: "general",
};

type Property = { title: string; slug: string; kind: "land" | "apartment" | "stay" };

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * The one form component used across the site. `variant` picks the fields;
 * every variant posts to /api/inquiry with a leadType.
 */
export function InquiryForm({
  variant,
  property,
  submitLabel,
  defaultIntent,
  stacked = false,
  className,
}: {
  variant: FormVariant;
  property?: Property;
  submitLabel?: string;
  defaultIntent?: (typeof OWNER_INTENTS)[number];
  /** Single column, for narrow side panels */
  stacked?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const f = (name: string) => `${uid}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [submitted, setSubmitted] = useState<Inquiry | null>(null);
  const [touched, setTouched] = useState(false);
  const [today, setToday] = useState<string | undefined>(undefined);
  const leadType = LEAD_FOR[variant];

  useEffect(() => {
    // Set on the client only so prerendered HTML never depends on the clock
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  function collect(form: HTMLFormElement) {
    const fd = new FormData(form);
    const raw: Record<string, unknown> = {};
    for (const [k, v] of fd.entries()) if (typeof v === "string") raw[k] = v;
    const files = fd.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);
    return { fd, raw, files };
  }

  function check(form: HTMLFormElement) {
    const { raw, files } = collect(form);
    const result = validateInquiry(raw);
    const next: FieldErrors = result.ok ? {} : { ...result.errors };
    const fileErr = validateFiles(files);
    if (fileErr) next.files = fileErr;
    return { result, next };
  }

  function onChange() {
    if (!touched || !formRef.current) return;
    setErrors(check(formRef.current).next);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setTouched(true);
    const { result, next } = check(form);
    setErrors(next);
    if (!result.ok || Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      const el = form.querySelector<HTMLElement>(`[name="${firstKey}"]`);
      el?.focus();
      return;
    }

    // Read the data before the fieldset is disabled (disabled fields are left out of FormData)
    const { fd } = collect(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", { method: "POST", body: fd });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: FieldErrors };
      if (!res.ok || !body.ok) {
        setErrors(body.errors ?? { form: "Something went wrong. Please try again or message us on WhatsApp." });
        setStatus("idle");
        return;
      }
      setSubmitted(result.data);
      setStatus("done");
    } catch {
      setErrors({ form: "You seem to be offline. Please try again or message us on WhatsApp." });
      setStatus("idle");
    }
  }

  if (status === "done" && submitted) {
    const { subject, lines } = summarise(submitted);
    const message = `Hello Realm Space, I just sent this through your website:\n\n${subject}\n${lines
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")}`;
    return (
      <div role="status" aria-live="polite" className={cn("rounded-[4px] border border-line bg-surface p-8 sm:p-10", className)}>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-ink">
          <CheckIcon width={24} height={24} />
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold uppercase">Thank you, {submitted.fullName.split(" ")[0]}</h3>
        <p className="mt-3 max-w-lg text-muted">
          We have your details and will be in touch within one working day. For a faster reply, continue the
          conversation on WhatsApp. Your details are already filled in.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
            <WhatsAppIcon width={16} height={16} /> Continue on WhatsApp
          </a>
          <button
            type="button"
            className={buttonClass("ghost")}
            onClick={() => {
              setStatus("idle");
              setSubmitted(null);
              setTouched(false);
              setErrors({});
            }}
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";
  const label =
    submitLabel ??
    { owner: "Submit property", listing: "Request a viewing", stay: "Check availability", contact: "Send message" }[variant];

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onChange={onChange}
      aria-busy={sending}
      className={cn(stacked ? "relative flex flex-col gap-5" : "relative grid gap-5 sm:grid-cols-2", className)}
    >
      <input type="hidden" name="leadType" value={leadType} />
      <Honeypot />
      {property && (
        <>
          <input type="hidden" name="propertyTitle" value={property.title} />
          <input type="hidden" name="propertySlug" value={property.slug} />
          {property.kind !== "stay" && <input type="hidden" name="propertyKind" value={property.kind} />}
        </>
      )}

      <fieldset disabled={sending} className="contents">
        <TextField
          id={f("fullName")}
          name="fullName"
          label="Full name"
          autoComplete="name"
          required
          error={errors.fullName}
          className={variant === "stay" ? "sm:col-span-1" : undefined}
        />

        {variant === "stay" ? (
          <TextField
            id={f("contact")}
            name="contact"
            label="Email or phone"
            autoComplete="email"
            required
            error={errors.contact}
          />
        ) : (
          <TextField
            id={f("phone")}
            name="phone"
            type="tel"
            label={variant === "contact" ? "Phone" : "Phone / WhatsApp"}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+256 700 000 000"
            required
            error={errors.phone}
          />
        )}

        {variant !== "stay" && (
          <TextField
            id={f("email")}
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            required
            error={errors.email}
            className={variant === "listing" ? undefined : "sm:col-span-2"}
          />
        )}

        {variant === "listing" && (
          <TextField
            id={f("viewingDate")}
            name="viewingDate"
            type="date"
            label="Preferred viewing date"
            optional
            min={today}
            error={errors.viewingDate}
          />
        )}

        {variant === "stay" && (
          <>
            <TextField id={f("checkIn")} name="checkIn" type="date" label="Check-in" min={today} required error={errors.checkIn} />
            <TextField id={f("checkOut")} name="checkOut" type="date" label="Check-out" min={today} required error={errors.checkOut} />
            <TextField
              id={f("guests")}
              name="guests"
              type="number"
              inputMode="numeric"
              min={1}
              max={30}
              defaultValue={2}
              label="Guests"
              required
              error={errors.guests}
            />
          </>
        )}

        {variant === "owner" && (
          <>
            <SelectField
              id={f("propertyType")}
              name="propertyType"
              label="Property type"
              placeholder="Select a type"
              defaultValue=""
              options={PROPERTY_TYPES.map((t) => ({ value: t, label: cap(t) }))}
              required
              error={errors.propertyType}
            />
            <TextField
              id={f("location")}
              name="location"
              label="Location"
              placeholder="e.g. Kira, Wakiso"
              required
              error={errors.location}
            />
            <SelectField
              id={f("intent")}
              name="intent"
              label="I want to"
              placeholder="Choose one"
              defaultValue={defaultIntent ?? ""}
              options={OWNER_INTENTS.map((t) => ({ value: t, label: cap(t) }))}
              required
              error={errors.intent}
            />
            <TextField
              id={f("expectedPrice")}
              name="expectedPrice"
              label="Expected price or rent"
              placeholder="e.g. UGX 120M or 2.5M / month"
              optional
              error={errors.expectedPrice}
            />
            <FieldShell
              id={f("files")}
              label="Photos or documents"
              optional
              hint={`Up to ${MAX_FILES} files, 5 MB each. JPG, PNG, WEBP, HEIC or PDF.`}
              error={errors.files}
              className="sm:col-span-2"
            >
              <input
                id={f("files")}
                name="files"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
                aria-invalid={errors.files ? true : undefined}
                aria-describedby={errors.files ? `${f("files")}-error` : `${f("files")}-hint`}
                className={cn(
                  controlClass,
                  "cursor-pointer py-2.5 file:mr-4 file:cursor-pointer file:rounded-[2px] file:border-0 file:bg-surface-2 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.12em] file:text-text",
                )}
              />
            </FieldShell>
          </>
        )}

        <TextAreaField
          id={f("message")}
          name="message"
          label="Message"
          optional={variant === "listing" || variant === "stay"}
          placeholder={
            variant === "owner"
              ? "Size, condition, title type, anything we should know"
              : variant === "listing"
                ? `I'm interested in ${property?.title ?? "this property"}...`
                : undefined
          }
          error={errors.message}
          className="sm:col-span-2"
        />

        {variant === "owner" && (
          <CheckboxField
            id={f("consent")}
            name="consent"
            value="yes"
            label="I agree that Realm Space may contact me about this property and store these details for that purpose."
            error={errors.consent}
            className="sm:col-span-2"
          />
        )}

        {errors.form && (
          <p role="alert" className="text-sm font-medium text-[#f2b8b5] sm:col-span-2">
            {errors.form}
          </p>
        )}

        <div className="sm:col-span-2">
          <button type="submit" className={buttonClass("primary", "w-full sm:w-auto")} disabled={sending}>
            {sending ? "Sending…" : label}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
