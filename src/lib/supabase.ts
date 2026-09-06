import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 *
 * Leads are written with the service role key, which bypasses row level
 * security — that is intentional and safe here because this module is only
 * ever imported from API routes. It must never be imported into a Client
 * Component: the key would end up in the browser bundle.
 */

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-application-name": "meridian-facilities-web" } },
  });

  return client;
}
