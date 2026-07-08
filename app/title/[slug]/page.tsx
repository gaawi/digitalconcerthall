import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getConcertBySlug } from "@/lib/concerts";
import { getCurrentUser } from "@/lib/auth";
import { supabaseConfigured } from "@/lib/supabase/server";
import { qualityBadge } from "@/lib/concert-utils";
import { VideoPlayer } from "@/components/video-player";
import { FavoriteButton } from "@/components/favorite-button";
import { AboutSection } from "@/components/about-section";

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
  const needsMembership = GATE_REQUIRES_PAYMENT && (!user || !user.isMember);
  const locked = supabaseConfigured && (needsLogin || needsMembership);

  const badge = qualityBadge(concert);
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
      {/* Top bar with gold back chevron (iOS navigation) */}
      <div className="flex items-center px-4 py-3">
        <Link href="/" aria-label="Back" className="text-gold">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </Link>
      </div>

      {/* Player / hero */}
      <div className="px-5">
        {locked ? (
          <LockedNotice needsMembership={needsMembership} slug={slug} />
        ) : (
          <div className="relative">
            <VideoPlayer concert={concert} />
            {badge && (
              <span className="pointer-events-none absolute left-3 top-3 rounded-[6px] bg-black/60 px-[9px] py-1 text-[10px] font-bold text-white">
                {badge}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Info header */}
      <div className="flex items-start gap-3 px-5 pt-5">
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-gold">
            {concert.composers.join(", ")}
          </p>
          <h1 className="pt-[6px] text-[20px] font-bold leading-tight text-white">
            {concert.title}
          </h1>
        </div>
        <FavoriteButton slug={concert.slug} size={22} />
      </div>

      {/* Performers */}
      {concert.performers.length > 0 && (
        <div className="px-5 pt-4">
          <p className="text-[10px] font-semibold tracking-[1.5px] text-neutral-500">
            PERFORMERS
          </p>
          <ul className="pt-[6px]">
            {concert.performers.map((p) => (
              <li key={p} className="flex items-center gap-2 py-[2px]">
                <span className="h-1 w-1 rounded-full bg-gold/50" />
                <span className="text-[14px] text-white/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Meta badges */}
      {metaBadges.length > 0 && (
        <div className="flex flex-wrap gap-[10px] px-5 pt-[14px]">
          {metaBadges.map((b) => (
            <span
              key={b.icon + b.text}
              className="clamp-1 rounded-lg bg-ink-800 px-[9px] py-[5px] text-[11px] text-neutral-400"
            >
              {b.text}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="mx-5 my-4 h-px bg-neutral-500/20" />

      {/* About */}
      <AboutSection text={concert.description} />

      {/* CTA */}
      {!locked && (
        <div className="px-5 pb-10">
          <a
            href="#top"
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-[13px] bg-gradient-to-r from-gold via-gold-light to-gold text-[15px] font-semibold text-black"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M6 4l14 8-14 8z" />
            </svg>
            {concert.video_type === "audio" ? "Listen" : "Watch concert"}
          </a>
        </div>
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
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl border border-gold/20 bg-ink-800 p-8 text-center">
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
          className="rounded-full border border-white/15 px-5 py-2 text-sm text-neutral-200"
        >
          Log in
        </Link>
        <Link
          href={`/register?next=/title/${slug}`}
          className="rounded-full bg-gold px-5 py-2 text-sm font-medium text-black"
        >
          {needsMembership ? "Become a member" : "Join free"}
        </Link>
      </div>
    </div>
  );
}
