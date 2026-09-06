import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { SectionHeading } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get an estimate",
  description:
    "Answer three questions about your property and get an estimated monthly cost for commercial cleaning in under a minute. No sales call required to see the number.",
  alternates: { canonical: "/quote" },
  openGraph: {
    url: `${site.url}/quote`,
    title: `Get an estimate | ${site.name}`,
    description:
      "Property type, square footage, frequency — and a realistic monthly range in under a minute.",
  },
};

const reassurance = [
  {
    title: "No call required to see a number",
    body: "The estimate appears on screen. You decide afterwards whether to send it to us.",
  },
  {
    title: "Built from real contract pricing",
    body: "The model uses the same per-visit rates, frequency adjustments and volume breaks our coordinators work from.",
  },
  {
    title: "A range, not a promise",
    body: "Anyone quoting a firm price without seeing your building is guessing. The final figure comes from a walkthrough.",
  },
];

export default function QuotePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Get an estimate", path: "/quote" },
        ])}
      />

      <section className="shell pt-14 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Estimate"
              as="h1"
              title="What should your building cost?"
              lede="Three questions about the space, then your details if you want us to follow up. It takes about a minute."
            />

            <ul className="mt-12 space-y-8">
              {reassurance.map((item) => (
                <li key={item.title} className="border-t border-ink-900/15 pt-6">
                  <h2 className="text-title">{item.title}</h2>
                  <p className="mt-2.5 leading-relaxed text-ink-500">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-ink-500">
              Rather talk it through?{" "}
              <a
                className="font-medium text-accent-700 underline underline-offset-4"
                href={`tel:${site.phone}`}
              >
                {site.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="lg:col-span-7">
            <QuoteCalculator />
          </div>
        </div>
      </section>
    </>
  );
}
