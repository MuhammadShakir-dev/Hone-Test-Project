import { NextRequest, NextResponse } from "next/server";

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

/* In-memory dummy data — no database required */
const DATA: Record<string, LiveMatch[]> = {
  singles: [
    {
      id: "s1",
      tournament: "WTA - SINGLES: Australia Open, hard",
      starred: true,
      rows: [
        { player: "Anindita R. (IDN)", sets: [2, 6, 6], winner: true },
        { player: "Naomi O. (JPN)", sets: [0, 3, 1], winner: false },
      ],
    },
  ],
  doubles: [
    {
      id: "d1",
      tournament: "WTA - DOUBLES: Roland Garros, clay",
      starred: false,
      rows: [
        { player: "Rahmawati / Aryani (IDN)", sets: [6, 4, 7], winner: true },
        { player: "Osaka / Hibino (JPN)", sets: [4, 6, 5], winner: false },
      ],
    },
  ],
  mixed: [
    {
      id: "m1",
      tournament: "ITF - MIXED: Wimbledon, grass",
      starred: true,
      rows: [
        { player: "Rahmawati / Gunawan (IDN)", sets: [3, 6, 2], winner: false },
        { player: "Barty / Peers (AUS)", sets: [6, 4, 6], winner: true },
      ],
    },
  ],
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") ?? "singles";

  /* artificial latency so the loading animation is visible */
  await sleep(900);

  const matches = DATA[category] ?? DATA.singles;
  return NextResponse.json({ category, matches });
}
