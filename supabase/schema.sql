-- Meridian Facilities — lead storage.
-- Run this in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Contact form submissions
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  company     text not null,
  email       text not null,
  phone       text not null,
  message     text not null,
  source_path text,
  user_agent  text
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- ---------------------------------------------------------------------------
-- Quote calculator submissions
--
-- The estimate is stored alongside the inputs so a coordinator can see the
-- figure the prospect was actually shown, even after pricing changes.
-- ---------------------------------------------------------------------------
create table if not exists public.quote_requests (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  name           text not null,
  company        text not null,
  email          text not null,
  phone          text not null,
  property_type  text not null,
  square_feet    integer not null check (square_feet > 0),
  frequency      text not null,
  estimate_low   integer not null,
  estimate_high  integer not null,
  notes          text,
  source_path    text,
  user_agent     text
);

create index if not exists quote_requests_created_at_idx
  on public.quote_requests (created_at desc);

-- ---------------------------------------------------------------------------
-- Row level security
--
-- Both tables are write-only from the application, which connects with the
-- service role key and therefore bypasses RLS. Enabling RLS with no policies
-- means anon and authenticated keys can neither read nor write these tables —
-- so a leaked publishable key cannot expose customer leads.
-- ---------------------------------------------------------------------------
alter table public.contact_submissions enable row level security;
alter table public.quote_requests enable row level security;
