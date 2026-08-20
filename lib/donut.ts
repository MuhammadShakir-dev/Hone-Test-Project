import type { DonutSegment, SegmentId } from "@/lib/types";

export const DONUT_SIZE = 200;
export const DONUT_STROKE = 30;
export const DONUT_RADIUS = (DONUT_SIZE - DONUT_STROKE) / 2;

export const DONUT_COLORS = {
  purple: { from: "#B388F5", to: "#7E62EE" },
  pink: { from: "#FF7A8C", to: "#FF5C76" },
  orange: { from: "#FFA24F", to: "#FFC56A" },
  track: "#ECF1FD",
} as const;

export const RING_MASK =
  "radial-gradient(farthest-side, transparent calc(100% - 30px), #000 calc(100% - 29.4px))";

export function mixHex(hex: string, toward: string, amount: number) {
  const parse = (value: string) =>
    value.slice(1).match(/.{2}/g)!.map((pair) => parseInt(pair, 16));
  const from = parse(hex);
  const to = parse(toward);
  const mixed = from.map((channel, i) =>
    Math.round(channel + (to[i] - channel) * amount),
  );
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function dimIfInactive(hex: string, inactive: boolean) {
  return inactive ? mixHex(hex, DONUT_COLORS.track, 0.72) : hex;
}

export function ringCapPosition(percentAlongRing: number) {
  const angle = (percentAlongRing / 100) * Math.PI * 2 - Math.PI / 2;
  return {
    left: DONUT_SIZE / 2 + DONUT_RADIUS * Math.cos(angle),
    top: DONUT_SIZE / 2 + DONUT_RADIUS * Math.sin(angle),
  };
}

export function buildDonutGradient(
  segments: DonutSegment[],
  hoverId: SegmentId | null,
) {
  const color = (id: SegmentId, hex: string) =>
    dimIfInactive(hex, Boolean(hoverId && hoverId !== id));

  const stops: string[] = [];
  for (const segment of segments) {
    const startDeg = (segment.start / 100) * 360;
    const endDeg = ((segment.start + segment.len) / 100) * 360;
    stops.push(`${color(segment.id, DONUT_COLORS[segment.id].from)} ${startDeg}deg`);
    stops.push(`${color(segment.id, DONUT_COLORS[segment.id].to)} ${endDeg}deg`);
  }

  const last = segments[segments.length - 1];
  const gapDeg = ((last.start + last.len) / 100) * 360;
  stops.push(`${DONUT_COLORS.track} ${gapDeg}deg`);
  stops.push(`${DONUT_COLORS.track} 360deg`);

  return `conic-gradient(from 0deg, ${stops.join(", ")})`;
}
