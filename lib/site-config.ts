export const siteConfig = {
  brand: {
    name: "Nexus Global",
    nameLong: "Nexus Global Consultancy",
    wordmark: "NEXUS",
    tagline: "Capital, citizenship, and travel — engineered for global citizens.",
    location: "Dubai, UAE",
  },
  hero: {
    eyebrow: "Private global advisory · Dubai",
    headlineLines: [
      { text: "Capital", weight: "regular" },
      { text: "without", weight: "regular" },
      { text: "borders", weight: "italic", accent: true },
    ],
    subhead:
      "Real estate investment, visa & immigration, and luxury travel — for clients whose lives don't fit one country.",
    primaryCta: { label: "Book a private consultation", href: "#contact" },
    secondaryCta: { label: "Our services", href: "#services" },
  },
  marqueeWords: [
    "Real estate",
    "Visa & residency",
    "Citizenship by investment",
    "Luxury travel",
    "Relocation",
    "Family office",
    "40+ countries",
    "Dubai · London · Geneva · Singapore",
  ],
  services: [
    {
      slug: "real-estate",
      eyebrow: "01 — Capital",
      name: "Real Estate Investment",
      tagline: "Trophy assets, sovereign markets.",
      description:
        "Off-market acquisitions, golden-visa-qualifying properties, and yield-driven portfolios across Dubai, London, Lisbon, and Singapore. Underwritten by our investment committee, sourced through 40+ country relationships.",
      bullets: [
        "Off-market and pre-launch access",
        "Golden-visa qualifying assets",
        "Yield, capital appreciation, residency — modeled together",
      ],
      imageUrl: "/service-real-estate.jpg",
    },
    {
      slug: "visa-immigration",
      eyebrow: "02 — Citizenship",
      name: "Visa & Immigration",
      tagline: "Residency built around the life you actually live.",
      description:
        "Investor visas, golden visas, citizenship by investment, and corporate relocation across the UAE, Portugal, Greece, Malta, the Caribbean, and 30+ jurisdictions. Filed by our in-house counsel, never outsourced.",
      bullets: [
        "Golden visas & citizenship by investment",
        "Corporate and family relocation",
        "Tax-residency planning across multiple jurisdictions",
      ],
      imageUrl: "/service-visa.jpg",
    },
    {
      slug: "luxury-travel",
      eyebrow: "03 — Movement",
      name: "Luxury Travel & Relocation",
      tagline: "Travel and relocation as one continuous itinerary.",
      description:
        "Private aviation, bespoke itineraries, school placement, residence sourcing, and concierge for the family that has just moved continents. Designed door-to-door, not flight-to-hotel.",
      bullets: [
        "Private aviation and yacht charter",
        "Family relocation and school placement",
        "24/7 multi-jurisdiction concierge",
      ],
      imageUrl: "/service-travel.jpg",
    },
  ],
  pillars: [
    {
      title: "Authoritative",
      body: "Our committee underwrites every mandate. Nothing is referred out. Decisions you act on are decisions we own.",
    },
    {
      title: "Discreet",
      body: "Single point of contact, encrypted document handling, named-only file access. Your business stays inside the room it began in.",
    },
    {
      title: "Borderless",
      body: "Forty country relationships maintained for years, not borrowed for one mandate. Your residency, capital, and travel move as one plan.",
    },
  ],
  stats: [
    { value: 500, suffix: "+", label: "Private clients advised" },
    { value: 40, suffix: "+", label: "Countries operated in" },
    { value: 98, suffix: "%", label: "Mandate success rate" },
    { value: 12, suffix: "yrs", label: "Average tenure of partners" },
  ],
  testimonials: [
    {
      quote:
        "Nexus moved our family's residency, our holding company, and our two homes in nine months. One desk, one decision, no daylight between the parts.",
      author: "Family office principal",
      meta: "London → Dubai relocation, 2024",
    },
    {
      quote:
        "I have used three private banks and two law firms. Nexus is the only group that returned with the structure already built — and the property already optioned.",
      author: "Industrial group chairman",
      meta: "Real-estate & golden-visa mandate, 2023",
    },
    {
      quote:
        "Discreet, exact, and quietly faster than every other adviser I have ever used. They are the operating system around our travel.",
      author: "Founder, listed technology company",
      meta: "Multi-jurisdiction itinerary & concierge",
    },
  ],
  cta: {
    eyebrow: "Begin",
    headline: "A private hour,\nin Dubai or yours.",
    body: "We meet a small number of new clients each quarter. Tell us where you sit, where you'd rather be, and we'll come back with a plan within seventy-two hours.",
    primary: { label: "Request an introduction", href: "mailto:partners@nexusglobal.example" },
  },
  contact: {
    email: "partners@nexusglobal.example",
    phone: "+971 4 000 0000",
    address: "DIFC · Gate Avenue · Dubai, United Arab Emirates",
    hours: "Mon–Sat · 09:00 – 19:00 GST · By appointment",
  },
  footer: {
    statement:
      "Nexus Global Consultancy is a private advisory firm headquartered in the Dubai International Financial Centre. Real-estate brokerage, visa filings, and travel arrangements are delivered through licensed partners under our committee oversight.",
  },
  colors: {
    primary: "#0a1628",
    secondary: "#0f1f33",
    accent: "#c9a84c",
    accentPale: "#e0c668",
    accentDeep: "#a88838",
    text: {
      hero: "#f4f1eb",
      body: "rgba(244,241,235,0.78)",
      muted: "rgba(244,241,235,0.55)",
      eyebrow: "rgba(201,168,76,0.95)",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
