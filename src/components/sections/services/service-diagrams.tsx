import type { CSSProperties, ReactNode } from "react";
import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/cn";

/*
 * Blueprint-style diagrams, one per service, drawn on a 480 × 220 grid.
 * Decorative: the surrounding panel carries the real content.
 */

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 480 220"
      fill="none"
      aria-hidden
      focusable="false"
      className="h-auto w-full font-mono"
    >
      {children}
    </svg>
  );
}

function Label({
  x,
  y,
  children,
  anchor = "start",
  className,
  size = 8,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  className?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      letterSpacing="1.1"
      className={cn("fill-fg-subtle", className)}
    >
      {children}
    </text>
  );
}

/** A connection line with a travelling signal pulse. */
function Trace({
  d,
  duration = 3.4,
  delay = 0,
  dashed = false,
}: {
  d: string;
  duration?: number;
  delay?: number;
  dashed?: boolean;
}) {
  const timing = { "--flow-duration": `${duration}s`, "--flow-delay": `${delay}s` } as CSSProperties;
  return (
    <g strokeLinecap="round">
      <path d={d} strokeWidth="1" strokeDasharray={dashed ? "3 4" : undefined} className="stroke-white/15" />
      <path d={d} pathLength={1} strokeWidth="5" className="trace-pulse stroke-signal-400/25" style={timing} />
      <path d={d} pathLength={1} strokeWidth="1.5" className="trace-pulse stroke-signal-300" style={timing} />
    </g>
  );
}

function Box({
  x,
  y,
  w,
  h,
  r = 8,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  accent?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      className={accent ? "fill-signal-400/[0.07] stroke-signal-400/60" : "fill-ink-850 stroke-white/15"}
    />
  );
}

