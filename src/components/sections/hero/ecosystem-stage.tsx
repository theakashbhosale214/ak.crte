import { Fragment, type CSSProperties, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";
import styles from "./ecosystem-stage.module.css";
import { AnalyticsCard } from "./stage/analytics-card";
import { AssistantCard } from "./stage/assistant-card";
import { BrowserWindow } from "./stage/browser-window";
import { DeployCard } from "./stage/deploy-card";
import { SearchCard } from "./stage/search-card";
import { StageMotion } from "./stage/stage-motion";
import { StageTraces } from "./stage/stage-traces";
import { WorkflowCard } from "./stage/workflow-card";

type SlotProps = {
  className: string;
  /** Entrance delay in seconds. */
  delay: number;
  drift?: { y: string; duration: string };
  children: ReactNode;
};

function Slot({ className, delay, drift, children }: SlotProps) {
  const style = {
    "--delay": `${delay}s`,
    ...(drift ? { "--drift-y": drift.y, "--drift-duration": drift.duration } : {}),
  } as CSSProperties;
  return (
    <div className={cn(styles.slot, drift && styles.drift, className)} style={style}>
      {children}
    </div>
  );
}

/**
 * "Your digital ecosystem" — the hero illustration. A business website sits
 * at the centre, wired to the systems that make it grow: analytics, search
 * and AI visibility, an AI assistant, cloud deployment and automation.
 * Decorative (aria-hidden); the figcaption describes it for assistive tech.
 */
export function EcosystemStage() {
  return (
    <figure className="relative">
      <div aria-hidden data-nosnippet className={styles.wrap}>
        <div className="pointer-events-none absolute -inset-x-[12%] -top-[8%] -bottom-[16%] -z-10 bg-[radial-gradient(46%_40%_at_50%_42%,rgb(197_240_74/0.1),transparent_72%),radial-gradient(34%_32%_at_68%_60%,rgb(95_227_236/0.08),transparent_70%)]" />

        <StageMotion>
          <div className={styles.canvas}>
            <StageTraces className={styles.traces} />

            <Slot className={styles.browser} delay={0.5}>
              <BrowserWindow />
            </Slot>
            <Slot className={styles.analytics} delay={0.75} drift={{ y: "-9px", duration: "9s" }}>
              <AnalyticsCard />
            </Slot>
            <Slot className={styles.search} delay={0.85} drift={{ y: "-7px", duration: "10s" }}>
              <SearchCard />
            </Slot>
            <Slot className={styles.assistant} delay={0.95} drift={{ y: "-8px", duration: "8.5s" }}>
              <AssistantCard />
            </Slot>
            <Slot className={styles.deploy} delay={1.05} drift={{ y: "-6px", duration: "11s" }}>
              <DeployCard />
            </Slot>
            <Slot className={styles.workflow} delay={1.15} drift={{ y: "-5px", duration: "9.5s" }}>
              <WorkflowCard />
            </Slot>
          </div>
        </StageMotion>
      </div>

      <figcaption className="mx-auto mt-10 flex max-w-[75rem] flex-col items-center gap-3 border-t border-line pt-5 sm:mt-12 sm:flex-row sm:justify-between">
        <span className="eyebrow text-fg-subtle">
          <span className="text-fg-faint">Fig. 01 — </span>
          One connected system
          <span className="sr-only">
            : a business website, online store and admin platform, connected to analytics, search
            visibility, an AI assistant, cloud deployment and workflow automation.
          </span>
        </span>
        <span className="eyebrow flex items-center gap-2 text-fg-subtle">
          {brand.lifecycle.map((stage, index) => (
            <Fragment key={stage}>
              {index > 0 ? <ArrowRight aria-hidden className="size-3 text-fg-faint" /> : null}
              <span className={index === brand.lifecycle.length - 1 ? "text-signal-300" : undefined}>
                {stage}
              </span>
            </Fragment>
          ))}
        </span>
      </figcaption>
    </figure>
  );
}
