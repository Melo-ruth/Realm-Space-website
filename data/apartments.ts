import type { ApartmentListing } from "./types";

/**
 * Apartment listings (for rent or for sale).
 * Never add owner names or phone numbers here: enquiries always go through Realm Space.
 * Prices are in UGX: monthly rent when mode is "rent", total price when mode is "sale".
 */
export const apartments: ApartmentListing[] = [
  // PLACEHOLDER listing
  {
    kind: "apartment",
    slug: "kololo-two-bedroom-terrace",
    title: "Kololo Two-Bedroom with Terrace",
    location: "Kololo, Kampala",
    summary: "A bright two-bedroom apartment with a private terrace over the Kololo hills, in a block with a pool and gym.",
    description: [
      "A second-floor apartment in a well-kept block on one of Kololo's quieter streets. The living room opens onto a wide terrace that catches the evening light.",
      "Both bedrooms are en-suite, the kitchen is fitted with a gas cooker and oven, and there is a separate laundry area.",
    ],
    images: [
      { src: "/images/apartment-01.jpg", alt: "Modern apartment building with glass balconies" },
      { src: "/images/apartment-05.jpg", alt: "Living room with large windows and a sofa" },
      { src: "/images/interior-02.jpg", alt: "Bedroom with a bed and a lit bedside lamp" },
    ],
    geo: { lat: 0.3326, lng: 32.5944 },
    mode: "rent",
    price: 6_500_000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 140,
    amenities: ["Swimming pool", "Gym", "Backup generator", "24-hour security", "Two parking slots", "Lift"],
    featured: true,
  },
  // PLACEHOLDER listing
  {
    kind: "apartment",
    slug: "naguru-three-bedroom-penthouse",
    title: "Naguru Three-Bedroom Penthouse",
    location: "Naguru, Kampala",
    summary: "A top-floor penthouse with city views on three sides, sold with two parking slots and a storeroom.",
    description: [
      "The penthouse takes up the whole top floor of a six-storey block on Naguru hill. Floor-to-ceiling windows run along the living and dining space.",
      "Sold with a strata title, two parking bays and a storeroom in the basement.",
    ],
    images: [
      { src: "/images/apartment-02.jpg", alt: "Apartment tower with lit windows at night" },
      { src: "/images/interior-04.jpg", alt: "Modern living room with a fireplace" },
      { src: "/images/apartment-04.jpg", alt: "Sectional sofa near a coffee table and window" },
    ],
    geo: { lat: 0.348, lng: 32.608 },
    mode: "sale",
    price: 1_450_000_000,
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 260,
    amenities: ["Roof terrace", "Lift", "Backup generator", "Borehole water", "CCTV", "Two parking slots"],
    featured: true,
  },
  // PLACEHOLDER listing
  {
    kind: "apartment",
    slug: "ntinda-one-bedroom",
    title: "Ntinda One-Bedroom Apartment",
    location: "Ntinda, Kampala",
    summary: "A compact one-bedroom close to Ntinda shopping centre, ideal for a young professional.",
    description: [
      "A practical one-bedroom on the first floor of a small gated block, five minutes' walk from Ntinda shops and taxis.",
      "Fitted wardrobes, a balcony off the living room and prepaid electricity.",
    ],
    images: [
      { src: "/images/apartment-06.jpg", alt: "Living room with a couch and warm lamps" },
      { src: "/images/interior-03.jpg", alt: "Dimly lit living room with framed art on the wall" },
    ],
    geo: { lat: 0.353, lng: 32.617 },
    mode: "rent",
    price: 1_800_000,
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 55,
    amenities: ["Gated compound", "Prepaid electricity", "Parking", "Balcony"],
  },
  // PLACEHOLDER listing
  {
    kind: "apartment",
    slug: "bugolobi-family-apartment",
    title: "Bugolobi Family Apartment",
    location: "Bugolobi, Kampala",
    summary: "A spacious three-bedroom family apartment near international schools and the Bugolobi market.",
    description: [
      "A ground-floor apartment with a small private garden, set in a compound of eight units with a children's play area.",
      "Close to Kampala International School and a short drive to the city centre.",
    ],
    images: [
      { src: "/images/apartment-04.jpg", alt: "Sectional sofa near a coffee table and window" },
      { src: "/images/interior-01.jpg", alt: "Living room with a stove and a large window" },
      { src: "/images/interior-02.jpg", alt: "Bedroom with a bed and a lit bedside lamp" },
    ],
    geo: { lat: 0.317, lng: 32.62 },
    mode: "rent",
    price: 4_200_000,
    bedrooms: 3,
    bathrooms: 2,
    areaSqm: 170,
    amenities: ["Private garden", "Play area", "Backup generator", "24-hour security", "Staff quarters"],
  },
  // PLACEHOLDER listing
  {
    kind: "apartment",
    slug: "muyenga-two-bedroom-for-sale",
    title: "Muyenga Two-Bedroom for Sale",
    location: "Muyenga, Kampala",
    summary: "A modern two-bedroom on Tank Hill with lake views, sold furnished.",
    description: [
      "A recently completed apartment near the top of Tank Hill, with views to Lake Victoria from the balcony and the main bedroom.",
      "Sold fully furnished with a strata title. Currently let as a short stay, with booking history available to serious buyers.",
    ],
    images: [
      { src: "/images/apartment-05.jpg", alt: "Living room with large windows and a sofa" },
      { src: "/images/apartment-03.jpg", alt: "Grey chaise couch beside a window" },
    ],
    geo: { lat: 0.295, lng: 32.615 },
    mode: "sale",
    price: 620_000_000,
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 120,
    amenities: ["Lake view", "Furnished", "Lift", "Backup generator", "Parking"],
  },
  // PLACEHOLDER listing
  {
    kind: "apartment",
    slug: "najjera-studio",
    title: "Najjera Studio Apartment",
    location: "Najjera, Wakiso",
    summary: "An affordable, newly built studio with fibre internet, a short drive from Kira road.",
    description: [
      "A new studio apartment with an open-plan kitchen and living area, tiled throughout and with a separate shower room.",
      "Fibre internet is installed and the compound has a water tank for backup supply.",
    ],
    images: [
      { src: "/images/apartment-03.jpg", alt: "Grey chaise couch beside a window" },
      { src: "/images/interior-03.jpg", alt: "Dimly lit living room with framed art on the wall" },
    ],
    geo: { lat: 0.379, lng: 32.629 },
    mode: "rent",
    price: 850_000,
    bedrooms: 0,
    bathrooms: 1,
    areaSqm: 32,
    amenities: ["Fibre internet", "Water tank", "Gated compound", "Parking"],
  },
];

export function getApartment(slug: string) {
  return apartments.find((a) => a.slug === slug);
}
