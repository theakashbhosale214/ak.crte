import type { CSSProperties, ReactNode } from "react";
import { Check, Cloud, LayoutDashboard, LockKeyhole, Search, Sparkles } from "lucide-react";
import { hero } from "@/content/hero";
import { cn } from "@/lib/cn";
import { StudioSite } from "../stage/mock-sites";
import { LiveBadge, MicroLabel } from "../stage/stage-card";
import styles from "./command-deck.module.css";
import { LiveBars, LiveFeed, LiveJitter, LiveNumber, LiveRanks } from "./live";

type PlateProps = {
  layer: 1 | 2 | 3 | 4;
  /** Staircase offset toward the back, so lower layers stay visible. */
  shift: number;
  floatDuration: string;
  light?: boolean;
  glow?: boolean;
  children: ReactNode;
};

function Plate({ layer, shift, floatDuration, light, glow, children }: PlateProps) {
  const style = {
    "--layer": layer,
    "--order": layer - 1,
    "--px": `${(-shift * 0.35).toFixed(2)}em`,
    "--py": `${-shift}em`,
    "--float-dur": floatDuration,
  } as CSSProperties;
  return (
    <div className={styles.plate} data-layer={layer} data-layer-target={layer} style={style}>
      <div className={styles.mover}>
        <span aria-hidden className={styles.edgeFront} />
        <span aria-hidden className={styles.edgeSide} />
        <div className={cn(styles.body, light && styles.light)}>
          {children}
          {glow ? <span aria-hidden className={styles.ring} /> : null}
        </div>
      </div>
    </div>
  );
}

function PlateHeader({ icon, title, meta }: { icon: ReactNode; title: string; meta?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-[0.5em]">
      <div className="flex items-center gap-[0.55em]">
        <span className="grid size-[1.75em] place-items-center rounded-[0.5em] border border-line-strong bg-white/[0.04] text-signal-300">
          {icon}
        </span>
        <span className="text-[0.78em] font-medium text-fg">{title}</span>
      </div>
      {meta}
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: ReactNode; accent?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[0.65em] border p-[0.6em]",
        accent ? "border-signal-400/30 bg-signal-400/[0.07]" : "border-line bg-white/[0.025]",
      )}
    >
      <span className="text-[0.5em] text-fg-subtle">{label}</span>
      <span className="mt-[0.2em] font-display text-[1.1em] leading-none font-semibold tracking-[-0.02em] text-fg">
        {value}
      </span>
    </div>
  );
}

/* --- Layer 4 · Build — the website customers see ------------------------- */

function BuildPlate() {
  return (
    <Plate layer={4} shift={2.7} floatDuration="7.5s" light glow>
      <div className="flex h-[1.7em] items-center gap-[0.6em] border-b border-black/10 bg-[#e8e2d9] px-[0.85em]">
        <span className="flex gap-[0.3em]">
          <span className="size-[0.42em] rounded-full bg-black/15" />
          <span className="size-[0.42em] rounded-full bg-black/15" />
          <span className="size-[0.42em] rounded-full bg-black/15" />
        </span>
        <span className="mx-auto flex items-center gap-[0.35em] rounded-full bg-white/75 px-[0.9em] py-[0.15em] text-[0.5em] text-[#6f655a]">
          <LockKeyhole className="size-[1em]" strokeWidth={2} />
          yourbrand.com
        </span>
        <span className="w-[1.6em]" />
      </div>
      <div className="relative h-[calc(100%-1.7em)] overflow-hidden">
        <div style={{ fontSize: "0.83em", width: "33.75em", height: "22.85em" }}>
          <StudioSite />
        </div>
      </div>
    </Plate>
  );
}

/* --- Layer 3 · Manage — live admin dashboard + automation feed ----------- */

