"use client";

import { CENTURIES, type CenturyKey } from "@/lib/concert-utils";

function ChipIcon({ name }: { name: string }) {
  const cls = "h-3 w-3";
  switch (name) {
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
        </svg>
      );
    case "waveform":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={cls}
        >
          <path d="M3 12h2M8 6v12M13 3v18M18 8v8M21 11v2" />
        </svg>
      );
    case "piano":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M4 4h16v16H4zM9 4v9H8v3H6v-3H5V4zm5 0v9h-1v3h-2v-3h-1V4zm5 0v9h-1v3h-2v-3h-1V4z" />
        </svg>
      );
    case "guitar":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M18 2l4 4-3 1-1 2a5 5 0 0 1-3 8 5 5 0 1 1-4-8l2-1 1-3zM9 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      );
    case "note":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={cls}>
          <path d="M9 18V5l10-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm10-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        </svg>
      );
    default: // list
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={cls}
        >
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      );
  }
}

export function CenturyChips({
  selected,
  onSelect,
}: {
  selected: CenturyKey;
  onSelect: (k: CenturyKey) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-[10px] overflow-x-auto px-5">
      {CENTURIES.map((c) => {
        const active = selected === c.key;
        return (
          <button
            key={c.key}
            onClick={() => onSelect(c.key)}
            className={`flex h-9 shrink-0 items-center gap-[6px] rounded-[18px] px-[14px] text-[13px] transition ${
              active
                ? "bg-gold font-semibold text-black"
                : "border border-gold/20 bg-ink-800 text-neutral-400"
            }`}
          >
            <ChipIcon name={c.icon} />
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
