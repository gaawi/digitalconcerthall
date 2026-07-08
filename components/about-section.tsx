"use client";

import { useState } from "react";

export function AboutSection({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  return (
    <div className="px-5 pb-5">
      <p className="text-[10px] font-semibold tracking-[1.5px] text-neutral-500">
        ABOUT THE CONCERT
      </p>
      <p
        className={`pt-[10px] text-[14px] font-light leading-relaxed text-white/85 ${
          expanded ? "" : "clamp-4"
        }`}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="pt-2 text-[13px] font-medium text-gold"
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
