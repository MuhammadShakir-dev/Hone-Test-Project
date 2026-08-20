"use client";

import { useEffect, useMemo, useState } from "react";

type SegmentId = "purple" | "pink" | "orange";
type Segment = {
  id: SegmentId;
  label: string;
  wins: number;
  percent: number;
  start: number;
  len: number;
};
type GlobalStats = { wins: number; percent: number; segments: Segment[] };

const SIZE = 200;
const STROKE = 30;
const RADIUS = (SIZE - STROKE) / 2; /* 85 — centerline of the ring */

const COLOR = {
  purple: { from: "#B388F5", to: "#7E62EE" },
  pink: { from: "#FF7A8C", to: "#FF5C76" },
  orange: { from: "#FFA24F", to: "#FFC56A" },
  track: "#ECF1FD",
};

const LEGEND: SegmentId[] = ["purple", "pink", "orange"];

const RING_MASK =
  "radial-gradient(farthest-side, transparent calc(100% - 30px), #000 calc(100% - 29.4px))";

function mixHex(hex: string, toward: string, amount: number) {
  const parse = (h: string) => h.slice(1).match(/.{2}/g)!.map((x) => parseInt(x, 16));
  const a = parse(hex);
  const b = parse(toward);
  const m = a.map((v, i) => Math.round(v + (b[i] - v) * amount));
  return `#${m.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function capPoint(percent: number) {
  const angle = (percent / 100) * Math.PI * 2 - Math.PI / 2;
  return {
    left: SIZE / 2 + RADIUS * Math.cos(angle),
    top: SIZE / 2 + RADIUS * Math.sin(angle),
  };
}

export default function GlobalStatisticCard() {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [hoverId, setHoverId] = useState<SegmentId | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/statistics?year=${new Date().getFullYear()}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => setStats(json.global))
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const hovered = stats?.segments.find((s) => s.id === hoverId) ?? null;
  const wins = hovered?.wins ?? stats?.wins;
  const percent = hovered?.percent ?? stats?.percent;
  const caption = hovered ? hovered.label : null;

  const gradient = useMemo(() => {
    if (!stats) return COLOR.track;
    const dim = (id: SegmentId, hex: string) =>
      hoverId && hoverId !== id ? mixHex(hex, COLOR.track, 0.72) : hex;

    const stops: string[] = [];
    for (const s of stats.segments) {
      const a = (s.start / 100) * 360;
      const b = ((s.start + s.len) / 100) * 360;
      stops.push(`${dim(s.id, COLOR[s.id].from)} ${a}deg`);
      stops.push(`${dim(s.id, COLOR[s.id].to)} ${b}deg`);
    }
    const end = stats.segments[stats.segments.length - 1];
    const gap = ((end.start + end.len) / 100) * 360;
    stops.push(`${COLOR.track} ${gap}deg`);
    stops.push(`${COLOR.track} 360deg`);
    return `conic-gradient(from 0deg, ${stops.join(", ")})`;
  }, [stats, hoverId]);

  const startCap = capPoint(0);
  const endCap = stats
    ? capPoint(stats.segments[stats.segments.length - 1].start + stats.segments[stats.segments.length - 1].len)
    : capPoint(75);

  const startCapColor =
    hoverId && hoverId !== "purple" ? mixHex(COLOR.purple.from, COLOR.track, 0.72) : COLOR.purple.from;
  const endCapColor =
    hoverId && hoverId !== "orange" ? mixHex(COLOR.orange.to, COLOR.track, 0.72) : COLOR.orange.to;

  return (
    <section className="relative flex h-[300px] flex-col items-center rounded-card bg-white pt-[25px] shadow-card">
      <h2 className="text-[20px] font-medium leading-[30px] text-ink">
        Global Statistic
      </h2>

      <div className="relative mt-[18px] h-[200px] w-[200px]">
        {/* even-thickness ring: track + 75% colored arc */}
        <div
          className="donut-seg absolute inset-0 rounded-full"
          style={{
            background: gradient,
            WebkitMaskImage: RING_MASK,
            maskImage: RING_MASK,
          }}
        />

        {stats && (
          <>
            <span
              className="absolute rounded-full"
              style={{
                width: STROKE,
                height: STROKE,
                left: startCap.left,
                top: startCap.top,
                transform: "translate(-50%, -50%)",
                background: startCapColor,
              }}
            />
            <span
              className="absolute rounded-full"
              style={{
                width: STROKE,
                height: STROKE,
                left: endCap.left,
                top: endCap.top,
                transform: "translate(-50%, -50%)",
                background: endCapColor,
              }}
            />
          </>
        )}

        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 h-full w-full -rotate-90"
          onMouseLeave={() => setHoverId(null)}
        >
          {stats?.segments.map((s) => (
            <circle
              key={s.id}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="transparent"
              strokeWidth={STROKE}
              pathLength={100}
              strokeDasharray={`${s.len} ${100 - s.len}`}
              strokeDashoffset={-s.start}
              className="cursor-pointer"
              style={{ pointerEvents: "stroke" }}
              onMouseEnter={() => setHoverId(s.id)}
            >
              <title>{`${s.label}: ${s.wins} wins (${s.percent}%)`}</title>
            </circle>
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {stats ? (
            <div
              key={hoverId ?? "total"}
              className="flex flex-col items-center fade-up"
            >
              <span className="text-[20px] font-bold leading-6 text-night">
                {wins} Wins
              </span>
              <span className="mt-[5px] text-[12px] font-normal leading-[18px] text-faint">
                {caption ? `${caption} · ${percent}%` : `(${percent}% )`}
              </span>
            </div>
          ) : (
            <>
              <span className="skeleton h-6 w-[78px]" />
              <span className="skeleton mt-[5px] h-[18px] w-[44px]" />
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-[10px] flex items-center gap-[35px]">
        {LEGEND.map((id) => {
          const active = hoverId === id;
          const dimmed = hoverId !== null && !active;
          return (
            <button
              key={id}
              type="button"
              aria-label={stats?.segments.find((s) => s.id === id)?.label ?? id}
              onMouseEnter={() => setHoverId(id)}
              onMouseLeave={() => setHoverId(null)}
              className="h-[10px] w-[10px] rounded-[2px] transition-[transform,opacity] duration-200 hover:scale-125"
              style={{
                opacity: dimmed ? 0.35 : 1,
                transform: active ? "scale(1.25)" : undefined,
                background: `linear-gradient(to bottom right, ${COLOR[id].from}, ${COLOR[id].to})`,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
