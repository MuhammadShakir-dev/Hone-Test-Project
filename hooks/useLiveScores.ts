"use client";

import { useEffect, useState } from "react";
import { fetchLiveScores } from "@/lib/api";
import type { LiveMatch, ScoreCategory } from "@/lib/types";

export function useLiveScores(category: ScoreCategory) {
  const [matches, setMatches] = useState<LiveMatch[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setMatches(null);

    fetchLiveScores(category, controller.signal)
      .then((data) => {
        setMatches(data.matches);
        setLoading(false);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        setLoading(false);
      });

    return () => controller.abort();
  }, [category]);

  return { matches, loading };
}
