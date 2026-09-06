import type { Metadata } from "next";
import { Artwork } from "@/components/Artwork";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, ButtonLink, SectionHeading } from "@/components/ui";
import { breadcrumbSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meridian Facilities has cleaned and maintained Portland commercial buildings since 2009. Our story, our team and the credentials behind every contract.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: `${site.url}/about`,
    title: `About | ${site.name}`,
    description:
      "How a two-van janitorial operation became a 140-person facility services company — and what has stayed the same since 2009.",
  },
};

const milestones = [
  {
    year: "2009",
    title: "Two vans and eleven buildings",
    body: "Ray Ferreira left a national janitorial franchise after watching it lose a client he had personally serviced for six years. He started Meridian with one rule: the crew that wins the building keeps the building.",
  },
  {
    year: "2014",
    title: "The scorecard",
    body: "A client asked for proof rather than reassurance. We built the audit scorecard for them, then rolled it out to every contract — including the ones that had not asked.",
  },
  {
    year: "2019",
    title: "Maintenance joins the contract",
    body: "Clients kept asking us to handle the flickering light while we were there anyway. We hired our first maintenance techs and stopped saying no.",
  },
  {
    year: "Today",
    title: "310 sites, same rule",
    body: "140 employees across greater Portland and southwest Washington. Every contract still has a named crew lead and a monthly walkthrough.",
  },
];

const team = [
  {
    name: "Ray Ferreira",
    role: "Founder & Managing Director",
    bio: "Twenty-six years in facility services, seventeen of them running Meridian. Still walks four or five client sites a month.",
  },
  {
    name: "Alena Kovacs",
    role: "Director of Operations",
    bio: "Owns crew scheduling, training and the audit programme. Built the scorecard that clients now ask for by name.",
  },
  {
    name: "Desmond Achebe",
    role: "Head of Client Accounts",
    bio: "The person behind the account managers. If an escalation reaches him, something upstream needs fixing.",
  },
  {
    name: "Bianca Restrepo",
    role: "Safety & Compliance Manager",
    bio: "Runs OSHA training, chemical handling certification and the documentation clients need for their own audits.",
  },
  {
    name: "Tomas Lindqvist",
    role: "Floor Care Specialist",
    bio: "Thirty years of hard-surface and carpet restoration. Has talked more clients out of replacing flooring than into it.",
  },
];

const credentials = [
  {
    title: "CIMS certified",
    body: "Cleaning Industry Management Standard, assessed by ISSA — the industry benchmark for management systems.",
  },
  {
    title: "Green Seal chemistry",
    body: "Certified products standard on every contract, with SDS documentation supplied for your facilities binder.",
  },
  {
    title: "OSHA 10 across all crews",
    body: "Every field employee completes OSHA 10 within 60 days of hire, plus annual bloodborne pathogen training.",
  },
  {
    title: "Fully insured and bonded",
    body: "General liability, workers' compensation and janitorial bond. Certificates naming your entity on request.",
  },
  {
    title: "Background checked",
    body: "Every employee is screened before their first shift. No exceptions for temporary or substitute staff.",
  },
  {
    title: "E-Verify participant",
    body: "Employment eligibility confirmed for every hire, documented and available for client review.",
  },
];

