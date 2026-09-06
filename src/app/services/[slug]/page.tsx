import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Artwork } from "@/components/Artwork";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, ButtonLink, SectionHeading } from "@/components/ui";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/jsonld";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

/** All four pages are known at build time, so they prerender as static HTML. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  const url = `${site.url}/services/${service.slug}`;

  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${service.name} — ${service.tagline}`,
      description: service.summary,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} | ${site.name}`,
      description: service.summary,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />

      {/* ---------------------------------------------------------------- hero */}
      <section className="shell pt-8 pb-16 lg:pt-10 lg:pb-20">
        <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-ink-900">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/services" className="hover:text-ink-900">
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-900" aria-current="page">
              {service.name}
            </li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-6">
            <h1 className="text-display">{service.name}</h1>
            <p className="mt-6 font-display text-title text-accent-700">
              {service.tagline}
            </p>
            <div className="mt-8 space-y-5 text-lede text-ink-500">
              {service.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/quote" size="lg">
                Get an estimate
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                Book a walkthrough
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-3xl bg-ink-900">
              <Artwork
                src={service.image}
                alt={service.imageAlt}
                width={1000}
                height={750}
                loading="eager"
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ includes */}
      <section
        aria-labelledby="includes-heading"
        className="border-t border-ink-900/10"
      >
        <div className="shell py-20 lg:py-28">
          <SectionHeading
            eyebrow="What's included"
            id="includes-heading"
            title="Written into every contract"
            lede="Not a list of things we might do. This is what appears on the scope of work, priced line by line."
          />

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item, index) => (
              <Reveal key={item.title} delay={(index % 3) * 80}>
                <div className="border-t border-ink-900/15 pt-6">
                  <h3 className="text-title">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-500">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- process and best for */}
      <section
        aria-labelledby="process-heading"
        className="on-dark bg-ink-900 text-ink-300"
      >
        <div className="shell grid gap-14 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="How it runs"
              id="process-heading"
              title={<span className="text-paper-100">From walkthrough to steady state</span>}
            />
            <ol className="mt-12">
              {service.process.map((phase, index) => (
                <Reveal as="li" key={phase.step} delay={index * 70}>
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-paper-100/20 py-7">
                    <span
                      aria-hidden="true"
                      className="font-display text-sm text-accent-300 tabular-nums"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-title text-paper-100">{phase.step}</h3>
                      <p className="mt-2.5 leading-relaxed">{phase.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5 lg:pl-4">
            <div className="rounded-2xl border border-paper-100/20 p-8">
              <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-accent-300 uppercase">
                Best suited to
              </h2>
              <ul className="mt-6 space-y-4">
                {service.bestFor.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 16 16"
                      className="mt-1 h-4 w-4 flex-none text-accent-300"
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
                    <span className="text-paper-100">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-paper-100/20 pt-6 text-sm">
                Not sure this is the right fit? Call{" "}
                <a
                  className="font-medium text-paper-100 underline underline-offset-4"
                  href={`tel:${site.phone}`}
                >
                  {site.phoneDisplay}
                </a>{" "}
                and we will tell you honestly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- faq */}
      <section aria-labelledby="faq-heading" className="shell py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Questions"
              id="faq-heading"
              title="Before you ask"
            />
          </div>

          <div className="lg:col-span-8">
            {service.faqs.map((faq, index) => (
              <details
                key={faq.q}
                className="group border-t border-ink-900/15 last:border-b"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-title marker:content-none">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="mt-2 flex h-5 w-5 flex-none items-center justify-center"
                  >
                    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                      <path
                        d="M8 3v10M3 8h10"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        className="text-accent-700 transition-transform duration-300 group-open:rotate-45 [transform-box:fill-box] [transform-origin:center]"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 leading-relaxed text-ink-500">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ other services */}
      <section aria-labelledby="other-heading" className="shell pb-24 lg:pb-32">
        <h2 id="other-heading" className="text-title">
          Other services
        </h2>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink-900/12 bg-ink-900/12 sm:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug} className="bg-paper-100">
              <Link
                href={`/services/${other.slug}`}
                className="group flex h-full flex-col justify-between gap-6 p-7 transition-colors hover:bg-paper-50"
              >
                <div>
                  <h3 className="text-title transition-colors group-hover:text-accent-700">
                    {other.name}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-500">
                    {other.tagline}
                  </p>
                </div>
                <ArrowRight className="text-ink-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-700" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
