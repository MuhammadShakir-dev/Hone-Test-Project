import { NextRequest, NextResponse } from "next/server";
import { CURRENT_YEAR, getYearStats, MAX_YEAR, MIN_YEAR } from "@/lib/data/statistics";
import { delay } from "@/lib/delay";

export async function GET(request: NextRequest) {
  const requested = Number(request.nextUrl.searchParams.get("year"));
  const year = Number.isFinite(requested) ? requested : CURRENT_YEAR;
  const { year: resolvedYear, stats } = getYearStats(year);

  await delay(280);

  return NextResponse.json({
    year: resolvedYear,
    minYear: MIN_YEAR,
    maxYear: MAX_YEAR,
    ...stats,
  });
}
