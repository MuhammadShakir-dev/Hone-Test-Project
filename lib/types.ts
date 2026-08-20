export const SCORE_CATEGORIES = ["singles", "doubles", "mixed"] as const;
export type ScoreCategory = (typeof SCORE_CATEGORIES)[number];

export type ScoreRow = {
  player: string;
  sets: number[];
  winner: boolean;
};

export type LiveMatch = {
  id: string;
  tournament: string;
  starred: boolean;
  rows: [ScoreRow, ScoreRow];
};

/** Pixel offsets inside the 130px statistic bar track. */
export type MonthBar = [blueTop: number, blueBottom: number, pinkTop: number];

export type SegmentId = "purple" | "pink" | "orange";

export type DonutSegment = {
  id: SegmentId;
  label: string;
  wins: number;
  percent: number;
  /** Where this arc starts on the 0–100 ring. */
  start: number;
  /** How much of the ring this arc covers. */
  len: number;
};

export type GlobalStats = {
  wins: number;
  percent: number;
  segments: DonutSegment[];
};

export type YearStats = {
  months: MonthBar[];
  global: GlobalStats;
};

export function isScoreCategory(value: string | null): value is ScoreCategory {
  return SCORE_CATEGORIES.includes(value as ScoreCategory);
}
