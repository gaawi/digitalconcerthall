"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Concert } from "@/lib/types";
import { ConcertRow } from "./concert-cards";

export function SearchView({ concerts }: { concerts: Concert[] }) {
  const params = useSearchParams();
  const composer = params.get("composer") || "";
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return concerts.filter((c) => {
      if (composer && !c.composers.includes(composer)) return false;
      if (!query) return true;
      return (
        c.title.toLowerCase().includes(query) ||
        c.composers.some((x) => x.toLowerCase().includes(query)) ||
        c.performers.some((x) => x.toLowerCase().includes(query)) ||
        c.instruments.some((x) => x.toLowerCase().includes(query))
      );
    });
  }, [q, composer, concerts]);

  return (
    <div className="px-4 pt-6">
      <h1 className="px-1 text-[34px] font-bold text-white">
        {composer || "Search"}
      </h1>

      <div className="relative pb-4 pt-3">
        <svg
          viewBox="0 0 24 24"
          className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-[3px] text-neutral-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Title, composer, performer, instrument…"
          className="h-11 w-full border border-white/10 bg-ink-800 pl-11 pr-4 text-[15px] text-white outline-none placeholder:text-neutral-500 focus:border-gold/50"
        />
      </div>

      <p className="px-1 pb-3 text-[12px] text-neutral-500">
        {results.length} result{results.length === 1 ? "" : "s"}
      </p>

      {results.length === 0 ? (
        <p className="pt-16 text-center text-neutral-400">No matches.</p>
      ) : (
        <div className="flex flex-col gap-[14px]">
          {results.map((c) => (
            <ConcertRow key={c.slug} concert={c} />
          ))}
        </div>
      )}
    </div>
  );
}
