"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Taxonomies, FilterKey } from "@/lib/types";

const FILTERS: { key: FilterKey; label: string; tax: keyof Taxonomies }[] = [
  { key: "nationality", label: "Nationality", tax: "nationalities" },
  { key: "period", label: "Period", tax: "periods" },
  { key: "instrument", label: "Instrumentation", tax: "instruments" },
  { key: "composer", label: "Composer", tax: "composers" },
  { key: "quality", label: "Quality", tax: "qualities" },
];

export function CatalogFilters({
  taxonomies,
}: {
  taxonomies: Taxonomies;
}) {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/?${next.toString()}`, { scroll: false });
  }

  const hasActive = FILTERS.some((f) => params.get(f.key)) || params.get("q");

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="min-w-[200px] flex-1">
        <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
          Search
        </label>
        <input
          type="search"
          defaultValue={params.get("q") ?? ""}
          placeholder="Title, composer, performer…"
          onChange={(e) => update("q", e.target.value)}
          className="w-full rounded-md border border-white/10 bg-ink-800 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-gold-500/60"
        />
      </div>

      {FILTERS.map((f) => {
        const options = taxonomies[f.tax];
        if (!options?.length) return null;
        return (
          <div key={f.key} className="min-w-[150px]">
            <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
              {f.label}
            </label>
            <select
              value={params.get(f.key) ?? ""}
              onChange={(e) => update(f.key, e.target.value)}
              className="w-full rounded-md border border-white/10 bg-ink-800 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-gold-500/60"
            >
              <option value="">All</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      {hasActive && (
        <button
          onClick={() => router.push("/", { scroll: false })}
          className="rounded-md border border-white/10 px-3 py-2 text-sm text-neutral-400 hover:text-gold-400"
        >
          Clear
        </button>
      )}
    </div>
  );
}
