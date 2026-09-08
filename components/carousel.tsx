"use client";

import { useEffect, useRef, useState } from "react";

/** Horizontal scroller with mouse-friendly arrow buttons (desktop) + native
 *  swipe (mobile). */
export function Carousel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function update() {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function scroll(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="group/car relative">
      <div
        ref={ref}
        onScroll={update}
        className="no-scrollbar flex gap-[14px] overflow-x-auto px-5 py-2 sm:gap-5"
      >
        {children}
      </div>

      {/* Left arrow */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scroll(-1)}
        className={`absolute left-2 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/10 bg-ink-950/70 text-white backdrop-blur transition hover:bg-ink-950/90 sm:flex ${
 atStart
 ? "pointer-events-none opacity-0"
 : "opacity-0 group-hover/car:opacity-100"
 }`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 6-6 6 6 6" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scroll(1)}
        className={`absolute right-2 top-[38%] hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/10 bg-ink-950/70 text-white backdrop-blur transition hover:bg-ink-950/90 sm:flex ${
 atEnd
 ? "pointer-events-none opacity-0"
 : "opacity-0 group-hover/car:opacity-100"
 }`}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
