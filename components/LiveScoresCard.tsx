"use client";

import { useState } from "react";
import { useLiveScores } from "@/hooks/useLiveScores";
import type { LiveMatch, ScoreCategory, ScoreRow } from "@/lib/types";
import SectionTitle from "./SectionTitle";
import { PersonIcon, StarIcon } from "./icons";

const TABS: { id: ScoreCategory; label: string }[] = [
  { id: "singles", label: "Singles" },
  { id: "doubles", label: "Doubles" },
  { id: "mixed", label: "Mixed Doubles" },
];

export default function LiveScoresCard() {
  const [tab, setTab] = useState<ScoreCategory>("singles");
  const { matches, loading } = useLiveScores(tab);

  return (
    <section className="h-[220px] rounded-card bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <SectionTitle>Latest Scores</SectionTitle>
        <a
          href="#"
          className="pr-[5px] text-[12px] font-medium leading-[18px] text-blue transition-opacity hover:opacity-70"
        >
          View All
        </a>
      </div>

      <div className="mt-[15px] flex items-center gap-[15px]">
        {TABS.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`h-6 rounded-[6px] text-[12px] leading-[18px] transition-all duration-300 ${
              tab === item.id
                ? "bg-teal-soft px-[6px] text-teal"
                : "px-0 text-faint hover:text-blue"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative mt-[15px]">
        <div
          key={tab + (matches ? "-loaded" : "")}
          className={`transition-opacity duration-500 ease-out ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          {matches && <MatchList matches={matches} />}
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

function MatchList({ matches }: { matches: LiveMatch[] }) {
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
            {match.rows.map((row, index) => (
              <PlayerRow key={row.player} row={row} delayMs={120 + index * 100} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PlayerRow({ row, delayMs }: { row: ScoreRow; delayMs: number }) {
  return (
    <div
      className="fade-up flex items-center pl-[5px]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <span
        className={`min-w-0 flex-1 truncate text-[12px] leading-[18px] text-night ${
          row.winner ? "font-semibold" : ""
        }`}
      >
        {row.player}
      </span>
      <div className="grid w-[110px] shrink-0 grid-cols-3 text-center">
        {row.sets.map((set, index) => (
          <span
            key={index}
            className={`text-[12px] leading-[18px] text-night ${
              index === 0 ? "font-semibold" : ""
            }`}
          >
            {set}
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
        {[0, 1].map((index) => (
          <div key={index} className="flex items-center pl-[5px]">
            <span className="skeleton h-[14px] w-[110px]" />
            <div className="ml-auto flex items-center gap-[30px]">
              <span className="skeleton h-[14px] w-[10px]" />
              <span className="skeleton h-[14px] w-[10px]" />
              <span className="skeleton h-[14px] w-[10px]" />
              <span
                className={`skeleton h-[25px] w-[45px] rounded-[6px] ${
                  index === 1 ? "invisible" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
