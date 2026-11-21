import { Bot } from "lucide-react";
import styles from "../ecosystem-stage.module.css";
import { CardHeader, StageCard } from "./stage-card";

/** An AI assistant answering a customer and offering to book. */
export function AssistantCard() {
  return (
    <StageCard size={[15.5, 13]} className="p-[1em]">
      <CardHeader
        icon={Bot}
        title="AI assistant"
        meta={
          <span className="inline-flex items-center gap-[0.4em] text-[0.5625em] text-fg-subtle">
            <span className="size-[0.6em] rounded-full bg-signal-400 shadow-[0_0_0.6em_rgb(197_240_74/0.8)]" />
            Online
          </span>
        }
      />

      <div className="mt-[0.9em] flex flex-1 flex-col gap-[0.5em]">
        <p className="ml-auto max-w-[86%] rounded-[0.9em] rounded-br-[0.3em] bg-ink-600 px-[0.75em] py-[0.5em] text-[0.6875em] leading-[1.45] text-fg">
          Can I book a consultation this week?
        </p>
        <p
          className={`${styles.reply} max-w-[90%] rounded-[0.9em] rounded-bl-[0.3em] border border-signal-400/20 bg-signal-400/[0.07] px-[0.75em] py-[0.5em] text-[0.6875em] leading-[1.45] text-fg`}
        >
          Yes — Thursday 11:00 or Friday 15:00 are open. Shall I reserve one?
        </p>

        <div className="mt-auto flex items-center gap-[0.4em]">
          <span className="rounded-full border border-signal-400/30 bg-signal-400/10 px-[0.65em] py-[0.28em] text-[0.5625em] font-medium text-signal-300">
            Thu 11:00
          </span>
          <span className="rounded-full border border-line-strong px-[0.65em] py-[0.28em] text-[0.5625em] text-fg-muted">
            Fri 15:00
          </span>
          <span className={`${styles.typing} ml-auto text-[1em] text-fg-subtle`}>
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>
    </StageCard>
  );
}
