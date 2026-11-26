/**
 * Shared listing types. These mirror what a CMS collection would hold,
 * so the data files can later be swapped for CMS queries without touching
 * the components.
 */

export type ImageRef = {
  /** Path under /public, e.g. "/images/land-01.jpg" */
  src: string;
  alt: string;
};

export type GeoPoint = { lat: number; lng: number };

type BaseListing = {
  slug: string;
  title: string;
  /** Neighbourhood or town, e.g. "Kira, Wakiso" */
  location: string;
  /** Short one-paragraph summary used on cards and meta descriptions */
  summary: string;
  description: string[];
  images: ImageRef[];
  geo: GeoPoint;
  featured?: boolean;
};

export type LandTitleStatus = "Freehold" | "Mailo" | "Leasehold" | "Customary";

export type LandListing = BaseListing & {
  kind: "land";
  /** Price in UGX */
  price: number;
  /** Plot size in acres (decimal, e.g. 0.125 for a 50x100ft plot) */
  sizeAcres: number;
  /** Human label, e.g. "50 x 100 ft" */
  sizeLabel: string;
  titleStatus: LandTitleStatus;
  nearby: {
    road: string;
    water: string;
    power: string;
  };
};

export type ApartmentListing = BaseListing & {
  kind: "apartment";
  mode: "rent" | "sale";
  /** UGX. For rent: per month. For sale: total price. */
  price: number;
  bedrooms: number;
  bathrooms: number;
  /** Floor area in square metres */
  areaSqm: number;
  amenities: string[];
};

export type StayListing = BaseListing & {
  kind: "stay";
  /** UGX per night */
  nightlyRate: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  houseRules: string[];
  checkIn: { from: string; until: string; checkOut: string; notes: string };
  reviews: { name: string; rating: number; text: string; date: string }[];
  airbnbUrl: string;
};

export type Listing = LandListing | ApartmentListing | StayListing;
