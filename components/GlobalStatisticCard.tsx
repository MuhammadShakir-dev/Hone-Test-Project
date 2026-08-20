"use client";

import { useMemo, useState } from "react";
import { useYearStatistics } from "@/hooks/useYearStatistics";
import {
  buildDonutGradient,
  DONUT_COLORS,
  DONUT_RADIUS,
  DONUT_SIZE,
  DONUT_STROKE,
  dimIfInactive,
  RING_MASK,
  ringCapPosition,
} from "@/lib/donut";
import type { SegmentId } from "@/lib/types";

const LEGEND: SegmentId[] = ["purple", "pink", "orange"];

export default function GlobalStatisticCard() {
  const stats = useYearStatistics(new Date().getFullYear());
  const [hoverId, setHoverId] = useState<SegmentId | null>(null);

  const hovered = stats?.global.segments.find((segment) => segment.id === hoverId) ?? null;
  const wins = hovered?.wins ?? stats?.global.wins;
  const percent = hovered?.percent ?? stats?.global.percent;
  const caption = hovered?.label ?? null;

  const gradient = useMemo(() => {
    if (!stats) return DONUT_COLORS.track;
    return buildDonutGradient(stats.global.segments, hoverId);
  }, [stats, hoverId]);

  const lastSegment = stats?.global.segments[stats.global.segments.length - 1];
  const startCap = ringCapPosition(0);
  const endCap = ringCapPosition(
    lastSegment ? lastSegment.start + lastSegment.len : 75,
  );

  return (
    <section className="relative flex h-[300px] flex-col items-center rounded-card bg-white pt-[25px] shadow-card">
      <h2 className="text-[20px] font-medium leading-[30px] text-ink">
        Global Statistic
      </h2>

      <div className="relative mt-[18px] h-[200px] w-[200px]">
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
            <RingCap
              left={startCap.left}
              top={startCap.top}
              color={dimIfInactive(DONUT_COLORS.purple.from, Boolean(hoverId && hoverId !== "purple"))}
            />
            <RingCap
              left={endCap.left}
              top={endCap.top}
              color={dimIfInactive(DONUT_COLORS.orange.to, Boolean(hoverId && hoverId !== "orange"))}
            />
          </>
        )}

        <svg
          viewBox={`0 0 ${DONUT_SIZE} ${DONUT_SIZE}`}
          className="absolute inset-0 h-full w-full -rotate-90"
          onMouseLeave={() => setHoverId(null)}
        >
          {stats?.global.segments.map((segment) => (
            <circle
              key={segment.id}
              cx={DONUT_SIZE / 2}
              cy={DONUT_SIZE / 2}
              r={DONUT_RADIUS}
              fill="none"
              stroke="transparent"
              strokeWidth={DONUT_STROKE}
              pathLength={100}
              strokeDasharray={`${segment.len} ${100 - segment.len}`}
              strokeDashoffset={-segment.start}
              className="cursor-pointer"
              style={{ pointerEvents: "stroke" }}
              onMouseEnter={() => setHoverId(segment.id)}
            >
              <title>{`${segment.label}: ${segment.wins} wins (${segment.percent}%)`}</title>
            </circle>
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {stats ? (
            <div key={hoverId ?? "total"} className="flex flex-col items-center fade-up">
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
              aria-label={stats?.global.segments.find((segment) => segment.id === id)?.label ?? id}
              onMouseEnter={() => setHoverId(id)}
              onMouseLeave={() => setHoverId(null)}
              className="h-[10px] w-[10px] rounded-[2px] transition-[transform,opacity] duration-200 hover:scale-125"
              style={{
                opacity: dimmed ? 0.35 : 1,
                transform: active ? "scale(1.25)" : undefined,
                background: `linear-gradient(to bottom right, ${DONUT_COLORS[id].from}, ${DONUT_COLORS[id].to})`,
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

function RingCap({ left, top, color }: { left: number; top: number; color: string }) {
  return (
    <span
      className="absolute rounded-full"
      style={{
        width: DONUT_STROKE,
        height: DONUT_STROKE,
        left,
        top,
        transform: "translate(-50%, -50%)",
        background: color,
      }}
    />
  );
}
