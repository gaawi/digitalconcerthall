import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/sign-out-button";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const user = supabaseConfigured ? await getCurrentUser() : null;
  const name = user?.email ? user.email.split("@")[0] : null;

  return (
    <div className="px-4 pt-6">
      <h1 className="px-1 text-[34px] font-bold text-white">Profile</h1>

      {!user ? (
        <div className="flex flex-col items-center gap-4 pt-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/[0.12]">
            <span className="text-4xl text-gold">𝄞</span>
          </div>
          <p className="text-neutral-300">
            {supabaseConfigured
              ? "Sign in to manage your account and saved concerts."
              : "Accounts activate once Supabase is connected."}
          </p>
          {supabaseConfigured && (
            <div className="flex gap-3 pt-1">
              <Link
                href="/login"
                className="rounded-full border border-white/15 px-6 py-2 text-sm text-neutral-200"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-gold px-6 py-2 text-sm font-medium text-black"
              >
                Join free
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="pt-6">
          <div className="flex items-center gap-4 px-1">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/[0.12] text-2xl font-semibold uppercase text-gold">
              {name?.[0] ?? "♪"}
            </div>
            <div>
              <p className="text-[20px] font-semibold text-white">{name}</p>
              <p className="text-[13px] text-neutral-400">{user.email}</p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[14px] border border-gold/[0.08] bg-ink-700">
            <Row label="Membership">
              <span className={user.isMember ? "text-gold" : "text-neutral-400"}>
                {user.isMember ? "Active" : "Free account"}
              </span>
            </Row>
            <div className="h-px bg-white/5" />
            <Row label="Saved">
              <Link href="/playlists" className="text-gold">
                View playlists
              </Link>
            </Row>
          </div>

          <div className="mt-8 flex justify-center">
            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-4 text-[14px]">
      <span className="text-neutral-400">{label}</span>
      {children}
    </div>
  );
}
