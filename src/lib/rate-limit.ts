/**
 * Fixed-window rate limiter held in module memory.
 *
 * On serverless this is per-instance rather than global, so it is a speed bump
 * against casual form spam, not a security control. It costs nothing and stops
 * the common case; a distributed limiter belongs in front of the app if the
 * forms ever attract real abuse.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, { count: number; expires: number }>();

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.expires < now) {
    hits.set(key, { count: 1, expires: now + WINDOW_MS });

    // Opportunistic cleanup so the map cannot grow without bound.
    if (hits.size > 5_000) {
      for (const [k, v] of hits) {
        if (v.expires < now) hits.delete(k);
      }
    }

    return { ok: true, retryAfter: 0 };
  }

  entry.count += 1;

  if (entry.count > MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((entry.expires - now) / 1000) };
  }

  return { ok: true, retryAfter: 0 };
}

/** Best-effort client IP from the proxy headers Vercel sets. */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
