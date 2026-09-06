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

/**
 * Reads a credential, treating blank values as absent.
 *
 * A host can supply an empty string for a variable that is declared but unset,
 * and a copy-pasted value can arrive surrounded by whitespace. Neither is a
 * configured credential.
 */
function credential(name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY") {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function isSupabaseConfigured(): boolean {
  const url = credential("SUPABASE_URL");
  if (!url || !credential("SUPABASE_SERVICE_ROLE_KEY")) return false;

  // A malformed URL would throw inside createClient. Report it as unconfigured
  // so the route answers with its 503 instead of a 500.
  try {
    new URL(url);
    return true;
  } catch {
    console.error(
      `[meridian] SUPABASE_URL is not a valid URL (${JSON.stringify(url)}).`,
    );
    return false;
  }
}

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = credential("SUPABASE_URL");
  const key = credential("SUPABASE_SERVICE_ROLE_KEY");

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
