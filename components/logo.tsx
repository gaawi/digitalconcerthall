// Official CreArtBox logo (white artwork on transparent — for dark backgrounds).
// Self-hosted at /logo-creartbox.png so it survives WordPress being retired.

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-creartbox.png"
      alt="CreArtBox — Digital Concert Hall"
      className={`${className} w-auto`}
    />
  );
}
