import type { Metadata } from "next";
import Link from "next/link";
import { Artwork } from "@/components/Artwork";
import { ClientLogos } from "@/components/ClientLogos";
import { Reveal } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { ArrowRight, ButtonLink, SectionHeading } from "@/components/ui";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — Commercial cleaning & facility maintenance in ${site.address.city}`,
  description:
    "Nightly janitorial, floor care, disinfection and building maintenance for offices and retail across greater Portland. Dedicated crews, a written scope and a monthly audit.",
  alternates: { canonical: "/" },
  openGraph: {
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description:
      "Nightly janitorial, floor care, disinfection and building maintenance for offices and retail across greater Portland.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description:
      "Nightly janitorial, floor care, disinfection and building maintenance for offices and retail across greater Portland.",
  },
};

const differentiators = [
  {
    title: "One crew, not a rotation",
    body: "The same named crew lead works your building for the life of the contract. They learn which floors take a beating on a Thursday and plan around it — which is why quality holds in month twelve instead of month two.",
    proof: "94% client retention, three-year average",
  },
  {
    title: "A scope you can audit",
    body: "Every room has a written task list and a frequency, priced line by line. Crews close out each visit against a digital checklist with timestamped photos, so a quality conversation starts from a record.",
    proof: "Monthly written scorecard on every contract",
  },
  {
    title: "Cleaning and repairs, one vendor",
    body: "The flickering ballast and the dripping faucet get handled on the visit we are already making. One contract, one invoice, one person accountable — instead of three vendors pointing at each other.",
    proof: "Four-hour response on escalations",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="shell pt-14 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">
              {site.address.city}, {site.address.region} · Since {site.founded}
            </p>

            <h1 className="mt-6 text-display">The building is ready before you are.</h1>

            <p className="mt-7 max-w-xl text-lede text-ink-500">
              Meridian runs commercial cleaning and facility maintenance for
              offices and retail across greater Portland — with a dedicated
              crew, a written scope you can audit, and a manager whose name you
              actually know.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/quote" size="lg">
                Get an estimate in 60 seconds
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/services" variant="outline" size="lg">
                Explore our services
              </ButtonLink>
            </div>

            <p className="mt-9 text-sm text-ink-500">
              Fully insured and bonded · Background-checked crews · Green Seal
              certified chemistry
            </p>
          </div>

          {/* Image column. On large screens it breaks the shell gutter to the
              right, which keeps the composition asymmetric rather than a tidy
              50/50 split. */}
          <div className="relative lg:col-span-6 lg:col-start-7">
            <div className="relative overflow-hidden rounded-3xl bg-ink-900 lg:-mr-12 xl:-mr-20">
              <Artwork
                src="/img/hero-floorplan.svg"
                alt="Floorplan of an office building with cleaning zones marked and an overnight service route threaded through the corridors"
                width={1200}
                height={900}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-auto w-full"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:absolute sm:-bottom-8 sm:left-6 sm:mt-0 sm:w-[19rem] sm:grid-cols-1 sm:gap-0 sm:rounded-2xl sm:border sm:border-ink-900/10 sm:bg-paper-50 sm:p-6 sm:shadow-[0_18px_48px_-24px_rgba(16,30,51,0.45)]">
              <div className="rounded-xl border border-ink-900/10 bg-paper-50 p-4 sm:rounded-none sm:border-0 sm:p-0">
                <p className="font-display text-3xl leading-none">310+</p>
                <p className="mt-1.5 text-sm text-ink-500">
                  Sites serviced every week
                </p>
              </div>
              <div className="rounded-xl border border-ink-900/10 bg-paper-50 p-4 sm:mt-5 sm:rounded-none sm:border-0 sm:border-t sm:border-ink-900/10 sm:p-0 sm:pt-5">
                <p className="font-display text-3xl leading-none">4hr</p>
                <p className="mt-1.5 text-sm text-ink-500">
                  Response on escalations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientLogos />

      {/* ------------------------------------------------------------ services */}
      <section aria-labelledby="services-heading" className="shell py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="What we do"
              id="services-heading"
              title="Four services, one accountable contract"
              lede="Most clients start with nightly cleaning and add the rest as they consolidate vendors. Each service stands on its own — none of them require the others."
            />
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 font-medium text-accent-700 underline-offset-4 hover:underline"
            >
              See all services
              <ArrowRight />
            </Link>
          </div>

          <ol className="lg:col-span-7">
            {services.map((service, index) => (
              <Reveal as="li" key={service.slug} delay={index * 70}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-2 border-t border-ink-900/12 py-7 last:border-b sm:gap-x-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-sm text-accent-700 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-title transition-colors group-hover:text-accent-700">
                      {service.name}
                    </h3>
                    <p className="mt-2 max-w-lg text-[0.98rem] leading-relaxed text-ink-500">
                      {service.summary}
                    </p>
                  </div>

                  <ArrowRight className="mt-1.5 text-ink-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-700" />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* -------------------------------------------------------------- why us */}
      <section
        aria-labelledby="why-heading"
        className="on-dark bg-ink-900 text-ink-300"
      >
        <div className="shell py-24 lg:py-32">
          <SectionHeading
            eyebrow="Why Meridian"
            id="why-heading"
            title={
              <span className="text-paper-100">
                Most janitorial contracts fail the same way
              </span>
            }
            lede="The first month is immaculate. Then the crew rotates, the scope drifts, and you become the one pointing out the same missed detail. We built the business around stopping that."
          />

          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
            {differentiators.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div className="border-t border-paper-100/20 pt-7">
                  <span
                    aria-hidden="true"
                    className="font-display text-sm text-accent-300 tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-title text-paper-100">{item.title}</h3>
                  <p className="mt-4 leading-relaxed">{item.body}</p>
                  <p className="mt-6 text-sm font-medium text-accent-300">
                    {item.proof}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <dl className="mt-20 grid grid-cols-2 gap-8 border-t border-paper-100/20 pt-12 lg:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-4xl leading-none text-paper-100 lg:text-5xl">
                    {stat.value}
                  </span>
                  <span className="mt-3 block text-sm text-ink-300">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Testimonials />

      {/* ------------------------------------------------------------ final CTA */}
      <section aria-labelledby="cta-heading" className="shell pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-7 py-16 sm:px-12 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <h2 id="cta-heading" className="text-headline text-paper-100">
              Find out what your building should cost.
            </h2>
            <p className="mt-6 text-lede text-ink-300">
              Answer three questions and get a realistic monthly range in under
              a minute — no sales call required to see the number.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/quote" variant="onDark" size="lg">
                Build my estimate
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outlineOnDark" size="lg">
                Talk to a person
              </ButtonLink>
            </div>
            <p className="mt-8 text-sm text-ink-300">
              Prefer the phone?{" "}
              <a
                className="font-medium text-paper-100 underline underline-offset-4"
                href={`tel:${site.phone}`}
              >
                {site.phoneDisplay}
              </a>{" "}
              · {site.hours.office}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
