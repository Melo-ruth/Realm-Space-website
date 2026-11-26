"use client";

import { usePathname } from "next/navigation";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/data/site";
import { getApartment } from "@/data/apartments";
import { getLand } from "@/data/land";
import { getStay } from "@/data/stays";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Prefilled message that matches the page the visitor is on. */
function messageFor(pathname: string) {
  const [section, slug] = pathname.split("/").filter(Boolean);

  if (section === "land") {
    const plot = slug ? getLand(slug) : undefined;
    return plot
      ? `Hello Realm Space, I'm interested in the plot "${plot.title}" in ${plot.location}. Is it still available?`
      : "Hello Realm Space, I'm looking for land. Can you help me find a plot?";
  }
  if (section === "apartments") {
    const apt = slug ? getApartment(slug) : undefined;
    return apt
      ? `Hello Realm Space, I'd like to book a viewing for "${apt.title}" in ${apt.location}.`
      : "Hello Realm Space, I'm looking for an apartment. Can you help?";
  }
  if (section === "stays") {
    const stay = slug ? getStay(slug) : undefined;
    return stay
      ? `Hello Realm Space, I'd like to check dates for "${stay.title}" in ${stay.location}.`
      : "Hello Realm Space, I'm looking for a short stay. What do you have available?";
  }
  if (section === "owners") {
    return "Hello Realm Space, I'd like to list my property with you.";
  }
  return DEFAULT_WHATSAPP_MESSAGE;
}

export function WhatsAppFloat() {
  const pathname = usePathname();

  return (
    <a
      href={whatsappLink(messageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Realm Space on WhatsApp (opens in a new tab)"
      className="group fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-3 rounded-[4px] bg-accent pl-4 pr-4 text-accent-ink transition-colors hover:bg-white focus-visible:outline-offset-4 sm:bottom-8 sm:right-8 sm:pr-5"
    >
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
        {/* Soft pulse to draw the eye; removed under prefers-reduced-motion */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent-ink/25 motion-safe:animate-ping motion-safe:[animation-duration:2.4s]"
        />
        <WhatsAppIcon width={26} height={26} className="relative" />
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] opacity-70">Questions?</span>
        <span className="mt-1 text-xs font-bold uppercase tracking-[0.14em]">Chat on WhatsApp</span>
      </span>
    </a>
  );
}
