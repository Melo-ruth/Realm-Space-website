import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/listings/DetailLayout";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { land, getLand } from "@/data/land";
import { formatAcres, formatUGX } from "@/lib/format";
import { JsonLd, listingJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return land.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/land/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const plot = getLand(slug);
  if (!plot) return {};
  return pageMetadata({
    title: `${plot.title}, ${plot.sizeLabel}`,
    description: plot.summary,
    path: `/land/${plot.slug}`,
    image: plot.images[0].src,
  });
}

export default async function LandDetailPage({ params }: PageProps<"/land/[slug]">) {
  const { slug } = await params;
  const plot = getLand(slug);
  if (!plot) notFound();

  const nearby = [
    { label: "Road access", value: plot.nearby.road },
    { label: "Water", value: plot.nearby.water },
    { label: "Power", value: plot.nearby.power },
  ];

  return (
    <>
      <JsonLd data={listingJsonLd(plot, `/land/${plot.slug}`)} />
      <DetailLayout
        listing={plot}
        back={{ href: "/land", label: "Land" }}
        price={formatUGX(plot.price)}
        stats={[
          { value: plot.sizeLabel, label: "Plot size" },
          { value: formatAcres(plot.sizeAcres), label: "Area" },
          { value: plot.titleStatus, label: "Title status" },
          { value: plot.location.split(",")[0], label: "Location" },
        ]}
        aside={
          <>
            <h2 className="font-display text-lg font-semibold uppercase">Ask about this plot</h2>
            <p className="mt-2 text-sm text-muted">Request the title search, the survey or a site visit.</p>
            <InquiryForm
              variant="listing"
              property={{ title: plot.title, slug: plot.slug, kind: "land" }}
              submitLabel="Send enquiry"
              stacked
              className="mt-6"
            />
          </>
        }
      >
        <section aria-labelledby="nearby-heading" className="mt-12">
          <h2 id="nearby-heading" className="font-display text-xl font-semibold uppercase">
            Nearby services
          </h2>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {nearby.map((n) => (
              <div key={n.label} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{n.label}</dt>
                <dd className="text-text/90">{n.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </DetailLayout>
    </>
  );
}
