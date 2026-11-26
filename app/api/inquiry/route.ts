import { Resend } from "resend";
import { SITE } from "@/data/site";
import { summarise, validateFiles, validateInquiry } from "@/lib/inquiry";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, errors: { form: "Could not read the form" } }, { status: 400 });
  }

  const raw: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    if (typeof value === "string") raw[key] = value;
  }

  // Honeypot filled in: pretend success so bots learn nothing, but do nothing.
  if (typeof raw.company_website === "string" && raw.company_website.length > 0) {
    return Response.json({ ok: true });
  }

  const result = validateInquiry(raw);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  const files = form.getAll("files").filter((v): v is File => v instanceof File && v.size > 0);
  if (result.data.leadType !== "owner" && files.length > 0) {
    return Response.json({ ok: false, errors: { files: "Attachments are only accepted on the owner form" } }, { status: 422 });
  }
  const fileError = validateFiles(files);
  if (fileError) {
    return Response.json({ ok: false, errors: { files: fileError } }, { status: 422 });
  }

  const { subject, lines } = summarise(result.data);
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error("[inquiry] RESEND_API_KEY or INQUIRY_TO_EMAIL is not set; enquiry not delivered:", subject);
      return Response.json(
        { ok: false, errors: { form: "We could not send your message. Please contact us on WhatsApp." } },
        { status: 500 },
      );
    }
    console.info("\n[inquiry] Email not configured, logging instead.");
    console.info(`[inquiry] leadType=${result.data.leadType} | ${subject}`);
    for (const [k, v] of lines) console.info(`  ${k}: ${v}`);
    if (files.length) console.info(`  Attachments: ${files.map((f) => `${f.name} (${f.size} bytes)`).join(", ")}`);
    return Response.json({ ok: true });
  }

  const attachments = await Promise.all(
    files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()) })),
  );

  const html = `
    <h2 style="font-family:sans-serif">${escapeHtml(subject)}</h2>
    <p style="font-family:sans-serif;color:#555">Lead type: <strong>${result.data.leadType}</strong></p>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${lines
        .map(
          ([k, v]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>`;
  const text = `${subject}\nLead type: ${result.data.leadType}\n\n${lines.map(([k, v]) => `${k}: ${v}`).join("\n")}`;
  const replyTo =
    "email" in result.data ? result.data.email : result.data.leadType === "guest" && result.data.contact.includes("@") ? result.data.contact : undefined;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.INQUIRY_FROM_EMAIL || `${SITE.shortName} Website <onboarding@resend.dev>`,
      to: to.split(",").map((s) => s.trim()),
      subject: `[${result.data.leadType}] ${subject}`,
      html,
      text,
      replyTo,
      attachments: attachments.length ? attachments : undefined,
      tags: [{ name: "leadType", value: result.data.leadType }],
    });
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("[inquiry] Resend failed:", err);
    return Response.json(
      { ok: false, errors: { form: "We could not send your message. Please try again or contact us on WhatsApp." } },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
