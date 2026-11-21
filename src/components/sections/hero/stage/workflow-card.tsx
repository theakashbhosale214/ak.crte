import { Fragment, type CSSProperties } from "react";
import { BellRing, Database, FileText, Mail, Zap } from "lucide-react";
import styles from "../ecosystem-stage.module.css";
import { MicroLabel, StageCard } from "./stage-card";

const steps = [
  { label: "Enquiry", icon: FileText },
  { label: "CRM", icon: Database },
  { label: "Auto-reply", icon: Mail },
  { label: "Team alert", icon: BellRing },
];

/** A lead-capture automation running end to end. */
export function WorkflowCard() {
  return (
    <StageCard size={[31.5, 6.5]} className="px-[1.1em] py-[0.85em]">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-[0.5em]">
          <Zap className="size-[0.75em] text-signal-400" strokeWidth={2.25} />
          <MicroLabel>Automation · New enquiry</MicroLabel>
        </span>
        <MicroLabel className="text-fg-faint">Runs on every form submit</MicroLabel>
      </div>

      <div className="mt-auto flex items-center">
        {steps.map((step, index) => (
          <Fragment key={step.label}>
            <div
              style={{ "--i": index } as CSSProperties}
              className="flex w-[4.6em] flex-col items-center gap-[0.35em]"
            >
              <span className={`${styles.stepIcon} grid size-[2em] place-items-center rounded-[0.6em]`}>
                <step.icon className="size-[0.95em]" strokeWidth={1.75} />
              </span>
              <span className="text-[0.5625em] font-medium whitespace-nowrap text-fg-muted">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <span
                style={{ "--i": index } as CSSProperties}
                className={`${styles.connector} mx-[0.35em] -mt-[1.2em]`}
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </StageCard>
  );
}
