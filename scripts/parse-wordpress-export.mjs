// Migrate the CreArtBox WordPress export (Progression Studios "video_skrn" CPT)
// into a clean concerts.json used to seed Supabase.
//
// Usage:  node scripts/parse-wordpress-export.mjs <path-to-export.xml>
// Output: data/concerts.json  and  data/taxonomies.json
//
// No external deps — the WXR export is regular XML, parsed with light regex
// because we only need a well-known, flat set of fields per <item>.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const inputPath = process.argv[2] || resolve(ROOT, "wordpress-export/export.xml");
const xml = readFileSync(inputPath, "utf8");

const cdata = (s) => {
  if (s == null) return "";
  const m = s.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return (m ? m[1] : s).trim();
};

// Pull a single <wp:tag> or <tag> value out of a block.
const tag = (block, name) => {
  const re = new RegExp(`<${name}>([\\s\\S]*?)</${name}>`);
  const m = block.match(re);
  return m ? cdata(m[1]) : "";
};

// Pull all postmeta pairs into a map.
function metaMap(block) {
  const out = {};
  const re =
    /<wp:postmeta>\s*<wp:meta_key>([\s\S]*?)<\/wp:meta_key>\s*<wp:meta_value>([\s\S]*?)<\/wp:meta_value>\s*<\/wp:postmeta>/g;
  let m;
  while ((m = re.exec(block))) out[cdata(m[1])] = cdata(m[2]);
  return out;
}

// Pull taxonomy terms of a given domain attached to an item.
function terms(block, domain) {
  const re = new RegExp(
    `<category domain="${domain}"[^>]*>([\\s\\S]*?)</category>`,
    "g"
  );
  const out = [];
  let m;
  while ((m = re.exec(block))) {
    const v = cdata(m[1]);
    if (v && !out.includes(v)) out.push(v);
  }
  return out;
}

// Resolve the primary media source. The Progression Studios theme records the
// player kind in `progression_studios_video_display` and stores the actual
// URL/ID in a per-kind meta field.
function videoSource(meta) {
  const display = (meta["progression_studios_video_display"] || "").trim();
  const yt = (meta["progression_studios_youtube_video"] || "").trim();
  const vimeo = (meta["progression_studios_vimeo_video"] || "").trim();
  const audio = (meta["progression_studios_audio_embed"] || "").trim();
  const local = (meta["progression_studios_video_post"] || "").trim();

  const ytId = (v) => {
    const m = v.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/i
    );
    return m ? m[1] : /^[\w-]{6,}$/.test(v) ? v : "";
  };
  const vimeoId = (v) => {
    const m = v.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
    return m ? m[1] : /^\d+$/.test(v) ? v : "";
  };

  switch (display) {
    case "youtube":
      return { type: "youtube", url: yt, id: ytId(yt) };
    case "vimeo":
      return { type: "vimeo", url: vimeo, id: vimeoId(vimeo) };
    case "audio":
      return { type: "audio", url: audio, id: "" };
    case "local":
    default:
      if (local && (/\.m3u8(\?|$)/i.test(local) || /b-cdn\.net/i.test(local)))
        return { type: "hls", url: local, id: "" };
      if (local && /\.mp4(\?|$)/i.test(local))
        return { type: "mp4", url: local, id: "" };
      // Fall back across fields if display was empty/misleading.
      if (vimeo) return { type: "vimeo", url: vimeo, id: vimeoId(vimeo) };
      if (yt) return { type: "youtube", url: yt, id: ytId(yt) };
      if (audio) return { type: "audio", url: audio, id: "" };
      return { type: local ? "embed" : "none", url: local, id: "" };
  }
}

// Decode the handful of HTML entities WordPress emits in titles.
const decodeEntities = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&#8216;|&#039;|&#39;/g, "'")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

// Extract audio tracks from the WP content HTML: <li data-src="url">Title</li>
// (mirrors the iOS Concert.parseAudioTracks).
function parseAudioTracks(html) {
  if (!html) return [];
  const re = /data-src=["']([^"']+)["'][^>]*>([\s\S]*?)<\/li>/g;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    const url = m[1].trim();
    const title = decodeEntities(m[2].replace(/<[^>]+>/g, "")).trim();
    if (url && title) out.push({ title, url });
  }
  return out;
}

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Categories the theme used for layout, not real classification — drop them.
const NON_TOPICAL_CATEGORIES = new Set([
  "Featured Home",
  "Slider Home",
  "Slider Movies",
  "New",
]);
const PERIOD_RE = /century/i;
const NATIONALITIES = new Set(["American", "European"]);

