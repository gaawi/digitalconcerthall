"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/search", label: "Search", icon: SearchIcon },
  { href: "/composers", label: "Composers", icon: PeopleIcon },
  { href: "/playlists", label: "Playlists", icon: ListIcon },
  { href: "/account", label: "Profile", icon: ProfileIcon },
];

export function TabBar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/5 bg-ink-900/[0.97] backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-stretch justify-around">
        {TABS.map((t) => {
          const active = isActive(t.href);
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="flex flex-1 flex-col items-center gap-1 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
            >
              <Icon
                className={`h-6 w-6 ${
                  active ? "text-gold" : "text-neutral-400/60"
                }`}
              />
              <span
                className={`text-[10px] ${
                  active ? "text-gold" : "text-neutral-400/60"
                }`}
              >
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 3 2 12h3v8h5v-6h4v6h5v-8h3z" />
    </svg>
  );
}
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM8 13c-3 0-6 1.5-6 4.5V20h9v-2.5c0-1.2.5-2.3 1.3-3.2C11.4 13.4 9.8 13 8 13Zm8 0c-.7 0-1.4.1-2 .3 1.2 1 2 2.3 2 3.9V20h6v-2.5c0-3-3-4.5-6-4.5Z" />
    </svg>
  );
}
function ListIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
    >
      <path d="M4 7h11M4 12h11M4 17h7" />
      <circle cx="18" cy="16" r="2.5" fill="currentColor" stroke="none" />
      <path d="M20.5 16V9l-2 .6" strokeWidth="1.6" />
    </svg>
  );
}
function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z" />
    </svg>
  );
}
