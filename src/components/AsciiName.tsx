"use client";

import { useEffect, useState } from "react";

const ASCII_ART = `
 ██████╗  █████╗ ██████╗ ████████╗██╗  ██╗
 ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║
 ██████╔╝███████║██████╔╝   ██║   ███████║
 ██╔═══╝ ██╔══██║██╔══██╗   ██║   ██╔══██║
 ██║     ██║  ██║██║  ██║   ██║   ██║  ██║
 ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
`.trimStart();

export default function AsciiName() {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = ASCII_ART.split("\n");

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines((v) => v + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, lines.length]);

  return (
    <pre
      className="text-emerald-400 text-[0.45rem] sm:text-[0.65rem] md:text-sm leading-none font-mono select-none overflow-hidden"
      aria-label="Parth"
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className="transition-all duration-300"
          style={{
            opacity: i < visibleLines ? 1 : 0,
            transform: i < visibleLines ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {line || "\u00A0"}
        </div>
      ))}
      <div
        className="mt-1 text-neutral-600 text-xs transition-all duration-500"
        style={{
          opacity: visibleLines >= lines.length ? 1 : 0,
          transform: visibleLines >= lines.length ? "translateY(0)" : "translateY(4px)",
        }}
      >
        (Parth, lol.)
      </div>
    </pre>
  );
}
