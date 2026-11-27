import Link from "next/link";
import { DEFAULT_WHATSAPP_MESSAGE, NAV, SITE, whatsappLink } from "@/data/site";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/primitives";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/ui/icons";
import { Year } from "./Year";

const socials = [
  { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: SITE.social.x, label: "X", Icon: XIcon },
  { href: SITE.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.3fr] lg:py-20">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs text-sm text-muted">
            Land, apartments, short stays and property management across Greater Kampala.
          </p>
          <ul className="flex gap-2" aria-label="Social media">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Realm Space on ${label}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] border border-line text-text transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Quick links</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-text/85 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/owners#owner-form" className="text-text/85 transition-colors hover:text-white">
                List your property
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.22em] text-muted">Get in touch</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-white">
                <PhoneIcon className="text-accent" /> {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white"
              >
                <WhatsAppIcon className="text-accent" /> WhatsApp {SITE.whatsappNumber}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 hover:text-white">
                <MailIcon className="text-accent" /> {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <PinIcon className="mt-0.5 shrink-0 text-accent" />
              <address className="not-italic">
                {SITE.address.street}, {SITE.address.city}, {SITE.address.country}
              </address>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © <Year /> {SITE.name}. All rights reserved.
          </p>
          <p>{SITE.registrationNumber}</p>
        </Container>
      </div>
    </footer>
  );
}
