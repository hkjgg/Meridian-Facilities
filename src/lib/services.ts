export type Service = {
  slug: string;
  name: string;
  /** Short label used in navigation and the quote calculator. */
  shortName: string;
  tagline: string;
  /** One-sentence summary used on the services index and in metadata. */
  summary: string;
  intro: string[];
  /** What the client actually receives, written as concrete deliverables. */
  includes: { title: string; body: string }[];
  process: { step: string; body: string }[];
  bestFor: string[];
  faqs: { q: string; a: string }[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    shortName: "Commercial cleaning",
    tagline: "Nightly janitorial that holds up on a Monday morning",
    summary:
      "Recurring janitorial for offices and retail floors, run by a consistent crew against a written scope you can audit.",
    intro: [
      "Most janitorial contracts fail the same way: the first month is immaculate, then the crew rotates, the scope drifts, and by quarter three you are the one pointing out the same missed detail. We built our recurring service specifically to stop that drift.",
      "Every site gets a named crew lead who works your building — not a rotating pool. The scope of work is written line by line, priced line by line, and photographed against a checklist each visit, so a conversation about quality starts with a record rather than an argument.",
    ],
    includes: [
      {
        title: "Written, room-by-room scope",
        body: "Every space in your floorplan is assigned a task list and a frequency. Nothing is implied and nothing is billed that isn't listed.",
      },
      {
        title: "Consistent named crew",
        body: "The same crew lead works your site for the life of the contract. Substitutes are trained on your building before their first shift, never after.",
      },
      {
        title: "Photographed completion log",
        body: "Crews close out each visit against a digital checklist with timestamped photos of the high-traffic areas you care most about.",
      },
      {
        title: "Consumables managed for you",
        body: "Restroom paper, soap and liners are tracked and restocked on our count, not yours. You stop running emergency supply orders.",
      },
      {
        title: "Monthly quality audit",
        body: "Your account manager walks the site monthly, scores it against the scope, and sends you the report whether or not anything is wrong.",
      },
      {
        title: "Green Seal certified chemistry",
        body: "Standard on every contract at no premium, with SDS documentation filed for your facilities binder.",
      },
    ],
    process: [
      {
        step: "Walkthrough",
        body: "We walk the building with you, measure the cleanable square footage, and note traffic patterns, surfaces and access constraints.",
      },
      {
        step: "Scope and pricing",
        body: "You get a line-item scope with frequencies and a fixed monthly price. No square-footage estimates pulled from a lease document.",
      },
      {
        step: "Crew onboarding",
        body: "Your crew is trained on site before the first billable shift — access, alarms, sensitive areas and your escalation contacts.",
      },
      {
        step: "Ongoing audit",
        body: "Monthly walkthroughs and a quarterly scope review, because buildings change and a stale scope is how service quality slips.",
      },
    ],
    bestFor: [
      "Single and multi-tenant office buildings",
      "Retail floors with public-facing standards",
      "Companies consolidating several vendors under one contract",
      "Facilities teams that need documentation for audits",
    ],
    faqs: [
      {
        q: "Can crews work outside business hours?",
        a: "Yes. Roughly two thirds of our contracts run overnight or after close. Access, alarm codes and any escort requirements are agreed during onboarding and documented in the site file.",
      },
      {
        q: "What happens if we're not satisfied with a visit?",
        a: "Flag it through your account manager and we re-clean the area within one business day at no charge. Recurring issues trigger a scope review rather than a credit, because a credit doesn't fix the underlying cause.",
      },
      {
        q: "Are your staff insured and background checked?",
        a: "Every employee is background checked before their first shift and covered under our general liability and workers' compensation policies. Certificates of insurance naming your entity are issued on request.",
      },
    ],
    image: "/img/service-commercial-cleaning.svg",
    imageAlt:
      "Illustration of an open-plan office floorplan divided into cleaning zones with a nightly service route marked across it",
  },
  {
    slug: "floor-and-carpet-care",
    name: "Floor & Carpet Care",
    shortName: "Floor & carpet care",
    tagline: "Restoration and upkeep for the surface everyone walks on",
    summary:
      "Deep extraction, hard-surface refinishing and scheduled maintenance that extends the life of flooring you already own.",
    intro: [
      "Flooring is usually the second largest capital item in a commercial space and the first to look tired. Replacing carpet a year early is an avoidable five-figure decision; most of the time the tile, VCT or broadloom underneath is entirely recoverable.",
      "We run restoration first, then hold the result with a maintenance interval matched to actual foot traffic. The point is to get more years out of the floor you have, not to sell you a quarterly service you don't need.",
    ],
    includes: [
      {
        title: "Hot water extraction",
        body: "Truck-mounted extraction for broadloom and carpet tile, with pre-treatment on traffic lanes and protective treatment on request.",
      },
      {
        title: "Hard surface refinishing",
        body: "Strip, seal and finish for VCT; grout restoration for tile; polishing and densification for concrete.",
      },
      {
        title: "Traffic-based intervals",
        body: "We set the schedule from measured entry counts and wear patterns, not from a default quarterly template.",
      },
      {
        title: "Entryway matting programme",
        body: "The cheapest floor care there is: the right matting at the right doors stops most soil before it reaches your finish.",
      },
      {
        title: "Overnight and weekend turnarounds",
        body: "Areas are sectioned so your floor is dry and back in service before staff or customers arrive.",
      },
      {
        title: "Condition reporting",
        body: "Before-and-after documentation you can put in front of a landlord at lease end or a finance team at budget time.",
      },
    ],
    process: [
      {
        step: "Floor survey",
        body: "We identify substrate, existing finish and damage, then tell you honestly what is recoverable and what is not.",
      },
      {
        step: "Restoration",
        body: "A single intensive service brings the floor back to the best condition its material allows.",
      },
      {
        step: "Maintenance plan",
        body: "An interval set to your traffic, quoted annually so it lands in your operating budget rather than as a surprise.",
      },
      {
        step: "Annual review",
        body: "We re-survey each year and adjust the interval, up or down, based on how the floor is actually wearing.",
      },
    ],
    bestFor: [
      "Retail floors with heavy daily footfall",
      "Offices preparing for a lease handover or inspection",
      "Buildings weighing replacement against restoration",
      "Lobbies and entrances that set a first impression",
    ],
    faqs: [
      {
        q: "How long does carpet take to dry?",
        a: "Four to six hours with our extraction equipment and air movers. Overnight scheduling means the space is dry and open for normal use the next morning.",
      },
      {
        q: "Can you save carpet that already looks worn out?",
        a: "Often, yes — most 'worn' commercial carpet is soiled rather than damaged. We'll tell you at the survey if a floor is genuinely past restoration; talking you into a service that won't work costs us the contract.",
      },
      {
        q: "Do you handle flooring in occupied spaces?",
        a: "Yes. We section the work so only part of a floor is out of service at a time, and schedule around your business hours.",
      },
    ],
    image: "/img/service-floor-care.svg",
    imageAlt:
      "Illustration comparing a dulled floor surface with a restored, reflective finish across a tiled grid",
  },
  {
    slug: "facility-maintenance",
    name: "Facility Maintenance",
    shortName: "Facility maintenance",
    tagline: "The small repairs that become big ones if nobody owns them",
    summary:
      "Scheduled preventive maintenance and on-call repairs, so building issues get closed out instead of accumulating on a list.",
    intro: [
      "Every facilities manager has the list: the flickering ballast, the door closer that slams, the restroom faucet that drips. Individually none of it justifies a call-out. Collectively it is what makes a building feel neglected — and eventually it is what makes something fail.",
      "We fold that work into the visits we're already making. One vendor, one invoice, and a standing scope of preventive tasks that keeps the list from ever getting long.",
    ],
    includes: [
      {
        title: "Preventive task calendar",
        body: "Filter changes, belt checks, drain treatments and fixture inspections on a fixed schedule with completion records.",
      },
      {
        title: "Lighting programme",
        body: "Group relamping and ballast replacement, including LED retrofits where the payback period justifies it.",
      },
      {
        title: "Minor plumbing and fixtures",
        body: "Faucets, flush valves, traps and supply lines — the failures that cause water damage when left alone.",
      },
      {
        title: "Doors, hardware and safety",
        body: "Closers, locksets, panic hardware and exit signage checked against the requirements that govern your occupancy.",
      },
      {
        title: "On-call escalation",
        body: "A four-hour response window for anything affecting safety, security or the ability to open your doors.",
      },
      {
        title: "Asset history",
        body: "Every repair is logged against the asset, so you can see whether a unit is worth maintaining or replacing.",
      },
    ],
    process: [
      {
        step: "Building assessment",
        body: "We inventory the assets we'll be responsible for and record their age, condition and service history.",
      },
      {
        step: "Preventive schedule",
        body: "Recurring tasks are placed on a calendar and folded into the cleaning visits already scheduled at your site.",
      },
      {
        step: "Request handling",
        body: "Your team submits issues one way, to one place, and each request gets an owner and a closing date.",
      },
      {
        step: "Capital planning input",
        body: "An annual summary of what we repaired and what is nearing end of life, in time for your budget cycle.",
      },
    ],
    bestFor: [
      "Facilities teams stretched across multiple sites",
      "Businesses without in-house maintenance staff",
      "Companies consolidating handyman and janitorial vendors",
      "Landlords managing small multi-tenant portfolios",
    ],
    faqs: [
      {
        q: "Is maintenance billed separately from cleaning?",
        a: "Preventive tasks are included in your monthly rate. Repairs beyond that scope are billed at an agreed hourly rate plus materials, always quoted before work begins.",
      },
      {
        q: "What isn't covered?",
        a: "Licensed electrical, mechanical and plumbing work beyond fixture level. We hold those relationships and coordinate the trades, but we don't pretend to hold licenses we don't have.",
      },
      {
        q: "How do we submit a request?",
        a: "Email or call your account manager. Each request is logged with an owner and a target date, and you see the status in your monthly report.",
      },
    ],
    image: "/img/service-maintenance.svg",
    imageAlt:
      "Illustration of a building cross-section with maintenance checkpoints marked on lighting, plumbing and door hardware",
  },
  {
    slug: "disinfection-and-restroom-care",
    name: "Disinfection & Restroom Care",
    shortName: "Disinfection & restroom care",
    tagline: "The two square metres your reputation is judged on",
    summary:
      "Touchpoint disinfection and a restroom standard that holds through the afternoon, not just after the morning clean.",
    intro: [
      "Customers and candidates form a judgement about your business in your restroom, and staff form one about how much you value them. It is the single highest-leverage area in any commercial building, and the one most often serviced once a day and forgotten.",
      "We treat it as its own discipline: correct dwell times on EPA-registered disinfectants, a fixture-level checklist, and — where traffic warrants — a midday reset so the space holds its standard through peak hours.",
    ],
    includes: [
      {
        title: "EPA-registered disinfectants",
        body: "Products selected for the pathogens that matter in your setting and applied with the contact time the label actually requires.",
      },
      {
        title: "Touchpoint rotation",
        body: "Handles, switches, rails, lift buttons, shared kitchen surfaces and desk edges on a documented daily rotation.",
      },
      {
        title: "Midday restroom resets",
        body: "A scheduled mid-shift check for high-traffic sites: restock, spot clean, reset. Available as an add-on to any contract.",
      },
      {
        title: "Fixture-level checklist",
        body: "Every fixture is signed off individually, so 'the restroom was cleaned' becomes a record rather than an assertion.",
      },
      {
        title: "Odour control at source",
        body: "Drain and trap treatment rather than masking fragrance, which fixes the cause instead of covering it for an hour.",
      },
      {
        title: "Outbreak response",
        body: "Escalated disinfection on 24-hour notice when illness moves through your workforce.",
      },
    ],
    process: [
      {
        step: "Risk mapping",
        body: "We identify the touchpoints and fixtures in your building that carry the most traffic and the most risk.",
      },
      {
        step: "Protocol selection",
        body: "Products and dwell times are matched to your surfaces and occupancy, then documented with SDS sheets for your records.",
      },
      {
        step: "Daily execution",
        body: "Crews work the checklist and record completion by fixture, not by room.",
      },
      {
        step: "Verification",
        body: "Spot ATP testing on request gives you a measured result rather than a visual impression.",
      },
    ],
    bestFor: [
      "Customer-facing retail and showroom spaces",
      "Offices returning to higher in-person attendance",
      "Shared amenity floors and coworking suites",
      "Any site where restrooms are a recurring complaint",
    ],
    faqs: [
      {
        q: "Which disinfectants do you use?",
        a: "EPA-registered products appropriate to the surface, most commonly quaternary ammonium and hydrogen peroxide formulations. SDS documentation for everything used in your building is supplied for your facilities binder.",
      },
      {
        q: "Can you respond to an outbreak on short notice?",
        a: "Yes. Escalated disinfection is typically scheduled within 24 hours of your call, and sooner for existing contract clients.",
      },
      {
        q: "Is a midday reset worth the cost?",
        a: "It depends on traffic. Above roughly 80 occupants per restroom bank, a midday reset is usually the difference between a restroom that holds its standard and one that doesn't. We'll tell you if your site is below that line.",
      },
    ],
    image: "/img/service-disinfection.svg",
    imageAlt:
      "Illustration of restroom fixtures with touchpoint markers indicating a documented disinfection rotation",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
