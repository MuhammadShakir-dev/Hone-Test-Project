# Tennis — Live Scores Dashboard

Pixel-perfect Next.js implementation of the [Tennis dashboard Figma design](https://www.figma.com/design/d7s9PsFoX1KyJD0VzT9jlj/Dashboard-Tennis--Community-?node-id=1-4&p=f&t=lwLANx9mhigA58O2-0), fully responsive across all screen sizes.

## Tech stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** with design tokens sampled from the Figma file
- **SF Pro Display** via the system font stack (`-apple-system` / BlinkMacSystemFont on Apple devices)

## Features

- Exact 1440px desktop layout matching the Figma frame, with fluid proportional
  scaling below that and dedicated tablet/mobile layouts (sidebar collapses
  into an animated drawer behind a hamburger button).
- **Live Score card** fetches from a dummy in-memory API route
  (`GET /api/live-scores?category=singles|doubles|mixed`) — no database.
  The route adds ~900ms of artificial latency so you can see the loading state.
- **Statistic cards** are also API-driven: `GET /api/statistics?year=YYYY`
  covers the current year plus the previous 3 years. It serves the bar chart
  (with working year navigation) and the donut data, both animating in as
  data arrives.
- Smooth data-loading animations: shimmer skeleton while fetching, then
  staggered fade-up reveal of the rows. Switching tabs re-fetches and replays
  the animation.
- Decorative touches from the design recreated in code: SVG donut chart with
  gradient segments and draw-in animation, gradient bar chart with staggered
  grow-in, wavy profile header, ranking-card circle overlays.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  page.tsx                   # dashboard layout (left + right columns)
  layout.tsx / globals.css   # fonts, theme tokens, animations
  api/live-scores/route.ts   # GET live scores (dummy data + 900ms delay)
  api/statistics/route.ts    # GET year stats (dummy data + 280ms delay)
lib/
  types.ts                   # shared domain types
  api.ts                     # client fetch helpers
  delay.ts                   # artificial API latency
  donut.ts                   # donut chart colors + geometry
  data/                      # in-memory dummy datasets
hooks/
  useLiveScores.ts
  useYearStatistics.ts
components/                  # one file per UI piece (shell, cards, icons)
public/assets/               # illustrations & icons from the design
```
