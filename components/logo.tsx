// CreArtBox logo — a gold "C" medallion cradling a musical note (Concert + music),
// with an optional wordmark. Pure SVG so it stays crisp at any size.

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="CreArtBox">
      <defs>
        <linearGradient id="cabGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2d98c" />
          <stop offset="0.5" stopColor="#d9b85e" />
          <stop offset="1" stopColor="#bf9e45" />
        </linearGradient>
      </defs>

      {/* Badge — the "Box" */}
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="16"
        fill="#0f0d17"
        stroke="url(#cabGold)"
        strokeWidth="2.5"
      />

      {/* Open "C" arc */}
      <path
        d="M42 20.5 A15 15 0 1 0 42 43.5"
        fill="none"
        stroke="url(#cabGold)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Music note: head + stem sitting in the C's opening */}
      <ellipse cx="40.5" cy="41" rx="5.4" ry="4.3" fill="url(#cabGold)" />
      <rect x="44.4" y="19" width="2.6" height="22.5" rx="1.3" fill="url(#cabGold)" />
      <path
        d="M47 19 q6 1.5 6 7 q-3.4 -3.2 -6 -2.4 Z"
        fill="url(#cabGold)"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  markClass = "h-9 w-9",
  showTagline = true,
}: {
  className?: string;
  markClass?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClass} />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-semibold tracking-tight text-gold">
          CreArtBox
        </span>
        {showTagline && (
          <span className="pt-0.5 text-[9px] uppercase tracking-[0.28em] text-white/50">
            Digital Concert Hall
          </span>
        )}
      </span>
    </span>
  );
}
