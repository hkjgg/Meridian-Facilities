import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";

/** Placeholder testimonials from fictional clients, ready to be replaced. */
const testimonials = [
  {
    quote:
      "We'd been through three janitorial vendors in five years. The difference here is that the same crew lead has worked our building since day one — he knows which conference rooms get hammered on a Thursday and he plans around it. I stopped having to manage the vendor.",
    name: "Dana Whitfield",
    role: "Director of Workplace Operations",
    company: "Foundry Twelve Workspaces",
    detail: "42,000 sq ft · 5 nights a week",
  },
  {
    quote:
      "The monthly audit report is the part I didn't know I needed. When my regional manager asks why the Beaverton store looks better than the others, I forward the scorecard. It has made budget conversations considerably shorter.",
    name: "Marcus Oyelaran",
    role: "Regional Facilities Manager",
    company: "Northgate Retail Group",
    detail: "9 retail sites · daily service",
  },
  {
    quote:
      "They told us our lobby carpet had two good years left instead of quoting a replacement. That call cost them a sale and won them our maintenance contract for the whole portfolio.",
    name: "Priya Raghunathan",
    role: "Managing Partner",
    company: "Kestrel & Wren LLP",
    detail: "Two floors · 3 nights a week",
  },
];

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="shell py-24 lg:py-32">
      <SectionHeading
        eyebrow="In their words"
        title="Facilities managers stay with us for a reason"
        lede="Our average client relationship runs past six years. These are the things they tell us matter."
        as="h2"
        id="testimonials-heading"
      />

      <ul className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <Reveal
            as="li"
            key={testimonial.name}
            delay={index * 90}
            className="flex"
          >
            <figure className="flex flex-col justify-between rounded-2xl border border-ink-900/10 bg-paper-50 p-7 lg:p-8">
              <blockquote className="relative">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-accent-500/35"
                >
                  &ldquo;
                </span>
                <p className="mt-2 text-[1.02rem] leading-relaxed text-ink-800">
                  {testimonial.quote}
                </p>
              </blockquote>

              <figcaption className="mt-8 border-t border-ink-900/10 pt-6">
                <p className="font-medium text-ink-900">{testimonial.name}</p>
                <p className="mt-1 text-sm text-ink-500">
                  {testimonial.role}, {testimonial.company}
                </p>
                <p className="mt-3 text-xs tracking-[0.1em] text-accent-700 uppercase">
                  {testimonial.detail}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
