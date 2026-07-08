// Seed the Supabase `concerts` table from data/concerts.json.
//
// Prerequisites:
//   1. Run supabase/schema.sql in your project (SQL Editor).
//   2. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
//
// Usage: npm run db:seed
//
// The service-role key bypasses RLS — keep it server-side only, never commit it.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Load .env.local without a dependency.
function loadEnv() {
  try {
    const raw = readFileSync(resolve(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]])
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* env may come from the shell instead */
  }
}
loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add them to .env.local (see .env.example)."
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

const concerts = JSON.parse(
  readFileSync(resolve(ROOT, "data/concerts.json"), "utf8")
);

const rows = concerts.map((c) => ({
  wp_id: c.wp_id,
  slug: c.slug,
  title: c.title,
  description: c.description,
  video_type: c.video_type,
  video_url: c.video_url,
  video_id: c.video_id,
  thumbnail_url: c.thumbnail_url,
  duration: c.duration,
  release_date: c.release_date,
  original_link: c.original_link,
  composers: c.composers,
  instruments: c.instruments,
  periods: c.periods,
  nationalities: c.nationalities,
  qualities: c.qualities,
  performers: c.performers,
  categories: c.categories,
  audio_tracks: c.audio_tracks,
  published: c.published,
}));

const { error } = await supabase
  .from("concerts")
  .upsert(rows, { onConflict: "slug" });

if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} concerts into Supabase.`);
