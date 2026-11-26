import type { StayListing } from "./types";

/**
 * Short-stay homes. Nightly rates are in UGX.
 * airbnbUrl: paste the listing's Airbnb link. Leave it as "" to hide the "Book on Airbnb" button.
 */

const STANDARD_RULES = [
  "No smoking indoors",
  "No parties or events",
  "Quiet hours from 10 pm to 7 am",
  "Registered guests only overnight",
];

const STANDARD_CHECK_IN = {
  from: "2:00 pm",
  until: "10:00 pm",
  checkOut: "11:00 am",
  notes: "Our host meets you at the property. Late arrivals can be arranged in advance on WhatsApp.",
};

export const stays: StayListing[] = [
  // PLACEHOLDER listing
  {
    kind: "stay",
    slug: "munyonyo-lakeside-villa",
    title: "Munyonyo Lakeside Villa",
    location: "Munyonyo, Kampala",
    summary: "A four-bedroom villa with a pool and garden, a short walk from the lakeshore.",
    description: [
      "A modern villa in a private compound near Speke Resort, with a heated pool, a large garden and a covered terrace for evening meals.",
      "A housekeeper comes in daily and a cook can be arranged.",
    ],
    images: [
      { src: "/images/stay-02.jpg", alt: "Modern house with a lit swimming pool at night" },
      { src: "/images/interior-04.jpg", alt: "Modern living room with a fireplace" },
      { src: "/images/interior-02.jpg", alt: "Bedroom with a bed and a lit bedside lamp" },
    ],
    geo: { lat: 0.241, lng: 32.617 },
    nightlyRate: 950_000,
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    amenities: ["Swimming pool", "Wi-Fi", "Daily housekeeping", "Backup generator", "Parking for 3 cars", "Garden"],
    houseRules: STANDARD_RULES,
    checkIn: STANDARD_CHECK_IN,
    reviews: [
      // PLACEHOLDER reviews
      { name: "Grace A.", rating: 5, text: "Spotless house and a host who met us at midnight. We have booked again.", date: "2026-08" },
      { name: "Tom R.", rating: 5, text: "Perfect for a family visit. The pool was the highlight for the kids.", date: "2026-06" },
    ],
    airbnbUrl: "https://www.airbnb.com/",
    featured: true,
  },
  // PLACEHOLDER listing
  {
    kind: "stay",
    slug: "mukono-forest-cabin",
    title: "Mukono Forest Cabin",
    location: "Mukono",
    summary: "A timber cabin among the trees with a fire pit, an hour from the city.",
    description: [
      "A one-bedroom timber cabin on the edge of a private forest, with a wood-fired hot tub and a fire pit under the stars.",
      "Ideal for a weekend away. Breakfast hampers can be delivered on request.",
    ],
    images: [
      { src: "/images/stay-01.jpg", alt: "Wooden cabin lit up at dusk with a fire pit in front" },
      { src: "/images/interior-01.jpg", alt: "Living room with a stove and a large window" },
    ],
    geo: { lat: 0.37, lng: 32.78 },
    nightlyRate: 380_000,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Fire pit", "Hot tub", "Wi-Fi", "Kitchenette", "Parking"],
    houseRules: [...STANDARD_RULES, "Fires only in the fire pit"],
    checkIn: STANDARD_CHECK_IN,
    reviews: [
      { name: "Aisha M.", rating: 5, text: "So quiet. We could hear nothing but birds all weekend.", date: "2026-09" },
    ],
    airbnbUrl: "https://www.airbnb.com/",
    featured: true,
  },
  // PLACEHOLDER listing
  {
    kind: "stay",
    slug: "kololo-city-house",
    title: "Kololo City House",
    location: "Kololo, Kampala",
    summary: "A three-bedroom house in the heart of Kololo, close to embassies, restaurants and the airstrip.",
    description: [
      "A stylish house on a leafy street, five minutes from Acacia Avenue's cafés and restaurants. Popular with business travellers and visiting families.",
      "Fast fibre internet and a dedicated work desk in the study.",
    ],
    images: [
      { src: "/images/stay-04.jpg", alt: "Modern house with lit windows at night" },
      { src: "/images/apartment-05.jpg", alt: "Living room with large windows and a sofa" },
      { src: "/images/interior-03.jpg", alt: "Dimly lit living room with framed art on the wall" },
    ],
    geo: { lat: 0.334, lng: 32.592 },
    nightlyRate: 720_000,
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    amenities: ["Fibre Wi-Fi", "Work desk", "Backup generator", "24-hour security", "Parking"],
    houseRules: STANDARD_RULES,
    checkIn: STANDARD_CHECK_IN,
    reviews: [
      { name: "Peter O.", rating: 4, text: "Great location for meetings in town. Generator kicked in without a blip.", date: "2026-07" },
    ],
    airbnbUrl: "https://www.airbnb.com/",
    featured: true,
  },
  // PLACEHOLDER listing
  {
    kind: "stay",
    slug: "entebbe-garden-cottage",
    title: "Entebbe Garden Cottage",
    location: "Entebbe",
    summary: "A cosy two-bedroom cottage ten minutes from the airport, perfect for early flights.",
    description: [
      "A quiet cottage set in a mature garden near the Entebbe Botanical Gardens. Airport transfers can be arranged.",
      "Two bedrooms, a sitting room with a TV and a veranda for breakfast.",
    ],
    images: [
      { src: "/images/stay-05.jpg", alt: "Cosy cabin lit up at night among trees" },
      { src: "/images/interior-02.jpg", alt: "Bedroom with a bed and a lit bedside lamp" },
    ],
    geo: { lat: 0.064, lng: 32.463 },
    nightlyRate: 320_000,
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["Airport transfers", "Wi-Fi", "Garden", "Parking", "Smart TV"],
    houseRules: STANDARD_RULES,
    checkIn: { ...STANDARD_CHECK_IN, notes: "Early check-in for night arrivals can be arranged in advance." },
    reviews: [
      { name: "Hannah L.", rating: 5, text: "Ideal before a 6 am flight. Lovely garden.", date: "2026-05" },
    ],
    airbnbUrl: "",
  },
  // PLACEHOLDER listing
  {
    kind: "stay",
    slug: "garuga-lake-retreat",
    title: "Garuga Lake Retreat",
    location: "Garuga, Entebbe",
    summary: "A timber-and-glass retreat in the trees above Lake Victoria, with a private jetty nearby.",
    description: [
      "A two-bedroom retreat with a wraparound deck, built in timber and glass among tall trees close to the lakeshore.",
      "Boat trips and fishing can be arranged through our host.",
    ],
    images: [
      { src: "/images/stay-03.jpg", alt: "Cabin among trees lit up at night" },
      { src: "/images/interior-01.jpg", alt: "Living room with a stove and a large window" },
    ],
    geo: { lat: 0.13, lng: 32.5 },
    nightlyRate: 540_000,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Deck", "Lake access", "Wi-Fi", "Kitchen", "Parking"],
    houseRules: STANDARD_RULES,
    checkIn: STANDARD_CHECK_IN,
    reviews: [
      { name: "Joel K.", rating: 5, text: "Waking up over the lake was worth the drive.", date: "2026-04" },
    ],
    airbnbUrl: "https://www.airbnb.com/",
  },
  // PLACEHOLDER listing
  {
    kind: "stay",
    slug: "naguru-modern-house",
    title: "Naguru Modern House",
    location: "Naguru, Kampala",
    summary: "A design-led five-bedroom house for groups, with a rooftop lounge and city views.",
    description: [
      "A contemporary house in Naguru, made for groups and longer stays. The rooftop lounge looks out over the city lights.",
      "A housekeeper and a driver can be arranged.",
    ],
    images: [
      { src: "/images/stay-06.jpg", alt: "Modern house lit up at night" },
      { src: "/images/house-01.jpg", alt: "Modern house with a lit walkway to the front door" },
      { src: "/images/interior-04.jpg", alt: "Modern living room with a fireplace" },
    ],
    geo: { lat: 0.349, lng: 32.607 },
    nightlyRate: 1_200_000,
    guests: 10,
    bedrooms: 5,
    bathrooms: 5,
    amenities: ["Rooftop lounge", "Wi-Fi", "Backup generator", "24-hour security", "Parking for 4 cars"],
    houseRules: STANDARD_RULES,
    checkIn: STANDARD_CHECK_IN,
    reviews: [
      { name: "Linda W.", rating: 5, text: "Hosted our whole team for a week. Everything just worked.", date: "2026-10" },
    ],
    airbnbUrl: "https://www.airbnb.com/",
  },
];

export function getStay(slug: string) {
  return stays.find((s) => s.slug === slug);
}
