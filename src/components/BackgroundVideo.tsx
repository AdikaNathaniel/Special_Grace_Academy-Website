"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Muted, looping YouTube video that covers its (relative, isolate) parent.
 * The video's thumbnail shows instantly; the player fades in once YouTube reports it is actually playing,
 * so visitors never see a blank box or YouTube's loading spinner.
 */
export default function BackgroundVideo({ youtubeId, start }: { youtubeId: string; start?: number }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const iframe = frame.current;
    if (!iframe) return;

    // YouTube's embed reports player state over postMessage once we say we're listening (requires enablejsapi=1).
    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow || typeof e.data !== "string") return;
      try {
        const msg = JSON.parse(e.data);
        const state = msg.event === "onStateChange" ? msg.info : msg.info?.playerState;
        // YouTube flashes its title bar for a moment after playback starts, so reveal just after that.
        if (state === 1) setTimeout(() => setPlaying(true), 1500);
      } catch {}
    };
    const listen = () => iframe.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: youtubeId }), "*");

    window.addEventListener("message", onMessage);
    iframe.addEventListener("load", listen);
    listen();
    // If the player never reports that it is playing (e.g. a phone blocking autoplay in low-power mode), the
    // thumbnail stays up rather than revealing a paused player with its play button.
    return () => {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", listen);
    };
  }, [youtubeId]);

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: youtubeId,
    controls: "0",
    playsinline: "1",
    modestbranding: "1",
    rel: "0",
    cc_load_policy: "0", // no captions
    iv_load_policy: "3", // no annotations
    disablekb: "1",
    enablejsapi: "1",
    ...(start ? { start: String(start) } : {}),
  });

  return (
    <div className="pointer-events-none absolute inset-0 -z-10" style={{ containerType: "size" }}>
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt=""
        fill
        preload
        // Straight from YouTube's image CDN: faster than resizing it on our server first.
        unoptimized
        className="object-cover"
      />
      <iframe
        ref={frame}
        title=""
        aria-hidden
        tabIndex={-1}
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`}
        allow="autoplay; encrypted-media"
        // scale-125 pushes YouTube's title bar, logo and "More videos" strip outside the visible area. On portrait
        // (phone) screens, scale further so the captions YouTube's mobile player shows on muted videos are cropped too.
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-125 border-0 portrait:scale-150 transition-opacity duration-700 motion-reduce:hidden ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        // Scale the 16:9 video to cover the area whatever its shape.
        style={{ width: "max(100cqw, 177.78cqh)", height: "max(100cqh, 56.25cqw)" }}
      />
    </div>
  );
}