function ManagePlate() {
  return (
    <Plate layer={3} shift={1.8} floatDuration="8s">
      <div className="flex h-full flex-col p-[1.05em]">
        <PlateHeader
          icon={<LayoutDashboard className="size-[0.95em]" strokeWidth={1.75} />}
          title="Overview"
          meta={<LiveBadge />}
        />
        <div className="mt-[0.8em] grid flex-1 grid-cols-[1.5fr_1fr] gap-[0.75em]">
          <div className="flex flex-col gap-[0.65em]">
            <div className="grid grid-cols-3 gap-[0.45em]">
              <Kpi label="Visitors today" value={<LiveNumber start={2481} step={[1, 4]} every={1300} seed={3} />} />
              <Kpi label="New enquiries" value={<LiveNumber start={38} step={[1, 1]} every={5600} seed={5} />} accent />
              <Kpi label="Conversion" value="4.8%" />
            </div>
            <div className="relative flex-1 rounded-[0.65em] border border-line bg-white/[0.02] p-[0.65em]">
              <MicroLabel>Sessions · live</MicroLabel>
              <LiveBars
                count={20}
                seed={9}
                className="absolute inset-x-[0.65em] top-[1.9em] bottom-[0.65em] flex items-end gap-[0.22em]"
              />
            </div>
          </div>
          <div className="flex flex-col rounded-[0.65em] border border-line bg-white/[0.02] p-[0.6em]">
            <MicroLabel>Automation</MicroLabel>
            <LiveFeed className="mt-[0.55em]" />
          </div>
        </div>
      </div>
    </Plate>
  );
}

/* --- Layer 2 · Grow — search rankings and AI-answer visibility ----------- */

function GrowPlate() {
  return (
    <Plate layer={2} shift={0.9} floatDuration="8.5s">
      <div className="flex h-full flex-col p-[1.05em]">
        <PlateHeader
          icon={<Search className="size-[0.95em]" strokeWidth={1.75} />}
          title="Search visibility"
          meta={<MicroLabel>SEO · GEO · AEO</MicroLabel>}
        />
        <div className="mt-[0.7em] grid flex-1 grid-cols-[1.35fr_1fr] gap-[0.75em]">
          <div className="rounded-[0.65em] border border-line bg-white/[0.02] px-[0.65em] py-[0.3em]">
            <LiveRanks />
          </div>
          <div className="flex flex-col gap-[0.55em]">
            <div className="flex flex-1 flex-col rounded-[0.65em] border border-aqua-400/30 bg-aqua-400/[0.06] p-[0.6em]">
              <span className="flex items-center gap-[0.4em] text-[0.55em] font-medium text-aqua-300">
                <Sparkles className="size-[1.1em]" strokeWidth={2} />
                AI answer
              </span>
              <span className="mt-[0.5em] block h-[0.28em] w-full rounded-full bg-white/15" />
              <span className="mt-[0.3em] block h-[0.28em] w-4/5 rounded-full bg-white/10" />
              <span className="mt-auto inline-flex self-start rounded-full border border-aqua-400/40 px-[0.6em] py-[0.15em] text-[0.48em] text-aqua-300">
                [1] yourbrand.com
              </span>
            </div>
            <div className="rounded-[0.65em] border border-line bg-white/[0.02] p-[0.6em]">
              <MicroLabel>Organic traffic</MicroLabel>
              <LiveBars
                count={12}
                seed={21}
                every={1900}
                className="mt-[0.4em] flex h-[2.2em] items-end gap-[0.18em]"
              />
            </div>
          </div>
        </div>
      </div>
    </Plate>
  );
}

/* --- Layer 1 · Scale — cloud pipeline, regions and uptime ---------------- */

const pipeline = ["Commit", "Build", "Test", "Deploy"];
const regions = [
  { name: "Asia", ms: 18 },
  { name: "Europe", ms: 42 },
  { name: "US East", ms: 61 },
];

