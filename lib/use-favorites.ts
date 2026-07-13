"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient, supabaseConfigured } from "./supabase/client";

const KEY = "cab:favorites";
const EVENT = "cab:favorites-changed";

function readLocal(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function writeLocal(arr: string[]) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

/**
 * Favorites that sync to Supabase when the user is signed in, and fall back to
 * per-device localStorage for guests. On sign-in, any guest favorites are
 * merged into the account.
 */
export function useFavorites() {
  const [slugs, setSlugs] = useState<string[]>([]);

  const reload = useCallback(async () => {
    if (!supabaseConfigured) {
      setSlugs(readLocal());
      return;
    }
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSlugs(readLocal());
      return;
    }
    // Merge any guest (localStorage) favorites into the account, once.
    const local = readLocal();
    if (local.length) {
      await supabase
        .from("favorites")
        .upsert(
          local.map((s) => ({ user_id: user.id, concert_slug: s })),
          { onConflict: "user_id,concert_slug" }
        );
      writeLocal([]);
    }
    const { data } = await supabase
      .from("favorites")
      .select("concert_slug")
      .eq("user_id", user.id);
    setSlugs((data ?? []).map((r) => r.concert_slug as string));
  }, []);

  useEffect(() => {
    reload();
    const onChange = () => reload();
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    let unsub = () => {};
    if (supabaseConfigured) {
      const { data } = createClient().auth.onAuthStateChange(() => reload());
      unsub = () => data.subscription.unsubscribe();
    }
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
      unsub();
    };
  }, [reload]);

  const toggle = useCallback(async (slug: string) => {
    const supabase = supabaseConfigured ? createClient() : null;
    const user = supabase
      ? (await supabase.auth.getUser()).data.user
      : null;

    if (user && supabase) {
      const { data: existing } = await supabase
        .from("favorites")
        .select("concert_slug")
        .eq("user_id", user.id)
        .eq("concert_slug", slug)
        .maybeSingle();
      if (existing) {
        await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("concert_slug", slug);
      } else {
        await supabase
          .from("favorites")
          .insert({ user_id: user.id, concert_slug: slug });
      }
    } else {
      const cur = readLocal();
      writeLocal(
        cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug]
      );
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const isFavorite = useCallback(
    (slug: string) => slugs.includes(slug),
    [slugs]
  );

  return { slugs, toggle, isFavorite };
}
