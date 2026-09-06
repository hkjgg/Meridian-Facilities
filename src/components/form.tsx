"use client";

import type { ReactNode } from "react";

const controlBase =
  "w-full rounded-xl border bg-paper-50 px-4 py-3 text-ink-900 placeholder:text-ink-500/60 transition-colors";

export function Field({
  id,
  label,
  error,
  hint,
  children,
  className = "",
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    className: string;
  }) => ReactNode;
  className?: string;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-ink-900">
        {label}
      </label>

      {hint ? (
        <p id={hintId} className="mt-1 text-sm text-ink-500">
          {hint}
        </p>
      ) : null}

      <div className="mt-2">
        {children({
          id,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
          className: `${controlBase} ${
            error
              ? "border-red-700 focus:border-red-700"
              : "border-ink-900/15 focus:border-accent-500"
          }`,
        })}
      </div>

      {error ? (
        <p id={errorId} className="mt-2 flex items-start gap-1.5 text-sm text-red-800">
          <svg
            viewBox="0 0 16 16"
            className="mt-0.5 h-4 w-4 flex-none"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 4.8v3.6M8 11.1h.01"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Hidden honeypot. It is off-screen rather than display:none because some bots
 * skip fields that are not rendered, and it is removed from the tab order and
 * the accessibility tree so no real user ever encounters it.
 */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Website (leave blank)</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

/** Live region for submission-level success and failure messages. */
export function FormStatus({
  status,
  message,
}: {
  status: "idle" | "error" | "success";
  message?: string;
}) {
  return (
    <div role="status" aria-live="polite" className={status === "idle" ? "sr-only" : ""}>
      {status !== "idle" && message ? (
        <p
          className={`rounded-xl border px-4 py-3 text-sm ${
            status === "error"
              ? "border-red-700/30 bg-red-50 text-red-800"
              : "border-accent-500/30 bg-accent-100/50 text-ink-900"
          }`}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
