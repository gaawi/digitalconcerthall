"use client";

import { useMemo, useState } from "react";
import type { Concert } from "@/lib/types";
import {
  centuryOf,
  groupByCentury,
  newestConcerts,
  type CenturyKey,
} from "@/lib/concert-utils";
import { HeroCard, ConcertCard, ConcertRow } from "./concert-cards";
import { CenturyChips } from "./century-chips";
import { FeaturedHero } from "./featured-hero";

export function HomeView({ concerts }: { concerts: Concert[] }) {
  const [category, setCategory] = useState<CenturyKey>("all");

  const featured = useMemo(
    () => newestConcerts(concerts, 1)[0],
    [concerts]
  );
  const newest = useMemo(() => newestConcerts(concerts, 10), [concerts]);
  const sections = useMemo(() => groupByCentury(concerts), [concerts]);
  const filtered = useMemo(() => {
    if (category === "all") return [];
    if (category === "new") return newest;
    return concerts.filter((c) => centuryOf(c) === category);
  }, [category, concerts, newest]);

  return (
    <div>
      {/* Netflix-style featured hero */}
      {featured && <FeaturedHero concert={featured} />}

      {/* New carousel */}
      {newest.length > 0 && (
        <section className="pb-[30px] pt-6">
          <SectionHeader title="New" sparkles />
          <div className="no-scrollbar flex gap-[14px] overflow-x-auto px-5">
            {newest.map((c) => (
              <HeroCard key={c.slug} concert={c} />
            ))}
          </div>
        </section>
      )}

      {/* Century chips */}
      <div className="pb-6">
        <CenturyChips selected={category} onSelect={setCategory} />
      </div>

      {/* All -> sections by century; else a filtered list */}
      {category === "all" ? (
        sections.map((section) => (
          <section key={section.key} className="pb-7">
            <SectionHeader title={section.label} />
            <div className="no-scrollbar flex gap-[14px] overflow-x-auto px-5">
              {section.concerts.map((c) => (
                <ConcertCard key={c.slug} concert={c} />
              ))}
            </div>
          </section>
        ))
      ) : filtered.length === 0 ? (
        <p className="pt-10 text-center text-neutral-400">
          No concerts here yet.
        </p>
      ) : (
        <div className="flex flex-col gap-[14px] px-5 pb-8">
          {filtered.map((c) => (
            <ConcertRow key={c.slug} concert={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function SectionHeader({
  title,
  sparkles,
}: {
  title: string;
  sparkles?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-5 pb-3">
      {sparkles && (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[13px] w-[13px] text-gold">
          <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
        </svg>
      )}
      <h2 className="text-[17px] font-semibold text-white">{title}</h2>
    </div>
  );
}
