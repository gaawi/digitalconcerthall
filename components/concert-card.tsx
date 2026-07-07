import Link from "next/link";
import type { Concert } from "@/lib/types";

const QUALITY_BADGE: Record<string, string> = {
  "4k video": "4K",
  "HD video": "HD",
  "Lossless audio": "Lossless",
  "24bits audio": "24-bit",
};

export function ConcertCard({ concert }: { concert: Concert }) {
  const composer = concert.composers[0];
  const badges = concert.qualities
    .map((q) => QUALITY_BADGE[q])
    .filter(Boolean)
    .slice(0, 2);

  return (
    <Link
      href={`/title/${concert.slug}`}
      className="card-hover group block overflow-hidden rounded-lg border border-white/5 bg-ink-800/60"
    >
      <div className="relative aspect-video overflow-hidden bg-ink-700">
        {concert.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={concert.thumbnail_url}
            alt={concert.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-600">
            <span className="font-serif text-3xl text-gold-500/40">♪</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
        {badges.length > 0 && (
          <div className="absolute right-2 top-2 flex gap-1">
            {badges.map((b) => (
              <span
                key={b}
                className="rounded bg-ink-950/70 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold-400"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="clamp-2 font-serif text-base text-neutral-100 group-hover:text-gold-400">
          {concert.title}
        </h3>
        {composer && (
          <p className="mt-1 text-sm text-neutral-400">{composer}</p>
        )}
        <div className="mt-2 flex items-center gap-2 text-xs text-neutral-500">
          {concert.instruments[0] && <span>{concert.instruments[0]}</span>}
          {concert.duration && (
            <>
              <span className="text-neutral-700">·</span>
              <span>{concert.duration}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
