"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
import { LogoStacked } from "./logo";

const BENEFITS = [
  {
    title: "Build your playlists",
    body: "Save concerts and favorite performances to watch or listen again.",
    icon: "heart",
  },
  {
    title: "Pick up where you left off",
    body: "Your library follows you across every device.",
    icon: "devices",
  },
  {
    title: "Never miss a premiere",
    body: "Be first to know about new releases and upcoming live concerts.",
    icon: "bell",
  },
  {
    title: "The best possible quality",
    body: "Stream in HD, 4K, and 24-bit lossless audio.",
    icon: "sparkle",
  },
];

export function AccountLanding() {
  const [error, setError] = useState<string | null>(null);

  async function google() {
    setError(null);
    if (!supabaseConfigured) {
      setError("Sign-in isn't configured yet.");
      return;
    }
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${siteUrl}/auth/callback?next=/account` },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="mx-auto max-w-md px-5 pt-10">
      <div className="flex flex-col items-center text-center">
        <LogoStacked className="h-28" />
        <h1 className="mt-8 text-2xl font-bold text-white sm:text-3xl">
          Your seat at the concert hall
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
          Create a free account to save concerts, build playlists, and follow
          everything CreArtBox performs — on any device.
        </p>
      </div>

      {/* Sign-in options */}
      <div className="mt-8 space-y-3">
        <button
          onClick={google}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
          </svg>
          Continue with Google
        </button>
        <Link
          href="/register"
          className="flex w-full items-center justify-center rounded-full bg-gold py-3 text-sm font-semibold text-black transition hover:bg-gold-light"
        >
          Sign up with email
        </Link>
        <p className="pt-1 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <Link href="/login" className="text-gold hover:underline">
            Log in
          </Link>
        </p>
        {error && (
          <p className="text-center text-sm text-red-400">{error}</p>
        )}
      </div>

      {/* Why join */}
      <div className="mt-12 space-y-5 border-t border-white/5 pt-8">
        {BENEFITS.map((b) => (
          <div key={b.title} className="flex gap-4">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gold/10 text-gold">
              <BenefitIcon name={b.icon} />
            </div>
            <div>
              <p className="text-[15px] font-medium text-white">{b.title}</p>
              <p className="text-sm text-neutral-400">{b.body}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="py-10 text-center text-xs text-neutral-600">
        Free to join. No payment required.
      </p>
    </div>
  );
}

function BenefitIcon({ name }: { name: string }) {
  const c = "h-5 w-5";
  if (name === "heart")
    return (
      <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 16.5 12 21 12 21Z" />
      </svg>
    );
  if (name === "devices")
    return (
      <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="14" height="10" rx="1.5" />
        <path d="M17 9h4a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1z" />
        <path d="M6 20h6" strokeLinecap="round" />
      </svg>
    );
  if (name === "bell")
    return (
      <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" className={c} fill="currentColor">
      <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8z" />
    </svg>
  );
}
