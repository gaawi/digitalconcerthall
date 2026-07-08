import type { Concert } from "./types";

/** Slugify a composer name the same way the iOS app derives composerSlug. */
export function composerSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Composer portrait URL from the CreArtBox media CDN (same as iOS). */
export function composerPhotoURL(name: string): string {
  return `https://creartbox-media-cdn.b-cdn.net/webimg/composers-digital-hall/${composerSlug(
    name
  )}.jpg`;
}

/** Short quality badge (4K / HD / Lossless / 24bits) — mirrors Concert.qualityBadge. */
export function qualityBadge(concert: Concert): string {
  const q = concert.qualities.join(" ").toLowerCase();
  if (q.includes("4k")) return "4K";
  if (q.includes("hd")) return "HD";
  if (q.includes("lossless")) return "Lossless";
  if (q.includes("24bit")) return "24bits";
  return concert.qualities[0] ?? "";
}

export const CENTURIES = [
  { key: "all", label: "All", icon: "list" },
  { key: "new", label: "New", icon: "sparkles" },
  { key: "21", label: "21st Century", icon: "waveform" },
  { key: "20", label: "20th Century", icon: "note" },
  { key: "19", label: "19th Century", icon: "piano" },
  { key: "18", label: "18th Century", icon: "guitar" },
] as const;

export type CenturyKey = (typeof CENTURIES)[number]["key"];

/** Which century bucket a concert belongs to (from its period taxonomy). */
export function centuryOf(concert: Concert): CenturyKey | null {
  const p = concert.periods.join(" ").toLowerCase();
  if (p.includes("21")) return "21";
  if (p.includes("20")) return "20";
  if (p.includes("19")) return "19";
  if (p.includes("18")) return "18";
  if (p.includes("17")) return "18"; // fold 17th into the earliest bucket
  return null;
}

/** Parse the MM/DD/YYYY release_date into a sortable timestamp (0 if unknown). */
export function releaseTimestamp(concert: Concert): number {
  const m = concert.release_date.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return 0;
  const [, mm, dd, yyyy] = m;
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd)).getTime();
}

/** Concerts grouped by century, newest buckets first (21 -> 18). */
export function groupByCentury(
  concerts: Concert[]
): { label: string; key: string; concerts: Concert[] }[] {
  const order = ["21", "20", "19", "18"] as const;
  const labels: Record<string, string> = {
    "21": "21st Century",
    "20": "20th Century",
    "19": "19th Century",
    "18": "18th Century",
  };
  return order
    .map((key) => ({
      key,
      label: labels[key],
      concerts: concerts.filter((c) => centuryOf(c) === key),
    }))
    .filter((s) => s.concerts.length > 0);
}

/** Detect a video source type + id from any pasted URL (for the editor). */
export function detectVideo(url: string): { type: string; id: string } {
  const u = (url || "").trim();
  if (!u) return { type: "none", id: "" };
  if (/\.m3u8(\?|$)/i.test(u) || /b-cdn\.net/i.test(u))
    return { type: "hls", id: "" };
  const yt = u.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/i
  );
  if (yt) return { type: "youtube", id: yt[1] };
  const vimeo = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return { type: "vimeo", id: vimeo[1] };
  if (/\.mp4(\?|$)/i.test(u)) return { type: "mp4", id: "" };
  if (/\.(mp3|wav|m4a|aac|flac)(\?|$)/i.test(u))
    return { type: "audio", id: "" };
  return { type: "embed", id: "" };
}

/** Slugify any string for a concert slug. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** "New" row: most recent by release date. */
export function newestConcerts(concerts: Concert[], n = 10): Concert[] {
  return [...concerts]
    .sort((a, b) => releaseTimestamp(b) - releaseTimestamp(a))
    .slice(0, n);
}
