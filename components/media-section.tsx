"use client";

import { useState } from "react";
import type { Concert } from "@/lib/types";
import { qualityBadge } from "@/lib/concert-utils";
import { VideoPlayer } from "./video-player";
import { AudioPlayer } from "./audio-player";

const VIDEO_TYPES = ["hls", "vimeo", "youtube", "mp4"];

export function MediaSection({ concert }: { concert: Concert }) {
  const hasVideo = VIDEO_TYPES.includes(concert.video_type);
  const hasAudio = concert.audio_tracks.length > 0;
  const [mode, setMode] = useState<"video" | "audio">(
    hasVideo ? "video" : "audio"
  );
  const badge = qualityBadge(concert);

  // Audio-only concert.
  if (!hasVideo && hasAudio) {
    return <AudioPlayer concert={concert} variant="hero" />;
  }

  // Video + audio → toggle.
  if (hasVideo && hasAudio) {
    return (
      <div>
        {mode === "video" ? (
          <div className="relative">
            <VideoPlayer concert={concert} />
            {badge && (
              <span className="pointer-events-none absolute left-3 top-3 bg-black/60 px-[9px] py-1 text-[10px] font-bold text-white">
                {badge}
              </span>
            )}
          </div>
        ) : (
          <AudioPlayer concert={concert} variant="compact" />
        )}

        {/* Toggle */}
        <div className="mt-[14px] flex gap-1 border border-gold/10 bg-ink-800 p-1">
          <ToggleBtn
            active={mode === "video"}
            onClick={() => setMode("video")}
            label="Video"
            icon="video"
          />
          <ToggleBtn
            active={mode === "audio"}
            onClick={() => setMode("audio")}
            label="Lossless Audio"
            icon="wave"
          />
        </div>
      </div>
    );
  }

  // Video only.
  return (
    <div className="relative">
      <VideoPlayer concert={concert} />
      {badge && (
        <span className="pointer-events-none absolute left-3 top-3 bg-black/60 px-[9px] py-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: "video" | "wave";
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-[38px] flex-1 items-center justify-center gap-[6px] text-[13px] transition ${
 active ? "bg-gold font-semibold text-black" : "text-neutral-400"
 }`}
    >
      {icon === "video" ? (
        <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="currentColor">
          <path d="M4 5h11a2 2 0 0 1 2 2v2l4-2v10l-4-2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-[13px] w-[13px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M3 12h2M8 7v10M13 4v16M18 8v8M21 11v2" />
        </svg>
      )}
      {label}
    </button>
  );
}