function CheckMark({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="7" className="fill-signal-400/15" />
      <path
        d={`M${cx - 3.5} ${cy} l2.5 2.5 l4.5 -5`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-signal-300"
      />
    </g>
  );
}

function Sparkle({ cx, cy, size = 8, className }: { cx: number; cy: number; size?: number; className?: string }) {
  const s = size;
  const k = s * 0.3;
  return (
    <path
      d={`M${cx} ${cy - s} L${cx + k} ${cy - k} L${cx + s} ${cy} L${cx + k} ${cy + k} L${cx} ${cy + s} L${cx - k} ${cy + k} L${cx - s} ${cy} L${cx - k} ${cy - k} Z`}
      className={className}
    />
  );
}

/* -------------------------------------------------------------------------- */

function WebsiteDiagram() {
  return (
    <Svg>
      <defs>
        <linearGradient id="dg-web-media" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5fe3ec" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c5f04a" stopOpacity="0.14" />
        </linearGradient>
      </defs>

      <g strokeWidth="1" className="stroke-white/25">
        <path d="M24 14V22M24 18H324M324 14V22" />
        <path d="M356 26V34M356 30H448M448 26V34" />
      </g>
      <Label x={174} y={11} anchor="middle">DESKTOP</Label>
      <Label x={402} y={23} anchor="middle">MOBILE</Label>

      {/* Desktop page */}
      <rect x="24" y="28" width="300" height="180" rx="8" className="fill-ink-850 stroke-white/15" />
      <path d="M24 44H324" className="stroke-white/10" />
      <circle cx="34" cy="36" r="2" className="fill-white/20" />
      <circle cx="42" cy="36" r="2" className="fill-white/20" />
      <circle cx="50" cy="36" r="2" className="fill-white/20" />
      <rect x="36" y="54" width="30" height="6" rx="3" className="fill-white/30" />
      <rect x="214" y="55" width="18" height="4" rx="2" className="fill-white/15" />
      <rect x="238" y="55" width="18" height="4" rx="2" className="fill-white/15" />
      <rect x="262" y="55" width="18" height="4" rx="2" className="fill-white/15" />
      <rect x="290" y="51" width="26" height="11" rx="5.5" className="fill-signal-400" />
      <rect x="36" y="74" width="136" height="10" rx="3" className="fill-white/75" />
      <rect x="36" y="89" width="104" height="10" rx="3" className="fill-white/75" />
      <rect x="36" y="108" width="128" height="4" rx="2" className="fill-white/15" />
      <rect x="36" y="116" width="96" height="4" rx="2" className="fill-white/15" />
      <rect x="36" y="130" width="46" height="13" rx="6.5" className="fill-signal-400" />
      <rect x="88" y="130" width="42" height="13" rx="6.5" className="stroke-white/25" />
      <rect x="196" y="70" width="116" height="80" rx="6" fill="url(#dg-web-media)" className="stroke-white/10" />
      <circle cx="286" cy="92" r="9" className="fill-white/20" />
      <path d="M204 142L238 108L262 128L280 114L304 142Z" className="fill-white/10" />
      {[36, 132, 228].map((x) => (
        <g key={x}>
          <rect x={x} y="162" width="88" height="34" rx="5" className="fill-white/[0.03] stroke-white/10" />
          <rect x={x + 8} y="172" width="44" height="4" rx="2" className="fill-white/20" />
          <rect x={x + 8} y="181" width="60" height="3" rx="1.5" className="fill-white/10" />
        </g>
      ))}

      {/* Mobile page */}
      <rect x="356" y="40" width="92" height="168" rx="14" className="fill-ink-850 stroke-white/15" />
      <rect x="389" y="47" width="26" height="4" rx="2" className="fill-white/15" />
      <rect x="366" y="64" width="62" height="7" rx="2.5" className="fill-white/75" />
      <rect x="366" y="75" width="46" height="7" rx="2.5" className="fill-white/75" />
      <rect x="366" y="90" width="72" height="44" rx="4" fill="url(#dg-web-media)" />
      <rect x="366" y="142" width="42" height="11" rx="5.5" className="fill-signal-400" />
      <rect x="366" y="162" width="72" height="4" rx="2" className="fill-white/15" />
      <rect x="366" y="170" width="56" height="4" rx="2" className="fill-white/15" />
      <rect x="366" y="182" width="72" height="16" rx="3" className="fill-white/[0.03] stroke-white/10" />

      <Trace d="M324 118H356" dashed duration={2.6} />
    </Svg>
  );
}

function SaasDiagram() {
  const tenants = [
    { y: 26, label: "WORKSPACE A" },
    { y: 90, label: "WORKSPACE B" },
    { y: 154, label: "WORKSPACE C" },
  ];
  const modules = [
    { y: 26, label: "BILLING" },
    { y: 90, label: "ADMIN" },
    { y: 154, label: "REPORTS" },
  ];
  return (
    <Svg>
      <Trace d="M120 46C144 46 144 100 168 100" duration={3.2} />
      <Trace d="M120 110H168" duration={3.6} delay={-1.2} />
      <Trace d="M120 174C144 174 144 120 168 120" duration={3.4} delay={-2.1} />
      <Trace d="M272 100C292 100 292 46 312 46" duration={3.5} delay={-0.6} />
      <Trace d="M272 110H312" duration={3} delay={-1.8} />
      <Trace d="M272 120C292 120 292 174 312 174" duration={3.7} delay={-2.6} />
      <Trace d="M396 46C410 46 410 96 424 96" duration={3.3} delay={-1.4} />
      <Trace d="M396 110H424" duration={3.1} delay={-0.4} />
      <Trace d="M396 174C410 174 410 124 424 124" duration={3.6} delay={-2.4} />

      {tenants.map((t) => (
        <g key={t.label}>
          <Box x={16} y={t.y} w={104} h={40} />
          <circle cx="34" cy={t.y + 20} r="7" className="fill-white/15" />
          <Label x={48} y={t.y + 18} className="fill-fg-muted" size={7.5}>
            {t.label}
          </Label>
          <rect x="48" y={t.y + 24} width="50" height="3" rx="1.5" className="fill-white/15" />
        </g>
      ))}

      <Box x={168} y={80} w={104} h={60} r={12} accent />
      <Label x={220} y={106} anchor="middle" className="fill-signal-300">
        API GATEWAY
      </Label>
      <Label x={220} y={121} anchor="middle" size={7}>
        AUTH · ROLES
      </Label>

      {modules.map((mod) => (
        <g key={mod.label}>
          <Box x={312} y={mod.y} w={84} h={40} />
          <Label x={354} y={mod.y + 23} anchor="middle" className="fill-fg-muted">
            {mod.label}
          </Label>
        </g>
      ))}

      <path d="M424 82V138A22 7 0 0 0 468 138V82" className="fill-ink-850 stroke-white/20" />
      <ellipse cx="446" cy="82" rx="22" ry="7" className="fill-ink-800 stroke-white/20" />
      <path d="M424 101A22 7 0 0 0 468 101M424 120A22 7 0 0 0 468 120" className="stroke-white/10" />
      <Label x={446} y={162} anchor="middle" size={7}>
        DATABASE
      </Label>
    </Svg>
  );
}

function SeoDiagram() {
  const rows = [30, 70, 110, 150];
  return (
    <Svg>
      <Label x={24} y={20}>SEARCH RESULTS</Label>
      {rows.map((y, index) => {
        const top = index === 0;
        return (
          <g key={y}>
            <rect
              x="24"
              y={y}
              width="214"
              height="32"
              rx="8"
              className={top ? "fill-signal-400/[0.07] stroke-signal-400/60" : "fill-ink-850 stroke-white/12"}
            />
            <circle cx="44" cy={y + 16} r="9" className={top ? "fill-signal-400" : "fill-white/[0.06] stroke-white/15"} />
            <text
              x="44"
              y={y + 19}
              textAnchor="middle"
              fontSize="9"
              className={top ? "fill-ink-950 font-semibold" : "fill-fg-subtle"}
            >
              {index + 1}
            </text>
            <rect
              x="62"
              y={y + 8}
              width={124 - index * 14}
              height="5"
              rx="2.5"
              className={top ? "fill-signal-300" : "fill-white/20"}
            />
            {top ? (
              <text x="62" y={y + 25} fontSize="7.5" className="fill-signal-200">
                yourbrand.com
              </text>
            ) : (
              <rect x="62" y={y + 19} width="70" height="3" rx="1.5" className="fill-white/10" />
            )}
          </g>
        );
      })}
      <path
        d="M222 52V40M217 45L222 40L227 45"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-signal-300"
      />

      <Label x={268} y={20}>AI ANSWER</Label>
      <rect x="262" y="30" width="196" height="118" rx="12" className="fill-ink-850 stroke-aqua-400/40" />
      <Sparkle cx={280} cy={48} size={7} className="fill-aqua-400" />
      <rect x="294" y="46" width="140" height="4" rx="2" className="fill-white/20" />
      {[66, 76, 86, 96].map((y, index) => (
        <rect key={y} x="276" y={y} width={[166, 150, 160, 118][index]} height="4" rx="2" className="fill-white/12" />
      ))}
      <rect x="276" y="112" width="106" height="20" rx="10" className="fill-aqua-400/10 stroke-aqua-400/40" />
      <text x="329" y="125" textAnchor="middle" fontSize="7.5" className="fill-aqua-300">
        [1] yourbrand.com
      </text>
      <Trace d="M238 46C258 46 254 122 276 122" dashed duration={3.2} />

      <rect x="262" y="162" width="64" height="20" rx="10" className="stroke-white/15" />
      <Label x={294} y={175} anchor="middle" size={7}>
        SCHEMA
      </Label>
      <rect x="332" y="162" width="126" height="20" rx="10" className="stroke-white/15" />
      <Label x={395} y={175} anchor="middle" size={7}>
        SEARCH CONSOLE
      </Label>
      <Label x={24} y={204} size={7}>
        TECHNICAL · ON-PAGE · LOCAL
      </Label>
    </Svg>
  );
}

function AnalyticsDiagram() {
  const bars = [
    { x: 30, top: 52, label: "VISITS", event: "page_view" },
    { x: 142, top: 84, label: "ENGAGED", event: "scroll_depth" },
    { x: 254, top: 116, label: "LEADS", event: "form_submit" },
    { x: 366, top: 142, label: "CUSTOMERS", event: "purchase" },
  ];
  const base = 184;
  return (
    <Svg>
      {bars.slice(0, -1).map((bar, index) => {
        const next = bars[index + 1];
        return (
          <polygon
            key={bar.label}
            points={`${bar.x + 84},${bar.top} ${next.x},${next.top} ${next.x},${base} ${bar.x + 84},${base}`}
            className="fill-white/[0.025]"
          />
        );
      })}
      {bars.map((bar, index) => {
        const accent = index === 2;
        return (
          <g key={bar.label}>
            <rect
              x={bar.x + 4}
              y="18"
              width="76"
              height="18"
              rx="9"
              className={accent ? "fill-signal-400/10 stroke-signal-400/50" : "fill-ink-850 stroke-white/15"}
            />
            <text
              x={bar.x + 42}
              y="30"
              textAnchor="middle"
              fontSize="7.5"
              className={accent ? "fill-signal-200" : "fill-fg-muted"}
            >
              {bar.event}
            </text>
            <Trace d={`M${bar.x + 42} 36V${bar.top}`} dashed duration={2.4 + index * 0.3} delay={-index * 0.7} />
            <rect
              x={bar.x}
              y={bar.top}
              width="84"
              height={base - bar.top}
              rx="6"
              className={accent ? "fill-signal-400/[0.16] stroke-signal-400/70" : "fill-white/[0.05] stroke-white/15"}
            />
            <Label x={bar.x + 42} y={202} anchor="middle" size={7} className={accent ? "fill-signal-300" : undefined}>
              {bar.label}
            </Label>
          </g>
        );
      })}
    </Svg>
  );
}

function AutomationDiagram() {
  const outputs = [
    { y: 20, label: "UPDATE CRM" },
    { y: 91, label: "SEND REPLY" },
    { y: 162, label: "ALERT TEAM" },
  ];
  return (
    <Svg>
      <Label x={16} y={20}>WORKFLOW</Label>
      <Trace d="M124 110H172" duration={2.8} />
      <Trace d="M300 100C326 100 326 39 352 39" duration={3.2} delay={-0.8} />
      <Trace d="M300 110H352" duration={3} delay={-1.6} />
      <Trace d="M300 120C326 120 326 181 352 181" duration={3.4} delay={-2.4} />

      <Box x={16} y={86} w={108} h={48} r={10} />
      <rect x="28" y="102" width="18" height="13" rx="2" strokeWidth="1.25" className="stroke-white/40" />
      <path d="M28.5 103L37 109.5L45.5 103" strokeWidth="1.25" className="stroke-white/40" />
      <Label x={54} y={107} className="fill-fg" size={7.5}>
        NEW ENQUIRY
      </Label>
      <Label x={54} y={120} size={7}>
        TRIGGER
      </Label>

      <Box x={172} y={74} w={128} h={72} r={14} accent />
      <Sparkle cx={192} cy={101} size={9} className="fill-signal-400" />
      <Label x={208} y={104} className="fill-signal-300">
        AI ASSISTANT
      </Label>
      <Label x={186} y={128} size={7}>
        CLASSIFY · REPLY
      </Label>

      {outputs.map((out) => (
        <g key={out.label}>
          <Box x={352} y={out.y} w={112} h={38} r={9} />
          <rect x="364" y={out.y + 15} width="8" height="8" rx="2" className="fill-signal-400/70" />
          <Label x={380} y={out.y + 22} className="fill-fg-muted" size={7.5}>
            {out.label}
          </Label>
        </g>
      ))}
    </Svg>
  );
}

function CloudDiagram() {
  const stages = ["COMMIT", "BUILD", "TEST", "DEPLOY"];
  return (
    <Svg>
      <Trace d="M108 33H364" duration={3.4} />
      {stages.map((stage, index) => {
        const x = 16 + index * 116;
        return (
          <g key={stage}>
            <rect
              x={x}
              y="18"
              width="92"
              height="30"
              rx="15"
              className={index === 3 ? "fill-ink-850 stroke-signal-400/60" : "fill-ink-850 stroke-white/15"}
            />
            <CheckMark cx={x + 18} cy={33} />
            <Label x={x + 32} y={36} className={index === 3 ? "fill-signal-300" : "fill-fg-muted"}>
              {stage}
            </Label>
          </g>
        );
      })}

      <Trace d="M410 48V62Q410 70 402 70H248Q240 70 240 78V98" duration={3.8} delay={-1.5} />

      {[92, 120, 148].map((y) => (
        <g key={y}>
          <rect x="16" y={y} width="132" height="22" rx="5" className="fill-ink-850 stroke-white/15" />
          <circle cx="30" cy={y + 11} r="3" className="fill-signal-400" />
          <rect x="42" y={y + 9} width="50" height="4" rx="2" className="fill-white/15" />
          <path d={`M120 ${y + 7}V${y + 15}M126 ${y + 7}V${y + 15}M132 ${y + 7}V${y + 15}`} className="stroke-white/15" />
        </g>
      ))}
      <Label x={82} y={198} anchor="middle" size={7}>
        HOSTING
      </Label>

      <circle cx="240" cy="140" r="42" className="stroke-white/20" />
      <ellipse cx="240" cy="140" rx="18" ry="42" className="stroke-white/12" />
      <ellipse cx="240" cy="140" rx="42" ry="14" className="stroke-white/12" />
      <path d="M198 140H282" className="stroke-white/12" />
      {[
        [222, 118],
        [258, 128],
        [234, 160],
        [266, 154],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="6" className="fill-signal-400/15" />
          <circle cx={cx} cy={cy} r="2.5" className="fill-signal-400" />
        </g>
      ))}
      <Label x={240} y={198} anchor="middle" size={7}>
        EDGE NETWORK
      </Label>

      {Array.from({ length: 26 }, (_, index) => (
        <rect key={index} x={312 + index * 6} y="96" width="4" height="26" rx="1" className="fill-signal-400/60" />
      ))}
      <rect x="312" y="136" width="70" height="20" rx="10" className="stroke-white/15" />
      <Label x={347} y={149} anchor="middle" size={7}>
        BACKUPS
      </Label>
      <rect x="388" y="136" width="78" height="20" rx="10" className="stroke-white/15" />
      <Label x={427} y={149} anchor="middle" size={7}>
        SECURITY
      </Label>
      <Label x={388} y={198} anchor="middle" size={7}>
        MONITORING
      </Label>
    </Svg>
  );
}

export const serviceDiagrams: Record<ServiceSlug, () => ReactNode> = {
  "website-development": WebsiteDiagram,
  "custom-software-saas": SaasDiagram,
  "seo-geo-aeo": SeoDiagram,
  "analytics-reporting": AnalyticsDiagram,
  "ai-automation": AutomationDiagram,
  "cloud-hosting-maintenance": CloudDiagram,
};

/** Framed diagram with a blueprint grid and a figure caption. */
export function ServiceDiagram({
  slug,
  caption,
  className,
}: {
  slug: string;
  caption: string;
  className?: string;
}) {
  const Diagram = serviceDiagrams[slug as ServiceSlug];
  if (!Diagram) return null;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-ink-850 blueprint-grid [--grid-size:24px] [--grid-color:rgb(255_255_255/0.035)]",
        className,
      )}
    >
      <div className="px-5 pt-9 pb-5 sm:px-7 sm:pt-10 sm:pb-6">
        <Diagram />
      </div>
      <span aria-hidden className="eyebrow absolute top-3.5 left-4 text-fg-faint sm:left-5">
        {caption}
      </span>
    </div>
  );
}
