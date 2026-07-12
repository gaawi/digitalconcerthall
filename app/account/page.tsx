import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/sign-out-button";
import { AccountLanding } from "@/components/account-landing";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  if (!supabaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-5 pt-20 text-center text-neutral-400">
        <p>Accounts activate once Supabase is connected. See the README.</p>
      </div>
    );
  }

  const user = await getCurrentUser();
  if (!user) return <AccountLanding />;

  const name = user.email ? user.email.split("@")[0] : "Member";

  return (
    <div className="mx-auto max-w-2xl px-5 pt-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/[0.12] text-2xl font-semibold uppercase text-gold">
          {name[0]}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xl font-semibold text-white">{name}</p>
          <p className="truncate text-sm text-neutral-400">{user.email}</p>
        </div>
      </div>

      {/* Membership */}
      <div className="mt-8 rounded-2xl border border-gold/15 bg-gradient-to-br from-gold/[0.08] to-transparent p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
              Membership
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              {user.isMember ? "Free Member" : "Free account"}
            </p>
          </div>
          <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
            Active
          </span>
        </div>
        <p className="mt-2 text-sm text-neutral-400">
          You have full access to the CreArtBox collection.
        </p>
      </div>

      {/* Menu */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-ink-700">
        <Row href="/playlists" label="My Playlists" sub="Saved concerts & favorites" />
        <Divider />
        <Row href="/" label="Browse the collection" sub="54 performances" />
        <Divider />
        <Row
          href="https://creartbox.nyc/pages/calendar"
          external
          label="Upcoming live concerts"
          sub="Tickets & calendar at creartbox.nyc"
        />
        {user.isAdmin && (
          <>
            <Divider />
            <Row href="/admin" label="Catalog editor" sub="Add & edit concerts" />
          </>
        )}
      </div>

      {/* Support */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-ink-700">
        <Row
          href="https://creartbox.nyc"
          external
          label="About CreArtBox"
          sub="New York · Digital Concert Hall"
        />
      </div>

      <div className="mt-8 flex justify-center pb-4">
        <SignOutButton />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="ml-4 h-px bg-white/5" />;
}

function Row({
  href,
  label,
  sub,
  external,
}: {
  href: string;
  label: string;
  sub?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="flex items-center gap-3 px-4 py-4">
      <div className="min-w-0 flex-1">
        <p className="text-[15px] text-white">{label}</p>
        {sub && <p className="truncate text-[13px] text-neutral-500">{sub}</p>}
      </div>
      <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none text-neutral-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 6 6 6-6 6" />
      </svg>
    </div>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block transition hover:bg-white/[0.03]">
      {inner}
    </a>
  ) : (
    <Link href={href} className="block transition hover:bg-white/[0.03]">
      {inner}
    </Link>
  );
}
