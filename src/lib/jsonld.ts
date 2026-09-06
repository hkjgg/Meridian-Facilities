import { site } from "./site";
import type { Service } from "./services";

/**
 * Structured data builders. Everything reads from `site` and `services`, so
 * the markup search engines see cannot drift from what the page renders.
 */

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    foundingDate: site.founded,
    priceRange: "$$",
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon.svg`,
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.serviceArea.map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "18:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Facility services",
      itemListElement: [] as unknown[],
    },
  };
}

export function serviceCatalogSchema(services: Service[]) {
  const schema = localBusinessSchema();
  schema.hasOfferCatalog.itemListElement = services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.summary,
      url: `${site.url}/services/${service.slug}`,
    },
  }));
  return schema;
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: `${site.url}/services/${service.slug}`,
    serviceType: service.name,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      telephone: site.phone,
      address: postalAddress,
    },
    areaServed: site.serviceArea.map((name) => ({ "@type": "City", name })),
    audience: { "@type": "BusinessAudience", audienceType: "Businesses" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}
