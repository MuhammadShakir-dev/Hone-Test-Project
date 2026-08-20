import { NextRequest, NextResponse } from "next/server";
import { getLiveScores } from "@/lib/data/live-scores";
import { delay } from "@/lib/delay";
import { isScoreCategory } from "@/lib/types";

export async function GET(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get("category");
  const category = isScoreCategory(requested) ? requested : "singles";

  await delay(900);

  return NextResponse.json({
    category,
    matches: getLiveScores(category),
  });
}
