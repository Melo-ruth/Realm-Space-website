import { z } from "zod";

/**
 * Validation shared by the forms (inline errors) and /api/inquiry (authoritative check).
 * Every submission carries a leadType so the inbox can be filtered.
 */

export const LEAD_TYPES = ["owner", "buyer", "guest", "general"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

export const PROPERTY_TYPES = ["land", "apartment", "house", "other"] as const;
export const OWNER_INTENTS = ["sell", "manage", "rent out"] as const;

export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];

const name = z.string().trim().min(2, "Please enter your name").max(120, "That name is too long");
const phone = z
  .string()
  .trim()
  .min(7, "Please enter a phone or WhatsApp number")
  .max(30, "That number is too long")
  .regex(/^[+\d][\d\s()-]{6,}$/, "Use digits only, for example +256 700 000 000");
const email = z.string().trim().max(160).pipe(z.email("Please enter a valid email address"));
const optionalText = (max: number) => z.string().trim().max(max, `Keep this under ${max} characters`).optional().default("");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a date");

/** Honeypot: real users never see or fill this field */
const honeypot = { company_website: z.string().max(0).optional().default("") };

export const ownerSchema = z.object({
  leadType: z.literal("owner"),
  fullName: name,
  phone,
  email,
  propertyType: z.enum(PROPERTY_TYPES, "Choose a property type"),
  location: z.string().trim().min(2, "Where is the property?").max(160),
  intent: z.enum(OWNER_INTENTS, "Tell us what you want to do"),
  expectedPrice: optionalText(80),
  message: z.string().trim().min(10, "Tell us a little about the property").max(3000),
  consent: z.literal("yes", "Please agree so we can contact you"),
  ...honeypot,
});

export const buyerSchema = z.object({
  leadType: z.literal("buyer"),
  fullName: name,
  phone,
  email,
  viewingDate: z.union([isoDate, z.literal("")]).optional().default(""),
  message: optionalText(2000),
  propertyTitle: z.string().trim().min(1).max(200),
  propertySlug: z.string().trim().min(1).max(200),
  propertyKind: z.enum(["land", "apartment"]),
  ...honeypot,
});

export const guestSchema = z
  .object({
    leadType: z.literal("guest"),
    fullName: name,
    contact: z
      .string()
      .trim()
      .min(5, "Enter an email address or phone number")
      .max(160)
      .refine(
        (v) => z.email().safeParse(v).success || /^[+\d][\d\s()-]{6,}$/.test(v),
        "Enter a valid email address or phone number",
      ),
    checkIn: isoDate,
    checkOut: isoDate,
    guests: z.coerce.number("How many guests?").int().min(1, "At least 1 guest").max(30, "For groups over 30, please call us"),
    message: optionalText(2000),
    propertyTitle: z.string().trim().min(1).max(200),
    propertySlug: z.string().trim().min(1).max(200),
    ...honeypot,
  })
  .refine((d) => d.checkOut > d.checkIn, { path: ["checkOut"], message: "Check-out must be after check-in" });

export const generalSchema = z.object({
  leadType: z.literal("general"),
  fullName: name,
  phone,
  email,
  message: z.string().trim().min(10, "Please write a short message").max(3000),
  ...honeypot,
});

export const schemaByLead = {
  owner: ownerSchema,
  buyer: buyerSchema,
  guest: guestSchema,
  general: generalSchema,
} as const;

export type OwnerInquiry = z.infer<typeof ownerSchema>;
export type BuyerInquiry = z.infer<typeof buyerSchema>;
export type GuestInquiry = z.infer<typeof guestSchema>;
export type GeneralInquiry = z.infer<typeof generalSchema>;
export type Inquiry = OwnerInquiry | BuyerInquiry | GuestInquiry | GeneralInquiry;

export type FieldErrors = Record<string, string>;

export function validateInquiry(raw: Record<string, unknown>):
  | { ok: true; data: Inquiry }
  | { ok: false; errors: FieldErrors } {
  const lead = raw.leadType;
  if (typeof lead !== "string" || !(lead in schemaByLead)) {
    return { ok: false, errors: { form: "Unknown form type" } };
  }
  const result = schemaByLead[lead as LeadType].safeParse(raw);
  if (result.success) return { ok: true, data: result.data as Inquiry };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}

export function validateFiles(files: File[]): string | null {
  const real = files.filter((f) => f.size > 0);
  if (real.length > MAX_FILES) return `Attach up to ${MAX_FILES} files`;
  for (const f of real) {
    if (f.size > MAX_FILE_BYTES) return `${f.name} is larger than 5 MB`;
    if (f.type && !ACCEPTED_FILE_TYPES.includes(f.type)) return `${f.name} is not a photo or PDF`;
  }
  return null;
}

const LEAD_LABEL: Record<LeadType, string> = {
  owner: "Owner enquiry",
  buyer: "Listing enquiry",
  guest: "Short-stay enquiry",
  general: "General enquiry",
};

/** Human-readable lines, used for the email body and the WhatsApp follow-up. */
export function summarise(d: Inquiry): { subject: string; lines: [string, string][] } {
  switch (d.leadType) {
    case "owner":
      return {
        subject: `${LEAD_LABEL.owner}: ${d.propertyType} in ${d.location} (${d.intent})`,
        lines: [
          ["Name", d.fullName],
          ["Phone / WhatsApp", d.phone],
          ["Email", d.email],
          ["Property type", d.propertyType],
          ["Location", d.location],
          ["Wants to", d.intent],
          ["Expected price or rent", d.expectedPrice || "Not given"],
          ["Message", d.message],
        ],
      };
    case "buyer":
      return {
        subject: `${LEAD_LABEL.buyer}: ${d.propertyTitle}`,
        lines: [
          ["Property", `${d.propertyTitle} (${d.propertyKind}/${d.propertySlug})`],
          ["Name", d.fullName],
          ["Phone / WhatsApp", d.phone],
          ["Email", d.email],
          ["Preferred viewing date", d.viewingDate || "Flexible"],
          ["Message", d.message || "None"],
        ],
      };
    case "guest":
      return {
        subject: `${LEAD_LABEL.guest}: ${d.propertyTitle}, ${d.checkIn} to ${d.checkOut}`,
        lines: [
          ["Property", `${d.propertyTitle} (${d.propertySlug})`],
          ["Name", d.fullName],
          ["Email or phone", d.contact],
          ["Check-in", d.checkIn],
          ["Check-out", d.checkOut],
          ["Guests", String(d.guests)],
          ["Message", d.message || "None"],
        ],
      };
    case "general":
      return {
        subject: `${LEAD_LABEL.general} from ${d.fullName}`,
        lines: [
          ["Name", d.fullName],
          ["Phone", d.phone],
          ["Email", d.email],
          ["Message", d.message],
        ],
      };
  }
}
