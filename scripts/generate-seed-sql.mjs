// Generate supabase/seed.sql (plain INSERTs) from data/concerts.json so the
// catalog can be loaded via the Supabase SQL Editor without a service-role key.
//
// Usage: node scripts/generate-seed-sql.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const concerts = JSON.parse(
  readFileSync(resolve(ROOT, "data/concerts.json"), "utf8")
);

const q = (s) => `'${String(s ?? "").replace(/'/g, "''")}'`;
const arr = (a) =>
  `ARRAY[${(a || [])
    .map((x) => `'${String(x).replace(/'/g, "''")}'`)
    .join(",")}]::text[]`;

const cols = [
  "wp_id",
  "slug",
  "title",
  "description",
  "video_type",
  "video_url",
  "video_id",
  "thumbnail_url",
  "duration",
  "release_date",
  "original_link",
  "composers",
  "instruments",
  "periods",
  "nationalities",
  "qualities",
  "performers",
  "categories",
  "published",
];

const values = concerts
  .map((c) => {
    const row = [
      c.wp_id ?? "NULL",
      q(c.slug),
      q(c.title),
      q(c.description),
      q(c.video_type),
      q(c.video_url),
      q(c.video_id),
      q(c.thumbnail_url),
      q(c.duration),
      q(c.release_date),
      q(c.original_link),
      arr(c.composers),
      arr(c.instruments),
      arr(c.periods),
      arr(c.nationalities),
      arr(c.qualities),
      arr(c.performers),
      arr(c.categories),
      c.published ? "true" : "false",
    ];
    return `  (${row.join(", ")})`;
  })
  .join(",\n");

const sql = `-- Seed the concerts catalog (generated from data/concerts.json).
-- Run AFTER supabase/schema.sql. Safe to re-run: upserts on slug.

insert into public.concerts (${cols.join(", ")})
values
${values}
on conflict (slug) do update set
  wp_id = excluded.wp_id,
  title = excluded.title,
  description = excluded.description,
  video_type = excluded.video_type,
  video_url = excluded.video_url,
  video_id = excluded.video_id,
  thumbnail_url = excluded.thumbnail_url,
  duration = excluded.duration,
  release_date = excluded.release_date,
  original_link = excluded.original_link,
  composers = excluded.composers,
  instruments = excluded.instruments,
  periods = excluded.periods,
  nationalities = excluded.nationalities,
  qualities = excluded.qualities,
  performers = excluded.performers,
  categories = excluded.categories,
  published = excluded.published;
`;

writeFileSync(resolve(ROOT, "supabase/seed.sql"), sql);
console.log(`Wrote supabase/seed.sql with ${concerts.length} concerts.`);
