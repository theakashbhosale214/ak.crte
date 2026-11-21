import { LockKeyhole } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "../ecosystem-stage.module.css";
import { PlatformSite, StoreSite, StudioSite } from "./mock-sites";

const scenes = [
  { url: "yourbrand.com", Site: StudioSite },
  { url: "shop.yourbrand.com", Site: StoreSite },
  { url: "app.yourbrand.com", Site: PlatformSite },
];

/** One class per scene — all three share the 15s cycle, offset by a third. */
const sceneClass = [styles.cycleA, styles.cycleB, styles.cycleC];

/** Browser chrome that cycles through a website, an online store and an admin platform. */
export function BrowserWindow() {
  return (
    <div
      style={{ width: "33.75em", height: "25.25em" }}
      className="surface relative flex flex-col overflow-hidden rounded-[1.1em] shadow-float [--surface-bg:var(--color-ink-800)]"
    >
      <div className="relative z-10 flex h-[2.4em] shrink-0 items-center gap-[0.75em] border-b border-line bg-ink-800 px-[0.9em]">
        <div className="flex w-[3.4em] gap-[0.35em]">
          <span className="size-[0.55em] rounded-full bg-white/[0.14]" />
          <span className="size-[0.55em] rounded-full bg-white/[0.14]" />
          <span className="size-[0.55em] rounded-full bg-white/[0.14]" />
        </div>

        <div className="mx-auto flex h-[1.55em] w-[14em] items-center justify-center gap-[0.45em] rounded-full bg-ink-900 ring-1 ring-line">
          <LockKeyhole className="size-[0.7em] shrink-0 text-fg-subtle" strokeWidth={2} />
          <span className="relative h-full w-[8.6em]">
            {scenes.map((scene, index) => (
              <span
                key={scene.url}
                className={cn(
                  "absolute inset-0 flex items-center bg-ink-900 text-[0.625em] text-fg-muted",
                  styles.cycle,
                  sceneClass[index],
                )}
              >
                {scene.url}
              </span>
            ))}
          </span>
        </div>

        <div className="flex w-[3.4em] justify-end gap-[0.3em]">
          {scenes.map((scene, index) => (
            <span key={scene.url} className="relative h-[0.3em] w-[0.9em] overflow-hidden rounded-full bg-white/10">
              <span className={cn("absolute inset-0 rounded-full bg-signal-400", styles.cycle, sceneClass[index])} />
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden bg-[#efede9]">
        {scenes.map(({ url, Site }, index) => (
          <div key={url} className={cn("absolute inset-0", styles.cycle, sceneClass[index])}>
            <Site />
          </div>
        ))}
      </div>
    </div>
  );
}
