"use client";

export default function Projects() {
  return (
    <section className="flex flex-col gap-3">
      {/* Section header */}
      <div className="font-mono text-sm">
        <span className="text-neutral-600">{">"} </span>
        <span className="text-emerald-400">ls</span>
        <span className="text-neutral-400"> ~/projects</span>
      </div>

      <div className="border border-neutral-800 rounded-lg px-6 py-10 flex flex-col items-center gap-2">
        <span className="font-mono text-sm text-neutral-500">coming soon</span>
        <span className="font-mono text-xs text-neutral-700">projects are being polished</span>
      </div>
    </section>
  );
}
