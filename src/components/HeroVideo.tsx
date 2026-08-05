"use client";

import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setMotionAllowed(!preference.matches);

    syncPreference();
    preference.addEventListener?.("change", syncPreference);

    return () => preference.removeEventListener?.("change", syncPreference);
  }, []);

  if (!motionAllowed) return null;

  return (
    <video
      className="home-hero__video"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
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
