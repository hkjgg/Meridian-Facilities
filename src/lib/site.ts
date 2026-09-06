/** Used whenever the environment does not supply a usable origin. */
const FALLBACK_SITE_URL = "https://meridianfacilities.com";

/**
 * Resolves the public origin from the environment.
 *
 * `NEXT_PUBLIC_SITE_URL` is optional, and hosts do not always leave an unset
 * variable undefined — Vercel supplies an empty string for a variable that is
 * declared but has no value. `??` does not catch that, so the empty string used
 * to reach `new URL()` in `metadataBase` and fail the production build with
 * `ERR_INVALID_URL`. Anything unusable now falls back instead of throwing:
 * a missing origin should degrade to canonical URLs pointing at the default
 * domain, never break the build.
 *
 * Also normalises what it accepts: a bare hostname gains https://, and any
 * trailing slash, query or fragment is dropped so `${site.url}/services` can
 * never produce a doubled slash.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return FALLBACK_SITE_URL;

  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const parsed = new URL(candidate);

    // Anything that is not web-addressable would produce nonsense canonical
    // tags and an invalid metadataBase.
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      throw new Error(`unsupported protocol "${parsed.protocol}"`);
    }

    return `${parsed.origin}${parsed.pathname.replace(/\/+$/, "")}`;
  } catch {
    console.warn(
      `[meridian] NEXT_PUBLIC_SITE_URL is not a usable URL (${JSON.stringify(raw)}). Falling back to ${FALLBACK_SITE_URL}.`,
    );
    return FALLBACK_SITE_URL;
  }
}

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
  /** Always an absolute http(s) origin with no trailing slash. */
  url: resolveSiteUrl(),
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
