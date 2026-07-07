# CreArtBox — Digital Concert Hall

A rebuild of [play.creartbox.nyc](https://play.creartbox.nyc/) — the WordPress
classical & new-music streaming site — on a modern, low-cost stack:

- **Next.js 14** (App Router) + **Tailwind CSS** → deploys to **Vercel**
- **Supabase** for auth (login / register / password reset) + Postgres catalog
- **Video stays where it already is**: Bunny Stream (HLS), Vimeo, and YouTube.
  No video files are re-hosted, so there's no big storage/bandwidth bill.

The 54 concerts from the old site were migrated automatically from the
WordPress export (`video_skrn` custom post type, Progression Studios theme).

---

## Running cost

| Piece | Tier | Cost |
| --- | --- | --- |
| Vercel | Hobby to start, Pro when you monetize | $0 → $20/mo |
| Supabase | Free (1 project is plenty) | $0 (Pro $25/mo optional later) |
| Video (Bunny / Vimeo / YouTube) | already yours | unchanged |
| Stripe | only if/when you add paid plans | 0 until enabled |

**≈ $0 to launch.**

---

## Quick start (local)

```bash
npm install
cp .env.example .env.local     # fill in your Supabase URL + anon key
npm run dev                    # http://localhost:3000
```

Before Supabase is connected, the site runs in **preview mode**: it reads the
catalog from `data/concerts.json` and leaves videos ungated so you can click
around. Once your Supabase keys are in `.env.local`, auth turns on and
members-only gating activates automatically.

---

## Connect Supabase (one-time, ~5 min)

1. **Create the tables.** In your Supabase dashboard → **SQL Editor** → paste
   the contents of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   This creates `concerts`, `profiles`, `memberships`, Row-Level Security, and
   a trigger that gives every new signup a free membership.

2. **Load the catalog.** New query → paste
   [`supabase/seed.sql`](supabase/seed.sql) → **Run**. That inserts all 54
   concerts. (Re-runnable — it upserts on `slug`.)

3. **Add your keys** to `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-REF.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-or-publishable-key
   ```

4. **Email confirmations:** Supabase → Authentication → URL Configuration →
   add `http://localhost:3000/auth/callback` and (later) your Vercel domain's
   `/auth/callback` to the redirect allow-list.

Restart `npm run dev` and you're live — signups create real accounts and gated
concerts require login.

> Prefer the CLI? Add your `service_role` key to `.env.local` and run
> `npm run db:seed` instead of step 2. Never commit that key.

---

## Deploy to Vercel

1. Push this repo to GitHub (already done if you're reading this there).
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Add the two `NEXT_PUBLIC_SUPABASE_*` env vars (same as `.env.local`) plus
   `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`.
4. Deploy. Point `play.creartbox.nyc` at Vercel when you're ready to cut over.

---

## Re-running the migration

The raw WordPress export lives in `wordpress-export/` (git-ignored — it holds
member emails). To regenerate the catalog from a fresh export:

```bash
node scripts/parse-wordpress-export.mjs path/to/export.xml   # -> data/concerts.json
node scripts/generate-seed-sql.mjs                            # -> supabase/seed.sql
```

---

## Known follow-ups

- **Thumbnails** currently load from `play.creartbox.nyc/wp-content/...`. They
  work while WordPress is up; before decommissioning WP, move them to Supabase
  Storage or Bunny and update `thumbnail_url`.
- **5 audio-only tracks** point at old WP `.mp3`/`.wav` uploads (e.g.
  *Coming Together*, *Petroushkates*). Re-upload those files and set their
  `video_url`. They're flagged with `video_type = 'audio'` / `'none'`.
- **Paid memberships:** the schema has Stripe columns ready. When you want to
  charge, flip `GATE_REQUIRES_PAYMENT` in `app/title/[slug]/page.tsx` and wire
  Stripe Checkout → write an `active` row to `memberships`.

## Project layout

```
app/                     routes (home/catalog, /title/[slug], auth, account)
components/              header, footer, cards, filters, video player, auth form
lib/                     types, Supabase clients, data access, auth helpers
data/                    concerts.json + taxonomies.json (migrated catalog)
scripts/                 WordPress parser + seed generators
supabase/                schema.sql + seed.sql
```
