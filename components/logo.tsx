// Official CreArtBox logo system (from the brand study).
// Reversed variants — cream #F2EFE8 wordmark with the amber #FFC403 wedge —
// are the correct lockups on the dark "sala" background.

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo.svg"
      alt="CreArtBox"
      className={`${className} w-auto`}
    />
  );
}

/** Stacked lockup — for centered, vertical compositions. */
export function LogoStacked({ className = "h-24" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/logo-stacked.svg"
      alt="CreArtBox"
      className={`${className} w-auto`}
    />
  );
}

/** Monogram — for tight spaces (avatars, compact bars). */
export function LogoMonogram({ className = "h-8" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/monogram.svg"
      alt="CreArtBox"
      className={`${className} w-auto`}
    />
  );
}
