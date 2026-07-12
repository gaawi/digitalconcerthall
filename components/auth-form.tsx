"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
import { Logo } from "./logo";

type Mode = "login" | "register" | "reset";

const COPY: Record<Mode, { title: string; cta: string }> = {
  login: { title: "Log in", cta: "Log in" },
  register: { title: "Create your account", cta: "Join free" },
  reset: { title: "Reset your password", cta: "Send reset link" },
};

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!supabaseConfigured) {
      setError(
        "Authentication isn't configured yet. Add your Supabase keys to .env.local."
      );
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push(next);
        router.refresh();
      } else if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${siteUrl}/auth/callback?next=${next}` },
        });
        if (error) throw error;
        setNotice(
          "Check your email to confirm your account, then log in."
        );
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${siteUrl}/auth/callback?next=/account`,
        });
        if (error) throw error;
        setNotice("If that email exists, a reset link is on its way.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const copy = COPY[mode];

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="pb-8">
        <Logo markClass="h-11 w-11" />
      </div>
      <h1 className="text-2xl font-semibold text-white">{copy.title}</h1>

      <form onSubmit={onSubmit} className="mt-10 space-y-4">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-ink-800 px-3 py-2.5 text-neutral-200 outline-none focus:border-gold-500/60"
          />
        </div>

        {mode !== "reset" && (
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-ink-800 px-3 py-2.5 text-neutral-200 outline-none focus:border-gold-500/60"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}
        {notice && <p className="text-sm text-gold-400">{notice}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gold-500 py-2.5 font-medium text-ink-950 transition hover:bg-gold-400 disabled:opacity-50"
        >
          {loading ? "…" : copy.cta}
        </button>
      </form>

      <div className="mt-6 space-y-2 text-sm text-neutral-500">
        {mode === "login" && (
          <>
            <p>
              New here?{" "}
              <Link href="/register" className="text-gold-400 hover:underline">
                Create an account
              </Link>
            </p>
            <p>
              <Link href="/reset-password" className="hover:text-gold-400">
                Forgot your password?
              </Link>
            </p>
          </>
        )}
        {mode === "register" && (
          <p>
            Already a member?{" "}
            <Link href="/login" className="text-gold-400 hover:underline">
              Log in
            </Link>
          </p>
        )}
        {mode === "reset" && (
          <p>
            <Link href="/login" className="hover:text-gold-400">
              Back to log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
