import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const sizes = {
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
} as const;

const variants = {
  primary: "bg-accent-500 text-white hover:bg-accent-700",
  onDark:
    "bg-paper-100 text-ink-900 hover:bg-white",
  outline:
    "border border-ink-900/20 text-ink-900 hover:border-ink-900/50 hover:bg-ink-900/5",
  outlineOnDark:
    "border border-paper-100/30 text-paper-100 hover:border-paper-100/70 hover:bg-paper-100/10",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return `${base} ${sizes[size]} ${variants[variant]}`;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={`${buttonClass(variant, size)} ${className}`} {...props} />;
}

/** Arrow used on call-to-action links. Decorative, so hidden from screen readers. */
export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Section opener: eyebrow label plus heading, used across every page. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  id,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag id={id} className={`text-headline ${eyebrow ? "mt-5" : ""}`}>
        {title}
      </Tag>
      {lede ? (
        <p className="mt-5 text-lede text-ink-500 [.on-dark_&]:text-ink-300">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
