"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const showFirstFrame = () => {
      const video = videoRef.current;
      if (!video || !preference.matches) return;

      video.pause();
      video.currentTime = 0;
    };

    const syncPreference = () => {
      const video = videoRef.current;
      if (!video) return;

      if (preference.matches) {
        video.pause();
        if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
          video.currentTime = 0;
        } else {
          video.addEventListener("loadedmetadata", showFirstFrame, { once: true });
        }
        return;
      }

      video.removeEventListener("loadedmetadata", showFirstFrame);
      void video.play().catch(() => {
        // Muted inline playback is expected, but the hero remains usable if a
        // browser applies a stricter autoplay policy.
      });
    };

    syncPreference();
    preference.addEventListener?.("change", syncPreference);

    return () => {
      preference.removeEventListener?.("change", syncPreference);
      videoRef.current?.removeEventListener("loadedmetadata", showFirstFrame);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="home-hero__video"
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
    >
      <source
        media="(orientation: portrait)"
        src="/videos/ainfera-option-finale-portrait.mp4"
        type="video/mp4"
      />
      <source src="/videos/ainfera-option-finale-desktop.mp4" type="video/mp4" />
    </video>
  );
}
