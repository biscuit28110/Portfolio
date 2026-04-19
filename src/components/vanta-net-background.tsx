"use client";

import { useEffect, useRef } from "react";

export default function VantaNetBackground() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!elRef.current || effectRef.current) {
        return;
      }

      const THREE = await import("three");
      (window as Window & { THREE?: unknown }).THREE = THREE;

      const vantaNet = (await import("vanta/dist/vanta.net.min")).default;

      if (!mounted || !elRef.current) {
        return;
      }

      effectRef.current = vantaNet({
        el: elRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: 0x0ea5e9,
        backgroundColor: 0x000000,
        points: 10,
        maxDistance: 20,
        spacing: 15,
        showDots: true,
      });
    };

    init();

    return () => {
      mounted = false;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return <div ref={elRef} className="absolute inset-0 z-0" aria-hidden="true" />;
}
