import type { CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";
import styles from "../ecosystem-stage.module.css";
import { LiveBadge, StageCard } from "./stage-card";

const checks = [
  { label: "Build optimised", value: "31s" },
  { label: "Tests passed", value: "142/142" },
  { label: "Security headers", value: "A+" },
  { label: "Performance", value: "98" },
];

/** Terminal-style production deploy log. */
export function DeployCard() {
  return (
    <StageCard size={[16.875, 11.5]} className="font-mono">
      <div className="flex items-center justify-between border-b border-line px-[0.9em] py-[0.65em]">
        <div className="flex items-center gap-[0.6em]">
          <span className="flex gap-[0.3em]">
            <span className="size-[0.45em] rounded-full bg-white/[0.16]" />
            <span className="size-[0.45em] rounded-full bg-white/[0.16]" />
            <span className="size-[0.45em] rounded-full bg-white/[0.16]" />
          </span>
          <span className="text-[0.5625em] text-fg-subtle">deploy — production</span>
        </div>
        <LiveBadge />
      </div>

      <ul className="flex flex-1 flex-col justify-center gap-[0.55em] px-[0.9em] text-[0.625em]">
        {checks.map((item, index) => (
          <li
            key={item.label}
            style={{ "--i": index } as CSSProperties}
            className={`${styles.logLine} flex items-center justify-between`}
          >
            <span className="flex items-center gap-[0.7em] text-fg-muted">
              <Check className="size-[1.15em] text-signal-400" strokeWidth={2.5} />
              {item.label}
            </span>
            <span className="text-fg">{item.value}</span>
          </li>
        ))}
        <li
          style={{ "--i": checks.length } as CSSProperties}
          className={`${styles.logLine} flex items-center gap-[0.7em] text-signal-300`}
        >
          <ArrowRight className="size-[1.15em]" strokeWidth={2.25} />
          Live on the global edge
          <span className="h-[1.05em] w-[0.5em] animate-blink bg-signal-400" />
        </li>
      </ul>
    </StageCard>
  );
}
