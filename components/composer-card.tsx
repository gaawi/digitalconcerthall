"use client";

import Link from "next/link";
import { useState } from "react";
import { composerPhotoURL } from "@/lib/concert-utils";

export function ComposerCard({
  name,
  count,
}: {
  name: string;
  count: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Link
      href={`/search?composer=${encodeURIComponent(name)}`}
      className="block overflow-hidden rounded-[14px] border border-gold/[0.08] bg-ink-700"
    >
      <div className="relative aspect-[16/10] bg-ink-800">
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={composerPhotoURL(name)}
            alt={name}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl text-gold/40">𝄞</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="clamp-1 text-[14px] font-semibold text-white">
            {name}
          </p>
          <p className="text-[11px] text-gold">
            {count} performance{count === 1 ? "" : "s"}
          </p>
        </div>
      </div>
    </Link>
  );
}
