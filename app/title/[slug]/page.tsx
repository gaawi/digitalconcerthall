import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getConcertBySlug } from "@/lib/concerts";
import { getCurrentUser } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/supabase/server";
import { MediaSection } from "@/components/media-section";
import { FavoriteButton } from "@/components/favorite-button";
import { AboutSection } from "@/components/about-section";

// Everything is freely accessible — no login required to watch/listen.
const GATE_REQUIRES_LOGIN = false;
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
  const needsMembership = GATE_REQUIRES_PAYMENT && (!user || !user.isMember);
  const locked = supabaseConfigured && (needsLogin || needsMembership);

  const metaBadges = [
    concert.instruments.length
      ? { icon: "guitar", text: concert.instruments.join(", ") }
      : null,
    concert.periods.length ? { icon: "clock", text: concert.periods[0] } : null,
    concert.release_date
      ? { icon: "calendar", text: concert.release_date }
      : null,
  ].filter(Boolean) as { icon: string; text: string }[];

  return (
    <div>
      {/* ── Cinematic hero: blurred backdrop with the player floating on top ── */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
        {/* Blurred backdrop of this concert */}
        {concert.thumbnail_url && (
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={concert.thumbnail_url}
              alt=""
              className="h-full w-full scale-110 object-cover opacity-40 blur-2xl"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/70 via-ink-900/60 to-ink-900" />

        <div className="relative mx-auto max-w-content px-4 pb-8 pt-4 sm:px-8">
          {/* Back */}
          <Link
            href="/"
            aria-label="Back"
            className="mb-4 inline-flex items-center gap-1 text-sm text-gold hover:text-gold-light"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </Link>

          {/* Player, centered and framed */}
          <div className="mx-auto max-w-4xl">
            {locked ? (
              <LockedNotice needsMembership={needsMembership} slug={slug} />
            ) : (
              <MediaSection concert={concert} />
            )}
          </div>

          {/* Title block */}
          <div className="mx-auto flex max-w-4xl items-start gap-3 pt-6">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-gold sm:text-[15px]">
                {concert.composers.join(", ")}
              </p>
              <h1 className="pt-1.5 text-2xl font-bold leading-tight text-white sm:text-4xl">
                {concert.title}
              </h1>
              {metaBadges.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {metaBadges.map((b) => (
                    <span
                      key={b.icon + b.text}
                      className="clamp-1 border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-neutral-300 backdrop-blur sm:text-[12px]"
                    >
                      {b.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <FavoriteButton slug={concert.slug} size={24} framed />
          </div>
        </div>
      </section>

      {/* ── Details ── */}
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        {concert.performers.length > 0 && (
          <div className="pt-8">
            <p className="text-[10px] font-semibold tracking-[1.5px] text-neutral-500">
              PERFORMERS
            </p>
            <ul className="grid grid-cols-1 gap-x-8 pt-3 sm:grid-cols-2">
              {concert.performers.map((p) => (
                <li key={p} className="flex items-center gap-2 py-1">
                  <span className="h-1 w-1 bg-gold/50" />
                  <span className="text-[14px] text-white/90 sm:text-[15px]">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="my-6 h-px bg-neutral-500/20" />

        <AboutSection text={concert.description} />
        <div className="pb-16" />
      </div>
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
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 border border-gold/20 bg-ink-800 p-8 text-center">
      <span className="text-4xl text-gold/60">𝄞</span>
      <h2 className="text-lg font-semibold text-white">
        {needsMembership ? "Members-only performance" : "Sign in to watch"}
      </h2>
      <p className="max-w-sm text-sm text-neutral-400">
        {needsMembership
          ? "Become a member to stream the full CreArtBox collection."
          : "This performance is available to registered members. It's free to join."}
      </p>
      <div className="mt-2 flex gap-3">
        <Link
          href={`/login?next=/title/${slug}`}
          className="border border-white/15 px-5 py-2 text-sm text-neutral-200"
        >
          Log in
        </Link>
        <Link
          href={`/register?next=/title/${slug}`}
          className="bg-gold px-5 py-2 text-sm font-medium text-black"
        >
          {needsMembership ? "Become a member" : "Join free"}
        </Link>
      </div>
    </div>
  );
}
