import type { Metadata } from "next";
import { SITE } from "@/data/site";
import type { Listing } from "@/data/types";

export const siteUrl = SITE.url.replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Per-page metadata with matching Open Graph and Twitter tags. */
export function pageMetadata({
  title,
  description,
  path,
  image = "/images/hero.jpg",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.shortName}`,
      description,
      url: path,
      siteName: SITE.name,
      locale: "en_UG",
      type: "website",
      images: [{ url: image, width: 1600, height: 1000, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.shortName}`,
      description,
      images: [image],
    },
  };
}

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    url: siteUrl,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/images/hero.jpg"),
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressCountry: "UG",
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: "Greater Kampala, Uganda",
    sameAs: Object.values(SITE.social),
  };
}

export function listingJsonLd(listing: Listing, path: string) {
  const base = {
    "@context": "https://schema.org",
    name: listing.title,
    description: listing.summary,
    url: absoluteUrl(path),
    image: listing.images.map((i) => absoluteUrl(i.src)),
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.location,
      addressCountry: "UG",
    },
    geo: { "@type": "GeoCoordinates", latitude: listing.geo.lat, longitude: listing.geo.lng },
  };

  if (listing.kind === "land") {
    // A plot is not a residence, so it is described as a Place with an offer.
    return {
      ...base,
      "@type": "Place",
      additionalProperty: [
        { "@type": "PropertyValue", name: "Plot size", value: listing.sizeLabel },
        { "@type": "PropertyValue", name: "Title", value: listing.titleStatus },
      ],
      makesOffer: {
        "@type": "Offer",
        price: listing.price,
        priceCurrency: "UGX",
        availability: "https://schema.org/InStock",
      },
    };
  }

  const amenityFeature = listing.amenities.map((a) => ({
    "@type": "LocationFeatureSpecification",
    name: a,
    value: true,
  }));

  if (listing.kind === "apartment") {
    return {
      ...base,
      "@type": "Residence",
      numberOfRooms: listing.bedrooms,
      floorSize: { "@type": "QuantitativeValue", value: listing.areaSqm, unitCode: "MTK" },
      amenityFeature,
    };
  }

  return {
    ...base,
    "@type": "Residence",
    numberOfRooms: listing.bedrooms,
    occupancy: { "@type": "QuantitativeValue", maxValue: listing.guests },
    amenityFeature,
  };
}

/** Serialises JSON-LD safely for a <script> tag. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
