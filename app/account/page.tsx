import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/supabase/server";

export const metadata = { title: "My Account" };

export default async function AccountPage() {
  if (!supabaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center text-neutral-400">
        <p>
          Accounts activate once Supabase is connected. See the README to
          finish setup.
        </p>
      </div>
    );
  }

  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="rule-gold font-serif text-3xl text-neutral-100">
        My Account
      </h1>

      <div className="mt-10 rounded-xl border border-white/5 bg-ink-800/50 p-6">
        <dl className="space-y-4 text-sm">
          <div className="flex justify-between border-b border-white/5 pb-4">
            <dt className="text-neutral-500">Email</dt>
            <dd className="text-neutral-200">{user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-neutral-500">Membership</dt>
            <dd>
              {user.isMember ? (
                <span className="text-gold-400">Active</span>
              ) : (
                <span className="text-neutral-400">Free account</span>
              )}
            </dd>
          </div>
        </dl>
      </div>

      <Link
        href="/"
        className="mt-8 inline-block text-sm text-gold-400 hover:underline"
      >
        ← Browse the collection
      </Link>
    </div>
  );
}
