"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Concert } from "@/lib/types";
import { qualityBadge } from "@/lib/concert-utils";
import { Logo } from "./logo";

const ROTATE_MS = 7000;

/** Full-bleed, auto-rotating Apple-TV-style hero. */
export function FeaturedHero({ concerts }: { concerts: Concert[] }) {
  const slides = concerts.filter((c) => c.thumbnail_url).slice(0, 6);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(
      () => setI((n) => (n + 1) % slides.length),
      ROTATE_MS
    );
    return () => clearInterval(t);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;
  const active = slides[i];
  const badge = qualityBadge(active);

  return (
    <section
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[72vh] max-h-[860px] min-h-[440px] w-full overflow-hidden lg:h-[88vh]">
        {/* Crossfading backdrops */}
        {slides.map((s, n) => (
          <img
            // eslint-disable-next-line @next/next/no-img-element
            key={s.slug}
            src={s.thumbnail_url}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${
              n === i ? "opacity-100" : "opacity-0"
            } ${n === i ? "animate-kenburns" : ""}`}
          />
        ))}

        {/* Legibility gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-ink-900/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/25 to-transparent" />

        {/* Prev / next — paired bottom-right so they never collide with the
            headline column on the left. */}
        {slides.length > 1 && (
          <div className="absolute bottom-14 right-5 z-10 hidden gap-2 sm:flex sm:bottom-16 sm:right-10 lg:bottom-20">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setI((n) => (n - 1 + slides.length) % slides.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-papel/20 bg-sala/50 text-papel backdrop-blur transition hover:border-acento/60 hover:text-acento"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setI((n) => (n + 1) % slides.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-papel/20 bg-sala/50 text-papel backdrop-blur transition hover:border-acento/60 hover:text-acento"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        )}

        {/* Brand */}
        <div className="absolute inset-x-0 top-0 px-5 pt-4 sm:px-10">
          <Logo className="h-8 sm:h-10" />
        </div>

        {/* Content (re-animates per slide) */}
        <div
          key={active.slug}
          className="animate-fadein absolute inset-x-0 bottom-0 px-5 pb-14 sm:px-10 sm:pb-16 lg:pb-20"
        >
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 pb-3 text-[11px] uppercase tracking-[0.22em] text-gold sm:text-xs">
              <span>Featured</span>
              {badge && (
                <>
                  <span className="text-white/30">•</span>
                  <span className="text-white/70">{badge}</span>
                </>
              )}
              {active.periods[0] && (
                <>
                  <span className="text-white/30">•</span>
                  <span className="text-white/70">{active.periods[0]}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold leading-tight text-white drop-shadow sm:text-5xl lg:text-6xl">
              {active.title}
            </h1>
            {active.composers[0] && (
              <p className="pt-2 text-base text-gold sm:text-xl">
                {active.composers.join(", ")}
              </p>
            )}
            {active.description && (
              <p className="clamp-2 max-w-xl pt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                {active.description}
              </p>
            )}

            <div className="flex items-center gap-3 pt-6">
              <Link
                href={`/title/${active.slug}`}
                className="flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-black transition hover:bg-gold-light sm:text-base"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M6 4l14 8-14 8z" />
                </svg>
                Play
              </Link>
              <Link
                href={`/title/${active.slug}`}
                className="flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10 sm:text-base"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5M12 8h.01" strokeLinecap="round" />
                </svg>
                Details
              </Link>
            </div>

            {/* Slide indicators */}
            {slides.length > 1 && (
              <div className="flex gap-2 pt-7">
                {slides.map((s, n) => (
                  <button
                    key={s.slug}
                    onClick={() => setI(n)}
                    aria-label={`Slide ${n + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      n === i ? "w-7 bg-gold" : "w-3 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
