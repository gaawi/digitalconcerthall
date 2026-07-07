-- CreArtBox Digital Concert Hall — database schema
-- Run this in the Supabase SQL Editor (or via `supabase db push`).
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE where possible.

-- ---------------------------------------------------------------------------
-- concerts: the public catalog (migrated from the WordPress video_skrn CPT)
-- ---------------------------------------------------------------------------
create table if not exists public.concerts (
  id            bigint generated always as identity primary key,
  wp_id         bigint unique,
  slug          text unique not null,
  title         text not null,
  description   text default '',
  video_type    text not null default 'none',   -- hls | youtube | vimeo | audio | mp4 | embed | none
  video_url     text default '',
  video_id      text default '',
  thumbnail_url text default '',
  duration      text default '',
  release_date  text default '',
  original_link text default '',
  composers     text[] default '{}',
  instruments   text[] default '{}',
  periods       text[] default '{}',
  nationalities text[] default '{}',
  qualities     text[] default '{}',
  performers    text[] default '{}',
  categories    text[] default '{}',
  published     boolean not null default true,
  created_at    timestamptz not null default now()
);

create index if not exists concerts_published_idx on public.concerts (published);
create index if not exists concerts_composers_idx  on public.concerts using gin (composers);
create index if not exists concerts_instruments_idx on public.concerts using gin (instruments);

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user, auto-created on signup
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text,
  full_name  text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- memberships: an active row grants gated access. Stripe columns are
-- unused today (free membership) but ready for paid plans later.
-- ---------------------------------------------------------------------------
create table if not exists public.memberships (
  id                     bigint generated always as identity primary key,
  user_id                uuid not null references auth.users (id) on delete cascade,
  status                 text not null default 'active',  -- active | canceled | past_due
  plan                   text not null default 'free',    -- free | monthly | annual
  stripe_customer_id     text,
  stripe_subscription_id text,
  current_period_end     timestamptz,
  created_at             timestamptz not null default now(),
  unique (user_id, plan)
);

create index if not exists memberships_user_idx on public.memberships (user_id);

-- ---------------------------------------------------------------------------
-- Auto-provision profile + free membership when a user signs up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;

  insert into public.memberships (user_id, status, plan)
  values (new.id, 'active', 'free')
  on conflict (user_id, plan) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row-Level Security
-- ---------------------------------------------------------------------------
alter table public.concerts    enable row level security;
alter table public.profiles    enable row level security;
alter table public.memberships enable row level security;

-- Published concerts are readable by everyone (catalog is public, like today).
drop policy if exists "concerts are publicly readable" on public.concerts;
create policy "concerts are publicly readable"
  on public.concerts for select
  using (published = true);

-- Users read/update only their own profile.
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile"
  on public.profiles for select using (auth.uid() = id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Users read only their own membership.
drop policy if exists "read own membership" on public.memberships;
create policy "read own membership"
  on public.memberships for select using (auth.uid() = user_id);

-- Note: the seed script uses the service-role key, which bypasses RLS.
