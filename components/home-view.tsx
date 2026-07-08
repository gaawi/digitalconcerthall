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

const CLEF = "𝄞";

export function HomeView({
  concerts,
  userName,
}: {
  concerts: Concert[];
  userName: string | null;
}) {
  const [category, setCategory] = useState<CenturyKey>("all");

  const newest = useMemo(() => newestConcerts(concerts, 10), [concerts]);
  const sections = useMemo(() => groupByCentury(concerts), [concerts]);
  const filtered = useMemo(() => {
    if (category === "all") return [];
    if (category === "new") return newest;
    return concerts.filter((c) => centuryOf(c) === category);
  }, [category, concerts, newest]);

  return (
    <div className="pt-4">
      {/* Greeting */}
      <div className="flex items-center px-5 pb-[22px] pt-4">
        <div className="flex-1">
          <p className="text-xs text-neutral-400">Welcome</p>
          <p className="pt-[3px] text-[22px] font-semibold text-white">
            {userName || "Listener"}
          </p>
        </div>
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gold/[0.12]">
          <span className="text-[22px] text-gold">{CLEF}</span>
        </div>
      </div>

      {/* New carousel */}
      {newest.length > 0 && (
        <section className="pb-[30px]">
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
