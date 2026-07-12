import Link from "next/link";
import type { Concert } from "@/lib/types";
import { qualityBadge } from "@/lib/concert-utils";

const CLEF = "𝄞";

/** Hero card — the "New" carousel. Mobile ~240px, larger + zoom on desktop. */
export function HeroCard({ concert }: { concert: Concert }) {
  const badge = qualityBadge(concert);
  return (
    <Link
      href={`/title/${concert.slug}`}
      className="group block w-[240px] shrink-0 sm:w-[340px] lg:w-[400px]"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink-800 shadow-lg shadow-black/30 ring-0 ring-gold/50 transition duration-300 group-hover:scale-[1.04] group-hover:ring-2">
        {concert.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={concert.thumbnail_url}
            alt={concert.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <Placeholder />
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        {badge && (
          <span className="absolute right-2 top-2 rounded-[5px] bg-black/60 px-[7px] py-[3px] text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
      </div>
      <div className="pt-[10px]">
        <p className="clamp-1 text-[11px] text-gold sm:text-[13px]">
          {concert.composers[0]}
        </p>
        <p className="clamp-2 pt-[2px] text-[13px] font-semibold leading-tight text-white sm:text-[15px]">
          {concert.title}
        </p>
        {concert.performers[0] && (
          <p className="clamp-1 pt-[2px] text-[10px] text-neutral-400 sm:text-[12px]">
            {concert.performers.join("  |  ")}
          </p>
        )}
      </div>
    </Link>
  );
}

/** Century-section card. Mobile ~200px, larger + zoom on desktop. */
export function ConcertCard({ concert }: { concert: Concert }) {
  const badge = qualityBadge(concert);
  return (
    <Link
      href={`/title/${concert.slug}`}
      className="group block w-[200px] shrink-0 sm:w-[280px] lg:w-[320px]"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink-800 shadow-lg shadow-black/30 ring-0 ring-gold/50 transition duration-300 group-hover:scale-[1.04] group-hover:ring-2">
        {concert.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={concert.thumbnail_url}
            alt={concert.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <Placeholder />
        )}
        {badge && (
          <span className="absolute bottom-[6px] right-[6px] rounded-[5px] bg-black/[0.65] px-[6px] py-[3px] text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
      </div>
      <div className="pt-2">
        <p className="clamp-1 text-[10px] text-gold sm:text-[12px]">
          {concert.composers[0]}
        </p>
        <p className="clamp-2 pt-[2px] text-[12px] font-semibold leading-tight text-white sm:text-[14px]">
          {concert.title}
        </p>
      </div>
    </Link>
  );
}

/** Full-width list row, mirrors iOS ConcertRow. */
export function ConcertRow({ concert }: { concert: Concert }) {
  return (
    <Link
      href={`/title/${concert.slug}`}
      className="flex items-center gap-[14px] rounded-[14px] border border-gold/[0.07] bg-ink-700 p-[14px]"
    >
      <div className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-[10px] bg-ink-800">
        {concert.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={concert.thumbnail_url}
            alt={concert.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <Placeholder small />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="clamp-1 text-[11px] text-gold">{concert.composers[0]}</p>
        <p className="clamp-2 pt-[2px] text-[14px] font-semibold leading-tight text-white">
          {concert.title}
        </p>
        {concert.performers[0] && (
          <p className="clamp-1 pt-[2px] text-[11px] text-neutral-400">
            {concert.performers.join("  |  ")}
          </p>
        )}
      </div>
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 shrink-0 text-gold/70"
        fill="currentColor"
      >
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 5 7 5-7 5Z" />
      </svg>
    </Link>
  );
}

function Placeholder({ small }: { small?: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-ink-800">
      <span
        className={`${small ? "text-2xl" : "text-4xl"} text-gold/40`}
      >
        {CLEF}
      </span>
    </div>
  );
}
