import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getConcertBySlug, getConcerts } from "@/lib/concerts";
import { getCurrentUser } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/supabase/server";
import { VideoPlayer } from "@/components/video-player";

// Set to true to require an active membership to watch (gated).
// Today the WordPress site only has a free membership, so we gate on being
// logged in, not on payment. Flip GATE_REQUIRES_PAYMENT when you add plans.
const GATE_REQUIRES_LOGIN = true;
const GATE_REQUIRES_PAYMENT = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concert = await getConcertBySlug(slug);
  if (!concert) return { title: "Not found" };
  return {
    title: concert.title,
    description: concert.description.slice(0, 160),
  };
}

export default async function ConcertPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concert = await getConcertBySlug(slug);
  if (!concert) notFound();

  const user = await getCurrentUser();
  const needsLogin = GATE_REQUIRES_LOGIN && !user;
  const needsMembership =
    GATE_REQUIRES_PAYMENT && (!user || !user.isMember);
  // Before Supabase is connected the site runs in open "preview" mode so you
  // can see the players working; gating activates automatically once auth is on.
  const locked = supabaseConfigured && (needsLogin || needsMembership);

  const related = (await getConcerts())
    .filter(
      (c) =>
        c.slug !== concert.slug &&
        c.composers.some((x) => concert.composers.includes(x))
    )
    .slice(0, 4);

  const meta: [string, string[]][] = [
    ["Composer", concert.composers],
    ["Performers", concert.performers],
    ["Instrumentation", concert.instruments],
    ["Period", concert.periods],
    ["Quality", concert.qualities],
  ];

  return (
    <div className="mx-auto max-w-content px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-neutral-500 hover:text-gold-400"
      >
        ← Back to collection
      </Link>

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {locked ? (
            <LockedNotice needsMembership={needsMembership} slug={slug} />
          ) : (
            <VideoPlayer concert={concert} />
          )}

          <h1 className="mt-6 font-serif text-3xl text-neutral-50">
            {concert.title}
          </h1>
          {concert.duration && (
            <p className="mt-1 text-sm text-neutral-500">
              {concert.duration}
              {concert.release_date ? ` · ${concert.release_date}` : ""}
            </p>
          )}
          {concert.description && (
            <p className="mt-5 whitespace-pre-line leading-relaxed text-neutral-300">
              {concert.description}
            </p>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-ink-800/50 p-5">
            <h2 className="rule-gold font-serif text-lg text-neutral-100">
              Details
            </h2>
            <dl className="mt-6 space-y-4 text-sm">
              {meta
                .filter(([, vals]) => vals.length)
                .map(([label, vals]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-wide text-neutral-500">
                      {label}
                    </dt>
                    <dd className="mt-1 text-neutral-300">
                      {vals.join(", ")}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="rule-gold mb-8 font-serif text-xl text-neutral-100">
            More from {concert.composers[0]}
          </h2>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/title/${c.slug}`}
                className="card-hover group"
              >
                <div className="aspect-video overflow-hidden rounded-lg bg-ink-700">
                  {c.thumbnail_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.thumbnail_url}
                      alt={c.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="clamp-2 mt-2 text-sm text-neutral-300 group-hover:text-gold-400">
                  {c.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function LockedNotice({
  needsMembership,
  slug,
}: {
  needsMembership: boolean;
  slug: string;
}) {
  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-xl border border-gold-500/20 bg-ink-800/60 p-8 text-center">
      <span className="font-serif text-4xl text-gold-500/60">♪</span>
      <h2 className="font-serif text-xl text-neutral-100">
        {needsMembership
          ? "Members-only performance"
          : "Sign in to watch"}
      </h2>
      <p className="max-w-sm text-sm text-neutral-400">
        {needsMembership
          ? "Become a member to stream the full CreArtBox collection in HD, 4K, and lossless audio."
          : "This performance is available to registered members. It's free to join."}
      </p>
      <div className="mt-2 flex gap-3">
        <Link
          href={`/login?next=/title/${slug}`}
          className="rounded-full border border-white/15 px-5 py-2 text-sm text-neutral-200 hover:border-gold-500/60"
        >
          Log in
        </Link>
        <Link
          href={`/register?next=/title/${slug}`}
          className="rounded-full bg-gold-500 px-5 py-2 text-sm font-medium text-ink-950 hover:bg-gold-400"
        >
          {needsMembership ? "Become a member" : "Join free"}
        </Link>
      </div>
    </div>
  );
}
