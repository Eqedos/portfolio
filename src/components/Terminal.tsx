"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import { siteData } from "@/data";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
  prompt?: string;
}

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEYS = {
  lines: "terminal_lines",
  history: "terminal_history",
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

const defaultLines: TerminalLine[] = [
  { type: "system", content: siteData.terminalCommands.welcome },
];

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>(defaultLines);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setLines(loadFromStorage(STORAGE_KEYS.lines, defaultLines));
    setHistory(loadFromStorage(STORAGE_KEYS.history, []));
    setHydrated(true);
  }, []);

  // Persist lines
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEYS.lines, JSON.stringify(lines));
    }
  }, [lines, hydrated]);

  // Persist history
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
    }
  }, [history, hydrated]);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const processCommand = (cmd: string): string => {
    const trimmed = cmd.trim().toLowerCase();

    switch (trimmed) {
      case "help":
        return [
          "┌─────────────────────────────────────────┐",
          "│  Available Commands                      │",
          "├─────────────────────────────────────────┤",
          "│  about      Who I am                    │",
          "│  experience Work history                 │",
          "│  projects   Things I've built            │",
          "│  skills     Technologies I work with     │",
          "│  links      Where to find me             │",
          "│  contact    Get in touch                 │",
          "│  whoami     Current user                 │",
          "│  date       Current date/time            │",
          "│  history    Command history              │",
          "│  clear      Clear terminal               │",
          "│  exit       Close terminal               │",
          "└─────────────────────────────────────────┘",
        ].join("\n");

      case "about":
        return siteData.terminalCommands.about;

      case "experience":
        return siteData.experience
          .map(
            (exp) =>
              exp.roles
                .map(
                  (role) =>
                    `  ${exp.company} — ${role.title}\n  ${role.type} · ${role.period} · ${exp.location}\n${role.bullets.map((b) => `    ● ${b}`).join("\n")}\n    ${role.tech.join(" · ")}`
                )
                .join("\n\n")
          )
          .join("\n\n");

      case "projects":
        return siteData.projects
          .map(
            (p) =>
              `  ${p.name}${p.stars ? ` (${p.stars}\u2605)` : ""}\n    ${p.description}\n    Tech: ${p.tech.join(", ")}\n    ${p.url}`
          )
          .join("\n\n");

      case "skills":
        return siteData.terminalCommands.skills;

      case "links":
        return [
          `  GitHub    ${siteData.links.github}`,
          `  LinkedIn  ${siteData.links.linkedin}`,
          `  Email     ${siteData.links.email}`,
        ].join("\n");

      case "contact":
        return siteData.terminalCommands.contact;

      case "clear":
        return "__CLEAR__";

      case "exit":
        return "__EXIT__";

      case "history":
        return history.length > 0
          ? history.map((h, i) => `  ${i + 1}  ${h}`).join("\n")
          : "  No commands in history.";

      case "whoami":
        return "  visitor@parth.dev";

      case "date":
        return `  ${new Date().toString()}`;

      case "echo":
        return "";

      case "":
        return "";

      default:
        if (trimmed.startsWith("echo ")) {
          return `  ${cmd.trim().slice(5)}`;
        }
        return `  command not found: ${trimmed}\n  Type "help" for available commands.`;
    }
  };

  const handleSubmit = () => {
    const cmd = input;
    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: cmd, prompt: "visitor@parth.dev" },
    ];

    if (cmd.trim()) {
      setHistory((prev) => [...prev, cmd]);
    }
    setHistoryIndex(-1);

    const result = processCommand(cmd);

    if (result === "__CLEAR__") {
      setLines([]);
    } else if (result === "__EXIT__") {
      onClose();
    } else if (result) {
      setLines([...newLines, { type: "output", content: result }]);
    } else {
      setLines(newLines);
    }

    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Terminal window */}
      <div
        className="relative w-full max-w-2xl rounded-lg border border-neutral-800 bg-neutral-950 shadow-[0_0_80px_rgba(16,185,129,0.08)] overflow-hidden animate-in zoom-in-95 fade-in duration-200"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/80 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-neutral-500 ml-2 font-mono">
              parth.dev &mdash; bash
            </span>
          </div>
          <span className="text-[10px] text-neutral-600 font-mono">
            ESC to close
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="p-4 h-[60vh] sm:h-[50vh] overflow-y-auto font-mono text-sm leading-relaxed"
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {line.type === "input" ? (
                <div>
                  <span className="text-emerald-400">{line.prompt}</span>
                  <span className="text-neutral-600"> ~ $ </span>
                  <span className="text-neutral-300">{line.content}</span>
                </div>
              ) : line.type === "system" ? (
                <div className="text-emerald-400/80 mb-1">{line.content}</div>
              ) : line.type === "error" ? (
                <div className="text-red-400">{line.content}</div>
              ) : (
                <div className="text-neutral-400 mb-2">{line.content}</div>
              )}
            </div>
          ))}

          {/* Active input line */}
          <div className="flex items-center">
            <span className="text-emerald-400 shrink-0">visitor@parth.dev</span>
            <span className="text-neutral-600 shrink-0"> ~ $ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-neutral-300 outline-none caret-emerald-400 font-mono text-sm min-w-0"
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
