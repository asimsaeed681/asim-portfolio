"use client";

import { useEffect, useRef, useState } from "react";
import { BOOT, run, type Line } from "@/lib/shell";

export default function Terminal({ active }: { active: boolean }) {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = value;
    setValue("");
    setHistory((h) => [input, ...h].slice(0, 40));
    setHIndex(-1);
    const result = run(input);
    if (result === "clear") {
      setLines([]);
      return;
    }
    setLines((l) => [...l, { kind: "echo", text: `$ ${input}` }, ...result]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const next = e.key === "ArrowUp" ? hIndex + 1 : hIndex - 1;
    if (next < 0) {
      setHIndex(-1);
      setValue("");
    } else if (next < history.length) {
      setHIndex(next);
      setValue(history[next]);
    }
  };

  return (
    <div className="flex h-full min-h-[15rem] flex-col">
      <div ref={scrollRef} className="tty flex-1 overflow-auto" aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={l.kind === "echo" ? "tty--echo" : l.kind === "err" ? "tty--err" : ""}>
            {l.text}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="mt-2 flex items-center gap-2 border-t border-edge pt-2">
        <label htmlFor="tty-in" className="tty tty__prompt shrink-0">
          asim@os $
        </label>
        <input
          id="tty-in"
          ref={inputRef}
          className="tty tty__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
          placeholder="help"
          aria-label="Terminal command"
        />
      </form>
    </div>
  );
}
