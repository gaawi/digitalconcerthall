"use client";

import type { Concert } from "@/lib/types";
import { useFavorites } from "@/lib/use-favorites";
import { ConcertRow } from "./concert-cards";

export function PlaylistsView({ concerts }: { concerts: Concert[] }) {
  const { slugs } = useFavorites();
  const saved = concerts.filter((c) => slugs.includes(c.slug));

  return (
    <div className="px-4 pt-6">
      <h1 className="px-1 text-[34px] font-bold text-white">Playlists</h1>
      <p className="px-1 pb-4 pt-1 text-[13px] text-neutral-400">
        Your saved performances
      </p>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center gap-3 pt-24 text-center">
          <span className="text-5xl text-gold/40">𝄞</span>
          <p className="text-neutral-300">No saved performances yet</p>
          <p className="max-w-xs text-sm text-neutral-500">
            Tap the heart on any concert to add it here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-[14px]">
          {saved.map((c) => (
            <ConcertRow key={c.slug} concert={c} />
          ))}
        </div>
      )}
    </div>
  );
}
