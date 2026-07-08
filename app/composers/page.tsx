import type { Metadata } from "next";
import { getConcerts } from "@/lib/concerts";
import { ComposerCard } from "@/components/composer-card";

export const metadata: Metadata = { title: "Composers" };

export default async function ComposersPage() {
  const concerts = await getConcerts();
  const counts = new Map<string, number>();
  for (const c of concerts)
    for (const comp of c.composers)
      counts.set(comp, (counts.get(comp) ?? 0) + 1);

  const composers = [...counts.entries()].sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <div className="px-4 pt-6">
      <h1 className="px-1 text-[34px] font-bold text-white">Composers</h1>
      <p className="px-1 pb-4 pt-1 text-[13px] text-neutral-400">
        Explore concerts by composer
      </p>
      <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-3 lg:grid-cols-4">
        {composers.map(([name, count]) => (
          <ComposerCard key={name} name={name} count={count} />
        ))}
      </div>
    </div>
  );
}
