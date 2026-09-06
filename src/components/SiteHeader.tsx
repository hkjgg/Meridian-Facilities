"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { buttonClass } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel whenever the route changes, otherwise it stays
  // open over the new page after a navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scrolling while the panel covers the viewport.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/8 bg-paper-100/85 backdrop-blur-md">
      <div className="shell flex h-18 items-center justify-between gap-6 py-4">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative text-[0.95rem] transition-colors hover:text-ink-900 ${
                isActive(item.href) ? "text-ink-900" : "text-ink-500"
              }`}
            >
              {item.label}
              {isActive(item.href) ? (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-0 h-px w-full bg-accent-500"
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href={`tel:${site.phone}`}
            className="text-[0.95rem] text-ink-500 transition-colors hover:text-ink-900"
          >
            {site.phoneDisplay}
          </a>
          <Link href="/quote" className={buttonClass("primary", "md")}>
            Get a quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-900 md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3.5 8h17M3.5 16h17"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-ink-900/8 bg-paper-100 px-6 pt-8 pb-12 md:hidden"
        >
          <nav aria-label="Primary mobile" className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="border-b border-ink-900/8 py-5 font-display text-title"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/quote"
            className={`${buttonClass("primary", "lg")} mt-8 w-full`}
          >
            Get a quote
          </Link>
          <a
            href={`tel:${site.phone}`}
            className="mt-6 block text-center text-ink-500"
          >
            {site.phoneDisplay}
          </a>
        </div>
      ) : null}
    </header>
  );
}
