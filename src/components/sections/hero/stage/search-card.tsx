import { CircleCheck, Search, Sparkles, TrendingUp } from "lucide-react";
import { Bar, CardHeader, MicroLabel, StageCard } from "./stage-card";

/** Search + AI-answer visibility for the visitor's business (SEO · GEO · AEO). */
export function SearchCard() {
  return (
    <StageCard size={[16.625, 13]} className="p-[1em]">
      <CardHeader icon={Search} title="Search visibility" meta={<MicroLabel>SEO · AEO</MicroLabel>} />

      <div className="mt-[0.9em] flex h-[2em] items-center gap-[0.5em] rounded-full border border-line-strong bg-ink-900/80 px-[0.75em]">
        <Search className="size-[0.8em] shrink-0 text-fg-subtle" strokeWidth={2} />
        <span className="truncate text-[0.6875em] text-fg-muted">modern interior studio near me</span>
        <span className="h-[0.95em] w-px shrink-0 animate-blink bg-signal-400" />
      </div>

      <div className="mt-[0.6em] rounded-[0.7em] border border-line bg-white/[0.025] p-[0.7em]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.45em]">
            <span className="size-[1.1em] rounded-full bg-gradient-to-br from-signal-300 to-aqua-400" />
            <span className="text-[0.5625em] text-fg-subtle">yourbrand.com</span>
          </div>
          <span className="inline-flex items-center gap-[0.3em] rounded-full bg-signal-400 px-[0.55em] py-[0.15em] text-[0.5625em] font-semibold text-ink-950">
            <TrendingUp className="size-[1.1em]" strokeWidth={2.25} />
            #1
          </span>
        </div>
        <p className="mt-[0.45em] truncate text-[0.75em] font-medium text-aqua-300">
          Modern Interior Studio — Your Brand
        </p>
        <div className="mt-[0.5em] space-y-[0.3em]">
          <Bar className="w-full" />
          <Bar className="w-4/5 bg-white/[0.07]" />
        </div>
      </div>

      <div className="mt-auto flex gap-[0.4em]">
        <span className="inline-flex items-center gap-[0.35em] rounded-full border border-line-strong px-[0.6em] py-[0.3em] text-[0.5625em] text-fg-muted">
          <CircleCheck className="size-[1.1em] text-signal-400" strokeWidth={2} />
          Rich results
        </span>
        <span className="inline-flex items-center gap-[0.35em] rounded-full border border-aqua-400/25 bg-aqua-400/[0.07] px-[0.6em] py-[0.3em] text-[0.5625em] text-aqua-300">
          <Sparkles className="size-[1.1em]" strokeWidth={2} />
          Cited in AI answers
        </span>
      </div>
    </StageCard>
  );
}