/** Two-letter monogram used in place of a portrait. */
function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      {/* ---------------------------------------------------------------- hero */}
      <section className="shell pt-14 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={`${site.address.city} · Since ${site.founded}`}
              as="h1"
              title="We are the vendor we could never find"
              lede="Meridian was started by someone who spent years watching good janitorial contracts quietly decay. Everything about how we operate is a reaction to that."
            />
          </div>
          <dl className="grid grid-cols-2 gap-8 lg:col-span-5">
            {site.stats.slice(0, 4).map((stat) => (
              <div key={stat.label} className="border-t border-ink-900/15 pt-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl leading-none">
                    {stat.value}
                  </span>
                  <span className="mt-2.5 block text-sm text-ink-500">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Reveal className="mt-14 overflow-hidden rounded-3xl bg-ink-900 lg:mt-16">
          <Artwork
            src="/img/about-nightshift.svg"
            alt="Illustration of a city block at night with lit windows across five commercial buildings, marking the overnight service shift"
            width={1000}
            height={750}
            loading="eager"
            sizes="(min-width: 1024px) 72rem, 100vw"
            className="h-auto w-full"
          />
        </Reveal>
      </section>

      {/* --------------------------------------------------------------- story */}
      <section
        aria-labelledby="story-heading"
        className="border-t border-ink-900/10"
      >
        <div className="shell grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Our story"
              id="story-heading"
              title="A contract is a promise about month twelve"
            />
            <div className="mt-8 max-w-2xl space-y-6 text-lede text-ink-500">
              <p>
                Ray Ferreira spent nine years at a national janitorial franchise.
                He was good at it — good enough that clients asked for him by
                name. What he could not fix was the model: win the account on a
                pristine first month, then let the crew rotate, the scope drift
                and the margin recover itself out of the client&apos;s standards.
              </p>
              <p>
                He lost a building he had personally cleaned for six years
                because of it. Not to a competitor — to the slow erosion of a
                service nobody was accountable for. He left three months later
                with two vans and eleven buildings.
              </p>
              <p>
                Sixteen years on, the company is a hundred and forty people, but
                the structural decisions are the same ones made in 2009. Crews
                are assigned to buildings, not to routes. Scopes are written
                room by room and reviewed quarterly. Every client gets a monthly
                walkthrough report whether or not anything is wrong — because
                the month nothing is wrong is exactly when standards start to
                slip.
              </p>
              <p className="text-ink-800">
                We are not the cheapest bid you will get. We are the one you
                stop thinking about.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-ink-900/10">
              <Artwork
                src="/img/about-scope.svg"
                alt="Illustration of a written scope of work document with tasks checked off room by room and an audit sign-off seal"
                width={800}
                height={1000}
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="h-auto w-full"
              />
            </div>
            <p className="mt-4 text-sm text-ink-500">
              Every contract starts as a room-by-room scope of work. It is the
              document both sides are held to.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- milestones */}
      <section
        aria-labelledby="milestones-heading"
        className="on-dark bg-ink-900 text-ink-300"
      >
        <div className="shell py-20 lg:py-28">
          <SectionHeading
            eyebrow="How we got here"
            id="milestones-heading"
            title={<span className="text-paper-100">Sixteen years, four turning points</span>}
          />
          <ol className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {milestones.map((milestone, index) => (
              <Reveal as="li" key={milestone.year} delay={index * 80}>
                <div className="border-t border-paper-100/20 pt-6">
                  <p className="font-display text-2xl text-accent-300 tabular-nums">
                    {milestone.year}
                  </p>
                  <h3 className="mt-4 text-title text-paper-100">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 leading-relaxed">{milestone.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------- team */}
      <section aria-labelledby="team-heading" className="shell py-20 lg:py-28">
        <SectionHeading
          eyebrow="Who you'll deal with"
          id="team-heading"
          title="The people accountable for your building"
          lede="Not a stock photo of a boardroom. These are the five people whose decisions affect what happens on your floor."
        />

        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person, index) => (
            <Reveal as="li" key={person.name} delay={(index % 3) * 80}>
              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-ink-900 font-display text-lg text-paper-100"
                >
                  {initials(person.name)}
                </span>
                <div>
                  <h3 className="text-title">{person.name}</h3>
                  <p className="mt-1 text-sm font-medium tracking-wide text-accent-700">
                    {person.role}
                  </p>
                  <p className="mt-3 leading-relaxed text-ink-500">
                    {person.bio}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------- credentials */}
      <section
        aria-labelledby="credentials-heading"
        className="border-t border-ink-900/10"
      >
        <div className="shell py-20 lg:py-28">
          <SectionHeading
            eyebrow="Credentials"
            id="credentials-heading"
            title="Documentation your compliance team can file"
            lede="Everything below is verifiable, and every certificate is available on request rather than on a sales call."
          />

          <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((credential, index) => (
              <Reveal as="li" key={credential.title} delay={(index % 3) * 70}>
                <div className="border-t border-ink-900/15 pt-6">
                  <div className="flex items-start gap-3">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-0.5 h-5 w-5 flex-none text-accent-500"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 2.5l6 2.5v4.6c0 3.5-2.4 6.6-6 7.9-3.6-1.3-6-4.4-6-7.9V5z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.2 10l2 2 3.6-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 className="text-title">{credential.title}</h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-500">
                    {credential.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------------- CTA */}
      <section aria-labelledby="about-cta" className="shell pb-24 lg:pb-32">
        <div className="rounded-3xl bg-ink-950 px-7 py-14 sm:px-12 lg:px-16 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 id="about-cta" className="text-headline text-paper-100">
                Come and see how we work.
              </h2>
              <p className="mt-5 text-lede text-ink-300">
                A walkthrough takes about forty minutes and you get a written
                scope whether or not you hire us.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-none">
              <ButtonLink href="/contact" variant="onDark" size="lg">
                Book a walkthrough
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href="/quote" variant="outlineOnDark" size="lg">
                Get an estimate
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
