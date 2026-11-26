import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { MapEmbed } from "@/components/listings/MapEmbed";
import { ButtonLink, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { CONTACT_PAGE, DEFAULT_WHATSAPP_MESSAGE, SITE, whatsappLink } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Realm Space",
  description: "Call, WhatsApp or email Realm Space Properties in Kampala, or send us a message about land, apartments or short stays.",
  path: "/contact",
  image: "/images/stay-04.jpg",
});

export default function ContactPage() {
  const rows = [
    { Icon: PhoneIcon, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
    { Icon: WhatsAppIcon, label: "WhatsApp", value: SITE.whatsappNumber, href: whatsappLink(DEFAULT_WHATSAPP_MESSAGE), external: true },
    { Icon: MailIcon, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  ];

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk" intro={CONTACT_PAGE.intro} image="/images/stay-04.jpg" />

      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <ul className="divide-y divide-line border-y border-line">
            {rows.map(({ Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-4 py-5 hover:text-white"
                >
                  <Icon className="shrink-0 text-accent" width={22} height={22} />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
                    <span className="mt-0.5 block text-text">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-start gap-4 py-5">
              <PinIcon className="mt-1 shrink-0 text-accent" width={22} height={22} />
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">Office</span>
                <address className="mt-0.5 not-italic text-text">
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.country}
                </address>
              </span>
            </li>
            <li className="flex items-start gap-4 py-5">
              <ClockIcon className="mt-1 shrink-0 text-accent" width={22} height={22} />
              <span className="flex-1">
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted">Working hours</span>
                <dl className="mt-1 space-y-1">
                  {SITE.hours.map((h) => (
                    <div key={h.days} className="flex flex-wrap justify-between gap-x-4">
                      <dt className="text-text/85">{h.days}</dt>
                      <dd className="text-text">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </span>
            </li>
          </ul>
          <ButtonLink href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)} external className="mt-8">
            <WhatsAppIcon width={16} height={16} /> Message us on WhatsApp
          </ButtonLink>
        </div>

        <div className="rounded-[4px] border border-line bg-surface p-6 sm:p-8">
          <Eyebrow>Send a message</Eyebrow>
          <h2 className="mb-6 mt-2 font-display text-xl font-semibold uppercase">How can we help?</h2>
          <InquiryForm variant="contact" />
        </div>
      </Container>

      <Section aria-labelledby="map-title" className="pb-24 pt-16 lg:pb-32 lg:pt-20">
        <Container>
          <h2 id="map-title" className="sr-only">
            Office location
          </h2>
          <MapEmbed geo={SITE.geo} title="the Realm Space office" zoom={15} />
        </Container>
      </Section>
    </>
  );
}
