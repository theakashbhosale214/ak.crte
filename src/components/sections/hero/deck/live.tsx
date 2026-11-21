"use client";

import { useEffect, useRef, useState } from "react";
import { BellRing, Bot, CalendarCheck, Database, FileText, Mail, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./command-deck.module.css";
import { useDeckLive } from "./deck-provider";

/*
 * Live widgets for the command deck. Values come from seeded generators, so
 * the server and the first client render always match; they only tick while
 * the deck is live (on screen, tab visible, motion allowed). Sample data for
 * an illustrative "yourbrand" business.
 */

function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Runs `onTick` every `ms` while the deck is live. */
function useTick(ms: number, onTick: () => void) {
  const live = useDeckLive();
  const callback = useRef(onTick);
  useEffect(() => {
    callback.current = onTick;
  });
  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => callback.current(), ms);
    return () => window.clearInterval(id);
  }, [live, ms]);
}

export function LiveNumber({
  start,
  step = [1, 3],
  every = 1400,
  seed = 1,
  suffix = "",
  className,
}: {
  start: number;
  step?: [number, number];
  every?: number;
  seed?: number;
  suffix?: string;
  className?: string;
}) {
  const [value, setValue] = useState(start);
  const random = useRef<(() => number) | null>(null);
  useTick(every, () => {
    random.current ??= seeded(seed);
    const [min, max] = step;
    setValue((previous) => previous + min + Math.floor(random.current!() * (max - min + 1)));
  });
  return (
    <span key={value} className={cn(value !== start && styles.tick, className)}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

function series(count: number, seed: number) {
  const random = seeded(seed);
  let level = 0.45;
  return Array.from({ length: count }, (_, index) => {
    level = Math.min(0.95, Math.max(0.18, level + (random() - 0.42) * 0.22 + index * 0.004));
    return Number(level.toFixed(3));
  });
}

export function LiveBars({
  count = 18,
  seed = 7,
  every = 1500,
  className,
  barClassName,
  accentLast = true,
}: {
  count?: number;
  seed?: number;
  every?: number;
  className?: string;
  barClassName?: string;
  accentLast?: boolean;
}) {
  const [values, setValues] = useState(() => series(count, seed));
  const random = useRef<(() => number) | null>(null);
  useTick(every, () => {
    random.current ??= seeded(seed + 101);
    setValues((previous) => {
      const last = previous[previous.length - 1];
      const next = Math.min(0.97, Math.max(0.2, last + (random.current!() - 0.45) * 0.3));
      return [...previous.slice(1), Number(next.toFixed(3))];
    });
  });
  return (
    <div aria-hidden className={className}>
      {values.map((value, index) => (
        <span
          key={index}
          className={cn(
            styles.bar,
            "block h-full flex-1 rounded-t-[0.2em]",
            accentLast && index === values.length - 1 ? "bg-signal-400" : "bg-signal-400/30",
            barClassName,
          )}
          style={{ transform: `scaleY(${value})` }}
        />
      ))}
    </div>
  );
}

const automationEvents: { icon: LucideIcon; text: string }[] = [
  { icon: Bot, text: "AI replied to a new enquiry" },
  { icon: Database, text: "Lead added to CRM" },
  { icon: CalendarCheck, text: "Consultation booked" },
  { icon: Mail, text: "Proposal email sent" },
  { icon: FileText, text: "Invoice generated" },
  { icon: BellRing, text: "Team notified" },
];
const feedTimes = ["now", "1m", "4m", "9m"];

export function LiveFeed({ every = 2400, className }: { every?: number; className?: string }) {
  const [head, setHead] = useState(0);
  useTick(every, () => setHead((value) => value + 1));
  const rows = [0, 1, 2, 3].map((offset) => head + 3 - offset);
  return (
    <ul aria-hidden className={cn("flex flex-col gap-[0.45em]", className)}>
      {rows.map((id, index) => {
        const event = automationEvents[id % automationEvents.length];
        const Icon = event.icon;
        return (
          <li
            key={id}
            className={cn(
              "flex items-center gap-[0.55em] rounded-[0.55em] border border-line bg-ink-900/60 px-[0.55em] py-[0.45em]",
              index === 0 && head > 0 && styles.feedIn,
            )}
          >
            <span className="grid size-[1.5em] shrink-0 place-items-center rounded-[0.4em] bg-signal-400/12 text-signal-300">
              <Icon className="size-[0.85em]" strokeWidth={2} />
            </span>
            <span className="min-w-0 flex-1 truncate text-[0.56em] text-fg">{event.text}</span>
            <span className="font-mono text-[0.48em] text-fg-faint">{feedTimes[index]}</span>
          </li>
        );
      })}
    </ul>
  );
}

const rankRows = [
  { keyword: "interior design studio", from: 4 },
  { keyword: "modular kitchen ideas", from: 7 },
  { keyword: "office interior company", from: 9 },
  { keyword: "luxury home interiors", from: 12 },
];

export function LiveRanks({ every = 2200, className }: { every?: number; className?: string }) {
  const [positions, setPositions] = useState(() => rankRows.map((row) => row.from));
  const [moved, setMoved] = useState<number | null>(null);
  const cursor = useRef(0);
  // The tick callback always sees the latest render's state, so no updater
  // functions (which must stay pure) are needed here.
  useTick(every, () => {
    if (positions.every((position, index) => position <= index + 1)) {
      setMoved(null);
      setPositions(rankRows.map((row) => row.from));
      return;
    }
    let index = cursor.current % positions.length;
    while (positions[index] <= index + 1) index = (index + 1) % positions.length;
    cursor.current = index + 1;
    setMoved(index);
    setPositions(positions.map((position, i) => (i === index ? position - 1 : position)));
  });
  return (
    <ul aria-hidden className={cn("flex flex-col", className)}>
      {rankRows.map((row, index) => (
        <li
          key={row.keyword}
          className="flex items-center gap-[0.6em] border-b border-line py-[0.5em] last:border-b-0"
        >
          <span
            key={`${index}-${positions[index]}`}
            className={cn(
              "grid size-[1.6em] shrink-0 place-items-center rounded-full font-mono text-[0.6em] font-semibold",
              positions[index] === 1 ? "bg-signal-400 text-ink-950" : "bg-white/[0.06] text-fg",
              moved === index && styles.tick,
            )}
          >
            {positions[index]}
          </span>
          <span className="min-w-0 flex-1 truncate text-[0.58em] text-fg-muted">{row.keyword}</span>
          <span className="flex items-center gap-[0.2em] text-[0.52em] font-medium text-signal-300">
            <TrendingUp className="size-[1.1em]" strokeWidth={2.25} />
            {row.from - positions[index]}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LiveJitter({
  base,
  spread = 3,
  every = 1800,
  seed = 11,
  suffix = "",
  className,
}: {
  base: number;
  spread?: number;
  every?: number;
  seed?: number;
  suffix?: string;
  className?: string;
}) {
  const [value, setValue] = useState(base);
  const random = useRef<(() => number) | null>(null);
  useTick(every, () => {
    random.current ??= seeded(seed);
    setValue(base + Math.round((random.current() * 2 - 1) * spread));
  });
  return (
    <span className={className}>
      {value}
      {suffix}
    </span>
  );
}
