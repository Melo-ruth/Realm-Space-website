import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Eyebrow, StatBlock } from "@/components/ui/primitives";
import { Gallery } from "./Gallery";
import { MapEmbed } from "./MapEmbed";
import { Tag, listingTag } from "./cards";
import type { Listing } from "@/data/types";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Shared detail-page skeleton: breadcrumb, title, gallery + sticky enquiry panel,
 * then description, facts, extra sections and map.
 */
export function DetailLayout({
  listing,
  back,
  price,
  priceNote,
  stats,
  aside,
  children,
}: {
  listing: Listing;
  back: { href: string; label: string };
  price: string;
  priceNote?: string;
  stats: { value: string; label: string }[];
  aside: ReactNode;
  children?: ReactNode;
}) {
  return (
    <article className="pb-24 pt-28 lg:pb-32 lg:pt-36">
      <Container>
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.16em] text-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={back.href} className="hover:text-white">
                {back.label}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-text/80">
              {listing.title}
            </li>
          </ol>
        </nav>

        <header className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Tag>{listingTag(listing)}</Tag>
            <h1 className="mt-4 max-w-3xl font-display text-3xl font-extrabold uppercase leading-[1] tracking-[-0.02em] sm:text-5xl">
              {listing.title}
            </h1>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.16em] text-muted">{listing.location}</p>
          </div>
          <p className="font-display text-2xl font-bold sm:text-3xl">
            {price}
            {priceNote && <span className="ml-2 font-body text-sm font-medium text-muted">{priceNote}</span>}
          </p>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div className="min-w-0">
            <Gallery images={listing.images} title={listing.title} />

            <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <StatBlock value={s.value} label={s.label} size="md" />
                  </dd>
                </div>
              ))}
            </dl>

            <section aria-labelledby="about-heading" className="mt-12">
              <Eyebrow>Overview</Eyebrow>
              <h2 id="about-heading" className="mt-2 font-display text-xl font-semibold uppercase">
                About this property
              </h2>
              <div className="mt-4 space-y-4 text-text/85">
                {listing.description.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </section>

            {children}

            <section aria-labelledby="map-heading" className="mt-14">
              <Eyebrow>Location</Eyebrow>
              <h2 id="map-heading" className="mt-2 font-display text-xl font-semibold uppercase">
                {listing.location}
              </h2>
              <p className="mt-2 text-sm text-muted">Pin shows the general area. We share the exact address when we confirm a viewing.</p>
              <div className="mt-5">
                <MapEmbed geo={listing.geo} title={listing.title} />
              </div>
            </section>
          </div>

          <aside id="inquire" className="scroll-mt-28">
            <div className="rounded-[4px] border border-line bg-surface p-6 sm:p-7 lg:sticky lg:top-28">{aside}</div>
          </aside>
        </div>
      </Container>
    </article>
  );
}

export function DetailList({ title, items, id }: { title: string; items: string[]; id: string }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="font-display text-xl font-semibold uppercase">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((a) => (
          <li key={a} className="flex items-start gap-3 text-text/85">
            <CheckIcon className="mt-0.5 shrink-0 text-accent" width={18} height={18} />
            {a}
          </li>
        ))}
      </ul>
    </section>
  );
}
