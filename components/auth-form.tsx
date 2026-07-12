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

  async function signInWithGoogle() {
    setError(null);
    if (!supabaseConfigured) {
      setError(
        "Authentication isn't configured yet. Add your Supabase keys to .env.local."
      );
      return;
    }
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${siteUrl}/auth/callback?next=${next}` },
    });
    if (error) setError(error.message);
  }

  const copy = COPY[mode];

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="pb-8">
        <Logo className="h-11" />
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

      {mode !== "reset" && (
        <>
          <div className="my-6 flex items-center gap-3 text-xs text-neutral-500">
            <span className="h-px flex-1 bg-white/10" />
            or
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <button
            type="button"
            onClick={signInWithGoogle}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
            </svg>
            Continue with Google
          </button>
        </>
      )}

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
