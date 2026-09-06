import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ButtonLink } from "@/components/ui";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-6 max-w-2xl text-display">
        That page has been cleaned away.
      </h1>
      <p className="mt-6 max-w-xl text-lede text-ink-500">
        The link you followed doesn&apos;t lead anywhere. Here is everything
        that does.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to the home page
          <ArrowRight />
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline" size="lg">
          Contact us
        </ButtonLink>
      </div>

      <nav aria-label="Services" className="mt-16 border-t border-ink-900/12 pt-8">
        <h2 className="text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
          Services
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="text-ink-800 underline-offset-4 hover:text-accent-700 hover:underline"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="mt-10 text-ink-500">
        Or call us on{" "}
        <a
          className="font-medium text-accent-700 underline underline-offset-4"
          href={`tel:${site.phone}`}
        >
          {site.phoneDisplay}
        </a>
        .
      </p>
    </section>
  );
}
