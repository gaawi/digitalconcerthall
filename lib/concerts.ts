import "server-only";
import type { Concert, Taxonomies, CatalogFilters } from "./types";
import { createClient, supabaseConfigured } from "./supabase/server";
import concertsJson from "@/data/concerts.json";
import taxonomiesJson from "@/data/taxonomies.json";

const localConcerts = concertsJson as unknown as Concert[];
const localTaxonomies = taxonomiesJson as unknown as Taxonomies;

/**
 * Fetch all published concerts. Reads from Supabase when configured, otherwise
 * falls back to the migrated local JSON so the site works before setup.
 */
export async function getConcerts(): Promise<Concert[]> {
  if (supabaseConfigured) {
    const supabase = await createClient();
    const { data, error } = await supabase!
      .from("concerts")
      .select("*")
      .eq("published", true)
      .order("release_date", { ascending: false });
    // Fall back to local JSON on error OR before the table has been seeded,
    // so the site is never blank during setup.
    if (!error && data && data.length) return data as Concert[];
  }
  return localConcerts.filter((c) => c.published);
}

export async function getConcertBySlug(
  slug: string
): Promise<Concert | null> {
  if (supabaseConfigured) {
    const supabase = await createClient();
    const { data } = await supabase!
      .from("concerts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (data) return data as Concert;
    // Not seeded yet — fall back to local JSON.
  }
  return localConcerts.find((c) => c.slug === slug) ?? null;
}

export async function getTaxonomies(): Promise<Taxonomies> {
  // Taxonomies are small and stable — derive from whatever concert set we have.
  const concerts = await getConcerts();
  const collect = (key: keyof Concert) => {
    const set = new Set<string>();
    for (const c of concerts) {
      const v = c[key];
      if (Array.isArray(v)) v.forEach((x) => set.add(String(x)));
    }
    return [...set].sort();
  };
  const derived: Taxonomies = {
    composers: collect("composers"),
    instruments: collect("instruments"),
    periods: collect("periods"),
    nationalities: collect("nationalities"),
    qualities: collect("qualities"),
    performers: collect("performers"),
  };
  // If Supabase isn't set up the derived list still works; keep local as a
  // safety net when the catalog is empty.
  return derived.composers.length ? derived : localTaxonomies;
}

/** In-memory filtering shared by both data sources. */
export function filterConcerts(
  concerts: Concert[],
  filters: CatalogFilters
): Concert[] {
  const q = filters.q?.trim().toLowerCase();
  return concerts.filter((c) => {
    if (
      q &&
      !(
        c.title.toLowerCase().includes(q) ||
        c.composers.some((x) => x.toLowerCase().includes(q)) ||
        c.performers.some((x) => x.toLowerCase().includes(q))
      )
    )
      return false;
    if (filters.composer && !c.composers.includes(filters.composer))
      return false;
    if (filters.instrument && !c.instruments.includes(filters.instrument))
      return false;
    if (filters.period && !c.periods.includes(filters.period)) return false;
    if (
      filters.nationality &&
      !c.nationalities.includes(filters.nationality)
    )
      return false;
    if (filters.quality && !c.qualities.includes(filters.quality))
      return false;
    return true;
  });
}
