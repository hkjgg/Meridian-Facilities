import { Reveal } from "./Reveal";

/**
 * Placeholder client marks.
 *
 * These are fictional businesses drawn in-house so the strip has real
 * typographic variety rather than six names set in the same face. Each is an
 * inline SVG mark paired with a wordmark, and each is straightforward to swap
 * for a real client logo file.
 */
const clients = [
  {
    name: "Northgate Retail Group",
    short: "Northgate",
    mark: (
      <>
        <path d="M4 20V6l9 9V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="19" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      </>
    ),
    className: "font-display text-[1.12rem] tracking-tight",
  },
  {
    name: "Kestrel & Wren LLP",
    short: "Kestrel & Wren",
    mark: (
      <>
        <path d="M12 4l7 7-7 11-7-11z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M5 11h14" stroke="currentColor" strokeWidth="1.7" />
      </>
    ),
    className: "font-display text-[1.02rem] tracking-[0.02em]",
  },
  {
    name: "Ashby Logistics",
    short: "ASHBY",
    mark: (
      <>
        <rect x="4" y="8" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 12h16M12 8v11" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
    className: "text-[0.95rem] font-semibold tracking-[0.24em]",
  },
  {
    name: "Vale Orthodontics",
    short: "Vale",
    mark: (
      <>
        <path d="M6 5c0 8 2.5 14 6 14s6-6 6-14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 5v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </>
    ),
    className: "font-display text-[1.2rem] tracking-[-0.01em]",
  },
  {
    name: "Foundry Twelve Workspaces",
    short: "Foundry 12",
    mark: (
      <>
        <rect x="4.5" y="4.5" width="6.5" height="6.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="13" y="13" width="6.5" height="6.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M11 7.75h8.5M4.5 16.25H13" stroke="currentColor" strokeWidth="1.7" />
      </>
    ),
    className: "text-[0.98rem] font-medium tracking-[0.06em] uppercase",
  },
  {
    name: "Palmer & Cole Interiors",
    short: "Palmer & Cole",
    mark: (
      <>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 4v16" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 12h8" stroke="currentColor" strokeWidth="1.7" />
      </>
    ),
    className: "text-[0.95rem] font-normal tracking-[0.1em]",
  },
];

export function ClientLogos() {
  return (
    <section aria-labelledby="clients-heading" className="border-y border-ink-900/8">
      <div className="shell py-12 lg:py-16">
        <h2
          id="clients-heading"
          className="font-sans text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase"
        >
          Trusted across {" "}
          <span className="text-accent-700">310+ sites</span> in greater Portland
        </h2>

        <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client, index) => (
            <Reveal as="li" key={client.name} delay={index * 60}>
              <div
                className="flex items-center gap-2.5 text-ink-900/55 transition-colors duration-300 hover:text-ink-900"
                title={client.name}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 flex-none"
                  fill="none"
                  aria-hidden="true"
                >
                  {client.mark}
                </svg>
                {/* The short mark is decorative typography; assistive tech
                    gets the full legal name instead of both. */}
                <span
                  aria-hidden="true"
                  className={`leading-tight ${client.className}`}
                >
                  {client.short}
                </span>
                <span className="sr-only">{client.name}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
