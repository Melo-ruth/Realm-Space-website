import Link from "next/link";
import type { ReactNode } from "react";
import { Photo } from "@/components/ui/Photo";
import { buttonClass, cn } from "@/components/ui/primitives";
import type { Listing } from "@/data/types";
import { bedroomsLabel, formatUGXShort } from "@/lib/format";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-[2px] bg-accent px-2.5 py-1 text-[0.65rem] font-semibold uppercase leading-none tracking-[0.14em] text-accent-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function listingHref(l: Listing) {
  return l.kind === "land" ? `/land/${l.slug}` : l.kind === "apartment" ? `/apartments/${l.slug}` : `/stays/${l.slug}`;
}

export function listingTag(l: Listing) {
  if (l.kind === "land") return "Land";
  if (l.kind === "apartment") return l.mode === "rent" ? "For Rent" : "For Sale";
  return "Short Stay";
}

/** Image card with the title overlaid bottom-left, used on Home. */
export function FeatureCard({ listing, sizes }: { listing: Listing; sizes: string }) {
  return (
    <Link
      href={listingHref(listing)}
      className="group relative block aspect-[3/4] overflow-hidden rounded-[3px] sm:aspect-[4/5]"
    >
      <Photo
        src={listing.images[0].src}
        alt={listing.images[0].alt}
        sizes={sizes}
        overlay="bottom"
        hoverZoom
        className="absolute inset-0"
      />
      <div className="absolute inset-x-0 top-0 p-3 sm:p-4">
        <Tag>{listingTag(listing)}</Tag>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted sm:text-xs">{listing.location}</p>
        <h3 className="mt-1.5 font-display text-sm font-semibold uppercase leading-tight text-text sm:text-lg">
          {listing.title}
        </h3>
      </div>
    </Link>
  );
}

/** Grid card used on the listing index pages. */
export function ListingCard({
  listing,
  meta,
  price,
  priceNote,
  cta = "Inquire",
}: {
  listing: Listing;
  meta: string[];
  price: string;
  priceNote?: string;
  cta?: string;
}) {
  const href = listingHref(listing);
  return (
    <article className="group flex flex-col overflow-hidden rounded-[3px] border border-line bg-surface">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden>
        <Photo
          src={listing.images[0].src}
          alt=""
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          overlay="bottom"
          hoverZoom
          className="absolute inset-0"
        />
        <div className="absolute left-4 top-4">
          <Tag>{listingTag(listing)}</Tag>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{listing.location}</p>
        <h3 className="mt-2 font-display text-base font-semibold uppercase leading-snug">
          <Link href={href} className="hover:text-white">
            {listing.title}
          </Link>
        </h3>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <p className="font-display text-lg font-bold leading-none text-text">
            {price}
            {priceNote && <span className="ml-1 font-body text-xs font-medium text-muted">{priceNote}</span>}
          </p>
          <Link href={`${href}#inquire`} className={buttonClass("ghost", "px-4 py-2.5 text-[0.65rem]")}>
            {cta}
            <span className="sr-only"> about {listing.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function landCardProps(l: Extract<Listing, { kind: "land" }>) {
  return { meta: [l.sizeLabel, `${l.titleStatus} title`], price: formatUGXShort(l.price) };
}

export function apartmentCardProps(a: Extract<Listing, { kind: "apartment" }>) {
  return {
    meta: [bedroomsLabel(a.bedrooms), `${a.bathrooms} bath`, `${a.areaSqm} m²`],
    price: formatUGXShort(a.price),
    priceNote: a.mode === "rent" ? "/ month" : undefined,
    cta: "Book a viewing",
  };
}

export function stayCardProps(s: Extract<Listing, { kind: "stay" }>) {
  return {
    meta: [`${s.guests} guests`, bedroomsLabel(s.bedrooms)],
    price: formatUGXShort(s.nightlyRate),
    priceNote: "/ night",
    cta: "Check dates",
  };
}
