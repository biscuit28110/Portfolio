"use client";

export default function HeroBackgroundVideo() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/assets/videos/fond.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-blue-950/75 to-black/90" />
    </div>
  );
}
