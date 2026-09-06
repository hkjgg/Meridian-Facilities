import Link from "next/link";

/**
 * The mark is a meridian line crossing a sphere — a globe's meridian, matching
 * the name. Drawn inline rather than imported as an image so it inherits
 * `currentColor` and works on both the navy and warm-white surfaces.
 */
export function Wordmark({
  className = "",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Meridian Facilities — home"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7 flex-none"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.75" />
        <ellipse
          cx="16"
          cy="16"
          rx="5.6"
          ry="13"
          stroke="currentColor"
          strokeWidth="1.75"
          opacity="0.55"
        />
        <path
          d="M3 16h26"
          stroke="var(--color-accent-500)"
          strokeWidth="2.25"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-[1.2rem] leading-none font-medium tracking-tight">
        Meridian
        <span className="text-ink-500 [.on-dark_&]:text-ink-300"> Facilities</span>
      </span>
    </Link>
  );
}
