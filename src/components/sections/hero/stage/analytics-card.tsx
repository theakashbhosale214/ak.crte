import { ChartSpline } from "lucide-react";
import styles from "../ecosystem-stage.module.css";
import { CardHeader, LiveBadge, MicroLabel, StageCard } from "./stage-card";

// Smoothed trend line on a 200 × 64 grid (Catmull-Rom → cubic Bézier).
const LINE =
  "M0 50 C3 49.3 12.3 46.2 18 46 C23.7 45.8 28.3 50.3 34 49 C39.7 47.7 46 39.2 52 38 C58 36.8 64 43.2 70 42 C76 40.8 82 32.2 88 31 C94 29.8 100 36.2 106 35 C112 33.8 118 25.3 124 24 C130 22.7 136 28.2 142 27 C148 25.8 154 18.3 160 17 C166 15.7 171.3 20.5 178 19 C184.7 17.5 196.3 9.8 200 8";
const AREA = `${LINE} L200 64 L0 64 Z`;

/** Sample dashboard for the visitor's own business — illustrative data. */
export function AnalyticsCard() {
  return (
    <StageCard size={[16.5, 12.5]} className="p-[1em]">
      <CardHeader icon={ChartSpline} title="Analytics" meta={<LiveBadge />} />

      <div className="mt-[0.95em] flex items-end justify-between">
        <div className="flex flex-col">
          <MicroLabel>Visitors · 30 days</MicroLabel>
          <span className="mt-[0.3em] font-display text-[1.625em] leading-none font-semibold tracking-[-0.03em] text-fg">
            18,240
          </span>
        </div>
        <div className="flex flex-col items-end">
          <MicroLabel>Leads</MicroLabel>
          <span className="mt-[0.4em] text-[0.9375em] leading-none font-semibold text-fg">326</span>
        </div>
      </div>

      <div className="relative mt-auto h-[4.6em]">
        <svg
          viewBox="0 0 200 64"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
        >
          <defs>
            <linearGradient id="stage-analytics-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c5f04a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c5f04a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g stroke="rgb(255 255 255 / 0.07)" strokeDasharray="2 4">
            <line x1="0" x2="200" y1="16" y2="16" />
            <line x1="0" x2="200" y1="32" y2="32" />
            <line x1="0" x2="200" y1="48" y2="48" />
          </g>
          <path d={AREA} fill="url(#stage-analytics-area)" className={styles.fadeIn} />
          <path
            d={LINE}
            stroke="#c5f04a"
            strokeWidth="1.75"
            strokeLinecap="round"
            pathLength={1}
            className={styles.draw}
          />
        </svg>
        <span className="absolute top-[12.5%] right-0 size-[0.5em] translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 animate-ping-soft rounded-full bg-signal-400" />
          <span className="absolute inset-0 rounded-full bg-signal-400 shadow-[0_0_0.8em_rgb(197_240_74/0.8)]" />
        </span>
      </div>

      <div className="mt-[0.55em] flex justify-between font-mono text-[0.5em] text-fg-faint">
        <span>W1</span>
        <span>W2</span>
        <span>W3</span>
        <span>W4</span>
      </div>
    </StageCard>
  );
}
