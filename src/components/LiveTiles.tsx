"use client";

import { useEffect, useState } from "react";

/**
 * Islamabad wall clock. Server renders nothing numeric, so there is no
 * hydration mismatch; the value arrives on mount and ticks each minute.
 */
export function ClockTile() {
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Karachi",
        }).format(now),
      );
      setDate(
        new Intl.DateTimeFormat("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
          timeZone: "Asia/Karachi",
        }).format(now),
      );
    };
    const t = setTimeout(tick, 0);
    const i = setInterval(tick, 30_000);
    return () => {
      clearTimeout(t);
      clearInterval(i);
    };
  }, []);

  return (
    <div className="tile t-clock">
      <p className="lbl">Local time, Islamabad</p>
      <p className="stat mt-auto tabular-nums">{time ?? "--:--"}</p>
      <p className="sub mt-1 text-[0.8rem]">{date ?? "PKT"}</p>
    </div>
  );
}

type Stats = { repos: number; followers: number; updated: string } | null;

/**
 * Public GitHub profile numbers. These are real or they are absent: if the API
 * is rate-limited or offline the tile says so and falls back to the handle,
 * rather than showing an invented count.
 */
export function GithubTile({ handle, href }: { handle: string; href: string }) {
  const [stats, setStats] = useState<Stats>(null);
  const [state, setState] = useState<"loading" | "ok" | "offline">("loading");

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://api.github.com/users/asimsaeed681", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { public_repos: number; followers: number; updated_at: string }) => {
        setStats({
          repos: d.public_repos,
          followers: d.followers,
          updated: new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
          }).format(new Date(d.updated_at)),
        });
        setState("ok");
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setState("offline");
      });
    return () => ctrl.abort();
  }, []);

  return (
    <div className="tile t-gh">
      <div className="flex items-center justify-between gap-2">
        <p className="lbl">GitHub, live</p>
        {state === "ok" && (
          <span className="lbl flex items-center gap-1.5">
            <span className="dot" aria-hidden /> fetched now
          </span>
        )}
      </div>

      {state === "ok" && stats ? (
        <div className="mt-auto flex items-end gap-7">
          <div>
            <p className="stat">{stats.repos}</p>
            <p className="lbl mt-1">public repos</p>
          </div>
          <div>
            <p className="stat">{stats.followers}</p>
            <p className="lbl mt-1">followers</p>
          </div>
          <div className="pb-1">
            <p className="text-[0.8rem]">updated {stats.updated}</p>
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-[0.8rem]">
              {handle}
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-auto">
          <p className="dsp text-[1.3rem]">
            <a href={href} target="_blank" rel="noopener noreferrer">
              {handle}
            </a>
          </p>
          <p className="sub mt-1 text-[0.8rem]">
            {state === "loading"
              ? "Reading the public API."
              : "Live counts unavailable right now. The profile link still works."}
          </p>
        </div>
      )}
    </div>
  );
}
