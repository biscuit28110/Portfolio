"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
};

export default function TypewriterText({ text, speed = 70 }: TypewriterTextProps) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleLength(text.length);
      return;
    }

    let currentLength = 0;

    // Reserve la largeur finale pendant que le texte s'affiche.
    const intervalId = window.setInterval(() => {
      currentLength += 1;
      setVisibleLength(currentLength);

      if (currentLength >= text.length) {
        window.clearInterval(intervalId);
      }
    }, speed);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [speed, text]);

  return (
    <span className="relative inline-block whitespace-nowrap" aria-label={text}>
      <span className="invisible" aria-hidden="true">
        {text}
      </span>
      <span className="absolute left-0 top-0" aria-hidden="true">
        {text.slice(0, visibleLength)}
      </span>
    </span>
  );
}
