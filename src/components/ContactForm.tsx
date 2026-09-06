"use client";

import { useRef, useState } from "react";
import { contactSchema, fieldErrors } from "@/lib/schemas";
import { Field, FormStatus, Honeypot } from "./form";
import { ArrowRight, buttonClass } from "./ui";

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const empty: Values = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">(
    "idle",
  );
  const [message, setMessage] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  const set = (key: keyof Values) => (value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear a field's error as soon as the user starts correcting it, rather
    // than leaving stale red text under a field they are actively fixing.
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  /** Moves focus to the first field with an error so keyboard users land on it. */
  const focusFirstError = (found: Record<string, string>) => {
    const first = Object.keys(found)[0];
    if (!first) return;
    formRef.current
      ?.querySelector<HTMLElement>(`[id="${first}"]`)
      ?.focus({ preventScroll: false });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Same schema the API route runs, so the client can never accept something
    // the server would reject.
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const found = fieldErrors(parsed.error);
      setErrors(found);
      setStatus("error");
      setMessage("Please check the highlighted fields and try again.");
      focusFirstError(found);
      return;
    }

    setStatus("sending");
    setErrors({});
    setMessage(undefined);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const found = result?.fields ?? {};
        setErrors(found);
        setStatus("error");
        setMessage(
          result?.message ?? "Something went wrong. Please try again.",
        );
        focusFirstError(found);
        return;
      }

      setStatus("success");
      setValues(empty);
      setMessage(
        "Thank you — your message is with us. We reply to every enquiry within one business day.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't reach the server. Please check your connection, or call us on (503) 555-0188.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink-900/10 bg-paper-50 p-8 lg:p-10">
        <p className="eyebrow">Message received</p>
        <h2 className="mt-5 text-headline">We&apos;ll be in touch.</h2>
        <p className="mt-5 text-lede text-ink-500">{message}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage(undefined);
          }}
          className={`${buttonClass("outline", "md")} mt-8`}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "sending"}
      className="relative rounded-2xl border border-ink-900/10 bg-paper-50 p-6 sm:p-8 lg:p-10"
    >
      <Honeypot value={values.website} onChange={set("website")} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          {(props) => (
            <input
              {...props}
              type="text"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => set("name")(event.target.value)}
            />
          )}
        </Field>

        <Field id="company" label="Company" error={errors.company}>
          {(props) => (
            <input
              {...props}
              type="text"
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => set("company")(event.target.value)}
            />
          )}
        </Field>

        <Field id="email" label="Work email" error={errors.email}>
          {(props) => (
            <input
              {...props}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(event) => set("email")(event.target.value)}
            />
          )}
        </Field>

        <Field id="phone" label="Phone" error={errors.phone}>
          {(props) => (
            <input
              {...props}
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(event) => set("phone")(event.target.value)}
            />
          )}
        </Field>

        <Field
          id="message"
          label="How can we help?"
          hint="Building type, approximate size and what you need — a couple of lines is plenty."
          error={errors.message}
          className="sm:col-span-2"
        >
          {(props) => (
            <textarea
              {...props}
              name="message"
              rows={5}
              value={values.message}
              onChange={(event) => set("message")(event.target.value)}
            />
          )}
        </Field>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClass("primary", "lg")}
        >
          {status === "sending" ? "Sending…" : "Send message"}
          {status === "sending" ? null : <ArrowRight />}
        </button>
        <p className="text-sm text-ink-500">
          We reply within one business day.
        </p>
      </div>

      <div className="mt-6">
        <FormStatus
          status={status === "error" ? "error" : "idle"}
          message={message}
        />
      </div>
    </form>
  );
}
