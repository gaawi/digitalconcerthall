"use client";

import { useFavorites } from "@/lib/use-favorites";

export function FavoriteButton({
  slug,
  size = 22,
  framed = false,
}: {
  slug: string;
  size?: number;
  framed?: boolean;
}) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(slug);

  const heart = (
    <svg
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
      fill={fav ? "#ef4444" : "none"}
      stroke={fav ? "#ef4444" : "currentColor"}
      strokeWidth="2"
    >
      <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21Z" />
    </svg>
  );

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      className={
        framed
          ? "flex h-[50px] w-[50px] items-center justify-center rounded-[13px] border border-gold/25 text-neutral-400"
          : "text-neutral-400"
      }
    >
      {heart}
    </button>
  );
}
