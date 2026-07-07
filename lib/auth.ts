import "server-only";
import { createClient, supabaseConfigured } from "./supabase/server";

export interface CurrentUser {
  id: string;
  email: string | null;
  isMember: boolean;
}

/**
 * Returns the signed-in user (with membership status) or null.
 * Membership is read from the `memberships` table; any active row grants access.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!supabaseConfigured) return null;
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: membership } = await supabase
    .from("memberships")
    .select("status")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  return {
    id: user.id,
    email: user.email ?? null,
    isMember: !!membership,
  };
}
