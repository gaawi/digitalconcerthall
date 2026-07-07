import { Suspense } from "react";
import { getConcerts, getTaxonomies, filterConcerts } from "@/lib/concerts";
import { ConcertCard } from "@/components/concert-card";
import { CatalogFilters } from "@/components/catalog-filters";
import type { CatalogFilters as Filters } from "@/lib/types";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const sp = await searchParams;
  const filters: Filters = {
    q: sp.q,
    composer: sp.composer,
    instrument: sp.instrument,
    period: sp.period,
    nationality: sp.nationality,
    quality: sp.quality,
  };

  const [all, taxonomies] = await Promise.all([
    getConcerts(),
    getTaxonomies(),
  ]);
  const concerts = filterConcerts(all, filters);
  const featured = !hasFilters(filters) ? all[0] : undefined;
  const grid = featured ? concerts.filter((c) => c !== featured) : concerts;

  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      {featured && (
        <section className="mb-12 overflow-hidden rounded-2xl border border-white/5 bg-ink-800/50">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto">
              {featured.thumbnail_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.thumbnail_url}
                  alt={featured.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[240px] items-center justify-center bg-ink-700 text-5xl text-gold-500/30">
                  ♪
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-500">
                Now Featured
              </p>
              <h1 className="mt-3 font-serif text-3xl text-neutral-50">
                {featured.title}
              </h1>
              {featured.composers[0] && (
                <p className="mt-2 text-neutral-400">
                  {featured.composers.join(", ")}
                </p>
              )}
              <p className="clamp-3 mt-4 text-sm leading-relaxed text-neutral-400">
                {featured.description}
              </p>
              <a
                href={`/title/${featured.slug}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-medium text-ink-950 transition hover:bg-gold-400"
              >
                ▶ Watch Now
              </a>
            </div>
          </div>
        </section>
      )}

      <div className="mb-8">
        <h2 className="rule-gold font-serif text-2xl text-neutral-100">
          The Collection
        </h2>
        <p className="mt-4 text-sm text-neutral-500">
          {concerts.length} performance{concerts.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mb-8">
        <Suspense fallback={<div className="h-10" />}>
          <CatalogFilters taxonomies={taxonomies} />
        </Suspense>
      </div>

      {grid.length === 0 ? (
        <p className="py-20 text-center text-neutral-500">
          No performances match those filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {grid.map((c) => (
            <ConcertCard key={c.slug} concert={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function hasFilters(f: Filters) {
  return Object.values(f).some(Boolean);
}
