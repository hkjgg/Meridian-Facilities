import type { Metadata } from "next";
import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, ButtonLink, SectionHeading } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/jsonld";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commercial cleaning & facility services",
  description:
    "Four services for offices and retail: nightly commercial cleaning, floor and carpet care, facility maintenance, and disinfection and restroom care.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: `${site.url}/services`,
    title: `Services | ${site.name}`,
    description:
      "Nightly commercial cleaning, floor and carpet care, facility maintenance, and disinfection for offices and retail across greater Portland.",
  },
};

const commitments = [
  {
    title: "Priced from a walkthrough",
    body: "Never from a lease document's square footage. We measure what is actually cleanable and price that.",
  },
  {
    title: "Documented every visit",
    body: "Digital checklists with timestamped photos, so quality is a record rather than an impression.",
  },
  {
    title: "Reviewed every quarter",
    body: "Buildings change. A scope written eighteen months ago is how service quality quietly slips.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section className="shell pt-14 pb-16 lg:pt-20 lg:pb-20">
        <SectionHeading
          eyebrow="Services"
          as="h1"
          title="Everything a building needs, from one accountable contract"
          lede="Start with the service you need most. Add the others when you are ready to consolidate vendors — each one stands on its own, and none of them require the rest."
        />
      </section>

      <section aria-label="Our services" className="shell pb-8">
        <ul className="grid gap-14 lg:gap-20">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug}>
              <article
                className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-14 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-2xl bg-ink-900 lg:col-span-6">
                  <Artwork
                    src={service.image}
                    alt={service.imageAlt}
                    width={1000}
                    height={750}
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>

                <div className="lg:col-span-6">
                  <p
                    aria-hidden="true"
                    className="font-display text-sm text-accent-700 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-headline">
                    <Link
                      href={`/services/${service.slug}`}
                      className="transition-colors hover:text-accent-700"
                    >
                      {service.name}
                    </Link>
                  </h2>
                  <p className="mt-4 font-display text-title text-ink-500">
                    {service.tagline}
                  </p>
                  <p className="mt-6 max-w-xl leading-relaxed text-ink-500">
                    {service.summary}
                  </p>

                  <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                    {service.includes.slice(0, 4).map((item) => (
                      <li
                        key={item.title}
                        className="flex items-start gap-2.5 text-[0.95rem] text-ink-800"
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="mt-1 h-4 w-4 flex-none text-accent-500"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M3.5 8.5l3 3 6-7"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item.title}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-8 inline-flex items-center gap-2 font-medium text-accent-700 underline-offset-4 hover:underline"
                  >
                    <span>
                      About {service.name.toLowerCase()}
                      <span className="sr-only"> — read the full service page</span>
                    </span>
                    <ArrowRight />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="commitments-heading"
        className="shell py-24 lg:py-32"
      >
        <div className="rounded-3xl border border-ink-900/10 bg-paper-50 px-7 py-14 sm:px-12 lg:px-16">
          <SectionHeading
            eyebrow="How we work"
            id="commitments-heading"
            title="Three things that are true of every contract"
          />
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {commitments.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <div className="border-t border-ink-900/15 pt-6">
                  <h3 className="text-title">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/quote" size="lg">
              Get an estimate
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Book a walkthrough
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
