"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import TerminalButton from "@/components/TerminalButton";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Ctrl+K to toggle terminal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white relative">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Glow at top */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/[0.03] rounded-full blur-3xl pointer-events-none" />

      <main className="relative mx-auto max-w-3xl px-6 py-10 sm:py-16 flex flex-col gap-10">
        <Hero />

        {/* Divider */}
        <div className="flex items-center gap-4 font-mono text-xs text-neutral-700">
          <div className="flex-1 h-px bg-neutral-800" />
          <svg className="w-4 h-4 text-neutral-700" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
              <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg - 90) * Math.PI / 180;
                return (
                  <line
                    key={deg}
                    x1={24 + 6 * Math.cos(rad)}
                    y1={24 + 6 * Math.sin(rad)}
                    x2={24 + 20 * Math.cos(rad)}
                    y2={24 + 20 * Math.sin(rad)}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        <Experience />

        {/* Divider */}
        <div className="flex items-center gap-4 font-mono text-xs text-neutral-700">
          <div className="flex-1 h-px bg-neutral-800" />
          <svg className="w-4 h-4 text-neutral-700" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
              <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg - 90) * Math.PI / 180;
                return (
                  <line
                    key={deg}
                    x1={24 + 6 * Math.cos(rad)}
                    y1={24 + 6 * Math.sin(rad)}
                    x2={24 + 20 * Math.cos(rad)}
                    y2={24 + 20 * Math.sin(rad)}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>
          <div className="flex-1 h-px bg-neutral-800" />
        </div>

        <Projects />


        {/* Footer area */}
        <div className="flex items-center justify-between font-mono text-xs text-neutral-700 border-t border-neutral-800 pt-6">
          <span>parth kumar &copy; {new Date().getFullYear()}</span>
          <span className="text-neutral-600">
            press{" "}
            <kbd className="border border-neutral-800 rounded px-1.5 py-0.5 text-neutral-500">
              Ctrl+K
            </kbd>{" "}
            to open terminal
          </span>
        </div>
      </main>

      {/* Terminal popup */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {/* Terminal FAB */}
      {!terminalOpen && (
        <TerminalButton onClick={() => setTerminalOpen(true)} />
      )}
    </div>
  );
}
