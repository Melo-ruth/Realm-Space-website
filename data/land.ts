import type { LandListing } from "./types";

/**
 * Land listings.
 * To add a plot: copy one object, give it a unique kebab-case slug, and put its
 * photos in /public/images. Prices are in UGX. Coordinates come from Google Maps
 * (right-click the plot > copy the numbers).
 */
export const land: LandListing[] = [
  // PLACEHOLDER listing
  {
    kind: "land",
    slug: "kira-hillside-plot",
    title: "Kira Hillside Plot",
    location: "Kira, Wakiso",
    summary: "A gently sloping residential plot with open views towards Lake Victoria, ten minutes from Kira town.",
    description: [
      "A quiet residential plot on a ridge above Kira, in an estate of new family homes. The ground slopes gently to the south, giving a clear view over the valley and good natural drainage.",
      "The boundaries have been opened by a registered surveyor and the title has been searched at the land registry. Ideal for a family home with a garden.",
    ],
    images: [
      { src: "/images/land-01.jpg", alt: "Aerial view of terraced green hills and scattered trees" },
      { src: "/images/land-03.jpg", alt: "Rolling green hills under a cloudy sky seen from above" },
      { src: "/images/land-06.jpg", alt: "Green hills with winding paths and scattered trees" },
    ],
    geo: { lat: 0.397, lng: 32.64 },
    price: 85_000_000,
    sizeAcres: 0.125,
    sizeLabel: "50 x 100 ft",
    titleStatus: "Mailo",
    nearby: {
      road: "Murram access road, 600 m to the tarmac Kira–Kasangati road",
      water: "NWSC line along the access road",
      power: "UMEME pole 30 m from the boundary",
    },
    featured: true,
  },
  // PLACEHOLDER listing
  {
    kind: "land",
    slug: "gayaza-acre-farmland",
    title: "Gayaza One-Acre Garden Land",
    location: "Gayaza, Wakiso",
    summary: "A full acre of fertile red soil off the Gayaza–Zirobwe road, suited to a home with a kitchen garden or a small farm.",
    description: [
      "Flat to gently rolling land with deep red soil and mature mango trees along the northern boundary. Neighbours are a mix of family homes and small farms.",
      "The plot is on a freehold title in the seller's name and can be subdivided. We can introduce a surveyor if you plan to split it.",
    ],
    images: [
      { src: "/images/land-04.jpg", alt: "Lush green hillside covered in grass" },
      { src: "/images/land-02.jpg", alt: "Green hills with a road winding between them" },
      { src: "/images/land-05.jpg", alt: "Wide landscape with trees and a building in the distance" },
    ],
    geo: { lat: 0.457, lng: 32.608 },
    price: 140_000_000,
    sizeAcres: 1,
    sizeLabel: "1 acre",
    titleStatus: "Freehold",
    nearby: {
      road: "1.2 km off the tarmac Gayaza–Zirobwe road",
      water: "Borehole on the neighbouring plot; NWSC line 400 m away",
      power: "Three-phase power line along the access road",
    },
  },
  // PLACEHOLDER listing
  {
    kind: "land",
    slug: "mukono-roadside-commercial",
    title: "Mukono Roadside Commercial Plot",
    location: "Seeta, Mukono",
    summary: "A prime commercial plot with frontage on the Kampala–Jinja highway corridor, ready for shops or a petrol station.",
    description: [
      "Level ground with direct access from a service road parallel to the Kampala–Jinja highway. High daily traffic and busy surroundings make it a strong commercial site.",
      "Leasehold title with 42 years remaining. Approved for commercial use by Mukono Municipal Council.",
    ],
    images: [
      { src: "/images/land-05.jpg", alt: "Wide landscape with trees and a building in the distance" },
      { src: "/images/land-02.jpg", alt: "Green hills with a road winding between them" },
    ],
    geo: { lat: 0.3536, lng: 32.7553 },
    price: 420_000_000,
    sizeAcres: 0.5,
    sizeLabel: "Half an acre",
    titleStatus: "Leasehold",
    nearby: {
      road: "Service road frontage onto the Kampala–Jinja highway",
      water: "NWSC connection at the boundary",
      power: "Three-phase power at the boundary",
    },
    featured: true,
  },
  // PLACEHOLDER listing
  {
    kind: "land",
    slug: "matugga-estate-plots",
    title: "Matugga Estate Plots",
    location: "Matugga, Wakiso",
    summary: "Serviced 50 x 100 ft plots in a new gated estate with graded roads, a short drive from the Gulu highway.",
    description: [
      "Individual plots in a planned estate with graded internal roads, a perimeter wall under construction and a shared security post.",
      "Each plot has its own title. Payment plans of up to 12 months are available on request.",
    ],
    images: [
      { src: "/images/land-06.jpg", alt: "Green hills with winding paths and scattered trees" },
      { src: "/images/land-03.jpg", alt: "Rolling green hills under a cloudy sky seen from above" },
    ],
    geo: { lat: 0.448, lng: 32.528 },
    price: 38_000_000,
    sizeAcres: 0.125,
    sizeLabel: "50 x 100 ft",
    titleStatus: "Freehold",
    nearby: {
      road: "Graded estate roads, 2 km to the Kampala–Gulu highway",
      water: "Estate water tank; NWSC extension planned",
      power: "Power within the estate",
    },
  },
  // PLACEHOLDER listing
  {
    kind: "land",
    slug: "kajjansi-lake-view",
    title: "Kajjansi Lake View Plot",
    location: "Kajjansi, Entebbe Road",
    summary: "A large residential plot with views over Lake Victoria, minutes from the Entebbe Expressway.",
    description: [
      "Elevated land with a clear view of the lake, in an area of established homes. Quick access to the Entebbe Expressway makes the airport and the city both about 25 minutes away.",
      "Mailo title in the seller's name, searched and clean. Suitable for a single large home or two semi-detached houses.",
    ],
    images: [
      { src: "/images/land-02.jpg", alt: "Green hills with a road winding between them" },
      { src: "/images/land-01.jpg", alt: "Aerial view of terraced green hills and scattered trees" },
    ],
    geo: { lat: 0.214, lng: 32.549 },
    price: 165_000_000,
    sizeAcres: 0.25,
    sizeLabel: "100 x 100 ft",
    titleStatus: "Mailo",
    nearby: {
      road: "Tarmac road 300 m away; 1.5 km to the Expressway",
      water: "NWSC connection available",
      power: "UMEME power at the boundary",
    },
  },
  // PLACEHOLDER listing
  {
    kind: "land",
    slug: "garuga-lakeside-acreage",
    title: "Garuga Lakeside Acreage",
    location: "Garuga, Entebbe",
    summary: "Three acres near the shore of Lake Victoria, suited to a resort, a retreat or a private residence.",
    description: [
      "A rare block of land close to the lakeshore at Garuga, with tall trees, birdlife and a quiet access road. Several resorts and private homes nearby.",
      "Freehold title. The seller will consider selling one acre on its own.",
    ],
    images: [
      { src: "/images/land-03.jpg", alt: "Rolling green hills under a cloudy sky seen from above" },
      { src: "/images/land-04.jpg", alt: "Lush green hillside covered in grass" },
    ],
    geo: { lat: 0.13, lng: 32.51 },
    price: 690_000_000,
    sizeAcres: 3,
    sizeLabel: "3 acres",
    titleStatus: "Freehold",
    nearby: {
      road: "Murram access road, 4 km to the Entebbe road",
      water: "Lake access nearby; borehole possible",
      power: "UMEME power 200 m away",
    },
  },
];

export function getLand(slug: string) {
  return land.find((l) => l.slug === slug);
}
