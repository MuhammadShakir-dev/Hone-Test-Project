import type { YearStats } from "@/lib/types";

export const CURRENT_YEAR = new Date().getFullYear();
export const MIN_YEAR = CURRENT_YEAR - 3;
export const MAX_YEAR = CURRENT_YEAR;

const YEARS: YearStats[] = [
  {
    months: [
      [40, 66, 72], [22, 52, 58], [36, 62, 68], [18, 48, 54],
      [44, 70, 76], [30, 58, 64], [24, 56, 62], [38, 66, 72],
      [14, 46, 52], [34, 64, 70], [42, 68, 74], [26, 58, 64],
    ],
    global: {
      wins: 15,
      percent: 61,
      segments: [
        { id: "purple", label: "Singles", wins: 7, percent: 47, start: 0, len: 28.1 },
        { id: "pink", label: "Doubles", wins: 5, percent: 33, start: 28.1, len: 22.5 },
        { id: "orange", label: "Mixed", wins: 3, percent: 20, start: 50.6, len: 24.4 },
      ],
    },
  },
  {
    months: [
      [24, 54, 60], [36, 64, 70], [12, 46, 52], [30, 60, 66],
      [20, 52, 58], [42, 68, 74], [16, 50, 56], [28, 60, 66],
      [38, 66, 72], [10, 44, 50], [32, 62, 68], [22, 56, 62],
    ],
    global: {
      wins: 19,
      percent: 68,
      segments: [
        { id: "purple", label: "Singles", wins: 9, percent: 47, start: 0, len: 31.9 },
        { id: "pink", label: "Doubles", wins: 6, percent: 32, start: 31.9, len: 20.6 },
        { id: "orange", label: "Mixed", wins: 4, percent: 21, start: 52.5, len: 22.5 },
      ],
    },
  },
  {
    months: [
      [8, 46, 52], [26, 60, 66], [14, 52, 58], [34, 66, 72],
      [4, 42, 48], [22, 58, 64], [30, 64, 70], [10, 48, 54],
      [38, 68, 74], [18, 54, 60], [6, 44, 50], [28, 62, 68],
    ],
    global: {
      wins: 27,
      percent: 81,
      segments: [
        { id: "purple", label: "Singles", wins: 13, percent: 48, start: 0, len: 36.6 },
        { id: "pink", label: "Doubles", wins: 8, percent: 30, start: 36.6, len: 16.6 },
        { id: "orange", label: "Mixed", wins: 6, percent: 22, start: 53.2, len: 21.8 },
      ],
    },
  },
  {
    months: [
      [30, 62, 66], [12, 50, 72], [26, 58, 62], [36, 64, 70],
      [10, 52, 56], [28, 60, 64], [6, 44, 48], [32, 64, 70],
      [20, 56, 60], [26, 68, 74], [30, 62, 66], [2, 48, 52],
    ],
    global: {
      wins: 23,
      percent: 75,
      segments: [
        { id: "purple", label: "Singles", wins: 11, percent: 48, start: 0, len: 33 },
        { id: "pink", label: "Doubles", wins: 7, percent: 30, start: 33, len: 17 },
        { id: "orange", label: "Mixed", wins: 5, percent: 22, start: 50, len: 25 },
      ],
    },
  },
];

const BY_YEAR: Record<number, YearStats> = Object.fromEntries(
  YEARS.map((stats, index) => [MIN_YEAR + index, stats]),
);

export function getYearStats(year: number): { year: number; stats: YearStats } {
  const stats = BY_YEAR[year];
  if (stats) return { year, stats };
  return { year: CURRENT_YEAR, stats: BY_YEAR[CURRENT_YEAR] };
}
