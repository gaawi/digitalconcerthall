import Link from "next/link";
import type { CurrentUser } from "@/lib/auth";
import { SignOutButton } from "./sign-out-button";

const NAV = [
  { href: "/?nationality=American", label: "American" },
  { href: "/?nationality=European", label: "European" },
  { href: "/composers", label: "Composers" },
  { href: "/?instrument=Piano", label: "Instrumentation" },
];

export function SiteHeader({ user }: { user: CurrentUser | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-wide text-gold-400">
            CreArtBox
          </span>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-neutral-500 sm:inline">
            Digital Concert Hall
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="transition hover:text-gold-400"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          {user ? (
            <>
              <Link
                href="/account"
                className="text-sm text-neutral-300 hover:text-gold-400"
              >
                My Account
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-neutral-300 hover:text-gold-400"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-gold-500/60 px-4 py-1.5 text-sm text-gold-400 transition hover:bg-gold-500 hover:text-ink-950"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
