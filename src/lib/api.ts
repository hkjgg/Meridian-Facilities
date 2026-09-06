import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { fieldErrors } from "./schemas";

export type ApiResponse =
  | { ok: true }
  | { ok: false; message: string; fields?: Record<string, string> };

export function validationError(error: ZodError) {
  return NextResponse.json<ApiResponse>(
    {
      ok: false,
      message: "Please check the highlighted fields and try again.",
      fields: fieldErrors(error),
    },
    { status: 400 },
  );
}

export function tooManyRequests(retryAfter: number) {
  return NextResponse.json<ApiResponse>(
    {
      ok: false,
      message: "That's a few too many submissions. Please try again shortly.",
    },
    { status: 429, headers: { "Retry-After": String(retryAfter) } },
  );
}

/**
 * Returned when Supabase credentials are absent.
 *
 * Deliberately a hard failure rather than a fake success: a marketing site
 * that silently swallows leads is worse than one whose form is visibly broken,
 * because nobody finds out until a prospect follows up about the enquiry that
 * never arrived.
 */
export function notConfigured() {
  console.error(
    "[meridian] Lead submission rejected: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set.",
  );
  return NextResponse.json<ApiResponse>(
    {
      ok: false,
      message:
        "Our form is temporarily unavailable. Please call us on (503) 555-0188 and we'll pick this up straight away.",
    },
    { status: 503 },
  );
}

export function storageError() {
  return NextResponse.json<ApiResponse>(
    {
      ok: false,
      message:
        "Something went wrong saving your details. Please try again, or call us on (503) 555-0188.",
    },
    { status: 500 },
  );
}

export function malformedBody() {
  return NextResponse.json<ApiResponse>(
    { ok: false, message: "We couldn't read that submission." },
    { status: 400 },
  );
}

export function accepted() {
  return NextResponse.json<ApiResponse>({ ok: true }, { status: 201 });
}

/** Trimmed so a hostile client cannot pad the column with megabytes of text. */
export function userAgent(request: Request) {
  return request.headers.get("user-agent")?.slice(0, 400) ?? null;
}
