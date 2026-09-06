import { z } from "zod";
import {
  frequencyIds,
  propertyTypeIds,
  SQUARE_FEET_MAX,
  SQUARE_FEET_MIN,
} from "./pricing";

/**
 * Shared between the browser and the API route, so a field can never be
 * validated one way on the client and another way on the server.
 */

const name = z
  .string()
  .trim()
  .min(2, "Please enter your name")
  .max(80, "That name is longer than we can store");

const company = z
  .string()
  .trim()
  .min(2, "Please enter your company name")
  .max(120, "That company name is longer than we can store");

const email = z
  .string()
  .trim()
  .min(1, "Please enter your email address")
  .max(160, "That email address is longer than we can store")
  .email("Please enter a valid email address");

/** Deliberately permissive: international formats, extensions and spacing all pass. */
const phone = z
  .string()
  .trim()
  .min(7, "Please enter a phone number we can reach you on")
  .max(32, "That phone number is longer than we can store")
  .regex(/^[+()\d][\d\s().+-]*(?:(?:ext|x)\.?\s*\d+)?$/i, "Please enter a valid phone number");

/** Honeypot: a real person never fills this in, a naive bot fills everything. */
const website = z.string().max(0, "Submission rejected").optional();

export const contactSchema = z.object({
  name,
  company,
  email,
  phone,
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little about what you need — 10 characters or more")
    .max(2000, "Please keep your message under 2000 characters"),
  website,
});

export type ContactInput = z.infer<typeof contactSchema>;

export const quoteSchema = z.object({
  propertyType: z.enum(propertyTypeIds, {
    message: "Choose the property type that fits best",
  }),
  // An empty input arrives as "" and would coerce to 0, which reads as a
  // confusing "too small" error. Map it to undefined so the required-field
  // message fires instead.
  squareFeet: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce
      .number({ message: "Enter your approximate square footage" })
      .int("Enter square footage as a whole number")
      .min(SQUARE_FEET_MIN, `Enter at least ${SQUARE_FEET_MIN} square feet`)
      .max(SQUARE_FEET_MAX, "For sites this large, call us for a bespoke quote"),
  ),
  frequency: z.enum(frequencyIds, {
    message: "Choose how often you need service",
  }),
  name,
  company,
  email,
  phone,
  notes: z
    .string()
    .trim()
    .max(1000, "Please keep your notes under 1000 characters")
    .optional()
    .or(z.literal("")),
  website,
});

export type QuoteInput = z.infer<typeof quoteSchema>;

/** Flattens a ZodError into the `{ field: message }` shape the forms render. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in result)) {
      result[key] = issue.message;
    }
  }
  return result;
}
