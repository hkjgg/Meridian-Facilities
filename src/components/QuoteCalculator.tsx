"use client";

import { useEffect, useRef, useState } from "react";
import {
  currency,
  estimate,
  frequencies,
  propertyTypes,
  SQUARE_FEET_MAX,
  SQUARE_FEET_MIN,
  type FrequencyId,
  type PropertyTypeId,
} from "@/lib/pricing";
import { fieldErrors, quoteSchema } from "@/lib/schemas";
import { Field, FormStatus, Honeypot } from "./form";
import { ArrowRight, buttonClass } from "./ui";

type Values = {
  propertyType: PropertyTypeId | "";
  squareFeet: string;
  frequency: FrequencyId | "";
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
  website: string;
};

const empty: Values = {
  propertyType: "",
  squareFeet: "",
  frequency: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
  website: "",
};

const steps = [
  { title: "What kind of space is it?", legend: "Property type" },
  { title: "How big is it?", legend: "Approximate square footage" },
  { title: "How often do you need us?", legend: "Service frequency" },
  { title: "Here’s your estimate", legend: "Your details" },
] as const;

const sizePresets = [2500, 5000, 10000, 25000, 50000];

export function QuoteCalculator() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">(
    "idle",
  );
  const [message, setMessage] = useState<string>();

  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasMoved = useRef(false);

  // Move focus to the new step's heading so a keyboard or screen reader user
  // is told where they landed instead of being left on a button that vanished.
  useEffect(() => {
    if (!hasMoved.current) {
      hasMoved.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const squareFeetNumber = Number(values.squareFeet);
  const canEstimate =
    values.propertyType !== "" &&
    values.frequency !== "" &&
    Number.isFinite(squareFeetNumber) &&
    squareFeetNumber >= SQUARE_FEET_MIN;

  const quote = canEstimate
    ? estimate({
        propertyType: values.propertyType as PropertyTypeId,
        squareFeet: squareFeetNumber,
        frequency: values.frequency as FrequencyId,
      })
    : null;

  /** Validates only the fields belonging to the current step. */
  function validateStep(index: number): boolean {
    const found: Record<string, string> = {};

    if (index === 0 && !values.propertyType) {
      found.propertyType = "Choose the property type that fits best";
    }

    if (index === 1) {
      const parsed = quoteSchema.shape.squareFeet.safeParse(values.squareFeet);
      if (!parsed.success) {
        found.squareFeet = parsed.error.issues[0]?.message ?? "Check this value";
      }
    }

    if (index === 2 && !values.frequency) {
      found.frequency = "Choose how often you need service";
    }

    setErrors(found);
    return Object.keys(found).length === 0;
  }

  async function submit() {
    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const found = fieldErrors(parsed.error);
      setErrors(found);
      setStatus("error");
      setMessage("Please check the highlighted fields and try again.");
      return;
    }

    setStatus("sending");
    setMessage(undefined);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setErrors(result?.fields ?? {});
        setStatus("error");
        setMessage(result?.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(
        "Your estimate is on its way. An account manager will call within one business day to arrange a walkthrough.",
      );
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't reach the server. Please check your connection, or call us on (503) 555-0188.",
      );
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) {
      if (validateStep(step)) setStep((current) => current + 1);
      return;
    }
    void submit();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink-900/10 bg-paper-50 p-8 lg:p-12">
        <p className="eyebrow">Request received</p>
        <h2 className="mt-5 text-headline">
          {values.company}, we&apos;ve got your numbers.
        </h2>
        <p className="mt-5 max-w-xl text-lede text-ink-500">{message}</p>
        {quote ? (
          <p className="mt-8 border-t border-ink-900/15 pt-6 text-ink-500">
            Estimated range sent through:{" "}
            <span className="font-medium text-ink-900">
              {currency.format(quote.monthlyLow)} –{" "}
              {currency.format(quote.monthlyHigh)} per month
            </span>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "sending"}
      className="relative rounded-2xl border border-ink-900/10 bg-paper-50 p-6 sm:p-8 lg:p-10"
    >
      <Honeypot value={values.website} onChange={(value) => set("website", value)} />

      {/* ------------------------------------------------------------ progress */}
      <div className="flex items-center justify-between gap-6">
        <p className="text-sm font-medium text-ink-500">
          Step {step + 1} of {steps.length}
        </p>
        <ol className="flex flex-1 gap-1.5" aria-hidden="true">
          {steps.map((item, index) => (
            <li
              key={item.legend}
              className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                index <= step ? "bg-accent-500" : "bg-ink-900/12"
              }`}
            />
          ))}
        </ol>
      </div>

      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-7 text-headline outline-none"
      >
        {steps[step].title}
      </h2>

      {/* --------------------------------------------------- step 1: property */}
      {step === 0 ? (
        <fieldset className="mt-8">
          <legend className="sr-only">{steps[0].legend}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {propertyTypes.map((type) => (
              <label
                key={type.id}
                className="group relative cursor-pointer"
              >
                <input
                  type="radio"
                  name="propertyType"
                  value={type.id}
                  checked={values.propertyType === type.id}
                  onChange={() => set("propertyType", type.id)}
                  className="peer sr-only"
                />
                <span className="block rounded-xl border border-ink-900/15 p-5 transition-colors peer-checked:border-accent-500 peer-checked:bg-accent-100/40 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent-500 group-hover:border-ink-900/35">
                  <span className="block font-display text-title">
                    {type.label}
                  </span>
                  <span className="mt-1.5 block text-sm text-ink-500">
                    {type.hint}
                  </span>
                </span>
              </label>
            ))}
          </div>
          {errors.propertyType ? (
            <p className="mt-3 text-sm text-red-800">{errors.propertyType}</p>
          ) : null}
        </fieldset>
      ) : null}

      {/* ------------------------------------------------ step 2: square feet */}
      {step === 1 ? (
        <div className="mt-8">
          <Field
            id="squareFeet"
            label="Cleanable square footage"
            hint="A close estimate is fine — we measure properly at the walkthrough."
            error={errors.squareFeet}
          >
            {(props) => (
              <input
                {...props}
                type="number"
                name="squareFeet"
                inputMode="numeric"
                min={SQUARE_FEET_MIN}
                max={SQUARE_FEET_MAX}
                step={100}
                placeholder="12000"
                value={values.squareFeet}
                onChange={(event) => set("squareFeet", event.target.value)}
              />
            )}
          </Field>

          <div className="mt-5">
            <p className="text-sm text-ink-500">Or pick the closest:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizePresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => set("squareFeet", String(preset))}
                  aria-pressed={values.squareFeet === String(preset)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    values.squareFeet === String(preset)
                      ? "border-accent-500 bg-accent-100/50 text-ink-900"
                      : "border-ink-900/15 text-ink-500 hover:border-ink-900/35 hover:text-ink-900"
                  }`}
                >
                  {preset.toLocaleString("en-US")} sq ft
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* -------------------------------------------------- step 3: frequency */}
      {step === 2 ? (
        <fieldset className="mt-8">
          <legend className="sr-only">{steps[2].legend}</legend>
          <div className="grid gap-3">
            {frequencies.map((frequency) => (
              <label key={frequency.id} className="group relative cursor-pointer">
                <input
                  type="radio"
                  name="frequency"
                  value={frequency.id}
                  checked={values.frequency === frequency.id}
                  onChange={() => set("frequency", frequency.id)}
                  className="peer sr-only"
                />
                <span className="flex items-baseline justify-between gap-4 rounded-xl border border-ink-900/15 px-5 py-4 transition-colors peer-checked:border-accent-500 peer-checked:bg-accent-100/40 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-accent-500 group-hover:border-ink-900/35">
                  <span>
                    <span className="block font-display text-title">
                      {frequency.label}
                    </span>
                    <span className="mt-1 block text-sm text-ink-500">
                      {frequency.hint}
                    </span>
                  </span>
                  <span className="flex-none text-sm text-ink-500 tabular-nums">
                    {Math.round(frequency.visitsPerMonth)} visits/mo
                  </span>
                </span>
              </label>
            ))}
          </div>
          {errors.frequency ? (
            <p className="mt-3 text-sm text-red-800">{errors.frequency}</p>
          ) : null}
        </fieldset>
      ) : null}

      {/* --------------------------------------------- step 4: estimate + lead */}
      {step === 3 && quote ? (
        <div className="mt-8">
          <div className="rounded-2xl bg-ink-900 p-7 text-ink-300 sm:p-8">
            <p className="text-xs font-semibold tracking-[0.16em] text-accent-300 uppercase">
              Estimated monthly cost
            </p>
            <p className="mt-4 font-display text-4xl leading-none text-paper-100 sm:text-5xl">
              {currency.format(quote.monthlyLow)}
              <span className="mx-2 text-ink-300">–</span>
              {currency.format(quote.monthlyHigh)}
            </p>

            <dl className="mt-8 grid gap-4 border-t border-paper-100/20 pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-sm text-ink-300">Per visit</dt>
                <dd className="mt-1 font-display text-xl text-paper-100">
                  {currency.format(quote.perVisit)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink-300">Visits per month</dt>
                <dd className="mt-1 font-display text-xl text-paper-100">
                  {Math.round(quote.visitsPerMonth)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink-300">Square footage</dt>
                <dd className="mt-1 font-display text-xl text-paper-100">
                  {squareFeetNumber.toLocaleString("en-US")}
                </dd>
              </div>
            </dl>

            <p className="mt-6 text-sm leading-relaxed">
              {quote.atMinimum
                ? "Sites this size fall under our monthly minimum, which covers mobilising a crew and supervision. "
                : ""}
              This is an estimate, not a quote. The final figure comes from a
              walkthrough, where we measure what is actually cleanable and write
              the scope line by line.
            </p>
          </div>

          <fieldset className="mt-10">
            <legend className="text-sm font-semibold tracking-[0.14em] text-ink-500 uppercase">
              {steps[3].legend}
            </legend>
            <p className="mt-3 text-ink-500">
              Send this through and an account manager will call to arrange a
              walkthrough.
            </p>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Your name" error={errors.name}>
                {(props) => (
                  <input
                    {...props}
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => set("name", event.target.value)}
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
                    onChange={(event) => set("company", event.target.value)}
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
                    onChange={(event) => set("email", event.target.value)}
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
                    onChange={(event) => set("phone", event.target.value)}
                  />
                )}
              </Field>

              <Field
                id="notes"
                label="Anything else we should know?"
                hint="Optional — access constraints, problem areas, current vendor."
                error={errors.notes}
                className="sm:col-span-2"
              >
                {(props) => (
                  <textarea
                    {...props}
                    name="notes"
                    rows={4}
                    value={values.notes}
                    onChange={(event) => set("notes", event.target.value)}
                  />
                )}
              </Field>
            </div>
          </fieldset>
        </div>
      ) : null}

      {/* Defensive: reaching the final step without a computable estimate means
          an earlier answer was cleared. Send the user back rather than showing
          an empty panel. */}
      {step === 3 && !quote ? (
        <div className="mt-8">
          <p className="text-lede text-ink-500">
            We need your property type, square footage and frequency before we
            can price anything. Step back and fill those in.
          </p>
          <button
            type="button"
            onClick={() => setStep(0)}
            className={`${buttonClass("outline", "md")} mt-6`}
          >
            Start again
          </button>
        </div>
      ) : null}

      {/* ------------------------------------------------------------ controls */}
      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-ink-900/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          disabled={step === 0 || status === "sending"}
          className={`${buttonClass("outline", "md")} ${
            step === 0 ? "invisible sm:visible" : ""
          }`}
        >
          Back
        </button>

        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonClass("primary", "lg")}
        >
          {step < steps.length - 1
            ? "Continue"
            : status === "sending"
              ? "Sending…"
              : "Send my estimate"}
          {status === "sending" ? null : <ArrowRight />}
        </button>
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
