"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { buttonClass } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to the control that opened the panel, so the keyboard user
    // resumes where they left off rather than at the top of the document.
    toggleRef.current?.focus();
  }, []);

  // Close the mobile panel whenever the route changes, otherwise it stays
  // open over the new page after a navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // While the panel covers the viewport: lock background scrolling, close on
  // Escape, and keep Tab inside the panel. Without the trap, tabbing walks into
  // page content sitting behind an opaque overlay — visible to the focus ring,
  // invisible to the user.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [],
      );

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
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
          ref={toggleRef}
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

      </header>

      {/* Rendered as a sibling of <header>, not inside it. The header's
          backdrop-blur establishes a containing block for fixed-position
          descendants, which would pin this panel to the header's own 72px box
          instead of the viewport. */}
      {open ? (
        <nav
          ref={panelRef}
          id="mobile-nav"
          aria-label="Primary mobile"
          className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto border-t border-ink-900/8 bg-paper-100 px-6 pt-8 pb-12 md:hidden"
        >
          <div className="flex flex-col">
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
          </div>
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
        </nav>
      ) : null}
    </>
  );
}
