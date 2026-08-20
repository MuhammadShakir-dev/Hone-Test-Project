"use client";

import { useEffect, useState } from "react";
import { fetchYearStatistics } from "@/lib/api";
import type { YearStatisticsResponse } from "@/lib/api";

export function useYearStatistics(year: number) {
  const [data, setData] = useState<YearStatisticsResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchYearStatistics(year, controller.signal)
      .then(setData)
      .catch(() => {});

    return () => controller.abort();
  }, [year]);

  return data;
}
