import { DEFAULT_WHATSAPP_MESSAGE, whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/icons";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Realm Space on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
