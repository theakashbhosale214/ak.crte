import type { CSSProperties } from "react";
import styles from "../ecosystem-stage.module.css";

/*
 * Circuit traces wiring the modules together on the desktop canvas
 * (1200 × 640 design units — see ecosystem-stage.module.css).
 * Each trace is drawn in the direction data flows; a pulse travels along it.
 */
const traces = [
  { d: "M272 100 C301 100 301 132 330 132", duration: 3.2, delay: 0 }, // analytics → site
  { d: "M284 362 C307 362 307 340 330 340", duration: 3.6, delay: -1.4 }, // assistant → site
  { d: "M870 120 C896 120 896 88 922 88", duration: 3.4, delay: -0.6 }, // site → search
  { d: "M870 332 C891 332 891 364 912 364", duration: 3.8, delay: -2.2 }, // site → deploy
  { d: "M600 452 V500", duration: 2.8, delay: -1 }, // site → automation
  { d: "M150 228 V290", duration: 3, delay: -0.3 }, // analytics → assistant
  { d: "M1050 224 V292", duration: 3.1, delay: -1.8 }, // search → deploy
  { d: "M150 498 V540 Q150 552 162 552 H348", duration: 4.6, delay: -2.6 }, // assistant → automation
  { d: "M1050 476 V540 Q1050 552 1038 552 H852", duration: 4.8, delay: -0.9 }, // deploy → automation
];

/** Ports where traces meet a module edge. Hub ports sit on the browser window. */
const ports = [
  { x: 330, y: 132, hub: true },
  { x: 330, y: 340, hub: true },
  { x: 870, y: 120, hub: true },
  { x: 870, y: 332, hub: true },
  { x: 600, y: 452, hub: true },
  { x: 272, y: 100 },
  { x: 284, y: 362 },
  { x: 922, y: 88 },
  { x: 912, y: 364 },
  { x: 600, y: 500 },
  { x: 150, y: 228 },
  { x: 150, y: 290 },
  { x: 1050, y: 224 },
  { x: 1050, y: 292 },
  { x: 150, y: 498 },
  { x: 348, y: 552 },
  { x: 1050, y: 476 },
  { x: 852, y: 552 },
];

export function StageTraces({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 640" fill="none" className={className} aria-hidden focusable="false">
      <g stroke="rgb(255 255 255 / 0.1)" strokeWidth="1">
        {traces.map((trace) => (
          <path key={trace.d} d={trace.d} />
        ))}
      </g>

      {traces.map((trace) => {
        const timing = {
          "--flow-duration": `${trace.duration}s`,
          "--flow-delay": `${trace.delay}s`,
        } as CSSProperties;
        return (
          <g key={trace.d} strokeLinecap="round">
            <path
              d={trace.d}
              pathLength={1}
              stroke="rgb(197 240 74 / 0.25)"
              strokeWidth="5"
              className={styles.pulse}
              style={timing}
            />
            <path
              d={trace.d}
              pathLength={1}
              stroke="#d5f67a"
              strokeWidth="1.5"
              className={styles.pulse}
              style={timing}
            />
          </g>
        );
      })}

      {ports.map((port) =>
        port.hub ? (
          <g key={`${port.x}-${port.y}`}>
            <circle cx={port.x} cy={port.y} r="7" fill="rgb(197 240 74 / 0.12)" />
            <circle cx={port.x} cy={port.y} r="3.5" fill="#c5f04a" />
          </g>
        ) : (
          <circle
            key={`${port.x}-${port.y}`}
            cx={port.x}
            cy={port.y}
            r="3.5"
            fill="#08090c"
            stroke="rgb(255 255 255 / 0.3)"
            strokeWidth="1"
          />
        ),
      )}
    </svg>
  );
}
