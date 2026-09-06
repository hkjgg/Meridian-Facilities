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
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/schemas";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";
/** Nothing here is cacheable; every request writes. */
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const limit = rateLimit(`contact:${clientKey(request)}`);
  if (!limit.ok) return tooManyRequests(limit.retryAfter);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return malformedBody();
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  // The honeypot passed validation only by being empty; if a bot filled it we
  // would have failed above. Drop the field before it reaches storage.
  const { website: _honeypot, ...submission } = parsed.data;
  void _honeypot;

  if (!isSupabaseConfigured()) return notConfigured();

  const { error } = await getSupabase().from("contact_submissions").insert({
    name: submission.name,
    company: submission.company,
    email: submission.email,
    phone: submission.phone,
    message: submission.message,
    source_path: "/contact",
    user_agent: userAgent(request),
  });

  if (error) {
    console.error("[meridian] contact_submissions insert failed:", error.message);
    return storageError();
  }

  return accepted();
}
