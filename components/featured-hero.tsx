import Link from "next/link";
import type { Concert } from "@/lib/types";
import { qualityBadge } from "@/lib/concert-utils";
import { Logo } from "./logo";

/** Full-bleed, Netflix-style hero for the top of the home page. */
export function FeaturedHero({ concert }: { concert: Concert }) {
  const badge = qualityBadge(concert);
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      <div className="relative h-[72vh] max-h-[680px] min-h-[440px] w-full overflow-hidden">
        {/* Backdrop */}
        {concert.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={concert.thumbnail_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-900" />
        )}

        {/* Legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/25 to-transparent" />

        {/* Brand bar */}
        <div className="absolute inset-x-0 top-0 px-5 pt-4 sm:px-8">
          <Logo markClass="h-9 w-9" />
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:px-8 sm:pb-12">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 pb-3 text-[11px] uppercase tracking-[0.2em] text-gold">
              <span>Featured</span>
              {badge && (
                <>
                  <span className="text-white/30">•</span>
                  <span className="text-white/70">{badge}</span>
                </>
              )}
              {concert.periods[0] && (
                <>
                  <span className="text-white/30">•</span>
                  <span className="text-white/70">{concert.periods[0]}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow sm:text-5xl">
              {concert.title}
            </h1>
            {concert.composers[0] && (
              <p className="pt-2 text-base text-gold sm:text-lg">
                {concert.composers.join(", ")}
              </p>
            )}
            {concert.description && (
              <p className="clamp-2 max-w-xl pt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                {concert.description}
              </p>
            )}

            <div className="flex items-center gap-3 pt-6">
              <Link
                href={`/title/${concert.slug}`}
                className="flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-black transition hover:bg-gold-light sm:text-base"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M6 4l14 8-14 8z" />
                </svg>
                Play
              </Link>
              <Link
                href={`/title/${concert.slug}`}
                className="flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10 sm:text-base"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
                </svg>
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
