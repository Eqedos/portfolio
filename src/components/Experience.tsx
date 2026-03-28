"use client";

import { siteData } from "@/data";

export default function Experience() {
  return (
    <section className="flex flex-col gap-3">
      {/* Section header */}
      <div className="font-mono text-sm">
        <span className="text-neutral-600">{">"} </span>
        <span className="text-emerald-400">git log</span>
        <span className="text-neutral-400"> --experience</span>
      </div>

      <div className="border border-neutral-800 rounded-lg divide-y divide-neutral-800/50">
        {siteData.experience.map((exp) => (
          <div
            key={exp.company}
            className="group px-5 py-5 flex flex-col gap-3 hover:bg-emerald-400/[0.02] transition-colors"
          >
            {/* Logo + company row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="h-7 w-auto object-contain brightness-90 group-hover:brightness-100 transition-all"
                />
                <div className="h-4 w-px bg-neutral-800" />
                <div className="flex flex-col">
                  <span className="text-white font-medium text-sm leading-tight">
                    {exp.company}
                  </span>
                  {"companyFull" in exp && exp.companyFull && (
                    <span className="text-neutral-700 text-[10px] font-mono leading-tight">
                      {exp.companyFull}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-neutral-600">
                <span>{exp.duration}</span>
                <span className="text-neutral-800">·</span>
                <span>{exp.location}</span>
              </div>
            </div>

            {/* Roles */}
            {exp.roles.map((role) => (
              <div key={role.title} className="flex flex-col gap-2 pl-0.5">
                {/* Role title + metadata */}
                <div className="flex items-baseline gap-2 font-mono text-sm">
                  <span className="text-neutral-300">{role.title}</span>
                  <span className="text-neutral-800">·</span>
                  <span className="text-neutral-600 text-xs">{role.type}</span>
                  <span className="text-neutral-800">·</span>
                  <span className="text-neutral-600 text-xs">{role.period}</span>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-1.5 pl-3 border-l border-neutral-800/60">
                  {role.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="text-neutral-500 text-[13px] leading-relaxed pl-4 relative"
                    >
                      <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-neutral-700" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 pl-3">
                  {role.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 text-neutral-500 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
