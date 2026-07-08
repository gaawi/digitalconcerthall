"use client";

import { useEffect, useRef, useState } from "react";
import type { Concert } from "@/lib/types";

function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const i = Math.floor(s);
  return `${Math.floor(i / 60)}:${String(i % 60).padStart(2, "0")}`;
}

function LosslessBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-gold/10 px-[7px] py-[3px] text-[7.5px] font-bold tracking-[0.6px] text-gold/75">
      <svg viewBox="0 0 24 24" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M3 12h2M8 7v10M13 4v16M18 8v8M21 11v2" />
      </svg>
      LOSSLESS
    </span>
  );
}

function Bars({ playing }: { playing: boolean }) {
  return (
    <span className="flex h-[14px] w-[14px] items-end justify-center gap-[2px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-[3px] rounded-sm bg-gold"
          style={{
            height: 5,
            animation: playing
              ? `cabbars 0.9s ease-in-out ${i * 0.15}s infinite`
              : "none",
          }}
        />
      ))}
    </span>
  );
}

export function AudioPlayer({
  concert,
  variant = "hero",
}: {
  concert: Concert;
  variant?: "hero" | "compact";
}) {
  const tracks = concert.audio_tracks;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const current = tracks[index];

  // Load a track when the index changes.
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !current) return;
    a.src = current.url;
    a.load();
    if (playing) a.play().catch(() => setPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  }
  const prev = () => setIndex((i) => (i > 0 ? i - 1 : i));
  const next = () => setIndex((i) => (i < tracks.length - 1 ? i + 1 : i));

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    a.currentTime = pct * duration;
  }

  const art = variant === "hero" ? "h-60 w-60" : "h-[86px] w-[86px]";
  const progress = duration ? time / duration : 0;

  return (
    <div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => (index < tracks.length - 1 ? next() : setPlaying(false))}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Now Playing */}
      <div
        className={
          variant === "hero"
            ? "flex flex-col items-center pt-2"
            : "flex items-center gap-4"
        }
      >
        <div
          className={`${art} shrink-0 overflow-hidden rounded-2xl bg-ink-800 shadow-2xl`}
        >
          {concert.thumbnail_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={concert.thumbnail_url}
              alt={concert.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl text-gold/30">
              ♪
            </div>
          )}
        </div>

        <div
          className={
            variant === "hero"
              ? "flex flex-col items-center pt-5 text-center"
              : "min-w-0 flex-1"
          }
        >
          <p className="line-clamp-2 text-[19px] font-bold text-white">
            {current?.title ?? concert.title}
          </p>
          <p className="pt-1 text-[14px] text-gold">
            {concert.composers.join(", ")}
          </p>
          <div className="pt-2">
            <LosslessBadge />
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className={variant === "hero" ? "px-4 pt-7" : "pt-4"}>
        <div
          onClick={seek}
          className="group flex h-4 cursor-pointer items-center"
        >
          <div className="relative h-1 w-full rounded-full bg-white/12">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gold"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between pt-1 font-mono text-[11px] text-white/35">
          <span>{fmt(time)}</span>
          <span>-{fmt(Math.max(0, duration - time))}</span>
        </div>
      </div>

      {/* Controls */}
      <div
        className={`flex items-center justify-center ${
          variant === "hero" ? "gap-14 pt-6" : "gap-8 pt-4"
        }`}
      >
        <button onClick={prev} aria-label="Previous" className="text-white disabled:opacity-30" disabled={index === 0}>
          <svg viewBox="0 0 24 24" className={variant === "hero" ? "h-7 w-7" : "h-[18px] w-[18px]"} fill="currentColor">
            <path d="M6 6h2v12H6zm3 6 9 6V6z" />
          </svg>
        </button>
        <button
          onClick={toggle}
          aria-label="Play/Pause"
          className={`flex items-center justify-center rounded-full bg-gold text-black shadow-lg shadow-gold/30 ${
            variant === "hero" ? "h-[68px] w-[68px]" : "h-11 w-11"
          }`}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className={variant === "hero" ? "h-7 w-7" : "h-4 w-4"} fill="currentColor">
              <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className={variant === "hero" ? "h-7 w-7" : "h-4 w-4"} fill="currentColor">
              <path d="M7 5l12 7-12 7z" />
            </svg>
          )}
        </button>
        <button onClick={next} aria-label="Next" className="text-white disabled:opacity-30" disabled={index === tracks.length - 1}>
          <svg viewBox="0 0 24 24" className={variant === "hero" ? "h-7 w-7" : "h-[18px] w-[18px]"} fill="currentColor">
            <path d="M16 6h2v12h-2zM6 6l9 6-9 6z" />
          </svg>
        </button>
      </div>

      {/* Tracklist */}
      {tracks.length > 1 && (
        <div className="pt-8">
          <div className="flex items-center gap-[7px] pb-3">
            <svg viewBox="0 0 24 24" className="h-3 w-3 text-gold" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h11M4 12h11M4 17h7" />
              <circle cx="18.5" cy="16" r="2.2" fill="currentColor" stroke="none" />
              <path d="M20.7 16V9l-2 .6" strokeWidth="1.6" />
            </svg>
            <span className="text-[10px] font-semibold tracking-[1.5px] text-neutral-500">
              TRACKLIST
            </span>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-gold/[0.06] bg-ink-700">
            {tracks.map((t, i) => {
              const currentRow = i === index;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (i === index) toggle();
                    else {
                      setIndex(i);
                      setPlaying(true);
                    }
                  }}
                  className="flex w-full items-center gap-[14px] border-b border-white/[0.06] px-4 py-[13px] text-left last:border-0"
                >
                  <span className="flex w-[22px] justify-center">
                    {currentRow ? (
                      <Bars playing={playing} />
                    ) : (
                      <span className="font-mono text-[12px] text-neutral-500">
                        {i + 1}
                      </span>
                    )}
                  </span>
                  <span
                    className={`clamp-1 flex-1 text-[14px] ${
                      currentRow ? "text-gold" : "text-white"
                    }`}
                  >
                    {t.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes cabbars {
          0%,
          100% {
            height: 4px;
          }
          50% {
            height: 14px;
          }
        }
      `}</style>
    </div>
  );
}