// Collect every <item>.
const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

const concerts = [];
const taxSets = {
  composers: new Set(),
  instruments: new Set(),
  periods: new Set(),
  nationalities: new Set(),
  qualities: new Set(),
  performers: new Set(),
};

for (const item of items) {
  if (tag(item, "wp:post_type") !== "video_skrn") continue;
  if (tag(item, "wp:status") === "trash") continue;

  const meta = metaMap(item);
  const title = tag(item, "title");
  if (!title) continue;

  const rawCats = terms(item, "video-category");
  const periods = rawCats.filter((c) => PERIOD_RE.test(c));
  const nationalities = rawCats.filter((c) => NATIONALITIES.has(c));
  const otherCats = rawCats.filter(
    (c) =>
      !PERIOD_RE.test(c) &&
      !NATIONALITIES.has(c) &&
      !NON_TOPICAL_CATEGORIES.has(c)
  );

  const composers = terms(item, "video-director");
  const instruments = terms(item, "video-genres");
  const qualities = terms(item, "video-type");
  const performers = terms(item, "video-cast");

  const src = videoSource(meta);

  const content = tag(item, "content:encoded");
  const excerpt = tag(item, "excerpt:encoded");

  // Audio tracks embedded in content; fall back to a single-file audio source.
  let audioTracks = parseAudioTracks(content);
  if (audioTracks.length === 0 && src.type === "audio" && src.url) {
    audioTracks = [{ title, url: src.url }];
  }

  concerts.push({
    wp_id: Number(tag(item, "wp:post_id")) || null,
    title,
    slug: slugify(tag(item, "wp:post_name") || title),
    description: (excerpt || content || "").replace(/<[^>]+>/g, "").trim(),
    video_type: src.type,
    video_url: src.url,
    video_id: src.id,
    thumbnail_id: meta["_thumbnail_id"] || null,
    duration: meta["progression_studios_media_duration_meta"] || "",
    release_date: meta["progression_studios_release_date"] || "",
    original_link: meta["progression_studios_slider_btn_link"] || "",
    composers,
    instruments,
    periods,
    nationalities,
    qualities,
    performers,
    categories: otherCats,
    audio_tracks: audioTracks,
    published: tag(item, "wp:status") === "publish",
  });

  composers.forEach((v) => taxSets.composers.add(v));
  instruments.forEach((v) => taxSets.instruments.add(v));
  periods.forEach((v) => taxSets.periods.add(v));
  nationalities.forEach((v) => taxSets.nationalities.add(v));
  qualities.forEach((v) => taxSets.qualities.add(v));
  performers.forEach((v) => taxSets.performers.add(v));
}

// Build a lookup so seeded thumbnails can be resolved from the attachment items.
const attachments = {};
for (const item of items) {
  if (tag(item, "wp:post_type") !== "attachment") continue;
  const id = tag(item, "wp:post_id");
  const url = tag(item, "wp:attachment_url");
  if (id && url) attachments[id] = url;
}
for (const c of concerts) {
  c.thumbnail_url = c.thumbnail_id ? attachments[c.thumbnail_id] || "" : "";
}

const taxonomies = Object.fromEntries(
  Object.entries(taxSets).map(([k, set]) => [k, [...set].sort()])
);

mkdirSync(resolve(ROOT, "data"), { recursive: true });
writeFileSync(
  resolve(ROOT, "data/concerts.json"),
  JSON.stringify(concerts, null, 2)
);
writeFileSync(
  resolve(ROOT, "data/taxonomies.json"),
  JSON.stringify(taxonomies, null, 2)
);

const byType = concerts.reduce((a, c) => {
  a[c.video_type] = (a[c.video_type] || 0) + 1;
  return a;
}, {});

console.log(`Parsed ${concerts.length} concerts`);
console.log("Video sources:", byType);
console.log(
  "Taxonomy counts:",
  Object.fromEntries(Object.entries(taxonomies).map(([k, v]) => [k, v.length]))
);
console.log("Wrote data/concerts.json and data/taxonomies.json");
