import type { LiveMatch, ScoreCategory, YearStats } from "@/lib/types";

export type LiveScoresResponse = {
  category: ScoreCategory;
  matches: LiveMatch[];
};

export type YearStatisticsResponse = YearStats & {
  year: number;
  minYear: number;
  maxYear: number;
};

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}): ${url}`);
  }
  return response.json() as Promise<T>;
}

export function fetchLiveScores(category: ScoreCategory, signal?: AbortSignal) {
  return fetchJson<LiveScoresResponse>(
    `/api/live-scores?category=${category}`,
    signal,
  );
}

export function fetchYearStatistics(year: number, signal?: AbortSignal) {
  return fetchJson<YearStatisticsResponse>(`/api/statistics?year=${year}`, signal);
}
