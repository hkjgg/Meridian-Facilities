import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Talk to Meridian Facilities about commercial cleaning or facility maintenance in greater Portland. Call (503) 555-0188 or send us a message — we reply within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: `${site.url}/contact`,
    title: `Contact | ${site.name}`,
    description:
      "Book a walkthrough or ask a question. We reply to every enquiry within one business day.",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="shell pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact"
              as="h1"
              title="Tell us about your building"
              lede="Most conversations start with a forty-minute walkthrough. You get a written, room-by-room scope out of it whether or not you hire us."
            />

            <dl className="mt-12 space-y-8">
              <div className="border-t border-ink-900/15 pt-6">
                <dt className="text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
                  Call
                </dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${site.phone}`}
                    className="font-display text-title underline-offset-4 hover:underline"
                  >
                    {site.phoneDisplay}
                  </a>
                  <p className="mt-2 text-ink-500">{site.hours.office}</p>
                </dd>
              </div>

              <div className="border-t border-ink-900/15 pt-6">
                <dt className="text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
                  Email
                </dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-display text-title break-words underline-offset-4 hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>

              <div className="border-t border-ink-900/15 pt-6">
                <dt className="text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
                  Office
                </dt>
                <dd className="mt-3">
                  <address className="text-ink-800 not-italic">
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.region}{" "}
                    {site.address.postalCode}
                  </address>
                  <p className="mt-3 text-ink-500">
                    Serving {site.serviceArea.slice(0, -1).join(", ")} and{" "}
                    {site.serviceArea.at(-1)}.
                  </p>
                </dd>
              </div>

              <div className="border-t border-ink-900/15 pt-6">
                <dt className="text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
                  Already have numbers?
                </dt>
                <dd className="mt-3 text-ink-500">
                  <Link
                    href="/quote"
                    className="font-medium text-accent-700 underline underline-offset-4"
                  >
                    Use the estimator
                  </Link>{" "}
                  to see a monthly range in under a minute.
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <h2 className="sr-only">Contact form</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
