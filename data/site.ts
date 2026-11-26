/**
 * Site-wide copy and business details.
 * Anything marked PLACEHOLDER was invented for the build and must be replaced
 * with the client's real information before launch (search the repo for "PLACEHOLDER").
 */

export const SITE = {
  name: "Realm Space Properties Ltd",
  shortName: "Realm Space",
  tagline: "Find. Own. Move in.",
  description:
    "Realm Space Properties is a Kampala real estate company selling land, brokering apartments for rent and sale, hosting short stays and managing property for owners across Greater Kampala.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+256700000000",
  // PLACEHOLDER: replace with the real phone number
  phone: "+256 700 000 000",
  // PLACEHOLDER: replace with the real inbox
  email: "hello@realmspace.example",
  // PLACEHOLDER: replace with the real office address
  address: {
    street: "Plot 00, Example Road, Kololo",
    city: "Kampala",
    country: "Uganda",
    postalCode: "",
  },
  // PLACEHOLDER: approximate central Kampala location, replace with the office pin
  geo: { lat: 0.3326, lng: 32.5944 },
  // PLACEHOLDER: replace with the company registration number
  registrationNumber: "Reg. No. 80020000000000 (PLACEHOLDER)",
  // PLACEHOLDER: replace with the real working hours
  hours: [
    { days: "Monday to Friday", time: "8:30 am to 6:00 pm" },
    { days: "Saturday", time: "9:00 am to 2:00 pm" },
    { days: "Sunday and public holidays", time: "Viewings by appointment" },
  ],
  // PLACEHOLDER: replace with real profile URLs (or remove a network)
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    x: "https://x.com/",
    linkedin: "https://linkedin.com/",
  },
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/land", label: "Land" },
  { href: "/apartments", label: "Apartments" },
  { href: "/stays", label: "Short Stays" },
  { href: "/owners", label: "Sell or Manage" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const HERO = {
  label: "Real estate in Kampala, Uganda",
  intro:
    "Land with clear titles, apartments worth moving into and short-stay homes that feel like yours. We walk every plot and inspect every unit before it reaches this page.",
  imageAlt:
    "A modern two-storey house at dusk with warm light glowing through floor-to-ceiling windows",
};

// REPLACE: these figures are PLACEHOLDER numbers. Update with the client's real track record.
export const STATS = [
  { value: "120+", label: "Plots sold" },
  { value: "60+", label: "Apartments brokered" },
  { value: "12", label: "Short-stay homes" },
] as const;

export const SERVICES = [
  {
    number: "101",
    title: "Land Sales",
    description:
      "Verified plots across Greater Kampala. Titles checked, boundaries opened and surveyed before we list.",
    href: "/land",
    cta: "Browse land",
  },
  {
    number: "102",
    title: "Apartment Brokerage",
    description:
      "Apartments to rent or buy, from Kololo to Kira. We arrange viewings and negotiate on your behalf.",
    href: "/apartments",
    cta: "Browse apartments",
  },
  {
    number: "103",
    title: "Short Stays",
    description:
      "Furnished homes by the night for business trips, family visits and weekends away from the city.",
    href: "/stays",
    cta: "Browse stays",
  },
  {
    number: "104",
    title: "Property Management",
    description:
      "Tenants found, rent collected, repairs handled. You get a monthly statement and fewer phone calls.",
    href: "/owners",
    cta: "Talk to us",
  },
] as const;

export const PROCESS = [
  {
    ghost: "one",
    title: "Submit your property",
    description:
      "Send us the basics, photos and documents through the owner form or WhatsApp. We reply within one working day.",
  },
  {
    ghost: "two",
    title: "We list and market it",
    description:
      "We verify the paperwork, photograph the property and put it in front of buyers and tenants on our site and channels.",
  },
  {
    ghost: "three",
    title: "Viewings, offers and handover",
    description:
      "We run viewings, negotiate offers and see the sale through to handover, or take over ongoing management.",
  },
] as const;

// PLACEHOLDER: invented testimonials. Replace with real, permission-cleared client quotes.
export const TESTIMONIALS = [
  {
    quote:
      "They showed us the survey and the title before we even asked. We bought our plot in Kira knowing exactly what we were getting.",
    name: "Sarah N.",
    role: "Bought land in Kira (PLACEHOLDER)",
  },
  {
    quote:
      "I live in London and they manage my two apartments in Ntinda. Rent arrives on time and I get photos after every repair.",
    name: "David K.",
    role: "Property owner (PLACEHOLDER)",
  },
  {
    quote:
      "The house in Munyonyo was spotless and the caretaker met us at the gate at midnight. We have booked it again for December.",
    name: "Grace A.",
    role: "Short-stay guest (PLACEHOLDER)",
  },
] as const;

export const CTA_BAND = {
  label: "For property owners",
  title: "Have land or a home to sell, rent or manage?",
  body: "Tell us about it. We will call you back within one working day with an honest view of price, demand and next steps.",
};

export const OWNERS_PAGE = {
  intro:
    "Whether you are selling a plot, letting an apartment or living abroad and need someone on the ground, we handle the work and keep you informed.",
  paths: [
    {
      title: "I want to sell",
      description:
        "Land, houses and apartments. We check your documents, advise on price, market the property and manage offers through to transfer.",
      points: [
        "Title and survey check before listing",
        "Professional photos and listing",
        "Buyer screening and negotiation",
        "Support through transfer and handover",
      ],
      intent: "sell",
    },
    {
      title: "I want you to manage or rent my property",
      description:
        "Long-term rentals or short stays. We find and vet tenants or guests, collect payments and look after the property.",
      points: [
        "Tenant and guest screening",
        "Rent collection and monthly statements",
        "Maintenance and inspections",
        "Short-stay hosting and cleaning",
      ],
      intent: "manage",
    },
  ],
  steps: [
    {
      title: "Tell us about the property",
      description: "Fill in the form below or message us on WhatsApp with location, type and photos.",
    },
    {
      title: "Site visit and valuation",
      description: "We visit, check the documents and give you a realistic price or rent.",
    },
    {
      title: "Listing and marketing",
      description: "We photograph the property and list it here and on our partner channels.",
    },
    {
      title: "Close or manage",
      description: "We handle viewings, offers and paperwork, or start managing it for you.",
    },
  ],
  // PLACEHOLDER: confirm the real fee structure with the client
  feesNote:
    "Fees are agreed in writing before we start. As a guide, sales commission is a percentage of the final price and management is a monthly percentage of rent collected. Nothing is charged until a sale closes or rent is received. (PLACEHOLDER, confirm with Realm Space.)",
};

// PLACEHOLDER: founder details and story are invented. Replace with the real founder's.
export const ABOUT = {
  founder: {
    name: "Founder Name (PLACEHOLDER)",
    role: "Founder and Managing Director",
    imageAlt: "Portrait of the founder of Realm Space Properties in a dark suit",
  },
  yearsExperience: "10+",
  story: [
    "Realm Space started with a simple frustration: buying land in Kampala should not require a leap of faith. Too many buyers were paying for plots with unclear titles, missing surveys or boundaries nobody had walked.",
    "We built the company around verification. Every plot we sell has had its title searched at the land registry and its boundaries opened by a surveyor. Every apartment we list has been inspected in person.",
    "Today we sell land, broker apartments, host short stays and manage property for owners at home and in the diaspora, with the same rule throughout: if we would not buy it or live in it, we do not list it.",
  ],
  areasServed: [
    "Kampala Central",
    "Kololo and Naguru",
    "Ntinda and Bugolobi",
    "Muyenga and Munyonyo",
    "Kira and Najjera",
    "Entebbe Road and Kajjansi",
    "Mukono",
    "Gayaza and Matugga",
  ],
  // PLACEHOLDER: replace with real license and membership details
  licenses: [
    { label: "Company registration", value: "URSB Reg. No. PLACEHOLDER" },
    { label: "Tax registration", value: "TIN PLACEHOLDER" },
    { label: "Professional membership", value: "Association membership PLACEHOLDER" },
  ],
};

export const CONTACT_PAGE = {
  intro:
    "Ask about a listing, book a viewing or tell us what you are looking for. The fastest way to reach us is WhatsApp.",
};

export function whatsappLink(message: string) {
  const digits = SITE.whatsappNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello Realm Space, I found you on your website and would like to ask about a property.";