function ScalePlate() {
  return (
    <Plate layer={1} shift={0} floatDuration="9s">
      <div className="flex h-full flex-col p-[1.05em]">
        <PlateHeader
          icon={<Cloud className="size-[0.95em]" strokeWidth={1.75} />}
          title="Infrastructure"
          meta={
            <span className="inline-flex items-center gap-[0.4em] text-[0.55em] text-fg-muted">
              <span className={cn("size-[0.6em] rounded-full bg-signal-400", styles.pulse)} />
              All systems normal
            </span>
          }
        />
        <div className="mt-[0.8em] flex items-center">
          {pipeline.map((stage, index) => (
            <div key={stage} className="flex flex-1 items-center">
              <span
                className={cn(
                  "flex items-center gap-[0.35em] rounded-full border px-[0.6em] py-[0.3em] text-[0.52em] font-medium",
                  index === pipeline.length - 1
                    ? "border-signal-400/50 bg-signal-400/10 text-signal-300"
                    : "border-line-strong text-fg-muted",
                )}
              >
                <Check className="size-[1.1em] text-signal-400" strokeWidth={2.5} />
                {stage}
              </span>
              {index < pipeline.length - 1 ? <span className="mx-[0.3em] h-px flex-1 bg-line-strong" /> : null}
            </div>
          ))}
        </div>
        <div className="mt-[0.8em] grid grid-cols-3 gap-[0.5em]">
          {regions.map((region, index) => (
            <div key={region.name} className="rounded-[0.6em] border border-line bg-white/[0.025] p-[0.55em]">
              <span className="flex items-center gap-[0.35em] text-[0.5em] text-fg-subtle">
                <span className="size-[0.55em] rounded-full bg-signal-400" />
                {region.name}
              </span>
              <span className="mt-[0.25em] block font-mono text-[0.75em] text-fg">
                <LiveJitter base={region.ms} spread={3} seed={31 + index} every={1700 + index * 300} suffix=" ms" />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <MicroLabel>Uptime · 30 days</MicroLabel>
          <div className="mt-[0.4em] flex h-[1.1em] gap-[0.14em]">
            {Array.from({ length: 30 }, (_, index) => (
              <span key={index} className="flex-1 rounded-[0.12em] bg-signal-400/60" />
            ))}
          </div>
        </div>
      </div>
    </Plate>
  );
}

const pillars = [
  { x: "-11.5em", y: "6em", delay: "0s" },
  { x: "9em", y: "-6.5em", delay: "-0.9s" },
  { x: "11em", y: "6.5em", delay: "-1.7s" },
];

const orbitNodes = [
  { angle: "0deg", color: "#c5f04a" },
  { angle: "130deg", color: "#5fe3ec" },
  { angle: "245deg", color: "#c5f04a" },
];

/**
 * The hero visual: an exploded, live 3D stack of the four layers of a
 * digital business. Decorative — the figure caption describes it.
 */
export function CommandDeck() {
  return (
    <div aria-hidden data-nosnippet data-deck-scene="" className={styles.deck}>
      <div className={styles.viewport}>
        <div data-rig="" className={styles.rig}>
          <div className={styles.spin}>
            <div className={styles.floor} />
            <div className={styles.shadow} />
            <div className={styles.orbit}>
              {orbitNodes.map((node) => (
                <span
                  key={node.angle}
                  className={styles.orbitNode}
                  style={{ "--angle": node.angle, "--node": node.color } as CSSProperties}
                />
              ))}
            </div>

            <ScalePlate />
            <GrowPlate />
            <ManagePlate />
            <BuildPlate />

            {pillars.map((pillar) => (
              <span
                key={pillar.x}
                className={styles.pillar}
                style={{ "--x": pillar.x, "--y": pillar.y, "--delay": pillar.delay } as CSSProperties}
              />
            ))}

            {hero.layers.map((item) => (
              <div
                key={item.layer}
                className={styles.label}
                data-layer={item.layer}
                style={
                  {
                    "--layer": item.layer,
                    "--order": item.layer - 1,
                    "--lx": "14.6em",
                    "--ly": `${9.25 - (item.layer - 1) * 0.9}em`,
                  } as CSSProperties
                }
              >
                <span className={styles.labelLine} />
                <span className={styles.labelText}>
                  <span className="font-mono text-[0.55em] tracking-[0.14em] text-signal-300 uppercase">
                    {item.number} · {item.stage}
                  </span>
                  <span className={cn(styles.labelDetail, "text-[0.62em] text-fg-muted")}>{item.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
