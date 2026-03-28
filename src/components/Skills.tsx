"use client";

import { siteData } from "@/data";

const categories: { key: keyof typeof siteData.skills; label: string; prefix: string }[] = [
  { key: "languages", label: "Languages", prefix: "$" },
  { key: "frontend", label: "Frontend", prefix: "~" },
  { key: "backend", label: "Backend", prefix: ">" },
  { key: "infra", label: "Infra", prefix: "#" },
  { key: "testing", label: "Testing", prefix: "%" },
];

export default function Skills() {
  return (
    <section className="flex flex-col gap-3">
      {/* Section header */}
      <div className="font-mono text-sm">
        <span className="text-neutral-600">{">"} </span>
        <span className="text-emerald-400">cat</span>
        <span className="text-neutral-400"> ~/.skills</span>
      </div>

      <div className="border border-neutral-800 rounded-lg overflow-hidden">
        {categories.map((cat, i) => (
          <div
            key={cat.key}
            className={`group px-4 py-3 flex items-start gap-3 hover:bg-emerald-400/[0.02] transition-colors ${
              i < categories.length - 1 ? "border-b border-neutral-800/50" : ""
            }`}
          >
            {/* Category label */}
            <div className="shrink-0 w-24 font-mono text-xs pt-1">
              <span className="text-emerald-400/60">{cat.prefix}</span>
              <span className="text-neutral-500 ml-1">{cat.label}</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {siteData.skills[cat.key].map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[13px] px-2.5 py-1 border border-neutral-800 rounded text-neutral-400 hover:text-emerald-400 hover:border-emerald-400/30 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
