"use client";

import { useEffect, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

type MonthBar = [number, number, number];

const MONTHS = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const CURRENT_YEAR = new Date().getFullYear();
/* collapsed rest pose — bars grow/morph from here on first load */
const EMPTY: MonthBar[] = Array.from({ length: 12 }, () => [80, 80, 130]);

export default function StatisticYearCard() {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [minYear, setMinYear] = useState(CURRENT_YEAR - 3);
  const [maxYear, setMaxYear] = useState(CURRENT_YEAR);
  const [months, setMonths] = useState<MonthBar[]>(EMPTY);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/statistics?year=${year}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => {
        setMonths(json.months);
        setMinYear(json.minYear);
        setMaxYear(json.maxYear);
      })
      .catch(() => {});

    return () => controller.abort();
  }, [year]);

  return (
    <section className="h-[300px] rounded-card bg-white px-[33px] pt-12 shadow-card">
      <div className="flex items-center justify-between px-[2px]">
        <button
          aria-label="Previous year"
          onClick={() => setYear((y) => Math.max(minYear, y - 1))}
          disabled={year <= minYear}
          className="transition-opacity hover:opacity-60 disabled:opacity-25"
        >
          <ArrowLeftIcon className="h-5 w-5" color="#30325B" />
        </button>
        <span className="text-[20px] font-medium leading-6 text-night">
          {year}
        </span>
        <button
          aria-label="Next year"
          onClick={() => setYear((y) => Math.min(maxYear, y + 1))}
          disabled={year >= maxYear}
          className="transition-opacity hover:opacity-60 disabled:opacity-25"
        >
          <ArrowRightIcon className="h-5 w-5" color="#30325B" />
        </button>
      </div>

      <div className="mt-9 flex justify-between">
        {MONTHS.map((month, i) => (
          <div key={month} className="flex w-[13px] flex-col items-center">
            <div className="relative h-[130px] w-[5px] rounded-full bg-[#EEF0FA]">
              <span
                className="bar-morph absolute left-0 w-[5px] rounded-full"
                style={{
                  top: months[i][0],
                  height: Math.max(0, months[i][1] - months[i][0]),
                  background: "linear-gradient(180deg, #3A16F5 0%, #9B7DFF 100%)",
                  transitionDelay: `${i * 28}ms`,
                }}
              />
              <span
                className="bar-morph absolute left-0 w-[5px] rounded-full"
                style={{
                  top: months[i][2],
                  height: Math.max(0, 130 - months[i][2]),
                  background: "linear-gradient(180deg, #F5309B 0%, #FB2E4E 100%)",
                  transitionDelay: `${i * 28 + 50}ms`,
                }}
              />
            </div>
            <span className="mt-[10px] text-[8px] leading-3 text-faint">
              {month}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
