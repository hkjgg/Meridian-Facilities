/**
 * Quote estimator.
 *
 * The numbers below are the ones a coordinator would use on a first pass:
 * a per-visit rate driven by cleanable square footage, adjusted for how much
 * soil accumulates between visits and for the economies of scale that come
 * with a larger site. It intentionally produces a range, not a single figure —
 * an estimate that pretends to be a quote is how a sales conversation starts
 * badly.
 */

export const propertyTypes = [
  {
    id: "office",
    label: "Office",
    hint: "Workspaces, suites and corporate floors",
    ratePerSqFt: 0.009,
  },
  {
    id: "retail",
    label: "Retail",
    hint: "Storefronts, showrooms and customer-facing floors",
    ratePerSqFt: 0.0105,
  },
  {
    id: "medical",
    label: "Medical / dental",
    hint: "Clinical suites with disinfection protocols",
    ratePerSqFt: 0.015,
  },
  {
    id: "industrial",
    label: "Warehouse / industrial",
    hint: "Distribution, light manufacturing and back-of-house",
    ratePerSqFt: 0.0065,
  },
] as const;

export const frequencies = [
  {
    id: "5x-weekly",
    label: "5 days a week",
    hint: "Nightly service, Monday to Friday",
    visitsPerMonth: 21.7,
    /** Frequent visits mean less soil per visit, so the per-visit rate falls. */
    intensity: 0.88,
  },
  {
    id: "3x-weekly",
    label: "3 days a week",
    hint: "A common balance for mid-size offices",
    visitsPerMonth: 13,
    intensity: 0.94,
  },
  {
    id: "weekly",
    label: "Once a week",
    hint: "Lower-traffic or hybrid workplaces",
    visitsPerMonth: 4.33,
    intensity: 1,
  },
  {
    id: "biweekly",
    label: "Every other week",
    hint: "Small suites and quiet sites",
    visitsPerMonth: 2.17,
    intensity: 1.08,
  },
  {
    id: "monthly",
    label: "Monthly deep clean",
    hint: "Periodic reset without a recurring crew",
    visitsPerMonth: 1,
    intensity: 1.15,
  },
] as const;

export type PropertyTypeId = (typeof propertyTypes)[number]["id"];
export type FrequencyId = (typeof frequencies)[number]["id"];

export const propertyTypeIds = propertyTypes.map((p) => p.id) as [
  PropertyTypeId,
  ...PropertyTypeId[],
];
export const frequencyIds = frequencies.map((f) => f.id) as [
  FrequencyId,
  ...FrequencyId[],
];

export const SQUARE_FEET_MIN = 500;
export const SQUARE_FEET_MAX = 250_000;
/** No contract is worth mobilising a crew for below this. */
const MONTHLY_MINIMUM = 450;

/** Larger sites cost less per square foot to service. */
function scaleFactor(squareFeet: number): number {
  if (squareFeet < 5_000) return 1.15;
  if (squareFeet < 15_000) return 1;
  if (squareFeet < 40_000) return 0.92;
  return 0.85;
}

export type Estimate = {
  monthlyLow: number;
  monthlyHigh: number;
  monthlyMid: number;
  perVisit: number;
  visitsPerMonth: number;
  /** True when the site is small enough that our monthly minimum sets the price. */
  atMinimum: boolean;
};

export function estimate(input: {
  propertyType: PropertyTypeId;
  squareFeet: number;
  frequency: FrequencyId;
}): Estimate {
  const property = propertyTypes.find((p) => p.id === input.propertyType)!;
  const frequency = frequencies.find((f) => f.id === input.frequency)!;

  const squareFeet = Math.min(
    Math.max(input.squareFeet, SQUARE_FEET_MIN),
    SQUARE_FEET_MAX,
  );

  const perVisit =
    squareFeet *
    property.ratePerSqFt *
    frequency.intensity *
    scaleFactor(squareFeet);

  const raw = perVisit * frequency.visitsPerMonth;
  const atMinimum = raw < MONTHLY_MINIMUM;
  const monthlyMid = Math.max(raw, MONTHLY_MINIMUM);

  const round = (value: number) => Math.round(value / 10) * 10;

  return {
    monthlyLow: round(monthlyMid * 0.9),
    monthlyHigh: round(monthlyMid * 1.12),
    monthlyMid: round(monthlyMid),
    perVisit: Math.round(monthlyMid / frequency.visitsPerMonth),
    visitsPerMonth: frequency.visitsPerMonth,
    atMinimum,
  };
}

export const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
