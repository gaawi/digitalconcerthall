import Link from "next/link";
import type { Metadata } from "next";
import { getConcerts } from "@/lib/concerts";

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
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <h1 className="rule-gold font-serif text-3xl text-neutral-100">
        Composers
      </h1>
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
        {composers.map(([name, count]) => (
          <Link
            key={name}
            href={`/?composer=${encodeURIComponent(name)}`}
            className="flex items-baseline justify-between border-b border-white/5 py-2 text-neutral-300 transition hover:text-gold-400"
          >
            <span>{name}</span>
            <span className="text-xs text-neutral-600">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
