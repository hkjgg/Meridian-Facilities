import type { NextRequest } from "next/server";
import {
  accepted,
  malformedBody,
  notConfigured,
  storageError,
  tooManyRequests,
  userAgent,
  validationError,
} from "@/lib/api";
import { estimate } from "@/lib/pricing";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { quoteSchema } from "@/lib/schemas";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const limit = rateLimit(`quote:${clientKey(request)}`);
  if (!limit.ok) return tooManyRequests(limit.retryAfter);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return malformedBody();
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  const { website: _honeypot, ...submission } = parsed.data;
  void _honeypot;

  // The estimate is recalculated server-side rather than trusted from the
  // client, so the figure we store is always the one our pricing model
  // produces for these inputs.
  const quoted = estimate({
    propertyType: submission.propertyType,
    squareFeet: submission.squareFeet,
    frequency: submission.frequency,
  });

  if (!isSupabaseConfigured()) return notConfigured();

  const { error } = await getSupabase().from("quote_requests").insert({
    name: submission.name,
    company: submission.company,
    email: submission.email,
    phone: submission.phone,
    property_type: submission.propertyType,
    square_feet: submission.squareFeet,
    frequency: submission.frequency,
    estimate_low: quoted.monthlyLow,
    estimate_high: quoted.monthlyHigh,
    notes: submission.notes || null,
    source_path: "/quote",
    user_agent: userAgent(request),
  });

  if (error) {
    console.error("[meridian] quote_requests insert failed:", error.message);
    return storageError();
  }

  return accepted();
}
