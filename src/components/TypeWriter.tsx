"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  text: string;
  delay?: number;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypeWriter({
  text,
  delay = 40,
  startDelay = 0,
  className = "",
  onComplete,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, delay);
      return () => clearTimeout(timeout);
    } else if (!done) {
      setDone(true);
      onComplete?.();
    }
  }, [started, displayed, text, delay, done, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {!done && started && (
        <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  );
}
