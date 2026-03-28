"use client";

import { useState } from "react";
import { siteData } from "@/data";
import AsciiName from "./AsciiName";
import TypeWriter from "./TypeWriter";

export default function Hero() {
  const [showRole, setShowRole] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  return (
    <section className="flex flex-col gap-3">
      {/* ASCII art name */}
      <div className="relative">
        <div className="absolute -inset-4 bg-emerald-400/5 blur-3xl rounded-full pointer-events-none" />
        <AsciiName />
      </div>

      {/* Role line - typed out */}
      <div className="font-mono text-sm sm:text-base">
        <span className="text-neutral-600">{">"} </span>
        <TypeWriter
          text={`${siteData.role} @ ${siteData.company}`}
          delay={35}
          startDelay={600}
          className="text-emerald-400"
          onComplete={() => setShowRole(true)}
        />
      </div>

      {/* Location */}
      <div
        className="font-mono text-sm transition-all duration-500"
        style={{
          opacity: showRole ? 1 : 0,
          transform: showRole ? "translateY(0)" : "translateY(4px)",
        }}
      >
        <span className="text-neutral-600">{">"} </span>
        <TypeWriter
          text={siteData.location}
          delay={35}
          startDelay={showRole ? 100 : 99999}
          className="text-neutral-500"
          onComplete={() => setShowBio(true)}
        />
      </div>

      {/* Bio */}
      <div
        className="transition-all duration-700"
        style={{
          opacity: showBio ? 1 : 0,
          transform: showBio ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <div className="font-mono text-sm flex items-center gap-3">
          <span className="text-neutral-600">{">"} </span>
          <span className="text-neutral-400">{siteData.bio}</span>
          {/* Mahoraga's wheel of adaptation */}
          <div className="relative shrink-0 w-8 h-8">
            <div className="absolute inset-0 bg-neutral-400/20 rounded-full blur-md" />
            <svg
              className="relative w-8 h-8 animate-[wheelTick_3s_cubic-bezier(0.34,1.56,0.64,1)_infinite] drop-shadow-[0_0_6px_rgba(163,163,163,0.3)]"
              viewBox="0 0 48 48"
              fill="none"
            >
              {/* Outer ring */}
              <circle cx="24" cy="24" r="20" stroke="url(#wheelGrad)" strokeWidth={2.5} />
              {/* Inner ring connecting spokes */}
              <circle cx="24" cy="24" r="8" stroke="url(#wheelGrad)" strokeWidth={2} />
              {/* Eight spokes from inner ring to just past outer ring */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg - 90) * Math.PI / 180;
                return (
                  <line
                    key={deg}
                    x1={24 + 8 * Math.cos(rad)}
                    y1={24 + 8 * Math.sin(rad)}
                    x2={24 + 22 * Math.cos(rad)}
                    y2={24 + 22 * Math.sin(rad)}
                    stroke="url(#wheelGrad)"
                    strokeWidth={2}
                  />
                );
              })}
              {/* Handle knobs at spoke tips */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg - 90) * Math.PI / 180;
                return (
                  <circle
                    key={deg}
                    cx={24 + 22 * Math.cos(rad)}
                    cy={24 + 22 * Math.sin(rad)}
                    r="2.5"
                    fill="rgba(163,163,163,0.4)"
                    stroke="url(#wheelGrad)"
                    strokeWidth={1}
                  />
                );
              })}
              <defs>
                <linearGradient id="wheelGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a3a3a3" />
                  <stop offset="100%" stopColor="#737373" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      {/* Links */}
      <div
        className="flex items-center gap-5 transition-all duration-700"
        style={{
          opacity: showBio ? 1 : 0,
          transform: showBio ? "translateY(0)" : "translateY(8px)",
        }}
        onTransitionEnd={() => setShowLinks(true)}
      >
        <a
          href={siteData.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-neutral-500 hover:text-emerald-400 transition-colors text-sm font-mono"
        >
          <span className="text-neutral-700 group-hover:text-emerald-400/50 transition-colors">
            [
          </span>
          github
          <span className="text-neutral-700 group-hover:text-emerald-400/50 transition-colors">
            ]
          </span>
        </a>
        <a
          href={siteData.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-neutral-500 hover:text-emerald-400 transition-colors text-sm font-mono"
        >
          <span className="text-neutral-700 group-hover:text-emerald-400/50 transition-colors">
            [
          </span>
          linkedin
          <span className="text-neutral-700 group-hover:text-emerald-400/50 transition-colors">
            ]
          </span>
        </a>
        <a
          href={`mailto:${siteData.links.email}`}
          className="group flex items-center gap-2 text-neutral-500 hover:text-emerald-400 transition-colors text-sm font-mono"
        >
          <span className="text-neutral-700 group-hover:text-emerald-400/50 transition-colors">
            [
          </span>
          email
          <span className="text-neutral-700 group-hover:text-emerald-400/50 transition-colors">
            ]
          </span>
        </a>
      </div>
    </section>
  );
}
