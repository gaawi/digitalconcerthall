import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getTaxonomies } from "@/lib/concerts";
import { supabaseConfigured } from "@/lib/supabase/server";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata = { title: "Editor" };

export default async function AdminPage() {
  if (!supabaseConfigured) {
    return (
      <Gate>
        Connect Supabase first, then add your email to the{" "}
        <code className="text-gold">admins</code> table.
      </Gate>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    return (
      <Gate>
        <Link href="/login?next=/admin" className="text-gold underline">
          Log in
        </Link>{" "}
        with an admin account to edit the catalog.
      </Gate>
    );
  }
  if (!user.isAdmin) {
    return (
      <Gate>
        Your account ({user.email}) isn&apos;t an editor. Add it to the{" "}
        <code className="text-gold">admins</code> table in Supabase to gain
        access.
      </Gate>
    );
  }

  const taxonomies = await getTaxonomies();
  return <AdminDashboard taxonomies={taxonomies} />;
}

function Gate({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 pt-6">
      <h1 className="px-1 text-[34px] font-bold text-white">Editor</h1>
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <span className="text-5xl text-gold/40">𝄞</span>
        <p className="max-w-sm text-sm text-neutral-400">{children}</p>
      </div>
    </div>
  );
}
