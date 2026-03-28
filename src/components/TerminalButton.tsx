"use client";

interface TerminalButtonProps {
  onClick: () => void;
}

export default function TerminalButton({ onClick }: TerminalButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-950/90 backdrop-blur-sm hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all font-mono text-sm"
    >
      <span className="text-emerald-400 text-base leading-none">{">"}</span>
      <span className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
        terminal
      </span>
      <kbd className="hidden sm:inline text-[10px] text-neutral-600 border border-neutral-800 rounded px-1.5 py-0.5 ml-1">
        Ctrl+K
      </kbd>
    </button>
  );
}
