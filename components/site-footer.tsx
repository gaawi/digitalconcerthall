import Link from "next/link";
import { LogoStacked } from "./logo";

const PROGRAM = [
  { label: "Browse the collection", href: "/" },
  { label: "Composers", href: "/composers" },
  { label: "Search", href: "/search" },
];

const CREARTBOX = [
  { label: "About CreArtBox", href: "https://creartbox.nyc" },
  { label: "Upcoming concerts", href: "https://creartbox.nyc/pages/calendar" },
  { label: "Festival ADAR", href: "https://festivaladar.com" },
];

export function SiteFooter() {
  return (
    <footer className="mt-secc border-t border-filete">
      <div className="mx-auto max-w-content px-5 py-12 sm:px-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          {/* Brand lockup */}
          <div className="flex flex-col items-start gap-3">
            <LogoStacked className="h-24" />
            <div className="flex items-center gap-2.5">
              <span className="h-[2px] w-7 flex-none bg-acento" />
              <span className="font-display text-[12px] tracking-[0.14em] text-papel-medio">
                Digital Concert Hall
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <nav>
              <p className="eyebrow pb-3">Program</p>
              <ul className="space-y-2">
                {PROGRAM.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-papel-medio transition hover:text-acento"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav>
              <p className="eyebrow pb-3">CreArtBox</p>
              <ul className="space-y-2">
                {CREARTBOX.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-papel-medio transition hover:text-acento"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1 border-t border-filete pt-6 text-[12px] text-papel-mudo sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} CreArtBox · New York</p>
          <p>Supported by the New York State Council on the Arts</p>
        </div>
      </div>
    </footer>
  );
}
