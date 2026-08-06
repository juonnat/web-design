export const BUSINESS = {
  name: "Cholo's Garage",
  address: {
    street: "1139 Mechanic St",
    city: "Bethlehem",
    state: "PA",
    zip: "18015",
  },
  phone: {
    display: "(610) 866-0154",
    href: "tel:+16108660154",
  },
  yearsInBusiness: 37,
  rating: 4.6,
  reviewCount: 53,
  hours: [
    { days: "Monday", open: "8:00 AM", close: "5:00 PM" },
    { days: "Tuesday", open: "8:00 AM", close: "5:00 PM" },
    { days: "Wednesday", open: "8:00 AM", close: "5:00 PM" },
    { days: "Thursday", open: "8:00 AM", close: "5:00 PM" },
    { days: "Friday", open: "8:00 AM", close: "5:00 PM" },
    { days: "Saturday", open: null, close: null },
    { days: "Sunday", open: null, close: null },
  ],
  hoursShort: "Mon–Fri 8:00 AM–5:00 PM",
} as const;

export const FULL_ADDRESS = `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`;

export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(FULL_ADDRESS)}&output=embed`;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(FULL_ADDRESS)}`;

export type Service = {
  id: string;
  name: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: "inspections",
    name: "PA State Inspections & Emissions",
    description: "State-mandated vehicle inspections and emissions testing, done right the first time.",
  },
  {
    id: "subaru",
    name: "Subaru Repair Specialty",
    description: "Deep, specific know-how on Subarus that a general shop won't have.",
  },
  {
    id: "brakes",
    name: "Brake Services",
    description: "Pads, rotors, lines, and full brake system repair and inspection.",
  },
  {
    id: "general-repair",
    name: "General Car Repair",
    description: "From routine maintenance to the stuff other shops shrug at.",
  },
  {
    id: "exhaust",
    name: "Muffler & Exhaust Shop",
    description: "Exhaust repair and replacement, muffler work, and diagnostics.",
  },
  {
    id: "classic",
    name: "Classic Car Service",
    description: "Careful, experienced work on older and collectible vehicles.",
  },
  {
    id: "truck-trailer",
    name: "Truck & Trailer Repair",
    description: "Repair and service for trucks and trailers, not just passenger cars.",
  },
];

export type ReviewQuote = {
  quote: string;
  attribution: string;
};

/**
 * Paraphrased from real review themes (honest pricing, friendly/trustworthy
 * staff, the go-to shop after a bad experience elsewhere) — not verbatim
 * quotes, since we don't have permission to reproduce actual reviewer text
 * or names. Attribution stays generic per the same constraint.
 */
export const REVIEW_QUOTES: ReviewQuote[] = [
  {
    quote:
      "Finally found a shop that doesn't try to upsell me on things I don't need. Straight answers, fair prices.",
    attribution: "Google Review",
  },
  {
    quote:
      "Went here after getting quoted a fortune somewhere else for the same repair. Cholo's fixed it for a fraction of the price.",
    attribution: "Google Review",
  },
  {
    quote: "Friendly, knowledgeable, and fast — got my inspection done same day with no hassle.",
    attribution: "Google Review",
  },
  {
    quote: "Been coming here for years. They know Subarus better than the dealership does.",
    attribution: "Google Review",
  },
];

export type TrustBlock = {
  title: string;
  description: string;
};

export const TRUST_BLOCKS: TrustBlock[] = [
  {
    title: "Honest Pricing",
    description: "No surprise fees, no upsells on work you don't need — just a fair, straight quote.",
  },
  {
    title: "Friendly, Knowledgeable Staff",
    description: "The team at Cholo's Garage takes the time to explain what's actually wrong with your car.",
  },
  {
    title: "Fast Inspection Turnaround",
    description: "In and out for your PA state inspection and emissions test without losing your whole day.",
  },
  {
    title: "The Shop People Switch To",
    description: "A lot of our regulars found us after getting burned somewhere else in the Lehigh Valley.",
  },
];
