import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DetailLayout, DetailList, DetailSkeleton } from "@/components/listings/DetailLayout";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { apartments, getApartment } from "@/data/apartments";
import { bedroomsLabel, formatUGX } from "@/lib/format";
import { JsonLd, listingJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return apartments.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apartments/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const apt = getApartment(slug);
  if (!apt) return {};
  return pageMetadata({
    title: `${apt.title} ${apt.mode === "rent" ? "for rent" : "for sale"}`,
    description: apt.summary,
    path: `/apartments/${apt.slug}`,
    image: apt.images[0].src,
  });
}

async function ApartmentDetail({ params }: Pick<PageProps<"/apartments/[slug]">, "params">) {
  const { slug } = await params;
  const apt = getApartment(slug);
  if (!apt) notFound();

  return (
    <>
      <JsonLd data={listingJsonLd(apt, `/apartments/${apt.slug}`)} />
      <DetailLayout
        listing={apt}
        back={{ href: "/apartments", label: "Apartments" }}
        price={formatUGX(apt.price)}
        priceNote={apt.mode === "rent" ? "per month" : undefined}
        stats={[
          { value: bedroomsLabel(apt.bedrooms), label: "Bedrooms" },
          { value: String(apt.bathrooms), label: "Bathrooms" },
          { value: `${apt.areaSqm} m²`, label: "Floor area" },
          { value: apt.mode === "rent" ? "Rent" : "Sale", label: "Available for" },
        ]}
        aside={
          <>
            <h2 className="font-display text-lg font-semibold uppercase">Book a viewing</h2>
            <p className="mt-2 text-sm text-muted">
              Pick a date and we will confirm a time. All viewings are arranged and attended by Realm Space.
            </p>
            <InquiryForm
              variant="listing"
              property={{ title: apt.title, slug: apt.slug, kind: "apartment" }}
              submitLabel="Book a viewing"
              stacked
              className="mt-6"
            />
          </>
        }
      >
        <DetailList id="amenities-heading" title="Amenities" items={apt.amenities} />
      </DetailLayout>
    </>
  );
}

/**
 * The slug is read inside <Suspense> so the route's shared App Shell stays
 * URL-independent and navigation can show the skeleton instantly.
 * Known slugs are still fully prerendered via generateStaticParams.
 */
export default function ApartmentDetailPage({ params }: PageProps<"/apartments/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ApartmentDetail params={params} />
    </Suspense>
  );
}
