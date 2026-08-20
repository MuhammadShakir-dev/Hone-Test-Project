"use client";

import { useEffect, useState } from "react";
import { PersonIcon, StarIcon } from "./icons";

type ScoreRow = { player: string; sets: number[]; winner: boolean };
type LiveMatch = {
  id: string;
  tournament: string;
  starred: boolean;
  rows: [ScoreRow, ScoreRow];
};

const TABS = [
  { id: "singles", label: "Singles" },
  { id: "doubles", label: "Doubles" },
  { id: "mixed", label: "Mixed Doubles" },
];

export default function LiveScoresCard() {
  const [tab, setTab] = useState("singles");
  const [matches, setMatches] = useState<LiveMatch[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setMatches(null);

    fetch(`/api/live-scores?category=${tab}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => {
        setMatches(json.matches);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setLoading(false);
      });

    return () => controller.abort();
  }, [tab]);

  return (
    <section className="h-[220px] rounded-card bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-semibold leading-[30px] text-ink">
          Latest Scores
        </h2>
        <a
          href="#"
          className="pr-[5px] text-[12px] font-medium leading-[18px] text-blue transition-opacity hover:opacity-70"
        >
          View All
        </a>
      </div>

      {/* Tabs */}
      <div className="mt-[15px] flex items-center gap-[15px]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`h-6 rounded-[6px] text-[12px] leading-[18px] transition-all duration-300 ${
              tab === t.id
                ? "bg-teal-soft px-[6px] text-teal"
                : "px-0 text-faint hover:text-blue"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Body: skeleton cross-fades over the content */}
      <div className="relative mt-[15px]">
        <div
          key={tab + (matches ? "-loaded" : "")}
          className={`transition-opacity duration-500 ease-out ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {matches && <Scores matches={matches} />}
        </div>
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-[450ms] ease-out ${
            loading ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ScoresSkeleton />
        </div>
      </div>
    </section>
  );
}

function Scores({ matches }: { matches: LiveMatch[] }) {
  return (
    <div>
      {matches.map((match) => (
        <div key={match.id}>
          <div className="fade-up flex items-center gap-[10px]">
            <PersonIcon className="h-5 w-5 shrink-0" />
            <span className="min-w-0 flex-1 truncate text-[12px] leading-[18px] text-night">
              {match.tournament}
            </span>
            <StarIcon
              className={`h-5 w-5 shrink-0 ${match.starred ? "" : "opacity-30"}`}
            />
          </div>

          <div className="mt-[21px] space-y-[13px]">
            {match.rows.map((row, i) => (
              <div
                key={row.player}
                className="fade-up flex items-center pl-[5px]"
                style={{ animationDelay: `${120 + i * 100}ms` }}
              >
                <span
                  className={`min-w-0 flex-1 truncate text-[12px] leading-[18px] text-night ${
                    row.winner ? "font-semibold" : ""
                  }`}
                >
                  {row.player}
                </span>
                <div className="grid w-[110px] shrink-0 grid-cols-3 text-center">
                  {row.sets.map((s, j) => (
                    <span
                      key={j}
                      className={`text-[12px] leading-[18px] text-night ${
                        j === 0 ? "font-semibold" : ""
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="ml-[22px] flex h-[25px] w-[45px] shrink-0 items-center justify-center">
                  {row.winner && (
                    <span className="flex h-[25px] w-[45px] items-center justify-center rounded-[6px] bg-gold-soft text-[12px] font-semibold leading-[18px] text-gold">
                      WIN
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScoresSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-[10px]">
        <span className="skeleton h-5 w-5 rounded-full" />
        <span className="skeleton h-[14px] w-[210px]" />
        <span className="skeleton ml-auto h-5 w-5 rounded-full" />
      </div>
      <div className="mt-[23px] space-y-[19px]">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center pl-[5px]">
            <span className="skeleton h-[14px] w-[110px]" />
            <div className="ml-auto flex items-center gap-[30px]">
              <span className="skeleton h-[14px] w-[10px]" />
              <span className="skeleton h-[14px] w-[10px]" />
              <span className="skeleton h-[14px] w-[10px]" />
              <span
                className={`skeleton h-[25px] w-[45px] rounded-[6px] ${
                  i === 1 ? "invisible" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
