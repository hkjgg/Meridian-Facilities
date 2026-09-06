/**
 * Single source of truth for business facts that appear in copy, metadata and
 * structured data. Keeping them here means the LocalBusiness JSON-LD can never
 * drift from what the footer renders.
 */
export const site = {
  name: "Meridian Facilities",
  legalName: "Meridian Facilities LLC",
  tagline: "Commercial cleaning and facility maintenance",
  description:
    "Meridian Facilities keeps offices and retail spaces clean, compliant and running — with dedicated crews, a named account manager and audited results.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://meridianfacilities.com",
  email: "hello@meridianfacilities.com",
  phone: "+1-503-555-0188",
  phoneDisplay: "(503) 555-0188",
  founded: "2009",
  address: {
    street: "1420 NW Marshall Street, Suite 300",
    city: "Portland",
    region: "OR",
    postalCode: "97209",
    country: "US",
  },
  geo: { latitude: 45.5301, longitude: -122.6862 },
  hours: {
    office: "Monday – Friday, 7:00am – 6:00pm",
    service: "Crews on site 7 days a week, including overnight shifts",
  },
  serviceArea: [
    "Portland",
    "Beaverton",
    "Hillsboro",
    "Lake Oswego",
    "Vancouver, WA",
  ],
  stats: [
    { value: "310+", label: "Sites serviced weekly" },
    { value: "16", label: "Years in operation" },
    { value: "94%", label: "Client retention, 3-yr average" },
    { value: "4hr", label: "Response time on escalations" },
  ],
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
