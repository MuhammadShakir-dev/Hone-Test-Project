"use client";

import { useState } from "react";
import { useYearStatistics } from "@/hooks/useYearStatistics";
import type { MonthBar } from "@/lib/types";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

const MONTH_LABELS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const BAR_TRACK_HEIGHT = 130;
const CURRENT_YEAR = new Date().getFullYear();
const COLLAPSED_BARS: MonthBar[] = Array.from({ length: 12 }, () => [80, 80, BAR_TRACK_HEIGHT]);

export default function StatisticYearCard() {
  const [year, setYear] = useState(CURRENT_YEAR);
  const stats = useYearStatistics(year);
  const months = stats?.months ?? COLLAPSED_BARS;
  const minYear = stats?.minYear ?? CURRENT_YEAR - 3;
  const maxYear = stats?.maxYear ?? CURRENT_YEAR;

  return (
    <section className="h-[300px] rounded-card bg-white px-[33px] pt-12 shadow-card">
      <div className="flex items-center justify-between px-[2px]">
        <button
          aria-label="Previous year"
          onClick={() => setYear((value) => Math.max(minYear, value - 1))}
          disabled={year <= minYear}
          className="transition-opacity hover:opacity-60 disabled:opacity-25"
        >
          <ArrowLeftIcon className="h-5 w-5" color="#30325B" />
        </button>
        <span className="text-[20px] font-medium leading-6 text-night">{year}</span>
        <button
          aria-label="Next year"
          onClick={() => setYear((value) => Math.min(maxYear, value + 1))}
          disabled={year >= maxYear}
          className="transition-opacity hover:opacity-60 disabled:opacity-25"
        >
          <ArrowRightIcon className="h-5 w-5" color="#30325B" />
        </button>
      </div>

      <div className="mt-9 flex justify-between">
        {MONTH_LABELS.map((label, index) => (
          <MonthColumn key={label} label={label} bar={months[index]} delayMs={index * 28} />
        ))}
      </div>
    </section>
  );
}

function MonthColumn({
  label,
  bar,
  delayMs,
}: {
  label: string;
  bar: MonthBar;
  delayMs: number;
}) {
  const [blueTop, blueBottom, pinkTop] = bar;

  return (
    <div className="flex w-[13px] flex-col items-center">
      <div className="relative h-[130px] w-[5px] rounded-full bg-[#EEF0FA]">
        <span
          className="bar-morph absolute left-0 w-[5px] rounded-full"
          style={{
            top: blueTop,
            height: Math.max(0, blueBottom - blueTop),
            background: "linear-gradient(180deg, #3A16F5 0%, #9B7DFF 100%)",
            transitionDelay: `${delayMs}ms`,
          }}
        />
        <span
          className="bar-morph absolute left-0 w-[5px] rounded-full"
          style={{
            top: pinkTop,
            height: Math.max(0, BAR_TRACK_HEIGHT - pinkTop),
            background: "linear-gradient(180deg, #F5309B 0%, #FB2E4E 100%)",
            transitionDelay: `${delayMs + 50}ms`,
          }}
        />
      </div>
      <span className="mt-[10px] text-[8px] leading-3 text-faint">{label}</span>
    </div>
  );
}
