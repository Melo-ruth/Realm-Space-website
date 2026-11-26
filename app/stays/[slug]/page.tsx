import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailLayout, DetailList } from "@/components/listings/DetailLayout";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ButtonLink } from "@/components/ui/primitives";
import { getStay, stays } from "@/data/stays";
import { bedroomsLabel, formatUGX } from "@/lib/format";
import { JsonLd, listingJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return stays.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stays/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const stay = getStay(slug);
  if (!stay) return {};
  return pageMetadata({
    title: `${stay.title}, short stay for ${stay.guests}`,
    description: stay.summary,
    path: `/stays/${stay.slug}`,
    image: stay.images[0].src,
  });
}

const monthYear = (ym: string) =>
  new Date(`${ym}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export default async function StayDetailPage({ params }: PageProps<"/stays/[slug]">) {
  const { slug } = await params;
  const stay = getStay(slug);
  if (!stay) notFound();

  const avg = stay.reviews.length
    ? (stay.reviews.reduce((n, r) => n + r.rating, 0) / stay.reviews.length).toFixed(1)
    : null;

  return (
    <>
      <JsonLd data={listingJsonLd(stay, `/stays/${stay.slug}`)} />
      <DetailLayout
        listing={stay}
        back={{ href: "/stays", label: "Short Stays" }}
        price={formatUGX(stay.nightlyRate)}
        priceNote="per night"
        stats={[
          { value: String(stay.guests), label: "Guests" },
          { value: bedroomsLabel(stay.bedrooms), label: "Bedrooms" },
          { value: String(stay.bathrooms), label: "Bathrooms" },
          { value: avg ? `${avg}/5` : "New", label: "Guest rating" },
        ]}
        aside={
          <>
            <h2 className="font-display text-lg font-semibold uppercase">Check availability</h2>
            <p className="mt-2 text-sm text-muted">Send your dates and we will confirm availability and the total.</p>
            <InquiryForm
              variant="stay"
              property={{ title: stay.title, slug: stay.slug, kind: "stay" }}
              stacked
              className="mt-6"
            />
            {stay.airbnbUrl && (
              <div className="mt-6 border-t border-line pt-6">
                <p className="text-xs text-muted">Prefer to book instantly?</p>
                <ButtonLink href={stay.airbnbUrl} external variant="secondary" className="mt-3 w-full">
                  Book on Airbnb
                </ButtonLink>
              </div>
            )}
          </>
        }
      >
        <DetailList id="amenities-heading" title="Amenities" items={stay.amenities} />

        <section aria-labelledby="checkin-heading" className="mt-12">
          <h2 id="checkin-heading" className="font-display text-xl font-semibold uppercase">
            Check-in details
          </h2>
          <dl className="mt-5 grid grid-cols-3 gap-4 border-y border-line py-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Check-in from</dt>
              <dd className="mt-1 font-display text-base font-semibold">{stay.checkIn.from}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Latest arrival</dt>
              <dd className="mt-1 font-display text-base font-semibold">{stay.checkIn.until}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Check-out by</dt>
              <dd className="mt-1 font-display text-base font-semibold">{stay.checkIn.checkOut}</dd>
            </div>
          </dl>
          <p className="mt-4 text-text/85">{stay.checkIn.notes}</p>
        </section>

        <DetailList id="rules-heading" title="House rules" items={stay.houseRules} />

        <section aria-labelledby="reviews-heading" className="mt-12">
          <h2 id="reviews-heading" className="font-display text-xl font-semibold uppercase">
            Guest reviews {avg && <span className="ml-2 font-body text-sm font-medium normal-case text-muted">{avg} average</span>}
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {stay.reviews.map((r) => (
              <li key={r.name + r.date} className="rounded-[3px] border border-line bg-surface p-5">
                <p className="text-accent" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {"★".repeat(r.rating)}
                  <span className="text-white/20">{"★".repeat(5 - r.rating)}</span>
                </p>
                <p className="mt-3 text-text/90">{r.text}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.14em] text-muted">
                  {r.name} · {monthYear(r.date)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </DetailLayout>
    </>
  );
}
