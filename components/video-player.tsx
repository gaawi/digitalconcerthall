"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import type { Concert } from "@/lib/types";

export function VideoPlayer({ concert }: { concert: Concert }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (concert.video_type !== "hls" && concert.video_type !== "mp4") return;
    const video = videoRef.current;
    if (!video) return;

    if (concert.video_type === "mp4") {
      video.src = concert.video_url;
      return;
    }

    // HLS (Bunny Stream .m3u8)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS (Safari/iOS)
      video.src = concert.video_url;
    } else if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(concert.video_url);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [concert.video_type, concert.video_url]);

  const frame =
    "aspect-video w-full overflow-hidden  border border-white/10 bg-black shadow-2xl";

  if (concert.video_type === "vimeo" && concert.video_id) {
    return (
      <div className={frame}>
        <iframe
          src={`https://player.vimeo.com/video/${concert.video_id}?title=0&byline=0&portrait=0`}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={concert.title}
        />
      </div>
    );
  }

  if (concert.video_type === "youtube" && concert.video_id) {
    return (
      <div className={frame}>
        <iframe
          src={`https://www.youtube.com/embed/${concert.video_id}?rel=0`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={concert.title}
        />
      </div>
    );
  }

  if (concert.video_type === "audio") {
    return (
      <div className="border border-white/10 bg-ink-800 p-8">
        <div className="mb-6 flex items-center gap-3 text-gold-400">
          <span className="font-serif text-3xl">♪</span>
          <span className="text-sm uppercase tracking-widest text-neutral-500">
            Audio Recording
          </span>
        </div>
        {concert.video_url ? (
          <audio controls className="w-full" src={concert.video_url}>
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p className="text-sm text-neutral-500">
            Audio source not yet linked.
          </p>
        )}
      </div>
    );
  }

  if (concert.video_type === "hls" || concert.video_type === "mp4") {
    return (
      <div className={frame}>
        <video
          ref={videoRef}
          controls
          playsInline
          poster={concert.thumbnail_url || undefined}
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-video w-full items-center justify-center border border-white/10 bg-ink-800 text-neutral-500">
      Video source not yet available.
    </div>
  );
}
