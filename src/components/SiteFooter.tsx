import Link from "next/link";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink-950 text-ink-300">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark className="text-paper-100" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">
              {site.description}
            </p>
            <address className="mt-8 space-y-1 text-[0.95rem] not-italic">
              <p>{site.address.street}</p>
              <p>
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </p>
              <p className="pt-3">
                <a
                  className="transition-colors hover:text-paper-100"
                  href={`tel:${site.phone}`}
                >
                  {site.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  className="transition-colors hover:text-paper-100"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label="Services" className="md:col-span-4">
            <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-paper-300 uppercase">
              Services
            </h2>
            <ul className="mt-6 space-y-3.5 text-[0.95rem]">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-paper-100"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-3">
            <h2 className="font-sans text-xs font-semibold tracking-[0.16em] text-paper-300 uppercase">
              Company
            </h2>
            <ul className="mt-6 space-y-3.5 text-[0.95rem]">
              <li>
                <Link href="/about" className="transition-colors hover:text-paper-100">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-paper-100">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/quote" className="transition-colors hover:text-paper-100">
                  Get a quote
                </Link>
              </li>
            </ul>

            <h2 className="mt-10 font-sans text-xs font-semibold tracking-[0.16em] text-paper-300 uppercase">
              Hours
            </h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed">
              {site.hours.office}
              <br />
              <span className="text-ink-300/70">{site.hours.service}</span>
            </p>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper-100/10 pt-8 text-sm text-ink-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            Serving {site.serviceArea.slice(0, -1).join(", ")} and{" "}
            {site.serviceArea.at(-1)}.
          </p>
        </div>
      </div>
    </footer>
  );
}
