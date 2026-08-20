import type { LiveMatch, ScoreCategory } from "@/lib/types";

const MATCHES: Record<ScoreCategory, LiveMatch[]> = {
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

export function getLiveScores(category: ScoreCategory): LiveMatch[] {
  return MATCHES[category];
}
